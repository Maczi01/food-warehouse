import React, {useEffect, useState} from 'react';
import {db} from "../firebase/firebaseConfig";

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




    const context ={
        foodList
    }

    return (
        <AppContext.Provider value={context}>
            {children}
        </AppContext.Provider>
    )
}


export default AppProvider;