/* eslint-disable no-use-before-define */

import React, { useState } from 'react';
import Checkbox from '@material-ui/core/Checkbox';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import FastfoodIcon from '@material-ui/icons/Fastfood';
import DeleteIcon from "@material-ui/icons/Delete";
import AddIcon from '@material-ui/icons/Add';
import { Link } from 'react-router-dom'
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Dropdown from 'react-bootstrap/Dropdown'

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

const useStyles = makeStyles((theme) => ({
    center: {
        maxWidth: 500,
        margin: '0 auto',
        padding: 15,
        background: 'white',
        boxSizing: 'border-box',
        borderRadius: 5,
        boxShadow: '0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23)'
    },
    input: {
        width: '100%',
        marginBottom: 15
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: '100%',
    }
}));


export default function Editmenu() {

    const classes = useStyles();
    const [menu, setMenu] = useState({ name: '', img: '', restaurants: [], ingredients: [] })
    const [menus, setMenus] = useState([])
    const [ingname, setIngname] = useState('')
    const firebase = require('firebase')
    const [restaurants, setRestaurants] = useState([])
    const [allrest, setAllrest] = useState([])
    const [load, setLoad] = useState(false)
    const [mail, setMail] = useState('')
    const [added, setAdded] = useState(false)
    console.log(123)

    const Addingredient = (e) => {
        e.preventDefault()
        if (!ingname) return
        setMenu({ ...menu, ingredients: [...menu.ingredients, ingname.replace(/\s/g, " ")] })
        setIngname('')
    }

    const deleteIngredient = a => {
        setMenu({ ...menu, ingredients: [...menu.ingredients.filter((c, b) => b !== a)] })
    }

    const changeMenu = a => {
        let data = menus.find(b => b.id == a)
        setRestaurants(allrest.restaurants)
        console.log(allrest)
        console.log(data, 99)
        setMenu(data)
    }

    const changeHandler = (a, b) => {
        setMenu({ ...menu, [a]: b })
    }

    const add = () => {
        if (Object.values(menu).map(a => typeof a == 'string' ? a.replace(/\s/g, "") : a).some(a => a.length == 0)) return
        setMenus([...menus.filter(a => a.id != menu.id), menu])
        firebase.firestore().collection('foradddata').doc('menu').update({ 'menu': [...menus.filter(a => a.id != menu.id), menu] }).then(() => alert('მენიუ რედაქტირდა'))
    }

    const changeCheckbox = a => {
        if (menu.restaurants.includes(a)) setMenu({ ...menu, restaurants: menu.restaurants.filter(d => d != a) })
        else { setMenu({ ...menu, restaurants: [...menu.restaurants, a] }) }
    }

    const deleteMenu = () => {
        setMenus(menus.filter(a => a.id != menu.id))
        firebase.firestore().collection('foradddata').doc('menu').update({ 'menu': [...menus.filter(a => a.id != menu.id)] }).then(() => { alert('მენიუ წაიშალა'); setMenu({}) })
    }

    React.useEffect(() => {
        firebase.auth().onAuthStateChanged(function (user) {
            if (user) {
                setMail(user.email)
                firebase.firestore().collection("data").doc(user.email).get().then(function (data) {
                    setAllrest(data.data())
                    console.log(data.data())
                })
                firebase.firestore().collection('foradddata').doc('menu').get().then(function (doc) {
                    let data = doc.data() || []
                    console.log(data)
                    setMenus(data.menu)
                    setLoad(true)
                })
            } else {
                window.location.href = "/authorisation"
            }
        })
    }, [])

    return (<>
        {load ? (menus.length != 0 && menus.find(a => a.user == mail) ? <div className={classes.center}>
            <FormControl className={classes.formControl}>
                <InputLabel id="demo-simple-select-label">აირჩიეთ რესტორანი</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={menu.id}
                    onChange={e => changeMenu(e.target.value)}
                >
                    {menus.filter(a => a.user == mail).map((a, b) => {
                        return (
                            <MenuItem key={b} value={a.id}>{a.name}</MenuItem>
                        )
                    })}
                </Select>
            </FormControl>
            {menu.id && <>
                <TextField style={{ marginTop: 10 }} id="outlined-basic" label="მენიუს სახელი" name="name" variant="outlined" className={classes.input} value={menu.name} onChange={(e) => changeHandler(e.target.name, e.target.value)} />
                <TextField id="outlined-basic" label="მენიუს ფასი" name="price" variant="outlined" className={classes.input} value={menu.price ? menu.price + '' : ''} onChange={(e) => changeHandler(e.target.name, e.target.value)} />
                <TextField id="outlined-basic" label="ფოტოს ლინკი" name="img" variant="outlined" className={classes.input} value={menu.img} onChange={(e) => changeHandler(e.target.name, e.target.value)} />
                <Dropdown>
                    <Dropdown.Toggle variant="success" id="dropdown-basic">
                        რესტორნის არჩევა
  </Dropdown.Toggle>

                    <Dropdown.Menu>
                        {restaurants.map((a, b) => (
                            <><Dropdown.ItemText><input type='checkbox' id={b} checked={menu.restaurants.includes(a.about.id)} onChange={() => changeCheckbox(a.about.id)} /><label for={b}>{a.about.name}</label></Dropdown.ItemText><br /> </>
                        ))}
                    </Dropdown.Menu>
                </Dropdown>
                <form onSubmit={Addingredient} style={{ width: '100%', display: 'flex', justifyContent: 'space-between' }}>
                    <Grid container spacing={2}>
                        <Grid item xs={10}>
                            <TextField id="outlined-basic" label="ინგრედიენტის დასახელება" variant="outlined" className={classes.input} value={ingname} onChange={e => setIngname(e.target.value)} />
                        </Grid>
                        <Grid item xs={2}>
                            <Button variant="contained" color="secondary" type="submit" style={{ width: '100%', backgroundColor: '#2196f3' }} >
                                <AddIcon />
                            </Button>
                        </Grid>
                    </Grid>
                </form>
                <List>
                    {menu.ingredients.map((a, b) => (
                        <ListItem key={a}>
                            <ListItemAvatar>
                                <Avatar>
                                    <FastfoodIcon />
                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText primary={a} />
                            <ListItemSecondaryAction>
                                <IconButton edge="end" aria-label="delete" onClick={() => deleteIngredient(b)}>
                                    <DeleteIcon />
                                </IconButton>
                            </ListItemSecondaryAction>
                        </ListItem>

                    ))}
                </List>
                <div style={{ display: 'flex', justifyContent: 'space-around' }}>
                    <Button onClick={add} variant="contained" color="secondary" style={{ backgroundColor: '#2196f3' }}>
                        მენიუს რედაქტირება
</Button>
                    <Button onClick={deleteMenu} variant="contained" color="secondary" style={{}}>
                        მენიუს წაშლა
</Button>
                </div>
            </>
            }
        </div> : <Grid container justify="center"><Typography>მონაცემები არ მოიძებნა, მენიუს რედაქტირებამდე <Link to="addmenu">დაამატეთ მენიუ</Link></Typography></Grid>) : <Grid container justify="center"><Typography>მონაცემები იტვირთება</Typography></Grid>

        }</>
    );
}
