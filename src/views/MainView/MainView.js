import React from 'react';
import List from '../../components/List/List'
import AppContext from "../../context/context";

const MainView = () => (
    <AppContext.Consumer>
        {(context) => (
            <List items={context.foodList}
                  deleteItem={context.deleteItem}
                  toEdit={false}

            />
        )}
    </AppContext.Consumer>
);

export default MainView