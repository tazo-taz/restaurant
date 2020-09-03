import React, { useEffect, useState } from 'react'
import { useTheme, makeStyles } from '@material-ui/core/styles';
import { Container, Grid, Hidden } from '@material-ui/core';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import LocationCityIcon from '@material-ui/icons/LocationCity';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import ContactPhoneIcon from '@material-ui/icons/ContactPhone';
import MobileStepper from '@material-ui/core/MobileStepper';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import ListItemIcon from "@material-ui/core/ListItemIcon";
import Divider from "@material-ui/core/Divider";
import TodayIcon from '@material-ui/icons/Today';
import InfoIcon from '@material-ui/icons/Info';
import AirlineSeatReclineNormalIcon from '@material-ui/icons/AirlineSeatReclineNormal';
import CreditCardIcon from '@material-ui/icons/CreditCard';
import KitchenIcon from '@material-ui/icons/Kitchen';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

const useStyles = makeStyles((theme) => ({
    root: {
        maxWidth: '100%',
        flexGrow: 1,
        height: '100%',
        borderRadius: 8

    },
    header: {
        display: 'flex',
        alignItems: 'center',
        paddingLeft: theme.spacing(4),
        backgroundColor: theme.palette.background.default,
    },
    img: {
        minHeight: 250,
        height: '100%',
        width: '100%',
        overflow: 'hidden',
        display: 'block',
        width: '100%',
        objectFit: 'cover',
        boxShadow: '0 -1px 11px 0 rgba(0,0,0,0.2)',
        borderRadius: 8
    },
    top: {
        marginTop: -100
    },
    hero: {
        height: '65vh',
        backgroundSize: 'cover',
        backgroundPosition: 'center'
    },
    main: {
        background: 'white',
        boxShadow: '0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23)',
        paddingTop: '70px',
        borderRadius: 8,
        paddingBottom: 20
    },
    cont: {
        minHeight: 400,
        position: 'relative',
        top: '-100px',
        padding: '20px 40px'
    },
    mainimg: {
        height: '150px',
        width: '150px',
        objectFit: 'cover',
        position: 'absolute',
        left: '50%',
        transform: 'translateX(-50%)',
        top: '-75px',
        borderRadius: '30%',
        boxShadow: '0 2px 38px rgba(0,0,0,0.30), 0 6px 22px rgba(0,0,0,0.22)',
        backgroundColor: 'white'
    },
    listroot: {
        width: '100%',
        backgroundColor: theme.palette.background.paper,
        display: 'flex',
        margin: '10px 0'
    },
    rightbtn: {
        position: 'absolute',
        top: '50%',
        transform: 'translateY(-50%)',
        right: '24px',
        minWidth: 'inherit',
        backgroundColor: '#eaeaea',
        '&:hover': {
            background: '#393939',
            color: 'white'
        }
    },
    leftbtn: {
        position: 'absolute',
        top: '50%',
        transform: 'translateY(-50%)',
        left: '24px',
        zIndex: 2,
        backgroundColor: '#eaeaea',
        minWidth: 'inherit',
        '&:hover': {
            background: '#393939',
            color: 'white'
        }
    },
    row: {
        display: 'ms-flexbox',
        display: 'flex',
        msFlexWrap: 'wrap',
        flexWrap: 'wrap',
        padding: '0 4px',
        width: '100%'
    },
    col: {
        width: "100%",
        backgroundColor: "rgb(239 248 255)!important"
    }
}));

const responsive = {
    superLargeDesktop: {
        // the naming can be any, depends on you.
        breakpoint: { max: 4000, min: 3000 },
        items: 5
    },
    desktop: {
        breakpoint: { max: 3000, min: 1024 },
        items: 3
    },
    tablet: {
        breakpoint: { max: 1024, min: 464 },
        items: 2
    },
    mobile: {
        breakpoint: { max: 464, min: 0 },
        items: 1
    }
};

export const Restaurant = props => {

    const firebase = require('firebase')
    const classes = useStyles();
    const [fullData, setFullData] = useState('')
    const theme = useTheme();
    const [activeStep, setActiveStep] = React.useState(0);
    const [maxSteps, setMaxSteps] = useState(1)
    const [menus, setMenus] = useState([])

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    function ListItemLink(props) {
        return <ListItem button component="a" {...props} />;
    }

    useEffect(() => {


        firebase.firestore().collection("data").get().then(function (querySnapshot) {
            let tempData = []
            querySnapshot.forEach(function (doc) {
                tempData = [...tempData, ...doc.data().restaurants]
            })
            document.title = 'რესტორანი - ' + tempData.find(a => a.about.id == props.match.params.id).about.name


            let data = tempData.find(a => a.about.id == props.match.params.id).checkboxs

            const sorter = {
                "ორშაბათი": 1,
                "სამშაბათი": 2,
                "ოთხშაბათი": 3,
                "ხუთშაბათი": 4,
                "პარასკევი": 5,
                "შაბათი": 6,
                "კვირა": 7
            };

            let tmp = [];
            Object.keys(data).forEach(function (key) {
                let value = data[key];
                let index = sorter[key.toLowerCase()];
                tmp[index] = {
                    key: key,
                    value: value
                };
            });

            let orderedData = {};
            tmp.forEach(function (obj) {
                orderedData[obj.key] = obj.value;
            });

            setFullData({ ...tempData.find(a => a.about.id == props.match.params.id), checkboxs: orderedData })

            setMaxSteps(tempData.find(a => a.about.id == props.match.params.id).imgArray.length)
        })
        firebase.firestore().collection('foradddata').doc('menu').get().then(a => {
            setMenus(Object.values(a.data())[0].filter(a => a.restaurants.includes(props.match.params.id)))
        })
    }, [])

    return (
        <>
            {fullData != "" &&
                <div className={classes.top}><div className={classes.hero} style={{ backgroundImage: 'url(' + fullData.about.backimg + ')' }}></div>
                    <Container className={classes.cont}>
                        <img src={fullData.about.mainimg} className={classes.mainimg} />
                        <div className={classes.main}>
                            <div className="row" style={{ padding: '20px 40px' }}>
                                <div className="col-lg-6 pl-4 pr-4">
                                    <h1 style={{ fontSize: '38px', height: 45, color: 'rgb(33, 150, 243)' }}>{fullData.about.name}</h1>
                                    <p style={{ 'textAlign': 'justify', marginBottom: 0, fontSize: 14 }}>{fullData.about.info}</p></div>
                                <div className="col-lg-6 pl-4 pr-4">   <div className={classes.root}>
                                    <img
                                        className={classes.img}
                                        src={fullData.imgArray[activeStep]}
                                    />
                                    <Button className={classes.rightbtn} size="small" onClick={handleNext} disabled={activeStep === maxSteps - 1}>

                                        {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
                                    </Button>
                                    <Button className={classes.leftbtn} size="small" onClick={handleBack} disabled={activeStep === 0}>
                                        {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}

                                    </Button>
                                </div>
                                </div>


                                <List className={classes.listroot}>
                                    <Grid container >
                                        <Grid item sm={4} xs={12}>
                                            <ListItem>
                                                <ListItemAvatar>
                                                    <Avatar>
                                                        <LocationCityIcon />
                                                    </Avatar>
                                                </ListItemAvatar>
                                                <ListItemText primary="ქალაქი" secondary={fullData.about.city} />
                                            </ListItem>
                                        </Grid>
                                        <Grid item sm={4} xs={12}>
                                            <ListItem>
                                                <ListItemAvatar>
                                                    <Avatar>
                                                        <LocationOnIcon />
                                                    </Avatar>
                                                </ListItemAvatar>
                                                <ListItemText primary="მისამართი" secondary={fullData.about.address} />
                                            </ListItem>
                                        </Grid>
                                        <Grid item sm={4} xs={12}>
                                            <ListItem alignItems="center">
                                                <ListItemAvatar>
                                                    <Avatar>
                                                        <ContactPhoneIcon />
                                                    </Avatar>
                                                </ListItemAvatar>
                                                <ListItemText primary="ტელეფონი" secondary={fullData.about.phone} />
                                            </ListItem>
                                        </Grid>
                                    </Grid>
                                </List>
                                <div className={classes.row}>
                                    <div className='column'>
                                        <div className={classes.col}>
                                            <List component="nav" aria-label="main mailbox folders">
                                                <ListItem button>
                                                    <ListItemIcon>
                                                        <TodayIcon />
                                                    </ListItemIcon>
                                                    <ListItemText primary="სამუშაო დღეები" />
                                                </ListItem>
                                            </List>
                                            <List component="nav" aria-label="secondary mailbox folders">
                                                {Object.keys(fullData.checkboxs).map(a => {
                                                    return (
                                                        <ListItemLink>
                                                            <ListItemText primary={fullData.checkboxs[a]['24'] ? a + ' - 24 საათი' : a + ' - ' + fullData.checkboxs[a]['დან'] + 'სთ დან ' + fullData.checkboxs[a]['მდე'] + 'სთ მდე'} />
                                                        </ListItemLink>)
                                                })}
                                            </List>
                                        </div>
                                        <div className={classes.col} >
                                            <List component="nav" aria-label="main mailbox folders">
                                                <ListItem button>
                                                    <ListItemIcon>
                                                        <KitchenIcon />
                                                    </ListItemIcon>
                                                    <ListItemText primary="სამზარეულო" />
                                                </ListItem>
                                            </List>
                                            <List component="nav" aria-label="secondary mailbox folders">
                                                {fullData.kitchen.map(a => {
                                                    return (
                                                        <ListItemLink>
                                                            <ListItemText primary={a} />
                                                        </ListItemLink>)
                                                })}
                                            </List>

                                        </div>
                                    </div>
                                    <div className='column'>
                                        <div className={classes.col}>
                                            <List component="nav" aria-label="main mailbox folders">
                                                <ListItem button>
                                                    <ListItemIcon>
                                                        <InfoIcon />
                                                    </ListItemIcon>
                                                    <ListItemText primary="ზოგადი ინფორმაცია" />
                                                </ListItem>
                                            </List>
                                            <List component="nav" aria-label="secondary mailbox folders">
                                                {fullData.info.map(a => {
                                                    return (
                                                        <ListItemLink>
                                                            <ListItemText primary={a} />
                                                        </ListItemLink>)
                                                })}
                                            </List>

                                        </div>
                                        <div className={classes.col}>
                                            <List component="nav" aria-label="main mailbox folders">
                                                <ListItem button>
                                                    <ListItemIcon>
                                                        <CreditCardIcon />
                                                    </ListItemIcon>
                                                    <ListItemText primary="გადახდის მეთოდები" />
                                                </ListItem>
                                            </List>
                                            <List component="nav" aria-label="secondary mailbox folders">
                                                {fullData.payment.map(a => {
                                                    return (
                                                        <ListItemLink>
                                                            <ListItemText primary={a} />
                                                        </ListItemLink>)
                                                })}
                                            </List>

                                        </div>
                                    </div>
                                    <div className='column'>
                                        <div className={classes.col} >
                                            <List component="nav" aria-label="main mailbox folders">
                                                <ListItem button>
                                                    <ListItemIcon>
                                                        <AirlineSeatReclineNormalIcon />
                                                    </ListItemIcon>
                                                    <ListItemText primary="დასაჯდომი სივრცე" />
                                                </ListItem>
                                            </List>
                                            <List component="nav" aria-label="secondary mailbox folders">
                                                {fullData.sitspace.map(a => {
                                                    return (
                                                        <ListItemLink>
                                                            <ListItemText primary={a} />
                                                        </ListItemLink>)
                                                })}
                                            </List>

                                        </div>
                                    </div>
                                </div>
                            </div>
                            {
                                menus.length != 0 &&
                                <>
                                    <h2 style={{ textAlign: 'center' }}>მენიუ</h2>
                                    <Carousel responsive={responsive} style={{ paddingBottom: '20!important' }}>
                                        {menus.map(a => (
                                            <div style={{ padding: 15, height: '100%' }}>
                                                <div style={{ height: '100%', backgroundColor: '#eff8ff', boxShadow: '0 1px 3px 0 rgba(0,0,0,0.2)', paddingTop: '18px' }}>
                                                    <h3 draggable="false" style={{ textAlign: 'center' }}>{a.name}</h3>
                                                    <img draggable="false" src={a.img} style={{ width: '100%', height: '200px', objectFit: 'cover', boxShadow: 'rgba(0, 0, 0, 0.2) -2px 0 22px' }} />
                                                </div>
                                            </div>
                                        )
                                        )}
                                    </Carousel>
                                </>
                            }
                        </div>
                    </Container>
                </div>}

        </>
    )
}