import Post from '../models/post.js';

export async function createNewBlogPost(post) {
    try {
        const result = await Post.create(post);
        return result;
    } catch(error) {
        console.log(error.message);
        return null;
    }
}

export async function getAllPosts() {
    try {
        const posts = await Post.find();
        return posts;
    } catch(error) {
        console.log(error.message);
        return null;
    }
}

export async function getPostsByUserId(userId) {
    try {
        const posts = await Post.find({ userId : userId})
        if(posts.length < 1) throw new Error('No posts found');
        else return posts;
    } catch(error) {
        console.log(error.message);
        return null;
    }
}

export async function updatePost(postId, newPost) {
    try {
        const result = await Post.findOneAndUpdate({ postId : postId }, newPost);
        return result;
    } catch(error) {
        console.log(error.message);
        return null;
    }
}

export async function deletePost(postId) {
    try {
        const result = await Post.findOneAndDelete({ postId : postId });
        return result;
    } catch(error) {
        console.log(error.message);
        return null;
    }
}