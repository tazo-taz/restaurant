import React, { useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import VisibilityIcon from '@material-ui/icons/Visibility';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { Container, Grid } from '@material-ui/core';
import { DataContext } from '../Context'
import { Link } from 'react-router-dom'

const firebase = require('firebase')

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    borderRadius: 8
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: red[500],
  },
  rootgrid: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
}));

export default function RecipeReviewCard() {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);
  const [data, setData] = React.useState([])
  const [fulldata, setFulldata] = React.useState([])
  const [isLogin, setIslogin] = React.useState(false)

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  const { search } = useContext(DataContext)
  React.useEffect(() => {
    firebase.firestore().collection("data").get().then(function (querySnapshot) {
      let tempData = []
      querySnapshot.forEach(function (doc) {
        tempData = [...tempData, ...doc.data().restaurants]
      })
      setData(tempData)
      setFulldata(tempData)
    })
    firebase.auth().onAuthStateChanged(function (user) {
      if (user) {
        setIslogin(true)
      } else {
        setIslogin(false)
      }
    });
  }, [])
  React.useEffect(() => {
    setData(fulldata.filter(a => a.about.name.includes(search)))

  }, [search])
  return (
    <Grid container spacing={3}>

      {data.map((a, b) => (
        <Grid item md={3} sm={4} key={b} style={{ display: 'inline-grid', width: '100%', justifyItems: 'center' }}>
          <Card className={classes.root}>
            <CardHeader
              title={a.about.name}
              subheader={a.created}
            />
            <CardMedia
              className={classes.media}
              image={a.about.mainimg}
              title="Paella dish"
            />
            <CardContent>
              <Typography variant="body2" color="textSecondary" component="p">
                {a.about.info.slice(0, 155)}
              </Typography>
            </CardContent>
            <CardActions disableSpacing style={{ marginTop: 'auto' }}>
              {isLogin && <IconButton aria-label="add to favorites">
                <FavoriteIcon />
              </IconButton>}
              <Link to={"restaurant/" + a.about.id}><IconButton aria-label="share">
                <VisibilityIcon />
              </IconButton></Link>
            </CardActions>

          </Card>
        </Grid>
      ))}
    </Grid>
  );
}