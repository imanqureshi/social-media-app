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