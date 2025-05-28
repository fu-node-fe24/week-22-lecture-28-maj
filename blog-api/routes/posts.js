import { Router } from 'express';
import { v4 as uuid } from 'uuid';
import { authorizeKey, authorizeUser } from '../middlewares/authorize.js';
import { createNewBlogPost, deletePost, getAllPosts, getPostsByUserId, updatePost } from '../services/posts.js';

const router = Router();

// Middlewares
router.use(authorizeKey);

// GET all posts
router.get('/', async (req, res, next) => {
    const posts = await getAllPosts();
    if(posts) {
        res.json({
            success : true,
            posts : posts
        });
    } else {
        next({
            status : 404,
            message : 'No posts found!'
        });
    }
});

// GET all posts by userID
router.get('/:userId', async (req, res, next) => {
    const { userId } = req.params;
    const posts = await getPostsByUserId(userId);
    if(posts) {
        res.json({
            success : true,
            posts : posts
        });
    } else {
        next({
            status : 404,
            message : 'No posts found!'
        });
    }
});

// POST new post
router.post('/', authorizeUser, async (req, res, next) => {
    const { title, text } = req.body;
    if(title && text) {
        const result = await createNewBlogPost({
            title : title,
            text : text,
            postId : uuid().substring(0, 5),
            userId : global.user.userId
        });
        if(result) {
            res.status(201).json({
                success : true,
                message : 'New post created successfully'
            });
        } else {
            next({
                status : 400,
                message : 'New post could not be created'
            });
        }
    } else {
        next({
            status : 400,
            message : 'Both title and text are required'
        });
    }
});

// PUT post by postID
router.put('/:postId', authorizeUser ,async (req, res) => {
    const { postId } = req.params;
    const { title, text } = req.body;
    if(title && text) {
        const result = await updatePost(postId, {
            title : title,
            text : text,
            postId : uuid().substring(0, 5),
            userId : global.user.userId
        });
        if(result) {
            res.status(201).json({
                success : true,
                message : 'Post updated successfully'
            });
        } else {
            next({
                status : 400,
                message : 'Post could not be updated'
            });
        }
    } else {
        next({
            status : 400,
            message : 'Both title and text are required'
        });
    }
});

// DELETE post by postID
router.delete('/:postId', authorizeUser, async (req, res) => {
    const { postId } = req.params;
    const result = await deletePost(postId);
    if(result) {
        res.json({
            success : true,
            message : 'Post deleted successfully'
        });
    } else {
        next({
            status : 400,
            message : 'Could not delete post'
        });
    }
});

export default router;