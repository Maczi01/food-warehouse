import React, {useEffect, useState} from 'react';
import {db, auth} from "../firebase/firebaseConfig";
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

    const unSubscribeFoodList = (uid) => db.collection("foodList")
        .onSnapshot(
            (snapshot) => {
                const foodListData = [];
                snapshot.forEach(doc => foodListData.push(
                    {...doc.data(), id: doc.id,})
                );
                let filter = foodListData.filter(doc => {
                    return doc.userUid === uid
                });
                setFoodList(filter)
            }
        );

    const unSubscribeShoppingList = (uid) => db.collection("shoppingList")
        .onSnapshot(
            (snapshot) => {
                const shoppingListData = [];
                snapshot.forEach(doc => shoppingListData.push(
                    {...doc.data(), id: doc.id,})
                );
                let filter = shoppingListData.filter(doc => {
                    return doc.userUid === uid
                });
                setShoppingList(filter)
            }
        );

    useEffect(() => {
        auth.onAuthStateChanged((user) => {
            if (user) {
                unSubscribeFoodList(user.uid);
            }
        });
        return () => {
            unSubscribeFoodList();
        };
    }, []);

    useEffect(() => {
        auth.onAuthStateChanged((user) => {
            if (user) {
                unSubscribeShoppingList(user.uid);
            }
        });
        return () => {
            unSubscribeFoodList();
        };
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
        firebase.addItemToFoodList(newItem);
    };

    const editItem = (item) => {
        firebase.editItem(item);
    };

    const deleteShoppingList = () => {
        firebase.deleteShoppingList();
    };

    const generateShoppingList = () => {
        let list = JSON.parse(JSON.stringify(foodList));
        list.filter(item => (
            item.currentQuantity < item.minimalQuantity
        )).map(item => {
            item.neededQuantity = (parseInt(item.maximalQuantity)) - (parseInt(item.currentQuantity));
            delete item.id;
            delete item.minimalQuantity;
            delete item.maximalQuantity;
            delete item.currentQuantity;
            delete item.category;
            item.checked = false;
            item.userUid = auth.currentUser.uid;
            return item;
        }).filter(u => shoppingList.findIndex(lu => lu.name === u.name) === -1)
            .forEach(item => addItemToShoppingList(item));
    };

    const addItemToShoppingList = (newItem) => {
        firebase.addItemToShoppingList(newItem);
    };

    const setItemAsChecked = (item) => {
        item.checked = !item.checked;
        db.collection("shoppingList").doc(item.id).update({...item});
    };

    const context = {
        setItemAsChecked,
        generateShoppingList,
        shoppingList,
        foodList,
        language,
        deleteShoppingList,
        addItemToShoppingList,
        increaseQuantity,
        decreaseQuantity,
        deleteItem,
        addItem,
        editItem,
        toggleTheme,
        handleLanguageChange
    };

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
};


export default AppProvider;