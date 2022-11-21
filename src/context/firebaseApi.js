import firebase from "firebase";
import "firebase/auth";
import "firebase/firestore";
import {v4 as uuidv4} from "uuid";
import {config} from '../enviroments/firebaseConfig';

firebase.initializeApp(config);

export const db = firebase.firestore();
export const auth = firebase.auth();

export const api = {
    decreaseQuantity: function (item) {
        if (item.currentQuantity > 0) {
            db.collection("foodList")
                .doc(item.id)
                .update({currentQuantity: parseInt(item.currentQuantity) - 1});
        }
    },

    increaseQuantity: function (item) {
        if (item.currentQuantity < parseInt(item.maximalQuantity)) {
            db.collection("foodList")
                .doc(item.id)
                .update({currentQuantity: parseInt(item.currentQuantity) + 1});
        }
    },

    deleteItem: function (id) {
        db.collection("foodList").doc(id).delete();
    },

    addItemToFoodList: function (newItem) {
        newItem.userUid = auth.currentUser.uid;
        newItem.id = uuidv4();
        newItem.checked = false;
        db.collection("foodList").add(newItem);
    },

    addItemToShoppingList: function (newItem) {
        newItem.id = uuidv4();
        newItem.checked = false;
        newItem.userUid = auth.currentUser.uid;
        db.collection("shoppingList").add(newItem);
    },

    setItemAsCheckedOrUnchecked: function (item) {
        item.checked = !item.checked;
        db.collection("shoppingList")
            .doc(item.id)
            .update({...item});
    },

    deleteShoppingList: function () {
        db.collection("shoppingList")
            .get()
            .then((res) => {
                res.forEach((element) => {
                    element.ref.delete();
                });
            });
    },

    editItem: function (item) {
        db.collection("foodList")
            .doc(item.id)
            .update({...item});
    },

    getFoodList: function (uid, callback) {
        return db.collection("foodList").onSnapshot(
            (snapshot) => {
                const foodListData = [];
                snapshot.forEach((doc) =>
                    foodListData.push({...doc.data(), id: doc.id})
                );
                let filter = foodListData.filter((doc) => {
                    return doc.userUid === uid;
                });
                callback(filter);
            },
            (error) => {
                console.error(error.message);
            }
        );
    },

    getShoppingList: function (uid, callback) {
        return db.collection("shoppingList").onSnapshot(
            (snapshot) => {
                const shoppingListData = [];
                snapshot.forEach((doc) =>
                    shoppingListData.push({...doc.data(), id: doc.id})
                );
                let filter = shoppingListData.filter((doc) => {
                    return doc.userUid === uid;
                });
                callback(filter);
            },
            (error) => {
                console.error(error.message);
            }
        );
    },

    generateShoppingList: function generateShoppingList(foodList, shoppingList) {
        let list = JSON.parse(JSON.stringify(foodList));
        list
            .filter((item) => item.currentQuantity < item.minimalQuantity)
            .map((item) => {
                item.neededQuantity =
                    parseInt(item.maximalQuantity) - parseInt(item.currentQuantity);
                delete item.id;
                delete item.minimalQuantity;
                delete item.maximalQuantity;
                delete item.currentQuantity;
                delete item.category;
                item.checked = false;
                item.userUid = auth.currentUser.uid;
                return item;
            })
            .filter((u) => shoppingList.findIndex((lu) => lu.name === u.name) === -1)
            .forEach((item) => api.addItemToShoppingList(item));
    },
};
