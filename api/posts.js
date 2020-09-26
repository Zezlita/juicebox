const express = require('express');
const postsRouter = express.Router();
const {getAllPosts, createPost} = require('../db');
const {requireUser} = require('./utils');

postsRouter.use((req, res, next) =>{
    console.log("A request is being made to /posts");

    next();
})

postsRouter.get('/',async (req, res) =>{
    const posts = await getAllPosts();

    res.send({
        posts
    });
})

postsRouter.post('/', requireUser, async (req, res, next) => {
    const {title, content, tags =" "} = req.body;
    const tagArr = tags.trim().split(/\s+/);
    console.log ("user", req.user)
    const postData = {};
    if (tagArr.length){
        postData.tags = tagArr;
    }
    try {
        const authorId = req.user.id;
        const postData = {authorId, title, content, tags};
        const post = await createPost(postData);
        if (post) {
            res.send({post});
        } else {
            next();
        }
    } catch ({name, message}) {
        next ({name, message});
    }
    //res.send({message:'under construction'});

});

module.exports = postsRouter;