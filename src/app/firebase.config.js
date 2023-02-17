import firebase from 'firebase';

import { config } from '../enviroments/firebase.config';

firebase.initializeApp(config);

const db = firebase.firestore();
export const auth = firebase.auth();

export class HttpClientAdapter {
  getAll = (collectionName) => {
    return new Promise((resolve, reject) => {
      db.collection(collectionName).onSnapshot(
        (snapshot) => {
          resolve(snapshot);
        },
        (error) => {
          reject(error);
        }
      );
    });
  };

  getOne = (collectionName, id) => {
    return db.collection(collectionName).doc(id);
  };

  deleteOne = (collectionName, id) => {
    return db.collection(collectionName).doc(id).delete();
  };

  clear = (collectionName) => {
    return db
      .collection(collectionName)
      .get()
      .then((res) => {
        res.forEach((element) => {
          element.ref.delete();
        });
      });
  };

  update = (collectionName, id, data) => {
    return db.collection(collectionName).doc(id).update(data);
  };

  create = (collectionName, data) => {
    return db.collection(collectionName).add(data);
  };
}
