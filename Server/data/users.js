import { users, emails, posts } from "../config/mongoCollections.js";
import bcrypt from 'bcrypt';
const saltRounds = 3;
import * as help from "../helpers.js"
import * as postFunctions from "./posts.js";
import { ObjectId } from 'mongodb';
// import { postData } from "./index.js";
const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
const phoneNumberCheck = /^\d{3}-\d{3}-\d{4}$/; //777-777-7777

export const create = async (
  //fields of input here
  username, //special username
  firstName, // does the size need to  be checked
  lastName,  // does the size need to be checked
  userEmail, //find duplicates of the email //NO DUPLICATES
  password //has to be hashed here 
  //posts will be set to empty arrays, since a new account has done neither.
  //Profile Customizations will be set to blank things and Default Values
) => {
  //error handling 
  if (!username || !firstName || !lastName || !userEmail || !password) { throw 'all fields must be present'; }
  if (typeof username !== 'string' || username.trim().length === 0 || typeof firstName !== 'string' || typeof lastName !== 'string' || typeof userEmail !== 'string' || typeof password !== 'string' || firstName.trim().length === 0 || lastName.trim().length === 0 || userEmail.trim().length === 0 || password.trim().length === 0) { throw 'all string inputs must be non-empty strings!'; }
  //trim the strings
  username = username.trim();
  firstName = firstName.trim();
  lastName = lastName.trim();
  userEmail = userEmail.trim().toLowerCase(); //stored as lowercase string
  password = password.trim();
  if (username.length > 12 || username.length < 3) { throw 'username must be between 3 and 12 characters!'; }
  //The regex statement below replaces all non-alphabetical characters with blank spaces, leaving only non-alphabetical characters
  if (firstName.replace(/[a-z]/gi, "").length !== 0 || lastName.replace(/[a-z]/gi, "").length !== 0) { throw 'First and Last name can only contain letters!'; }
  const emailCheck = emailRegex.test(userEmail);
  if (!emailCheck) { throw 'Email must follow a standard format' };
  const userCollection = await users();
  const aUser = await userCollection.findOne({ userEmail: userEmail });
  if (aUser !== null) { throw 'Email is already linked to an account!' };
  const emailCollection = await emails();
  const aUser2 = await userCollection.findOne({ username: username });
  if (aUser2 !== null) { throw 'Username is already in use!' };

  //main program starts
  let hashedPassword = await bcrypt.hash(password, saltRounds);

  let newUser = {
    username: username,
    firstName: firstName,
    lastName: lastName,
    userEmail: userEmail,
    password: hashedPassword,
    posts: [], //posts will be stored by postID
    //Cosmetic Profile Data, Will be dealt with with its own functions in this file
    picture: 'goodhood\data\defaultUser.png', //see where this path leads
    bio: '', //Have to set on cusomization 
    businessEmail: userEmail, //can be used email as default
    phoneNumber: '' //STROED AS A STRING

  };
  const insertInfo = await userCollection.insertOne(newUser);
  if (!insertInfo.acknowledged || !insertInfo.insertedId) {
    throw 'User could not be added';
  }

  const newId = insertInfo.insertedId.toString();

  const user = await get(newId);
  //add user email to database
  let newEmail = {
    email: userEmail
  };
  const insertInfo2 = await emailCollection.insertOne(newEmail);
  if (!insertInfo2.acknowledged || !insertInfo2.insertedId) {
    throw 'Email could not be added';
  };
  return user;
};

let idChecker = (id) => {
  if (!id) throw "Must provide id"
  if (typeof id != 'string') throw "Id must be string"
  if (id.trim() == "") throw "ID cannot be empty"
  id = id.trim()
  if (!ObjectId.isValid(id)) throw "invalid id"
  return id;
}
export const getAll = async () => {
  const userCollection = await users();
  let userList = await userCollection.find({}).toArray();
  if (!userList) { throw 'could not find all users'; }
  userList = userList.map((element) => {
    element._id = element._id.toString();
    return element;
  });
  return userList;
};

export const get = async (id) => {
  if (!id) { throw 'id must exist!'; }
  if (typeof id !== 'string' || id.trim().length === 0) { throw 'id must be a non-empty string!'; }
  id = id.trim();
  if (!ObjectId.isValid(id)) { throw 'id must be valid!'; }
  const userCollection = await users();
  const aUser = await userCollection.findOne({ _id: new ObjectId(id) });
  if (aUser === null) { throw 'no user with that id'; }
  aUser._id = aUser._id.toString();
  return aUser;
};

export const remove = async (id) => {
  // Check to see that the user exists and is not a empty string
  if (!id) { throw 'id must exist!'; }
  if (typeof id !== 'string' || id.trim().length === 0) { throw 'id must be a non-empty string!'; }

  // Trim the id
  id = id.trim();

  // Check if the id is a valid ObjectID
  if (!ObjectId.isValid(id)) { throw 'id must be valid!'; }

  const userCollection = await users();
  const aUser = await get(id);

  //remove email from list of emails first (ROBERT'S SUSSY EMAIL CODE)
  const emailCollection = await emails();
  const deleteEmail = await emailCollection.findOneAndDelete({
    email: aUser.userEmail
  });
  if (!deleteEmail) { throw 'Could not delete Email'; }

  const postsCollection = await posts();
  const dposts = await postsCollection.deleteMany({ owner: new ObjectId(id) });
  if (!dposts) { throw `Could not delete post with owner ${id}` };

  const deleteInfo = await userCollection.findOneAndDelete({
    _id: new ObjectId(id)
  });
  if (!deleteInfo) { throw `Could not delete user with id of ${id}`; }
  return deleteInfo;
};

export const post = async (
  myId,
  timestamp,
  latitude,
  longitude,
  image,
  caption
) => {
  let id = idChecker(myId);

  if (!timestamp) throw "please supply timestamp";
  if (!latitude) throw "please supply latitude";
  if (!longitude) throw "please supply longitude";
  if (!caption) throw "Please supply caption"
  if (!image) throw "Please suply image"

  //console.log(typeof timestamp);
  if (typeof latitude != 'number') throw "Latitude must be float"
  if (typeof image != 'string') throw "image must be a string"
  if (typeof caption != 'string') throw "Caption must be a string"
  if (typeof longitude != 'number') throw " (longitude must be an int)"
  if (caption.trim() == "") throw "Invalid string"
  caption = caption.trim();
  if (typeof longitude != 'number') throw "longitude must be an float"

  //TODO FIX THIS
  if (typeof timestamp != 'object') throw "timestamp must be an object"
  let newPost = await postData.create(timestamp, latitude, longitude, image, caption);
  let userPosts = await get(id);
  userPosts = userPosts.posts;
  const userCollection = await users();
  userPosts.push(newPost._id.toString());
  const u2 = await userCollection.findOneAndUpdate({ _id: new ObjectId(id) }, { $set: { posts: userPosts } }, { returnDocument: 'after' });
  if (u2.lastErrorObject.n == 0) {
    throw new Error("Could not unblock successfully 2")
  }
  u2.value._id = u2.value._id.toString();
  return newPost;

}

export const update = async (
  id,
  username,
  firstName,
  lastName,
  userEmail,
  picture,
  bio,
  businessEmail, //string 
  phoneNumber, //string
  hashedPassword //has to be unhashed
) => {
  if (!id) { throw 'Must provide Id ' };
  if (typeof id !== 'string') { throw 'id must be a string' };
  id = id.trim();
  if (id === '') { throw 'id must be provided' };
  if (!ObjectId.isValid(id)) { throw 'id must be valid!'; }
  const userCollection = await users();
  let aUser = await get(id);
  let newUsername = aUser.username;
  let newFirstName = aUser.firstName;
  let newLastName = aUser.lastName;
  let newUserEmail = aUser.userEmail;
  let newPicture = aUser.picture;
  let newBio = aUser.bio;
  let newBusinessEmail = aUser.businessEmail;
  let newPhoneNumber = aUser.phoneNumber;
  let newHashedPassword = aUser.password;
  let check = false;
  //Check what arguments are present and what needs to be fixed
  if (username) {
    if (typeof username != 'string') { throw 'username Name must be a string'; }
    username = username.trim();
    if (username === "") { throw 'username must be a non-empty string' };
    let aUser2 = await userCollection.findOne({ username: username });
    if (aUser2 !== null && preUp.username !== aUser2.username) { throw 'Username is already in use!' };
    newUsername = username;
    check = true;
  }
  if (firstName) {
    if (typeof firstName != 'string') { throw 'First Name must be a string'; }
    firstName = firstName.trim();
    if (firstName === "") { throw 'First Name must be a non-empty string' };
    if (firstName.replace(/[a-z]/gi, "").length !== 0) { throw 'First name can only contain letters!'; }
    //No errors and everything passes, so we take it in
    newFirstName = firstName;
    check = true;
  }
  if (lastName) {
    if (typeof lastName != 'string') { throw 'Last Name must be a string'; }
    lastName = lastName.trim();
    if (lastName === "") { throw 'Last Name must be a non-empty string' };
    if (lastName.replace(/[a-z]/gi, "").length !== 0) { throw 'Last name can only contain letters!'; }
    //No errors and everything passes, so we take it in
    newLastName = lastName;
    check = true;
  }
  if (userEmail) {
    if (typeof userEmail != 'string') { throw 'email must be a string'; }
    userEmail = userEmail.trim();
    if (userEmail === "") { throw 'email must be a non-empty string' };
    if (!emailRegex.test(userEmail)) { throw 'email must be a valid format'; }
    //No errors and everything passes, so we take it in
    let aUser2 = await userCollection.findOne({ email: userEmail });
    if (aUser2 !== null) { throw 'Email is already in use!' };
    newUserEmail = userEmail;
    check = true;
  }
  if (picture) {
    if (typeof picture != 'string') { throw 'Picture must be a string'; }
    picture = picture.trim();
    if (picture === "") { throw 'Picture must be a non-empty string' };
    //No errors and everything passes, so we take it in
    newPicture = picture;
    check = true;
  }
  if (bio) {
    if (typeof bio != 'string') { throw 'bio must be a string'; }
    bio = bio.trim();
    //Bio can be an empty string, up to the front end to make sure it is given as what the user wants
    //No errors and everything passes, so we take it in
    newBio = bio;
    check = true;
  }
  if (businessEmail) {
    if (typeof businessEmail != 'string') { throw 'email must be a string'; }
    businessEmail = businessEmail.trim();
    //if blank we remove it
    //No errors and everything passes, so we take it in
    if (!emailRegex.test(businessEmail)) { throw 'email must be a valid format'; }
    let aUser3 = await userCollection.findOne({ email: businessEmail });
    if (aUser3 !== null) { throw 'Email is already in use!' };
    newBusinessEmail = businessEmail;
    check = true;
  }
  if (phoneNumber) {
    if (typeof phoneNumber != 'string') { throw 'Phone Number must be a string'; }
    phoneNumber = phoneNumber.trim();
    //if blank then remove it
    if (!phoneNumberCheck.test(phoneNumber)) { throw 'phone number must be in format of 777-777-7777' };
    //No errors and everything passes, so we take it in
    newPhoneNumber = phoneNumber;
    check = true;
  }
  //UNHASH THE PASSWORD HERE
  if (hashedPassword) {
    newHashedPassword = await bcrypt.hash(hashedPassword, saltRounds);
    check = true;
  }
  if (!check) { throw 'A field must have been changed!' };
  let updatedUser = {
    username: newUsername,
    firstName: newFirstName,
    lastName: newLastName,
    userEmail: newUserEmail,
    password: newHashedPassword, //IT MUST BE HASHED BEFORE THIS
    picture: newPicture,
    bio: newBio,
    businessEmail: newBusinessEmail,
    phoneNumber: newPhoneNumber
  };
  const updatedInfo = await userCollection.updateOne(
    { _id: new ObjectId(id) },
    { $set: updatedUser }
  );

  // Checking if the user was updated
  if (!updatedInfo.acknowledged) throw `Could not update user with id ${userID}`;

  // Returning the updated user
  return await get(id);
};

export const checkUser = async (emailAddress, password) => {
  if (!emailAddress || !password) { throw 'all inputs must be provided'; }
  if (typeof emailAddress !== 'string' || typeof password !== 'string' || emailAddress.trim().length === 0 || password.trim().length === 0) { throw 'both inputs must be non-empty string'; }
  //trim strings
  emailAddress = emailAddress.trim().toLowerCase();
  password = password.trim();
  //email check
  let check = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/; //regex I found that fulfills email address requirements
  if (!emailAddress.match(check)) { throw 'emailaddress input must follow the standard email address pattern'; }
  let emailCollection = await emails();
  let anEmail = emailCollection.findOne({ email: emailAddress });
  if (anEmail === null) { 'this is not a valid email' };
  //password check
  let upperCheck = /[A-Z]/;
  let numberCheck = /[0-9]/;
  let specialCheck = /[!@#$%^&*-?]/; //allows for the special characters in number row and ?
  if (!password.match(upperCheck) || !password.match(numberCheck) || !password.match(specialCheck)) { throw 'password must contain at least one uppercase letter, one number and one special character'; }
  //validating done
  const userCollection = await users();
  const aUser = await userCollection.findOne({ userEmail: emailAddress });
  if (!aUser) { throw 'Either the email address or password is incorrect'; }
  let compareToMatch = false;
  try {
    compareToMatch = await bcrypt.compare(password, aUser.password); //compare hash to password provided
  } catch (error) {
    //no op 
    throw 'Internal server error'
  }
  if (compareToMatch) {
    return aUser;
  } else {
    throw 'Either the email address or password is incorrect';
  }
};

export const getPostsByUserID = async (id) => {
  if (!id) { throw 'id must exist!'; }
  if (typeof id !== 'string' || id.trim().length === 0) { throw 'id must be a non-empty string!'; }
  id = id.trim();
  if (!ObjectId.isValid(id)) { throw 'id must be valid!'; }

  const post = await posts();
  const postList = await post.find({ owner: new ObjectId(id) });

  if (!postList) throw `Could not find posts for user with id ${id}`;
  return postList.toArray();
}

//   picture: 'goodhood\data\defaultUser.png', //see where this path leads
//         bio: '', //Have to set on cusomization 
//         businessEmail: userEmail, //can be used email as default
//         phoneNumber: '' //STORED AS A STRING


export default { create, getAll, get, remove, post, update, checkUser, getPostsByUserID };
