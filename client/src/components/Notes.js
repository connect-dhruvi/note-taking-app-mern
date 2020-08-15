import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import { red } from '@material-ui/core/colors';
import NotesService from '../services/NotesService';
import AuthService from '../services/AuthService';
import Snackbar from '@material-ui/core/Snackbar';
import TextField from '@material-ui/core/TextField';
import MuiAlert from '@material-ui/lab/Alert';
import { colors } from '@material-ui/core';
import Checkbox from '@material-ui/core/Checkbox';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import moment from 'moment';
import Note from './Note';
import SaveIcon from '@material-ui/icons/Save';



export default function NoteCard(props) {
  const [user, setUser] = useState("null");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [newNote, setNewNote] = useState({});
  const [updtNote, setUpdtNote] = useState(" ");
  const [notes, setNotes] = useState([]);
  const [item, setItem] = useState([]);
  const [open, setOpen] = React.useState(false);
  const [message, setMessage] = useState([]);
  const [checked, setChecked] = React.useState(true);
  // const [archieve, setArchieve] = React.useState(false);

  const handleCheckChange = (event) => {
    setChecked(event.target.checked);
  };

  useEffect(() => {

    AuthService.isAuthenticated().then(data => {
     
     
      if (data.user.username === "") {
        setUser(false);
        setIsAuthenticated(false);
      }
      else {
        setUser(true);
        setIsAuthenticated(true);
        NotesService.getNotes().then(d => {
          setNotes(d.notes);
          
        })
      }
    });
  }, []);

  function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }


  const useStyles = makeStyles({
    root: {
      minWidth: 275,
    },
    card: {
      backgroundColor: '#DAF7A6',
      margin: 10,
      borderRadius: 15
    },
    notecard: {
      backgroundColor: '#F7DC6F',
      margin: 10,
      borderRadius: 15
    },
    bullet: {
      display: 'inline-block',
      margin: '0 2px',
      transform: 'scale(0.8)',
    },
    title: {
      fontSize: 8,
    },
    typography: {
      fontSize: 24
    },
    pos: {
      marginBottom: 12,
    },
    avatar: {
      backgroundColor: red[500],
    },

    Button: {
      edge: 'end',
    },
    textField: {
      margin: 9,
      fontSize: 24
    },
    textarea: {
      width: '90%',
      fontFamily: 'sans-serif',
      marginLeft: 'auto',
      marginRight: 'auto',
      paddingBottom: 0,
      marginTop: 0,
      fontSize: 18,
      backgroundColor: '#DAF7A6',
      fontWeight: 500
    },
    textareanote: {
      width: '90%',
      fontFamily: 'sans-serif',
      marginLeft: 'auto',
      marginRight: 'auto',
      paddingBottom: 0,
      marginTop: 0,
      fontSize: 18,
      backgroundColor: '#F7DC6F',
      fontWeight: 500
    },
    input: {
      color: 'white'
    },


    underline: {
      '&:before': {
        borderBottomColor: 'rgba(0, 188, 212, 0.7)',
      },
      '&:after': {
        borderBottomColor: 'rgba(0, 188, 212, 0.7)',
      },
      '&:hover:before': {
        borderBottomColor: ['rgba(0, 188, 212, 0.7)', '!important']
      },
    },
  });

  const classes = useStyles();
  const bull = <span className={classes.bullet}>•</span>;
 

  const handleToastClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  const handleAddNote = (event) => {
    setNewNote({ ...newNote, [event.target.name]: event.target.value, isPriority: checked });


  }
  const saveButtonNewNote = e => {
    NotesService.postNote(newNote).then(data => {
      const pack = data;
      console.log(pack);
      window.location.reload(false);
    })

    setOpen(true);

  }

  return (

    <Grid container spacing={4} xs={12}>
      <Card className={classes.card} spacing={9}>
        <CardContent>
          <h3> Add your Note:</h3>
          <TextField
            aria-label="maximum height"
            id="text"
            name="text"
            className={classes.textarea}
            onChange={handleAddNote}
            placeholder="Add Your Note Here"
            label="Note"
            multiline
            fullWidth
            variant="outlined"
            rows={4}
          />
          <Checkbox
            defaultChecked="false"
            id="isPriority"
            text="prioriy"
            name="isPriority"
            onChange={handleCheckChange}
            label="Priority"
            inputProps={{ 'aria-label': 'checkbox with default color' }}
          /> Priority


          </CardContent>
        <CardActions>
          <Button variant="contained"
            color="secondary"
            size="small"
            className={classes.button}
            startIcon={<SaveIcon />}
            onClick={saveButtonNewNote}>
            Add
                </Button>
        </CardActions>
      </Card>
      {notes.length == 0 ? <h1>  </h1> :
        notes.map(note => (
          <Note props={note}></Note>))
        //  
      }
      <Snackbar open={open} autoHideDuration={12000} onClose={handleToastClose}>
        <Alert onClose={handleToastClose} variant="filled" severity="success">
          Note Has Been Added
                </Alert>
      </Snackbar>
    </Grid>


  );

}

