import { comments, posts } from "../config/mongoCollections.js";
import { ObjectId } from 'mongodb';
import * as userFunctions from "./users.js";
import * as postFunctions from "./posts.js";

export const create = async (postId, userId, text) => {
    if (!postId) { throw 'postId must be provided' }
    if (typeof postId !== 'string' || postId.trim().length === 0) { throw 'postId must be a non-empty string!' };
    if (!ObjectId.isValid(postId)) { throw 'postId must be a valid ObjectId!' };
    if (!userId) { throw 'userId must be provided' }
    if (typeof userId !== 'string' || userId.trim().length === 0) { throw 'userId must be a non-empty string!' };
    if (!ObjectId.isValid(userId)) { throw 'userId must be a valid ObjectId!' };
    userId = userId.trim();
    if (!text) { throw 'text must be provided' }
    if (typeof text !== 'string' || text.trim().length === 0) { throw 'text must be a non-empty string!' };
    let newComment = {
        originalPost: postId,
        owner: userId,
        text: text,
    };
    const commentCollection = await comments();
    const insertInfo = await commentCollection.insertOne(newComment);
    if (!insertInfo.acknowledged || !insertInfo.insertedId) {
        throw "Could not add comment";
    }
    const newId = insertInfo.insertedId.toString();
    const postCollection = await posts();
    const u = await postCollection.findOneAndUpdate({ _id: new ObjectId(postId) }, { $addToSet: { comments: newId } }, { returnDocument: 'after' });
    if (!u) { throw " IT DIDN'T WORK" };
    return get(newId);
}

export const get = async (id) => {
    if (!id) { throw 'id must exist!'; }
    if (typeof id !== 'string' || id.trim().length === 0) { throw 'id must be a non-empty string'; }
    id = id.trim();
    if (!ObjectId.isValid(id)) { throw 'id must be valid!'; }
    const commentsCollection = await comments();
    const comment = await commentsCollection.findOne({ _id: new ObjectId(id) });
    if (comment === null) { throw 'no comment with that id'; }
    comment._id = comment._id.toString();
    return comment;
};

// export const remove = async (id) => {
//     if (!id) { throw 'id must exist!'; }
//     if (typeof id !== 'string' || id.trim().length === 0) { throw 'id must be a non-empty string!'; }
//     id = id.trim();
//     if (!ObjectId.isValid(id)) { throw 'id must be valid!'; }
//     const commentCollection = await comments();
//     const commentTBD = await get(id); //comment to be deleted
//     const deleteInfo = await commentCollection.findOneAndDelete({
//         _id: new ObjectId(id)
//     });
//     if (deleteInfo.lastErrorObject.n === 0) { throw `Could not delete comment with id of ${id}`; }
//     //remove from users and posts, first user
//     let aUser = await userData.get(commentTBD.commentAuthor);
//     let newList = [];
//     let index = 0;
//     let list = aUser.comments;
//     list.forEach(comment => {
//         if (comment !== id) {
//             newList[index] = comment;
//             index += 1;
//         }
//     });
//     const insertInfo = userCollection.findOneAndUpdate(
//         { _id: commentTBD.commentAuthor },
//         { set: { comments: newList } },
//         { returnDocument: 'after' }
//     );
//     if (!insertInfo.acknowledged || !insertInfo.insertedId) {
//         throw 'Comment could not be added to user';
//     }
//     let aPost = await postData.get(commentTBD.commentPlace);
//     newList = [];
//     index = 0;
//     list = aPost.comments;
//     list.forEach(comment => {
//         if (comment !== id) {
//             newList[index] = comment;
//             index += 1;
//         }
//     });
//     const insertInfo2 = postCollection.findOneAndUpdate(
//         { _id: commentTBD.commentAuthor },
//         { set: { comments: newList } },
//         { returnDocument: 'after' }
//     );
//     if (!insertInfo2.acknowledged || !insertInfo2.insertedId) {
//         throw 'Comment could not be added to post';
//     }
//     return `${deleteInfo.value.name} has been successfully deleted!`;
// };

export const getOwner = async (id) => {
    let comment = await get(id);
    if (!comment) throw "Comment not found.";
    return userFunctions.get(comment.owner);
}

export const getOP = async (id) => {
    let comment = await get(id);
    if (!comment) throw "Comment not found.";
    return postFunctions.getPostById(comment.originalPost);
}

export default { get, create, getOwner, getOP };