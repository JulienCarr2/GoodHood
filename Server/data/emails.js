import { users, emails } from "../config/mongoCollections.js";
import {ObjectId} from 'mongodb';
const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
export const create = async(
    email //just a database of valid emails, stored in lowercase
) =>{
    if(!email){throw 'email must be provided!'};
    if(typeof email !== 'string' || email.trim().length === 0){throw 'email must be a non-empty string'};
    //trim string
    email = email.trim().toLowerCase();
    const emailCheck = emailRegex.test(email);
    if(!emailCheck){throw 'Email must follow a standard format'};
    
    let newEmail = {
        email : email
    };
    const emailCollection = await emails();
    const insertInfo = await emailCollection.insertOne(newEmail);
    if(!insertInfo.acknowledged || !insertInfo.insertedId){
        throw 'email could not be added to database';
    }
    const newEmailId = insertInfo.insertedId.toString();
    const cEmail = await get(newEmailId);
    return cEmail;
}

export const get = async (id) =>{
    if(!id){throw 'id must exist!';}
    if(typeof id !== 'string' || id.trim().length === 0){throw 'id must be a non-empty string!';}
    id = id.trim();
    if(!ObjectId.isValid(id)){throw 'id must be valid!';}
    const emailCollection = await emails();
    const anEmail = await emailCollection.findOne({_id: new ObjectId(id)});
    if(anEmail === null){throw 'no email with that id';}
    anEmail._id = anEmail._id.toString();
    return anEmail;
};

export const remove = async(id) => {
    if(!id){throw 'id must exist!';}
    if(typeof id !== 'string' || id.trim().length === 0){throw 'id must be a non-empty string!';}
    id = id.trim();
    if(!ObjectId.isValid(id)){throw 'id must be valid!';}
    const emailCollection = await emails();
    const deleteInfo = await emailCollection.findOneAndDelete({
        _id: new ObjectId(id)});
    if(deleteInfo.lastErrorObject.n === 0){throw `Could not delete email with id of ${id}`;}
    return `${deleteInfo.value.email} has been successfully deleted!`; 
}

export default {create, remove};