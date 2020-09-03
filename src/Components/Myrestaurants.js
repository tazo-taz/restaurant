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
        background: '#861818',
        borderRadius: '3px',
        fill: '#ff6f6f',
        width: '30px',
        height: '30px',
        padding: '3px',
        cursor: 'pointer',
    }
});

export default function Myrestaurants() {

    const firebase = require('firebase')

    const [load, setLoad] = React.useState(false)
    const [data, setData] = React.useState([])
    const [mail, setMail] = React.useState('')

    React.useEffect(() => {
        firebase.auth().onAuthStateChanged(function (user) {
            if (user) {
                // User is signed in.
                setMail(user.email)
                firebase.firestore().collection('data').doc(user.email).get().then(function (doc) {
                    setLoad(true)
                    setData(doc.data() ? doc.data().restaurants : [])
                })
            } else {
                window.location.href = "/authorisation"
            }
        })
    }, [])

    const deleteRestaurant = a => {
        if (!window.confirm('დარწმუნებული ხართ რომ ' + a.name + '-ს(ის) წაშლა გინდათ?')) return
        firebase.firestore().collection('data').doc(mail).set({ 'restaurants': data.filter(b => b.about.id != a.name) })
        setData(data.filter(b => b.about.id != a.name))
    }

    const classes = useStyles();

    return (

        <Grid container spacing={1}>{
            load ? (data.length != 0 ? (data.map((a, b) => {
                return (
                    <Grid item md={3} sm={4} key={b} style={{ display: 'inline-grid', justifyItems: 'center', width: '100%' }}>
                        <Card className={classes.root}>
                            <DeleteIcon className={classes.delete} onClick={() => deleteRestaurant(a.about)} />
                            <CardActionArea>
                                <CardMedia
                                    className={classes.media}
                                    image={a.about.mainimg}
                                    title="Contemplative Reptile"
                                />
                                <CardContent>
                                    <Typography gutterBottom variant="h5" component="h2">
                                        {a.about.name}
                                    </Typography>
                                    <Typography variant="body2" color="textSecondary" component="p">
                                        {a.about.info.slice(0, 155)}
                                    </Typography>
                                </CardContent>
                            </CardActionArea>
                            <CardActions style={{ marginTop: 'auto' }}>
                                <Link to={"/restaurant/" + a.about.id}><Button size="small" color="primary">
                                    მეტის ნახვა
            </Button>
                                </Link>
                            </CardActions>
                        </Card>
                    </Grid>
                )
            })) : <Typography>რესტორანი არ მოიძებნა</Typography>) : <Typography>მონაცემები იტვირთება</Typography>
        }
        </Grid>
    );
}
