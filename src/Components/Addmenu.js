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
    }
}));


export default function Addmenu() {

    const classes = useStyles();
    const [menu, setMenu] = useState({ restaurants: [], ingredients: [] })
    const [ingname, setIngname] = useState('')
    const firebase = require('firebase')
    const [restaurants, setRestaurants] = useState([])
    const [load, setLoad] = useState(false)
    const [mail, setMail] = useState('')

    const Addingredient = (e) => {
        e.preventDefault()
        if (!ingname) return
        setMenu({ ...menu, ingredients: [...menu.ingredients, ingname.replace(/\s/g, " ")] })
        setIngname('')
    }

    const deleteIngredient = a => {
        setMenu({ ...menu, ingredients: [...menu.ingredients.filter((c, b) => b !== a)] })
    }

    const changeHandler = (a, b) => {
        setMenu({ ...menu, [a]: b })
    }

    const add = () => {
        if (Object.values(menu).map(a => typeof a == 'string' ? a.replace(/\s/g, "") : a).some(a => a.length == 0)) return
        console.log(menu)
        firebase.firestore().collection('foradddata').doc('menu').update({ 'menu': firebase.firestore.FieldValue.arrayUnion({ ...menu, id: Math.floor(Math.random() * 100000), user: mail }) }).then(() => alert('მენიუ დაემატა'))
        window.location.reload()
    }

    const changeCheckbox = (a, b, c) => {
        if (menu.restaurants.includes(a)) setMenu({ ...menu, restaurants: menu.restaurants.filter(d => d != a) })
        else { setMenu({ ...menu, restaurants: [...menu.restaurants, a] }) }
    }

    const mainChange = e => {
        let elements = ['DIV', 'svg']
        if (!elements.includes(e.target.parentElement.nodeName)) return
        let current = (e.target.parentElement.nodeName == "svg" ? e.target.parentElement.parentElement : e.target.parentElement).querySelector('span').innerText
        current = current.slice(current.lastIndexOf('(') + 1, current.lastIndexOf(')'))
        setMenu({ ...menu, restaurants: menu.restaurants.filter(a => a != current) })
    }

    React.useEffect(() => {
        firebase.auth().onAuthStateChanged(function (user) {
            if (user) {
                // User is signed in.
                setMail(user.email)
                firebase.firestore().collection('data').doc(user.email).get().then(function (doc) {
                    // setData(doc.data() ? doc.data().restaurants : [])
                    setLoad(true)
                    setRestaurants(doc.data() ? doc.data().restaurants.map(a => { return { name: a.about.name, id: a.about.id } }) : [])
                })
            } else {
                window.location.href = "/authorisation"
            }
        })
    }, [])

    return (
        load ? restaurants.length != 0 ? <div className={classes.center}>
            <Typography style={{ marginBottom: 10 }}>დაამატეთ მენიუ</Typography>
            <TextField id="outlined-basic" label="მენიუს სახელი" name="name" variant="outlined" className={classes.input} value={menu.name} onChange={(e) => changeHandler(e.target.name, e.target.value)} />
            <TextField id="outlined-basic" label="მენიუს ფასი" name="price" variant="outlined" className={classes.input} value={menu.price} onChange={(e) => changeHandler(e.target.name, e.target.value)} />
            <TextField id="outlined-basic" label="ფოტოს ლინკი" name="img" variant="outlined" className={classes.input} value={menu.img} onChange={(e) => changeHandler(e.target.name, e.target.value)} />
            <Dropdown>
                <Dropdown.Toggle variant="success" id="dropdown-basic">
                    რესტორნის არჩევა
  </Dropdown.Toggle>

                <Dropdown.Menu>
                    {restaurants.map((a, b) => (
                        <><Dropdown.ItemText><input type='checkbox' id={b} checked={menu.restaurants.includes(a.id)} onChange={() => changeCheckbox(a.id)} /><label for={b}>{a.name}</label></Dropdown.ItemText><br /> </>
                    ))}
                </Dropdown.Menu>
            </Dropdown>
            <form onSubmit={Addingredient} style={{ width: '100%', display: 'flex', justifyContent: 'space-between' }}>
                <Grid container spacing={2}>
                    <Grid item xs={10}>
                        <TextField id="outlined-basic" label="ინგრედიენტის დასახელება" variant="outlined" className={classes.input} value={ingname} onChange={e => setIngname(e.target.value)} />
                    </Grid>
                    <Grid item xs={2}>
                        <Button variant="contained" color="secondary" type="submit" style={{ width: '100%', backgroundColor: '#2196f3' }}>
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
            <Button onClick={add} variant="contained" color="secondary" style={{ margin: '0 auto', display: 'block' }}>
                მენიუს დამატება
</Button>
        </div> : <Grid container justify="center"><Typography>მონაცემები არ მოიძებნა, მენიუს დასამატებლად <Link to="addrestaurant">დაამატეთ რესტორანი</Link></Typography></Grid>
            : <Grid container justify="center"><Typography>მონაცემები იტვირთება</Typography></Grid>
    );
}
