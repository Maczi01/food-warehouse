import React, {useEffect, useState} from 'react';
import {db} from "../firebase/firebaseConfig";
import {v4 as uuidv4} from 'uuid';

export const AppContext = React.createContext();

const AppProvider = ({children}) => {

    const [foodList, setFoodList] = useState([]);


    useEffect(() => {
        const unSubscribe = db.collection("foodList").onSnapshot(
            (snapshot) => {
                const foodListData = []
                snapshot.forEach(doc => foodListData.push({...doc.data(), id: doc.id}));
                setFoodList(foodListData)
            }
        );
        return unSubscribe;
    }, []);


    const increaseQuantity = (item) => {
        if (item.currentQuantity < parseInt(item.maximalQuantity)) {
            db.collection("foodList").doc(item.id).update({currentQuantity: parseInt(item.currentQuantity) + 1});
        }
    };

    const decreaseQuantity = (item) => {
        if (item.currentQuantity > 0) {
            db.collection("foodList").doc(item.id).update({currentQuantity: parseInt(item.currentQuantity) - 1});
        }
    };

    const deleteItem = id => {
        const res = window.confirm('Do you want to delete this item?');
        db.collection("foodList").doc(id).delete()
    };

    const addItem = (newItem) => {
        newItem.id = uuidv4();
        db.collection("foodList").add(newItem);
    };

    const editItem = (item) => {
        try {
            db.collection("foodList").doc(item.id).update({...item})
        } catch (e) {
            window.alert("Nie udało się dodać!")
        }
    }


    const context ={
        foodList,
        increaseQuantity,
        decreaseQuantity,
        deleteItem,
        addItem,
        editItem
    }

    return (
        <AppContext.Provider value={context}>
            {children}
        </AppContext.Provider>
    )
}


export default AppProvider;