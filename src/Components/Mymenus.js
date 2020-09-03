import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid'
import { Link } from 'react-router-dom';
import DeleteIcon from '@material-ui/icons/Delete';

const useStyles = makeStyles({
    root: {
        maxWidth: 345,
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        marginTop: 20,
        width: '100%'

    },
    media: {
        height: 180,
    },
    delete: {
        right: 0,
        zIndex: 2,
        position: 'absolute',
        background: '#f32121',
        borderRadius: '3px',
        fill: 'white',
        width: '30px',
        height: '30px',
        padding: '3px',
        cursor: 'pointer',
        boxShadow: '0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23)',
        minWidth: 38,
        textAlign: 'center'
    },
    price: {
        left: 0,
        zIndex: 2,
        position: 'absolute',
        background: '#2196f3',
        borderRadius: '3px',
        color: 'white',
        height: '30px',
        padding: '3px 7px',
        boxShadow: '0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23)',
        textAlign: 'center',
    },
    name: {
        marginBottom: 0,
        color: 'red',
        textAlign: 'center',
        fontWeight: 'bold',
        color: '#545454'
    }
});

export default function Mymenus() {

    const firebase = require('firebase')

    const [load, setLoad] = React.useState(false)
    const [data, setData] = React.useState([])
    const [mail, setMail] = React.useState('')

    React.useEffect(() => {
        firebase.auth().onAuthStateChanged(function (user) {
            if (user) {
                // User is signed in.
                setMail(user.email)
                firebase.firestore().collection('foradddata').doc('menu').get().then(function (doc) {
                    setLoad(true)
                    console.log(doc.data())
                    setData(doc.data().menu)
                })
            } else {
                window.location.href = "/authorisation"
            }
        })
    }, [])

    const deleteMenu = a => {
        if (!window.confirm('დარწმუნებული ხართ რომ ' + a.name + '-ს(ის) წაშლა გინდათ?')) return
        firebase.firestore().collection('foradddata').doc('menu').set({ 'menu': data.filter(b => b.id != a.id) })
        setData(data.filter(b => b.id != a.id))
    }

    const classes = useStyles();

    return (

        <Grid container spacing={1}>{
            load ? (data.filter(a => a.user == mail).length != 0 ? (data.map((a, b) => {
                return (

                    <>{a.user == mail && <Grid item md={3} sm={4} key={b} style={{ display: 'inline-grid', justifyItems: 'center', width: '100%' }}>
                        <Card className={classes.root}>
                            <DeleteIcon className={classes.delete} onClick={() => deleteMenu(a)} />
                            <span className={classes.price}>{a.price}</span>
                            <Link to={"/menu/" + a.id}>
                                <CardActionArea>
                                    <CardMedia
                                        className={classes.media}
                                        image={a.img}
                                        title="Contemplative Reptile"
                                    />
                                    <CardContent>
                                        <Typography gutterBottom variant="h5" component="h2" className={classes.name}>
                                            {a.name}
                                        </Typography>
                                    </CardContent>
                                </CardActionArea>
                            </Link>
                        </Card>
                    </Grid>}</>

                )
            })) : <Typography>მენიუ არ მოიძებნა</Typography>) : <Typography>მონაცემები იტვირთება</Typography>
        }
        </Grid >
    );
}
