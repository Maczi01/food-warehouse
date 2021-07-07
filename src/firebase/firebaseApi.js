import {auth, db} from "./firebaseConfig";
import {v4 as uuidv4} from 'uuid';

export const firebase = {
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
    getData: function (uid, callback) {
      return db.collection("foodList").onSnapshot(
        (snapshot) => {
            const foodListData = [];
            snapshot.forEach(doc => foodListData.push(
                {...doc.data(), id: doc.id,})
            );
            let filter = foodListData.filter(doc =>
                doc.userUid === uid
            );
            callback(filter)
        }, error => {
            console.log(`Problem with internet connection ${error}`)
        }
      )
    },
    getShoppingList: function (uid, callback) {
      return db.collection("shoppinglist").onSnapshot(
        (snapshot) => {
            const shoppingListData = [];
            snapshot.forEach(doc => shoppingListData.push(
                {...doc.data(), id: doc.id,})
            );
            let filter = shoppingListData.filter(doc =>
                doc.userUid === uid
            );
            callback(filter)
        }, error => {
            console.log(`Problem with internet connection ${error}`)
        })
    }

}
