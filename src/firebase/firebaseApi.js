import {auth, db} from "./firebaseConfig";
import {v4 as uuidv4} from 'uuid';

export const api = {
    decreaseQuantity: function (item) {
        if (item.currentQuantity > 0) {
            db.collection("foodList").doc(item.id).update({currentQuantity: parseInt(item.currentQuantity) - 1});
        }
    },
    increaseQuantity: function (item) {
        if (item.currentQuantity < parseInt(item.maximalQuantity)) {
            db.collection("foodList").doc(item.id).update({currentQuantity: parseInt(item.currentQuantity) + 1});
        }
    },
    deleteItem: function (id) {
        db.collection("foodList").doc(id).delete();
    },
    addItemToFoodList: function (newItem) {
        newItem.userUid = auth.currentUser.uid
        newItem.id = uuidv4();
        newItem.checked = false;
        db.collection("foodList").add(newItem);
    },
    addItemToShoppingList: function (newItem) {
        newItem.id = uuidv4();
        newItem.checked = false;
        newItem.userUid = auth.currentUser.uid
        db.collection("shoppingList").add(newItem);
    },
    checkOrUncheckItemOnshoppingList: function (item) {
        item.checked = !item.checked;
        db.collection("shoppingList").doc(item.id).update({...item});
    },

    deleteShoppingList: function () {
        db.collection("shoppingList")
            .get()
            .then(res => {
                res.forEach(element => {
                    element.ref.delete();
                });
            });
    },

    editItem: function (item) {
        db.collection("foodList").doc(item.id).update({...item});
    },
    getFoodList: function (uid, callback) {
        return db.collection("foodList")
            .onSnapshot(snapshot => {
                    const foodListData = [];
                    snapshot.forEach(doc => foodListData.push(
                    {...doc.data(), id: doc.id,})
                );
                let filter = foodListData.filter(doc => {
                    return doc.userUid === uid
                });
                callback(filter)
            }, error => {
                    console.error(error.message)
                }
            )
    },
    getShoppingList: function (uid, callback) {
        return db.collection("shoppingList")
            .onSnapshot(snapshot => {
                    const shoppingListData = [];
                    snapshot.forEach(doc => shoppingListData.push(
                        {...doc.data(), id: doc.id,})
                    );
                    let filter = shoppingListData.filter(doc => {
                        return doc.userUid === uid
                    });
                    callback(filter)
                }, error => {
                    console.error(error.message)
                }
            )
    }

}