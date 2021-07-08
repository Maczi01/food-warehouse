import React, { useEffect, useState } from "react";
import { db, auth } from "../firebase/firebaseConfig";
import { ThemeProvider } from "styled-components";
import { lightTheme, nightTheme } from "../theme/theme";
import { IntlProvider } from "react-intl";
import GlobalStyle from "../theme/GlobalStyle";
import { api } from "../firebase/firebaseApi";
import { EN_language, PL_language } from "../utills/language";

export const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  const [foodList, setFoodList] = useState([]);
  const [shoppingList, setShoppingList] = useState([]);
  const [theme, setTheme] = useState(lightTheme);
  const [language, setLanguage] = useState(EN_language);

  useEffect(() => {
    let unSubscribeFoodList = null;
    let unSubscribeShoppingList = null;
    const unMount = () => {
      unSubscribeFoodList && unSubscribeFoodList();
      unSubscribeShoppingList && unSubscribeShoppingList();
      unSubscribeShoppingList = null;
      unSubscribeFoodList = null;
    };
    auth.onAuthStateChanged((user) => {
      if (user) {
        unSubscribeFoodList = subscribeFoodList(user.uid);
        unSubscribeShoppingList = subscribeShoppingList(user.uid);
      } else {
        unMount();
      }
    });
    return () => {
      unMount();
    };
  }, []);

  const changeLanguage = (language) => {
    switch (language) {
      case "en":
        setLanguage(EN_language);
        break;
      default:
        setLanguage(PL_language);
    }
  };

  const toggleTheme = (e) => {
    e.target.value === "on" ? setTheme(nightTheme) : setTheme(lightTheme);
  };

  const handleLanguageChange = (e) => {
    changeLanguage(e.target.value);
  };

  const subscribeFoodList = (uid) => {
    return api.getFoodList(uid, (docs) => {
      setFoodList(docs);
    });
  };

  const subscribeShoppingList = (uid) => {
    return api.getShoppingList(uid, (docs) => {
      setShoppingList(docs);
    });
  };

  const increaseQuantity = (item) => {
    api.increaseQuantity(item);
  };

  const decreaseQuantity = (item) => {
    api.decreaseQuantity(item);
  };

  const deleteItem = (id) => {
    api.deleteItem(id);
  };

  const addItem = (newItem) => {
    api.addItemToFoodList(newItem);
  };

  const editItem = (item) => {
    api.editItem(item);
  };

  const deleteShoppingList = () => {
    api.deleteShoppingList();
  };

  const generateShoppingList = (foodList) => {
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
      .forEach((item) => addItemToShoppingList(item));
  };

  const addItemToShoppingList = (newItem) => {
    api.addItemToShoppingList(newItem);
  };

  const setItemAsChecked = (item) => {
    api.setItemAsCheckedOrUnchecked(item);
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
    handleLanguageChange,
  };

  return (
    <AppContext.Provider value={context}>
      <IntlProvider locale={language.locale} messages={language.lang}>
        <ThemeProvider theme={theme}>
          <GlobalStyle backgroundColor={lightTheme.backgroundColor} />
          {children}
        </ThemeProvider>
      </IntlProvider>
    </AppContext.Provider>
  );
};
export default AppProvider;
