import React, { useContext } from 'react';
import { fade, makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import Badge from '@material-ui/core/Badge';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MailIcon from '@material-ui/icons/Mail';
import NotificationsIcon from '@material-ui/icons/Notifications';
import MoreIcon from '@material-ui/icons/MoreVert';
import clsx from 'clsx';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import Container from '@material-ui/core/Container'
import { Link } from 'react-router-dom'
import { DataContext } from '../Context'
import RestaurantIcon from '@material-ui/icons/Restaurant';
import EditIcon from '@material-ui/icons/Edit';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import AppsIcon from '@material-ui/icons/Apps';

const useStyles = makeStyles((theme) => ({
  list: {
    width: 250,
  },
  fullList: {
    width: 'auto',
  },
  grow: {
    flexGrow: 1
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto',
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
  },
  sectionMobile: {
    display: 'flex',
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
  nolink: {
    textDecoration: 'none',
    color: '#545454'
  }
}));

export default function Navbar(props) {

  const firebase = require('firebase')

  const [islogin, setIslogin] = React.useState("no")


  firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
      setIslogin('yes')
    } else {
      setIslogin('no')
    }
  });

  const navStyle = {
    textDecoration: 'none'
  }
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      {
        islogin == 'yes' ? <div><Link to="/profile" style={navStyle} className={classes.nolink} onClick={handleMenuClose}><MenuItem>პროფილი</MenuItem></Link>
          <Link to="/" style={navStyle} className={classes.nolink} onClick={() => { handleMenuClose(); firebase.auth().signOut() }}><MenuItem>გამოსვლა</MenuItem></Link></div> : <div><Link to="/registration" style={navStyle} className={classes.nolink} onClick={handleMenuClose}><MenuItem>რეგისტრაცია</MenuItem></Link>
            <Link to="/authorisation" style={navStyle} className={classes.nolink} onClick={handleMenuClose}><MenuItem>ავტორიზაცია</MenuItem></Link></div>
      }

    </Menu>
  );

  const mobileMenuId = 'primary-search-account-menu-mobile';
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <ExpandMoreIcon />
        </IconButton>
        <p>მეტის ნახვა</p>
      </MenuItem>
    </Menu>
  );
  const toggleDrawer = (anchor, open) => (event) => {
    if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const { setSearch } = useContext(DataContext)
  const filterRestaurants = e => {
    setValue(e)
    setSearch(e)
  }

  const [value, setValue] = React.useState("")

  const changeValue = (e) => {
    setValue(e)
  }

  const list = (anchor) => (
    <div
      className={clsx(classes.list, {
        [classes.fullList]: anchor === 'top' || anchor === 'bottom',
      })}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        <Link to="/myrestaurants" className={classes.nolink}><ListItem button key={'თქვენი რესტორნები'} selected={true ? props.location.pathname == "/myrestaurants" : false}>
          <ListItemIcon><AppsIcon /></ListItemIcon>
          <ListItemText primary={'თქვენი რესტორნები'} />
        </ListItem></Link>
        <Link to="/mymenus" className={classes.nolink}><ListItem button key={'თქვენი მენიუები'} selected={true ? props.location.pathname == "/mymenus" : false}>
          <ListItemIcon><AppsIcon /></ListItemIcon>
          <ListItemText primary={'თქვენი მენიუები'} />
        </ListItem></Link>
      </List>
      <Divider />
      <List>
        <Link to="/addmenu" className={classes.nolink}><ListItem button key={'მენიუს დამატება'} selected={true ? props.location.pathname == "/addmenu" : false}>
          <ListItemIcon><InboxIcon /></ListItemIcon>
          <ListItemText primary={'მენიუს დამატება'} />
        </ListItem></Link>
        <Link to="/editmenu" className={classes.nolink}><ListItem button key={'მენიუს რედაქტირება'} selected={true ? props.location.pathname == "/editmenu" : false}>
          <ListItemIcon><MailIcon /></ListItemIcon>
          <ListItemText primary={'მენიუს რედაქტირება'} />
        </ListItem></Link>
        <Link to="/addrestaurant" className={classes.nolink}><ListItem button key={'რესტორნის დამატება'} selected={true ? props.location.pathname == "/addrestaurant" : false}>
          <ListItemIcon><RestaurantIcon /></ListItemIcon>
          <ListItemText primary={'რესტორნის დამატება'} />
        </ListItem></Link>
        <Link to="/editrestaurant" className={classes.nolink}><ListItem button key={'რესტორნის რედაქტირება'} selected={true ? props.location.pathname == "/editrestaurant" : false}>
          <ListItemIcon><EditIcon /></ListItemIcon>
          <ListItemText primary={'რესტორნის რედაქტირება'} />
        </ListItem></Link>
      </List>
    </div>
  );

  return (
    <>
      <div className={classes.grow}>
        <AppBar position="fixed" style={{ backgroundColor: '#2196f3' }}>
          <Container>
            <Toolbar>

              {islogin == "yes" ? (<React.Fragment key={'left'}>
                <IconButton
                  edge="start"
                  className={classes.menuButton}
                  color="inherit"
                  aria-label="open drawer"
                >
                  <MenuIcon onClick={toggleDrawer('left', true)} />
                  <SwipeableDrawer
                    anchor={'left'}
                    open={state['left']}
                    onClose={toggleDrawer('left', false)}
                    onOpen={toggleDrawer('left', true)}
                  >
                    {list('left')}
                  </SwipeableDrawer>
                </IconButton>

              </React.Fragment>) : null}
              <Typography className={classes.title} variant="h6" noWrap style={{ 'marginTop': '6px' }}>
                <Link to="/" style={navStyle, { 'color': 'white', 'textDecoration': 'none' }}>რესტორანი</Link>
              </Typography>
              <div className={classes.grow} />
              <div className={classes.search}>
                <div className={classes.searchIcon}>
                  <SearchIcon />
                </div>
                <InputBase
                  value={value}
                  placeholder="ძებნა..."
                  onChange={(e) => filterRestaurants(e.target.value)}
                  classes={{
                    root: classes.inputRoot,
                    input: classes.inputInput,
                  }}
                  inputProps={{ 'aria-label': 'search' }}
                />
              </div>
              <div className={classes.sectionDesktop}>

                <IconButton aria-label="show 4 new mails" color="inherit">
                  <Badge badgeContent={4} color="secondary">
                    <MailIcon />
                  </Badge>
                </IconButton>
                <IconButton aria-label="show 17 new notifications" color="inherit">
                  <Badge badgeContent={17} color="secondary">
                    <NotificationsIcon />
                  </Badge>
                </IconButton>
                <IconButton
                  edge="end"
                  aria-label="account of current user"
                  aria-controls={menuId}
                  aria-haspopup="true"
                  onClick={handleProfileMenuOpen}
                  color="inherit"
                >
                  <AccountCircle />
                </IconButton>
              </div>
              <div className={classes.sectionMobile}>
                <IconButton
                  aria-label="show more"
                  aria-controls={mobileMenuId}
                  aria-haspopup="true"
                  onClick={handleMobileMenuOpen}
                  color="inherit"
                >
                  <MoreIcon />
                </IconButton>
              </div>
            </Toolbar>
          </Container>
        </AppBar>
        {renderMobileMenu}
        {renderMenu}
      </div>

    </>
  );
}