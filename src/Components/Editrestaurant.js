import React, { useEffect } from 'react'
import { Grid, Input, TextareaAutosize, Typography } from '@material-ui/core'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import StepContent from '@material-ui/core/StepContent';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import AddIcon from '@material-ui/icons/Add';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import ClearIcon from '@material-ui/icons/Clear';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Alert from '@material-ui/lab/Alert';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { Link } from 'react-router-dom'

const useStyles = makeStyles((theme) => ({
    rootimg: {
        maxWidth: '100%',
        flexGrow: 1,
        height: '100%',
        borderBottom: '3px solid #cacaca',
        borderTop: '3px solid #cacaca',
        position: 'relative'
    },
    img: {
        minHeight: 250,
        height: '100%',
        width: '100%',
        overflow: 'hidden',
        display: 'block',
        width: '100%',
        objectFit: 'cover'
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: '100%',
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
    root: {
        width: '100%',
    },
    rootb: {
        width: '100%',
    },
    button: {
        marginTop: theme.spacing(1),
        marginRight: theme.spacing(1),
    },
    button2: {
        backgroundColor: '#2196f3',
        '&:hover': {
            backgroundColor: '#0080e6'
        },
        marginRight: 5
    },
    actionsContainer: {
        marginBottom: theme.spacing(2),
    },
    resetContainer: {
        padding: theme.spacing(3),
    },
    textarea: {
        border: '2px solid #c0e2fe',
        margin: '3px 0',
        padding: 0,
        borderRadius: '3px',
        width: '100%',
        height: 37,
        fontSize: '16px',
        transition: '0.3s',
        '&:focus': {
            border: '2px solid #2196f3',
            outline: 'none',
            boxShadow: '5px 5px 10px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)',
            // boxShadow: '0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23)'
        }
    },
    input: {
        marginBottom: 15
    },
    upload: {
        background: 'none',
        border: 'none',
        outline: 'none'
    },
    smallinput: {
        maxWidth: 60
    },

    testinput: {
        border: '2px solid #c0e2fe',
        margin: '3px 0',
        padding: '5px',
        borderRadius: '3px',
        width: '100%',
        fontSize: '16px',
        transition: '0.3s',
        '&:focus': {
            border: '2px solid #2196f3',
            outline: 'none',
            boxShadow: '5px 5px 10px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)',
            // boxShadow: '0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23)'
        }
    },
    label: {
        color: '#888'
    },
    smallitem: {
        width: '100%'
    },
    itemgrid: {
        display: 'grid',
        gridTemplateColumns: '10fr 1fr'
    },
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    paper: {
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
        width: 500
    },
    uploaddiv: {
        minHeight: '300px',
    },
    centerdiv: {
        height: '300px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    btnupload: {
        background: 'none',
        border: 'none',
        outline: 'none'
    },
    divflex: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },
    onhovercloud: {
        '&:active': {
            transform: 'scale(0.96)'
        },
        '&:hover': {
            fill: '#0569b9!important'
        }
    },
    error: {
        color: 'red',
        marginTop: 16
    }
}));

export default function Editrestaurant(props) {

    const classes = useStyles();
    const [checked, setChecked] = React.useState([]);
    const [imgName, setImgName] = React.useState("");
    const [senddata, setSenddata] = React.useState({ checkboxs: {}, about: {}, imgArray: [], info: [], kitchen: [], payment: [], sitspace: [] })
    const [open, setOpen] = React.useState(false);
    const firebase = require('firebase')
    const [infos, setInfos] = React.useState({ info: [], kitchen: [], payment: [], sitspace: [], city: [] })
    const [error, setError] = React.useState("")
    const [data, setData] = React.useState([])
    const [chosenRestaurant, setChosenRestaurant] = React.useState("")
    const [load, setLoad] = React.useState(false)
    const [mail, setMail] = React.useState("")



    useEffect(() => {
        firebase.auth().onAuthStateChanged(function (user) {
            if (user) {
                setMail(user.email)
                firebase.firestore().collection('data').doc(user.email).get().then(function (doc) {
                    setData(doc.data() ? doc.data().restaurants : [])
                    setLoad(true)
                })
            } else {
                window.location.href = "/authorisation"
            }
        })

        firebase.firestore().collection('foradddata').doc('foradddata').get().then(a => {
            setInfos(a.data())
        })
    }, [])

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleToggle = (value) => () => {
        if (senddata.checkboxs && senddata.checkboxs[value]) {
            delete senddata.checkboxs[value]
            setSenddata(senddata)
        } else {
            senddata.checkboxs[value] = {}
            setSenddata(senddata)
        }
        const currentIndex = checked.indexOf(value);
        const newChecked = [...checked];

        if (currentIndex === -1) {
            newChecked.push(value);
        } else {
            newChecked.splice(currentIndex, 1);
        }

        setChecked(newChecked);
    };
    const [activeStep, setActiveStep] = React.useState(0);
    const steps = getSteps();

    const handleNext = () => {
        if (activeStep === steps.length - 1) {
            let vals = Object.values(senddata)
            if (Object.values(vals[0]).length > 0 && Object.values(vals[0]).some(a => String(a).replace(/\s/g, "") == "")) return setError('რესტორნის აღწერა')
            if (vals[2].length == 0) return setError("სურათების ლინკები")
            for (let k of vals.slice(3)) {
                if (k.length == 0) return setError("დამატებითი ინფორმაცია")
            }
            if (Object.keys(vals[1]).length == 0) return setError("დამატებითი ინფორმაცია")
            if (!Object.values(vals[1]).some(a => a['24'] == true || (a['დან'] && a['მდე']))) return setError("დამატებითი ინფორმაცია")


            setSenddata({ ...senddata })

            // data.map(a => a.about.id-- ==)

            data.map(a => a.about.id == chosenRestaurant ? senddata : a)
            setData([...data])

            firebase.auth().onAuthStateChanged(function (user) {
                if (user) {
                    firebase.firestore().collection('data').doc(user.email).update({ restaurants: data }).then(() => {
                        props.history.push("profile")
                    })
                }
            });


        }
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
        if (activeStep === steps.length - 1) {
            let data = { senddata }
        }
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleReset = () => {
        setActiveStep(0);
    };

    const addImg = () => {
        if (!imgName) return
        senddata.imgArray.push(imgName)
        setSenddata({ ...senddata })
        setImgName("")
    }

    const handleChange = e => {
        switch (e.target.name) {
            case "imgName":
                setImgName(e.target.value)
                break;

            default:
                break;
        }
    }

    const removeImg = a => {
        senddata.imgArray.splice(a, 1)
        setSenddata({ ...senddata })
    }

    const avaible = a => {
        delete senddata.checkboxs[a]['დან']
        delete senddata.checkboxs[a]['მდე']
        senddata.checkboxs[a]['24'] = senddata.checkboxs[a]['24'] ? false : true
        setSenddata({ ...senddata })
    }

    const nums = '1234567890:'

    const changeChekcs = (a, b, c) => {
        if (senddata.checkboxs[a]['24'] || nums.indexOf(b.slice(-1)) == -1 || b > 24) return
        senddata.checkboxs[a]['24'] = false
        senddata.checkboxs[a][c] = b
        setSenddata({ ...senddata })
    }

    const changeGeneral = a => {
        if (senddata.info.includes(a)) senddata.info = senddata.info.filter(b => b != a)
        else { senddata.info.push(a) }
        setSenddata({ ...senddata })
    }

    const changeKitchen = a => {
        if (senddata.kitchen.includes(a)) senddata.kitchen = senddata.kitchen.filter(b => b != a)
        else { senddata.kitchen.push(a) }
        setSenddata({ ...senddata })
    }

    const changePayment = a => {
        if (senddata.payment.includes(a)) senddata.payment = senddata.payment.filter(b => b != a)
        else { senddata.payment.push(a) }
        setSenddata({ ...senddata })
    }

    const changeSitspace = a => {
        if (senddata.sitspace.includes(a)) senddata.sitspace = senddata.sitspace.filter(b => b != a)
        else { senddata.sitspace.push(a) }
        setSenddata({ ...senddata })
    }

    const changeAbout = (a, b) => {
        senddata.about[b] = a
        setSenddata({ ...senddata })
    }

    const changeRestaurant = a => {
        setChosenRestaurant(a)
        setSenddata(data.find(b => b.about.id == a))
        setChecked(Object.keys(data.find(b => b.about.id == a).checkboxs))
    }

    const deleteRestaurant = () => {
        firebase.firestore().collection('data').doc(mail).set({ restaurants: data.filter(a => a.about.id != chosenRestaurant) }).then(a => {
            props.history.push('/editrestaurantt')
            props.history.push('/editrestaurant')
        })
    }

    function getStepContent(step) {
        switch (step) {
            case 0:
                return (<Grid container justify="center" alignItems="center" spacing={5} style={{ 'marginBottom': 30, 'marginTop': 30 }}>
                    <Grid item md={6} sm={8} xs={12}>
                        <label className={classes.label} for="name">რესტორნის სახელი</label>
                        <input id="name" className={classes.testinput} value={senddata.about.name ? senddata.about.name : ""} name="name" onChange={e => changeAbout(e.target.value, e.target.name)} />
                        <label className={classes.label} for="mainimg">მთავარი ფოტო</label>
                        <input id="mainimg" className={classes.testinput} value={senddata.about.mainimg ? senddata.about.mainimg : ""} name="mainimg" onChange={e => changeAbout(e.target.value, e.target.name)} />
                        <label className={classes.label} for="about">რესტორნის შესახებ</label>
                        <textarea id="about" className={classes.testinput} rows="5" value={senddata.about.info ? senddata.about.info : ""} name="info" onChange={e => changeAbout(e.target.value, e.target.name)}></textarea>
                        <label className={classes.label} for="backimg">უკანა ფონის ფოტო</label>
                        <input id="backimg" className={classes.testinput} value={senddata.about.backimg ? senddata.about.backimg : ""} name="backimg" onChange={e => changeAbout(e.target.value, e.target.name)} />
                        <label className={classes.label} for="city">ქალაქის სახელი</label>
                        <FormControl variant="outlined" style={{ width: '100%' }}>
                            <Select
                                labelId="demo-simple-select-outlined-label"
                                id="demo-simple-select-outlined"
                                value={senddata.about.city}
                                onChange={e => changeAbout(e.target.value, 'city')} className={classes.testinput}
                                variant="standard"
                            >
                                {infos.city.map(a => {
                                    return (<MenuItem value={a}>{a}</MenuItem>)

                                })}
                            </Select>
                        </FormControl>
                        <label className={classes.label} for="address">მისამართი</label>
                        <input id="address" className={classes.testinput} value={senddata.about.address ? senddata.about.address : ""} name="address" onChange={e => changeAbout(e.target.value, e.target.name)} />
                        <label className={classes.label} for="phone">ტელეფონი</label>
                        <input id="phone" className={classes.testinput} value={senddata.about.phone ? senddata.about.phone : ""} name="phone" onChange={e => changeAbout(e.target.value, e.target.name)} />
                    </Grid>
                </Grid>);
            case 1:
                return (
                    <div className={senddata.imgArray.length == 0 ? classes.centerdiv : classes.uploaddiv}>
                        {
                            senddata.imgArray.length == 0 ? (<button type="button" onClick={handleOpen} className={classes.upload}>
                                <CloudUploadIcon style={{ "fontSize": 86 }} />
                                <br />
                            ატვირთვა
                            </button>) : (<Grid container spacing={3}>
                                {senddata.imgArray.map((a, b) => {
                                    return (
                                        <Grid item key={b} xs={4} sm={3} style={{ position: 'relative' }}>

                                            <Button onClick={() => removeImg(b)} variant="contained" color="secondary" style={{ position: 'absolute', minWidth: 'auto', padding: 3, backgroundColor: '#f7333c', borderRadius: '0 0 0 4px', right: 12 }}>
                                                <ClearIcon className="remove" />
                                            </Button>
                                            <img src={a} style={{ width: '100%', height: 150, objectFit: 'cover' }} />
                                        </Grid>
                                    )
                                })
                                }
                                <Grid item xs={4} sm={3} className={classes.divflex}>
                                    <div style={{ backgroundColor: '#fafafa', width: '100%', height: '100%', borderRadius: '5px', display: 'flex', justifyContent: 'center' }}>
                                        <button type="button" onClick={handleOpen} className={classes.upload}>
                                            <CloudUploadIcon style={{ "fontSize": 35 }} className={classes.onhovercloud} />
                                            <br />
                                            ატვირთვა
                                        </button>
                                    </div>

                                </Grid>

                            </Grid>)
                        }
                        <Modal
                            aria-labelledby="transition-modal-title"
                            aria-describedby="transition-modal-description"
                            className={classes.modal}
                            open={open}
                            onClose={handleClose}
                            closeAfterTransition
                            BackdropComponent={Backdrop}
                            BackdropProps={{
                                timeout: 500,
                            }}
                        >
                            <Fade in={open}>
                                <div className={classes.paper}>
                                    <label>სურათის ლინკი</label>
                                    <input name="imgName" className={classes.testinput} value={imgName} onChange={handleChange} />
                                    <Button variant="contained" style={{ margin: '13px auto -9px', display: 'block' }} onClick={addImg}>
                                        <AddIcon />
                                    </Button>

                                </div>
                            </Fade>
                        </Modal>
                    </div>
                );
            case 2:
                return (
                    <>
                        <div className="nolabelmargin">
                            <Grid container spacing={3}>
                                <Grid item md={6}>
                                    <Typography>სამუშაო საათები</Typography>
                                    <List dense className={classes.root}>
                                        {['ორშაბათი', 'სამშაბათი', 'ოთხშაბათი', 'ხუთშაბათი', 'პარასკევი', 'შაბათი', 'კვირა'].map((value, b) => {
                                            const labelId = `checkbox-list-secondary-label-${value}`;
                                            return (
                                                <ListItem key={value} button>

                                                    <Grid container spacing={1} justify="center">
                                                        <Grid item md={5} style={{ display: 'flex', alignItems: 'center' }}>
                                                            <Checkbox
                                                                edge="end"
                                                                onChange={handleToggle(value)}
                                                                checked={checked.indexOf(value) !== -1}
                                                                inputProps={{ 'aria-labelledby': labelId }}
                                                            />
                                                            <ListItemText style={{ 'marginLeft': 10, 'marginTop': 7 }} id={labelId} primary={value} />
                                                        </Grid>
                                                        <Grid item md={3} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                                            <Checkbox
                                                                edge="end"
                                                                name={value}
                                                                checked={senddata.checkboxs ? senddata.checkboxs[value] ? senddata.checkboxs[value]['24'] : false : false}
                                                                disabled={checked.indexOf(value) == -1}
                                                                onChange={e => avaible(e.target.name)}
                                                            /><p style={{ marginTop: 4, marginBottom: 0, marginLeft: 5 }}>24საათი</p>
                                                        </Grid>
                                                        <Grid item md={2} style={{ display: 'flex' }}>
                                                            <Input disabled={checked.indexOf(value) == -1} value={senddata.checkboxs ? senddata.checkboxs[value] && senddata.checkboxs[value]['24'] == false ? senddata.checkboxs[value]['დან'] : "" : ''} name={value} placeholder="დან" onChange={e => changeChekcs(e.target.name, e.target.value, 'დან')} className={classes.smallinput} />
                                                        </Grid>
                                                        <Grid item md={2} style={{ display: 'flex' }}>
                                                            <Input disabled={checked.indexOf(value) == -1} value={senddata.checkboxs ? senddata.checkboxs[value] && senddata.checkboxs[value]['24'] == false ? senddata.checkboxs[value]['მდე'] : "" : ''} placeholder="მდე" className={classes.smallinput} name={value} onChange={e => changeChekcs(e.target.name, e.target.value, 'მდე')} />
                                                        </Grid>
                                                    </Grid>
                                                </ListItem>
                                            );
                                        })}
                                    </List>

                                </Grid>
                                <Grid item md={3} sm={4}>
                                    <Typography>სამზარეულო</Typography>
                                    <List dense className={classes.root}>
                                        {infos.kitchen.map(a => {
                                            return (
                                                <ListItem key={a} button>
                                                    <FormControlLabel
                                                        value="end"
                                                        control={<Checkbox checked={senddata.kitchen.includes(a) ? true : false} onChange={() => changeKitchen(a)} color="primary" />}
                                                        label={a}
                                                        labelPlacement="end"
                                                    />
                                                </ListItem>
                                            );
                                        })}
                                    </List>
                                </Grid>
                                <Grid item md={3} sm={4}>
                                    <Typography>ზოგადი ინფორმაცია</Typography>
                                    <List dense className={classes.root}>
                                        {infos.info.map(a => {
                                            return (
                                                <ListItem key={a} button>
                                                    <FormControlLabel
                                                        value="end"
                                                        control={<Checkbox checked={senddata.info.includes(a) ? true : false} onChange={() => changeGeneral(a)} color="primary" />}
                                                        label={a}
                                                        labelPlacement="end"
                                                    />
                                                </ListItem>
                                            );
                                        })}
                                    </List>
                                </Grid>
                                <Grid item md={3} sm={4}>
                                    <Typography>დასაჯდომი სივრცე</Typography>
                                    <List dense className={classes.root}>
                                        {infos.sitspace.map(a => {
                                            return (
                                                <ListItem key={a} button>
                                                    <FormControlLabel
                                                        value="end"
                                                        control={<Checkbox checked={senddata.sitspace.includes(a) ? true : false} onChange={() => changeSitspace(a)} color="primary" />}
                                                        label={a}
                                                        labelPlacement="end"
                                                    />
                                                </ListItem>
                                            );
                                        })}
                                    </List>
                                </Grid>
                                <Grid item md={3} sm={4}>
                                    <Typography>გადახდის მეთოდები</Typography>
                                    <List dense className={classes.root}>
                                        {infos.payment.map(a => {
                                            return (
                                                <ListItem key={a} button>
                                                    <FormControlLabel
                                                        value="end"
                                                        control={<Checkbox checked={senddata.payment.includes(a) ? true : false} onChange={() => changePayment(a)} color="primary" />}
                                                        label={a}
                                                        labelPlacement="end"
                                                    />
                                                </ListItem>
                                            );
                                        })}
                                    </List>
                                </Grid>
                            </Grid>
                        </div>
                    </>
                );
            default:
                return 'Unknown step';
        }
    }

    function getSteps() {
        return ['რესტორნის აღწერა', 'სურათების ლინკები', 'დამატებითი ინფორმაცია'];
    }


    return (
        <>
            {load ? (data.length == 0 ? <Grid container justify="center"><Typography>მონაცემები არ მოიძებნა, რესტორნის რედაქტირებამდე <Link to="addrestaurant">დაამატეთ რესტორანი</Link></Typography></Grid> :
                <>
                    <FormControl className={classes.formControl}>
                        <InputLabel id="demo-simple-select-label">აირჩიეთ რესტორანი</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={chosenRestaurant}
                            onChange={e => changeRestaurant(e.target.value)}
                        >
                            {data.map(a => (
                                <MenuItem value={a.about.id}>{a.about.name}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    {chosenRestaurant != "" && <div className={classes.rootb}>
                        <Stepper className="mystepper" activeStep={activeStep} orientation="vertical">
                            {steps.map((label, index) => (
                                <Step key={label}>
                                    <StepLabel ><p className={error == label && classes.error}>{label}</p></StepLabel>
                                    <StepContent>
                                        <Typography>{getStepContent(index)}</Typography>
                                        <div className={classes.actionsContainer}>
                                            <div>
                                                <Button
                                                    disabled={activeStep === 0}
                                                    onClick={handleBack}
                                                    className={classes.button}
                                                >
                                                    წინა
                                            </Button>
                                                <Button
                                                    variant="contained"
                                                    color="primary"
                                                    onClick={handleNext}
                                                    className={classes.button, classes.button2}
                                                >
                                                    {activeStep === steps.length - 1 ? 'დასრულება' : 'შემდეგი'}
                                                </Button>
                                                <Button
                                                    variant="contained"
                                                    color="secondary"
                                                    onClick={deleteRestaurant}

                                                >
                                                    მენიუს წაშლა
                                                </Button>
                                            </div>
                                        </div>
                                    </StepContent>
                                </Step>
                            ))}
                        </Stepper>
                    </div>}
                </>) : <Grid container justify="center"><Typography>მონაცემები იტვირთება</Typography></Grid>
            }

        </>
    )
}
