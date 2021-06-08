import {db} from "./firebaseConfig";
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
        newItem.id = uuidv4();
        db.collection("foodList").add(newItem);
    },
    editItem: function (item) {
        db.collection("foodList").doc(item.id).update({...item});
    },
    getData: function () {
        // db.collection("foodList").onSnapshot(
        //     (snapshot) => {
        //         const foodListData = [];
        //         snapshot.forEach(doc => foodListData.push({...doc.data(), id: doc.id}));
        //         return foodListData;
        //         // setFoodList(foodListData)
        //     }
        // );
    },

}
