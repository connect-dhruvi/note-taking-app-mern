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
  const [user, setUser] = useState({ username: "", password: "", role: "user", firstname: "", lastname: "", email: "" });
  //const [message,setMessage] = useState(null);
  let timerID = useRef(null);

  useEffect(() => {
    return () => {
      clearTimeout(timerID);
    }
  }, []);

  const onChange = e => {
    setUser({ ...user, [e.target.name]: e.target.value });
  }

  const resetForm = () => {
    setUser({ username: "", password: "", role: "", firstname: "", lastanem: "", email: "" });
  }

  const onSubmit = e => {
    e.preventDefault();
    AuthService.register(user).then(data => {
      var message  = data.msg;
      if(message)
        alert("Message: " + message);
     
      if(!message){
        console.log(data.errors[0].msg);
        var errorsMsg = data.errors[0].msg;
        alert("Errors: " + errorsMsg);
      }
  

      if(!errorsMsg)
        if(message===" Account has been created"){
          props.history.push('/Login');
          resetForm(); 
        }
    });
  }

  const goToLogin = e => {
    e.preventDefault();
    props.history.push('/Login');
  }

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

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Register
        </Typography>
        <form className={classes.form} onSubmit={onSubmit} >
          <TextField
            variant="outlined"
            margin="normal"
            required='True'
            fullWidth
            id="firstname"
            label="First Name"
            name="firstname"
            autoComplete="firstname"
            onChange={onChange}
            autoFocus
          />

          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="lastname"
            label="Last Name"
            name="lastname"
            autoComplete="lastname"
            onChange={onChange}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="username"
            label="User Name"
            name="username"
            autoComplete="username"
            onChange={onChange}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            onChange={onChange}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="email"
            label="Email"
            type="email"
            id="Email"
            autoComplete="current-password"
            onChange={onChange}
          />
          <Grid container>
            <Grid item>
              <Button color="primary" onClick={goToLogin}>Login here</Button>
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="secondary"
            className={classes.submit}>
            Sign Up!
          </Button>
        </form>
      </div>

    </Container>
  );
}


export default Register;