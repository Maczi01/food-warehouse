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
    getData: async function (uid) {
        try {
            const ref = db.collection("foodList")

            const docs = await ref.get();
            const foodListData = [];
            docs.forEach(doc => {
                    foodListData.push(
                        {...doc.data(), id: doc.id,})
                }
            )
            let filter = foodListData.filter(doc => doc.userUid === uid);
            return (filter)
        } catch (error) {
            console.log(error)
        }
    },

}
