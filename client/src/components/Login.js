import React,{useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import ForGotPassword from './ForGotPassword';
import AuthService from '../services/AuthService';

const Login = props=>{
 const [user,setUser] = useState({username: " ", password : " "});
 const [isAuthenticated,setIsAuthenticated] = useState(false);
 const [message,setMessage] = useState(null);// 


const onChange = event =>{
    setUser({...user,[event.target.name] : event.target.value});
};

const onSubmit = e =>{
    e.preventDefault();
    AuthService.login(user).then(data=>{
        console.log(data);
        const { isAuthenticated,user,message } = data;
        if(isAuthenticated){
            setUser(data.user);
            setIsAuthenticated(isAuthenticated);
            localStorage.setItem('Authorization', data.token);
            props.history.push('/Dashboard',[{user}]);
           window.location.reload(false);
        }
        else{
            alert("Invalid!");
        }
    });
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
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

  const goToRegister = e =>{
    props.history.push('/Register');
  };
  const goToForgotPassword = e =>{
    props.history.push('/ForGotPassword');
  };
  const classes = useStyles();

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form className={classes.form} onSubmit={onSubmit}>
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
            autoFocus
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
          
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="secondary"
            className={classes.submit}>
            Sign In
          </Button>
          <Grid container>
            <Grid item xs>
              <Button color="primary" onClick={goToForgotPassword}>Forgot password?</Button>
            </Grid>
            <Grid item>
              <Button color="primary" onClick={goToRegister}>Create account</Button>
            </Grid>
          </Grid>
        </form>
      </div>
      
    </Container>
  );
}


export default Login;