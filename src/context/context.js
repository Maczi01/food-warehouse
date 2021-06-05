import React, {useEffect, useState} from 'react';
import {db} from "../firebase/firebaseConfig";
import English from "../languages/en";
import Polish from "../languages/pl";
import {ThemeProvider} from "styled-components";
import {lightTheme, nightTheme} from '../theme/theme'
import {IntlProvider} from "react-intl";
import GlobalStyle from "../theme/GlobalStyle";
import {firebase} from "../firebase/firebaseApi";
import {EN_language, PL_language} from "../utills/language";
import {v4 as uuidv4} from 'uuid';

export const AppContext = React.createContext();

const AppProvider = ({children}) => {

    const [foodList, setFoodList] = useState([]);
    const [shoppingList, setShoppingList] = useState([]);
    const [theme, setTheme] = useState(lightTheme);
    const [language, setLanguage] = useState(EN_language);

    function changeLanguage(language) {
        switch (language) {
            case('en'):
                setLanguage(EN_language);
                break;
            default:
                setLanguage(PL_language);
        }
    }

    const toggleTheme = (e) => {
        e.target.value === 'on' ? setTheme(nightTheme) : setTheme(lightTheme)
    };

    const handleLanguageChange = e => {
        changeLanguage(e.target.value);
    };

    useEffect(() => {
        const unSubscribe = db.collection("foodList").onSnapshot(
            (snapshot) => {
                const foodListData = [];
                snapshot.forEach(doc => foodListData.push({...doc.data(), id: doc.id}));
                // const foodListData = snapshot.map(doc => ({id: doc.id, ...doc.data()}
                setFoodList(foodListData)
            }
        );
        return unSubscribe;
    }, []);

    useEffect(() => {
        const unSubscribe = db.collection("shoppingList").onSnapshot(
            (snapshot) => {
                const list = [];
                snapshot.forEach(doc => list.push({
                    ...doc.data(),
                    // currentQuantity: parseInt(doc.currentQuantity),
                    id: doc.id
                }));
                // const foodListData = snapshot.map(doc => ({id: doc.id, ...doc.data()}
                setShoppingList(list)
            }
        );
        return unSubscribe;
    }, []);

    const increaseQuantity = (item) => {
        firebase.increaseQuantity(item);
    };

    const decreaseQuantity = (item) => {
        firebase.decreaseQuantity(item);
    };

    const deleteItem = id => {
        firebase.deleteItem(id);
    };

    const addItem = (newItem) => {
        firebase.addItem(newItem);
    };

    const editItem = (item) => {
        firebase.editItem(item);
    };


    const deleteFromShoppingList = (id) => {
        db.collection("shoppingList").doc(id).delete()
            .then(
                shoppingList.filter(item => item.id != id)
            );
    };

    const generateShoppingList = () => {
        let list = [];
        list = foodList.filter(item => (
            item.currentQuantity < item.minimalQuantity
        )).map(item => {
            item.currentQuantity = (parseInt(item.maximalQuantity)) - (parseInt(item.currentQuantity))
            delete item.minimalQuantity;
            delete item.maximalQuantity;
            delete item.category;
            item.checked = false;
            return item;
        })

        ;

        let filtered = list.filter(u => shoppingList.findIndex(lu => lu.name === u.name) === -1);
        filtered.forEach(item => addItemToShoppingList(item));

    };

    const addItemToShoppingList = (newItem) => {
        newItem.id = uuidv4();
        newItem.checked = false;
        db.collection("shoppingList").add(newItem);
    };

    const checkItem = (item) => {
        item.checked = !item.checked;
        db.collection("shoppingList").doc(item.id).update({...item});

    }

    const context = {
        checkItem,
        generateShoppingList,
        shoppingList,
        foodList,
        language,
        deleteFromShoppingList,
        addItemToShoppingList,
        increaseQuantity,
        decreaseQuantity,
        deleteItem,
        addItem,
        editItem,
        toggleTheme,
        handleLanguageChange
    }

    return (
        <AppContext.Provider value={context}>
            <IntlProvider locale={language.locale} messages={language.lang}>
                <ThemeProvider theme={theme}>
                    <GlobalStyle backgroundColor={lightTheme.backgroundColor}/>
                    {children}
                </ThemeProvider>
            </IntlProvider>
        </AppContext.Provider>
    )
}


export default AppProvider;