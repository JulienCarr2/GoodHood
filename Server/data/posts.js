import * as help from "../helpers.js"
import { users, comments, posts } from "../config/mongoCollections.js";
import { ObjectId } from "mongodb";
import * as userFunctions from "./users.js";
import * as fs from 'fs'
import path from 'path';
import { get } from "http";

export const create = async (
  owner,
  title,
  timestamp,
  latitude,
  longitude,
  image,
  donationGoal,
  volunteerInfo,
) => {
  //ERROR CHECKING
  //do they exist
  owner = idChecker(owner);
  console.log(latitude)
  if (timestamp === "") throw "please supply timestamp";
  if (latitude === undefined) throw "please supply latitude";
  if (longitude === undefined) throw "please supply longitude";
  if (image === "") throw "Please supply image";
  if (title === "") throw "Please supply title";
  if (donationGoal == "") throw "Please supply donation goal";
  if (volunteerInfo === "") throw "Please supply volunteer information";
  if (typeof latitude != 'number') throw "Latitude Must be int"
  if (typeof title != 'string') throw "title must be a string"
  if (typeof image != 'string') throw "image must be a string"
  if (typeof longitude != 'number') throw "Longitude must be an int";
  if (typeof volunteerInfo != 'string') throw "volunteerInfo must be a string";
  if (typeof donationGoal != 'number') throw " Donation Goal must be an int";
  if (title.trim() == "") throw "Title must not be an empty string";
  if (image.trim() == "") throw "You must insert an Image";
  if (volunteerInfo.trim() == "") throw "volunteer info must not be an empty string";
  //TODO fix this
  if (typeof timestamp != 'object') throw "timestamp must be an object"
  let newPost = {
    owner: new ObjectId(owner),
    title: title,
    timestamp: timestamp,
    latitude: latitude,
    longitude: longitude,
    image: image,
    comments: [],
    donationGoal: donationGoal,
    volunteerInfo: volunteerInfo
  };
  const postCollection = await posts();
  const insertInfo = await postCollection.insertOne(newPost);
  if (!insertInfo.acknowledged || !insertInfo.insertedId) {
    throw "Could not add post";
  }
  const newId = insertInfo.insertedId.toString();

  // Add post to user
  const userCollection = await users();
  const u = await userCollection.findOneAndUpdate({ _id: new ObjectId(owner) }, { $addToSet: { posts: newId } }, { returnDocument: 'after' });
  if (!u) { throw " IT DIDN'T WORK" };

  const post = await getPostById(newId);
  return post;
}

let idChecker = (id) => {
  if (!id) throw "Must provide id"
  if (typeof id != 'string') throw "Id must be string"
  if (id.trim() == "") throw "ID cannot be empty"
  id = id.trim()
  if (!ObjectId.isValid(id)) throw "invalid id"
  return id;
}

export const getAll = async () => {
  const postCollection = await posts();
  let postList = await postCollection.find({}).toArray();
  if (!postList) throw new Error("Could not get all posts");
  postList = postList.map((element) => {
    element._id = element._id.toString();
    return element;
  });
  return postList;
};

export const getPostById = async (id) => {
  let nId = idChecker(id);
  const postCollection = await posts()
  const post = await postCollection.findOne({ _id: new ObjectId(nId) });
  if (post == null) throw "no post with that id"
  post._id = post._id.toString();
  post.owner = post.owner.toString();
  return post;
}

export const removePost = async (id) => {
  //stays in the user file. should display post not avalible
  if (!id) throw new Error("Must provide ID");
  if (!userId) { throw 'userId must be provided'; }
  if (typeof id != 'string') throw new Error("ID must be a string");
  if (typeof userId != 'string') { throw 'userId must be a string'; }
  if (id.trim().length == 0) {
    throw new Error("Must not only contain spaces");
  }
  id = id.trim();
  if (!ObjectId.isValid(id)) throw new Error("Invalid ID");
  let post = getPostById(id);
  //remove it from the users first, then remove all comments from the post
  const userCollection = await users();
  const aUser = await userCollection.findOne({ _id: new ObjectId(post.owner) });
  if (aUser === null) { throw 'no user with that id'; }
  const newPostIds = aUser.posts.filter((rPost) => rPost != id);
  const updatedInfo = await userCollection.findOneAndUpdate(
    { _id: new ObjectId(post.owner) },
    { $set: { posts: newPostIds } },
    { returnDocument: 'after' }
  );
  if (updatedInfo.lastErrorObject.n == 0) {
    throw new Error("Could not update user successfully");
  }

  //now remove all comments with this post id
  // const commentCollection = await comments();
  // const deleteCommentInfo = await commentCollection.deleteMany(
  //   { commentPlace: id });
  // if (deleteCommentInfo.lastErrorObject.n === 0) { 'Could not delete a comment'; }

  //now remove post
  const postCollection = await posts();
  const deletionInfo = await postCollection.findOneAndDelete({
    _id: new ObjectId(id)
  });
  if (!deletionInfo) {
    throw new Error(`Could not delete post with id of ${id}`)
  }
  return deletionInfo;
};
let dateChecker = (post, day, month, year) => {
  const postDay = post.timestamp.getDate();
  const postMonth = post.timestamp.getMonth() + 1;
  const postYear = post.timestamp.getFullYear();
  const targetDay = day;
  const targetMonth = month;
  const targetYear = year;
  return (postDay === targetDay && postMonth === targetMonth && postYear === targetYear);
}
export const getPostsByDate = async (month, day, year) => {
  let posts = await getAll();
  //console.log(posts)
  const filteredPosts = posts.filter(post => dateChecker(post, day, month, year));
  return filteredPosts;
}
export const addComment = async (postId, userId, text) => {
  postId = idChecker(postId);
  userId = idChecker(userId);
  if (typeof text != 'string') throw "must comment a string"
  if (text.trim() == "") throw "cannot be a blank comment"
  text = text.trim();
  let badWords = fs.readFileSync("./data/badwords.txt", 'utf-8').split('\n').toString();
  const cleanWords = badWords.replace(/\r/g, '');
  let fn = cleanWords.split(",")
  const words = text.split(' ');
  const hasBadWords = words.some(word => fn.includes(word));
  if (hasBadWords) {

    throw "bad word detected. not posting"
  }
  let newComment = {
    commendId: new ObjectId(),
    userId: userId,
    text: text
  };
  let post = await getPostById(postId);

  let commentsL = post.comments;

  commentsL.push(newComment);

  const postCollection = await posts();
  const u1 = await postCollection.findOneAndUpdate(
    { _id: new ObjectId(postId) },
    { $set: { comments: commentsL } },
    { returnDocument: 'after' }
  );
  if (u1.lastErrorObject.n == 0) {

    throw new Error("Could not update post successfully 1")
  }
  u1.value._id = u1.value._id.toString();
  return newComment;

}
export const addReaction = async (postId, userId, text) => {
  postId = idChecker(postId);
  userId = idChecker(userId);
  if (typeof text != 'string') throw "must react a string"
  if (text.trim() == "") throw "cannot be a blank reaction"
  //someone needs to give me a list of valid reactions like :like:, "live:, etc"
  text = text.trim();
  let newReaction = {
    ReactionId: new ObjectId(),
    userId: userId,
    text: text
  };
  let post = await getPostById(postId);
  let reactions = post.reactions;
  reactions.push(newReaction);
  const postCollection = await posts();
  const u1 = await postCollection.findOneAndUpdate(
    { _id: new ObjectId(postId) },
    { $set: { reactions: reactions } },
    { returnDocument: 'after' }
  );
  if (u1.lastErrorObject.n == 0) {
    //console.log(newAlbum);
    throw new Error("Could not update band successfully 1")
  }
  u1.value._id = u1.value._id.toString();
  return newReaction;

}
export const addMedia = async (postId, userId, text) => {
  postId = idChecker(postId);
  userId = idChecker(userId);
  if (typeof text != 'string') throw "must react a string"
  if (text.trim() == "") throw "cannot be a blank reaction"
  //someone needs to give me a list of valid reactions like :like:, "live:, etc"
  text = text.trim();
  let newMedia = {
    mediaId: new ObjectId(),
    userId: userId,
    text: text
  };
  let post = await getPostById(postId);
  let media = post.media;
  media.push(newMedia);
  const postCollection = await posts();
  const u1 = await postCollection.findOneAndUpdate(
    { _id: new ObjectId(postId) },
    { $set: { media: media } },
    { returnDocument: 'after' }
  );
  if (u1.lastErrorObject.n == 0) {
    //console.log(newAlbum);
    throw new Error("Could not update band successfully 1")
  }
  u1.value._id = u1.value._id.toString();
  return newMedia;

}
let haversine = (lat1, lng1, lat2, lng2) => {
  const R = 6371; // Radius of the Earth in kilometers
  const dLat = deg2rad(lat2 - lat1);
  const dLng = deg2rad(lng2 - lng1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
    Math.sin(dLng / 2) * Math.sin(dLng / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const d = R * c; // Distance in kilometers
  return d;
}

function deg2rad(deg) {
  return deg * (Math.PI / 180);
}

// Find all the elements in the structList that are within the given radius of the given latitude and longitude
export const getPostsByRadius = async (lat, lon, rad) => {
  let posts = getAll();
  let results = posts.filter(struct => haversine(lat, lon, struct.latitude, struct.longitude) <= radius);
  return results
}

export const getOwner = async (id) => {
  let post = await getPostById(id);
  if (!post) throw "Post not found.";
  return userFunctions.get(post.owner);
}

export const getCommentsByID = async (id) => {
  let post = await getPostById(id);
  if (!post) throw "Post not found.";
  const commentCollection = await comments();
  const commentList = await commentCollection.find({ originalPost: id });

  if (!commentList) throw `Could not find comments for post with id ${id}`;
  return commentList.toArray();
}

export default { create, getAll, getPostsByDate, getPostById, removePost, addComment, addReaction, addMedia, getOwner, getCommentsByID };
