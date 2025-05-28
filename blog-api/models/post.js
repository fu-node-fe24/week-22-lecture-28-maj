import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const postSchema = new Schema({
    title : {
        type : String,
        required : true,
        maxlength : 15
    }, 
    text : {
        type : String,
        required : true,
        minlength : 15
    },
    postId : {
        type : String,
        required : true,
        unique : true
    }, 
    userId : {
        type : String,
        required : true
    }
}, { timestamps : true });

const Post = mongoose.model('Post', postSchema);

export default Post;