import { dbConnection } from './mongoConnections.js';

const getCollectionFn = (collection) => {
  let _col = undefined;

  return async () => {
    if (!_col) {
      const db = await dbConnection();
      _col = await db.collection(collection);
    }

    return _col;
  };
};

//collections below 

export const users = getCollectionFn('users');
export const posts = getCollectionFn('posts');
export const emails = getCollectionFn('emails');
export const comments = getCollectionFn('comments');