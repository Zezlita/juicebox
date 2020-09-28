const express = require('express');
const tagsRouter = express.Router();
const {getPostsByTagName} = require('../db');


tagsRouter.use((req, res, next) =>{
    console.log("A request is being made to /tags");

    next();
});

tagsRouter.get('/:tagName/posts',async (req, res,next) => {
    try{
        const {tagName} = req.params;
        const allPosts = await getPostsByTagName(tagName);
        const getPostsTagName = allPosts.filter(post => {
            //if post is active
            if (post.active){
                return true;
            }
            //if it belongs to the current user
            if (req.user && post.author.id === req.user.id){
                return true;
            }
        });
            res.send ({
                getPostsTagName
        });
    } catch ({name,message}){
        next({name, message})
}
});

module.exports = tagsRouter;