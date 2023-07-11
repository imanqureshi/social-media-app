import React, { useState } from 'react';
import { TextField, Button, Typography, Paper } from '@material-ui/core';
import useStyles from './styles.js';
import FileBase from 'react-file-base64';
import { useDispatch } from 'react-redux';
import { createPost } from '../../actions/posts.js';

const Form = () => {
    const classes = useStyles();
    const [postData, setPostData] = useState({
        creator: '', title: '', message: '', tags: '', selectedFile: ''
    });
    const dispatch = useDispatch();
    const handleSubmit = (e) => {
        try {
            e.preventDefault();    //avoids browser refresh
            dispatch(createPost(postData)); //sends post request with all user data
        } catch (error) {
            console.log(error.message);
        }
    }
    const clear = () => {

    }
  return (
    <Paper className={classes.paper}>
        <form autoComplete="off" noValidate className={`${classes.root} ${classes.form}`} onSubmit={handleSubmit}>
            <Typography variant="h6">Creating a Memory</Typography>
            <TextField name="creator" variant="outlined" label="Creator" fullWidth
                //all data from post is stored in postData object 
                value={postData.creator}
                //set state using object 
                //...postData allows only specific text field to be changed 
                onChange={(e) => setPostData({ ...postData, creator : e.target.value })}
            />
            <TextField name="title" variant="outlined" label="Title" fullWidth value={postData.title} onChange={(e) => setPostData({ ...postData, title : e.target.value })}/>
            <TextField name="message" variant="outlined" label="Message" fullWidth value={postData.message} onChange={(e) => setPostData({ ...postData, message : e.target.value })}/>
            <TextField name="tags" variant="outlined" label="Tags" fullWidth value={postData.tags} onChange={(e) => setPostData({ ...postData, tags : e.target.value })}/>
            <div className={classes.fileInput}>
                <FileBase
                type="file"
                multiple={false}
                onDone={({base64}) => setPostData({ ...postData, selectedFile: base64 })}
                />
            </div>
            <Button className={classes.buttonSubmit} variant="contained" style={{backgroundColor: '#4FB477', color: 'white'}} size="large" type="submit" fullWidth>Submit</Button>
            <Button variant="contained" style={{backgroundColor: '#E4DFDA', color: '#69A197'}}  size="small" onClick={clear} fullWidth>Clear</Button>
        </form>
    </Paper>
  );
}

export default Form;