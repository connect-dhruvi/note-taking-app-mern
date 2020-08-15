import React, { useState , useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import { red } from '@material-ui/core/colors';

import NotesService from '../services/NotesService';
import Typography from '@material-ui/core/Typography';
import DeleteIcon from '@material-ui/icons/Delete';
import Snackbar from '@material-ui/core/Snackbar';
import TextField from '@material-ui/core/TextField';
import MuiAlert from '@material-ui/lab/Alert';
import moment from 'moment';
import UnarchiveIcon from '@material-ui/icons/Unarchive';

export default function MapNotes(props) {

  const [newNote, setNewNote] = useState({});
  const [notes, setNotes] = useState([]);
  const [open, setOpen] = React.useState(false);
  const [message, setMessage] = useState([]);
  const [checked, setChecked] = React.useState(true);

  useEffect(() => {
    NotesService.getArchieveNotes().then(d => {
      setNotes(d.notes);
    })
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
      backgroundColor: '#99DDFF',
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
      fontSize: 12
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


  const handleToastClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };


  const deleteNote = (id) => {
    NotesService.updateTrashNotes({ id, trash: true }).then(data => {
      window.location.reload(false);
      console.log(data.msg + "from line 39");
      setMessage({ ...message, message: data.msg });
    });
   setOpen(true);
  };


  const unArchiveNote = (id) => {
    NotesService.updateArchieveNotes({ id, archieve: false }).then(data => {
      window.location.reload(false);
      console.log(data.msg + "from line 39");
      setMessage({ ...message, message: data.msg });
    });
   setOpen(true);
  };



  return (
    <Grid container spacing={4} xs={12}>
      {notes.length == 0 ? <h1> You dont have any Archieves.</h1> : notes.map(note => (
        <Grid item xs={12} md={6} lg={4}>
          <Card className={classes.notecard} >
            <CardContent>
              <TextField
                label="Note"
                multiline
                fullWidth
                rows={4}
                id="text"
                name="text"
                defaultValue={note.text}
                variant="outlined"
              />
              <Typography className={classes.typography} color="textSecondary">
                Updated At:{moment(note.updatedAt).format('MM-DD-YYYY HH:MM')}
              </Typography>
              <Typography className={classes.typography} color="textSecondary">
                Created At:{moment(note.createdAt).format('MM-DD-YYYY HH:MM')}
              </Typography>
            </CardContent>
            <CardActions>
              <div>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            </div>
              <Button> <UnarchiveIcon onClick={() => unArchiveNote(note._id)}></UnarchiveIcon> </Button>
              <Button size="small" align="right"><DeleteIcon onClick={() => deleteNote(note._id, note.text)} /> </Button>
            </CardActions>
          </Card>
          <Snackbar open={open} autoHideDuration={12000} onClose={handleToastClose}>
            <Alert onClose={handleToastClose} severity="success">
              Done Successfully  {message}
            </Alert>
          </Snackbar>
        </Grid>
      ))}
    </Grid>
  );
}


