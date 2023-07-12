import mongoose from 'mongoose';
import PostMessage from "../models/postMessage.js";

export const getPosts = async (req, res) => {
    try {
        //async action
        const postMessages = await PostMessage.find();
        console.log(postMessages);

        res.status(200).json(postMessages)
    } catch (error) {

        //posts not found  
        res.status(404).json({message: error.message})
    }
}

//logic for adding different posts
export const createPost = async (req, res) => {
    const post = req.body;
    const newPost = new PostMessage(post);

    try {
        await newPost.save()

        //indicates posted new post
        res.status(201).json(newPost);
    } catch (error) {

        //conflict error
        res.status(409).json( {message: error.message});
    }
}


export const updatePost = async(req, res) => {
    //extract id
    const { id: _id } = req.params;
    const post = req.body;
    if(!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send('No post with that id');

    const updatedPost = await PostMessage.findByIdAndUpdate(_id, {... post, _id}, {new: true});

    res.json(updatedPost);
}

export const deletePost = async(req, res) => {
    //extract id
    const { id } = req.params;
    //check if id is valid/exists
    if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('No post with that id');
    //find and remove id and delete post
    await PostMessage.findByIdAndRemove(id);

    res.json({message: 'Post Deleted'});
}

export const likePost = async(req, res) => {
    //extract id
    const { id } = req.params;
    //check if id is valid/exists
    if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('No post with that id');
    //find post
    const post = await PostMessage.findById(id);
    //update like count
    const updatedPost = await PostMessage.findByIdAndUpdate(id,{likeCount: post.likeCount + 1}, {new: true});

    res.json(updatedPost);

}