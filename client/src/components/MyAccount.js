import React, { useState, useContext, useRef, useEffect } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Grid from '@material-ui/core/Grid';
import Link from '@material-ui/core/Link';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import AuthService from '../services/AuthService';

const Register = props => {
  const [user, setUser] = useState({ username: "", role: "user", firstname: "", lastname: "", email: "", _id: "" });
  //const [user, setUser] = useState([]);


  useEffect(() => {


    AuthService.isAuthenticated().then(data => {

      console.log(data.user.username + " from const");
      // setUser({...user , username : data.user.username , firstname : data.user.firstname , lastname: data.user.lastname , email : data.user.email });
      setUser(data.user);
      console.log(data.user);

    });

  }, []);


  const useStyles = makeStyles((theme) => ({
    paper: {
      marginTop: theme.spacing(8),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    avatar: {
      margin: theme.spacing(1),
      backgroundColor: theme.palette.secondary.main,
    },
    form: {
      width: '100%',
      marginTop: theme.spacing(1),
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
    },
  }));

  const classes = useStyles();

  const onChange = e => {
    setUser({ ...user, [e.target.name]: e.target.value });
  }

  const onSubmit = e => {
    e.preventDefault();
    AuthService.updateUser(user).then(data => {
      const { message } = data;
      

    });
  }


  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>

        <Avatar aria-label="recipe" className={classes.avatar}>
          {user.firstname.substring(0, 1)}
        </Avatar>
        <Typography variant="h5">
          You have {user.notes} Notes
        </Typography>
        <form className={classes.form} onSubmit={onSubmit}>
          <TextField
            margin="normal"
            fullWidth
            id="firstname"
            name="firstname"
            onChange={onChange}
            value={user.firstname}
            variant="outlined"
            label="Firstname"
          />
          <TextField
            fullWidth
            id="lastname"
            name="lastname"
            onChange={onChange}
            value={user.lastname}
            variant="outlined"
            margin="normal"
            label="Lastname"            
          />
          <TextField
            fullWidth
            id="username"
            name="username"
            onChange={onChange}
            value={user.username}
            variant="outlined"
            margin="normal"
            label="Username"
          />
          <TextField
            fullWidth
            id="email"
            name="email"
            onChange={onChange}
            value={user.email}
            variant="outlined"
            margin="normal"
            label ="Email"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="secondary"
            className={classes.submit}>
            Update
        </Button>
        </form>
      </div>

    </Container>
  );
}


export default Register;