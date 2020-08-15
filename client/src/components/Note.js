import React, { useState, useContext, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import { red } from '@material-ui/core/colors';
import ArchiveIcon from '@material-ui/icons/Archive';

import NotesService from '../services/NotesService';
import SaveIcon from '@material-ui/icons/Save';
import Typography from '@material-ui/core/Typography';
import DeleteIcon from '@material-ui/icons/Delete';
import AuthService from '../services/AuthService';
import Snackbar from '@material-ui/core/Snackbar';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import MuiAlert from '@material-ui/lab/Alert';
import { colors } from '@material-ui/core';
import Checkbox from '@material-ui/core/Checkbox';
import moment from 'moment';

export default function PrintNote(note) {

    const [open, setOpen] = React.useState(false);
    const [deleteOpen, setDeleteOpen] = React.useState(false);
    const [priorityOpen, setPriorityOpen] = React.useState(false);
    const [message, setMessage] = useState([]);
    const [text, setText] = useState(note.props.text);
    const [isPriority, setIsPriority] = useState(note.props.isPriority);

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
        setRight: {
            float: 'right'
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

    const handleDeleteToastClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setDeleteOpen(false);
    };

    const handlePriorityToastClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setPriorityOpen(false);
    };

    const updateNote = () => {
        setOpen(true);
        const id = note.props._id;
        NotesService.updateNotes({ id, text, isPriority }).then(d => {
            setMessage({...message, message: d.message});
            console.log(d + "from line 175");
            window.location.reload(false);
        })
        setOpen(true);
    }

    const deleteNote = () => {
        const id = note.props._id;
        NotesService.updateTrashNotes({ id, trash: true }).then(data => {
            window.location.reload(false);
            setMessage({ ...message, message: data.msg });
        });
        setDeleteOpen(true);
    };

    const archieveNote = () => {
        const id = note.props._id;
        NotesService.updateArchieveNotes({ id, archieve: true }).then(data => {
            window.location.reload(false);
            setMessage({ ...message, message: data.msg });
        });
        
          if(isPriority)  setPriorityOpen(true);

    };

    const handleNoteChange = (event) => {
        setText(event.target.value);
    }

    const handleCheckChange = (event) => {
        setIsPriority(event.target.checked);
    };

    return (
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
                        onChange={handleNoteChange}
                        defaultValue={note.props.text}
                        variant="outlined"
                    />
                    <Typography className={classes.typography} color="textSecondary">
                        Updated At:{moment(note.props.updatedAt).format('MM-DD-YYYY HH:MM')}
                    </Typography>
                    <Typography className={classes.typography} color="textSecondary">
                        Created At:{moment(note.props.createdAt).format('MM-DD-YYYY HH:MM')}
                    </Typography>
                    <Checkbox
                        defaultChecked={note.props.isPriority}
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
                        onClick={updateNote}>
                        Save
                </Button>
                    <Button size="small" align="left" className={classes.setRight}><DeleteIcon onClick={deleteNote} /> </Button>
                    <Button size="small" align="right" className={classes.setRight}> <ArchiveIcon onClick={archieveNote}></ArchiveIcon></Button>
                </CardActions>
            </Card>
            <Snackbar open={open} autoHideDuration={12000} onClose={handleToastClose}>
                <Alert onClose={handleToastClose} variant="filled" severity="success">
                    Note Has Been Saved
                </Alert>
            </Snackbar>
            <Snackbar open={deleteOpen} autoHideDuration={12000} onClose={handleDeleteToastClose}>
                <Alert onClose={handleDeleteToastClose} variant="filled" severity="success">
                    Note Has Been Deleted 
                </Alert>
            </Snackbar>
            <Snackbar open={priorityOpen} autoHideDuration={12000} onClose={handlePriorityToastClose}>
                <Alert onClose={handlePriorityToastClose} variant="filled" severity="warning">
                    Note Priority Has Been Removed. 
                </Alert>
            </Snackbar>
        </Grid>
    )
}