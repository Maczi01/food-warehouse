import React from 'react';
import AppContext from "../../context/context";
import 'react-toastify/dist/ReactToastify.css';
import bag from '../../asstets/img/bag.svg';
import styled from "styled-components";
import TableMarkup from "../../components/Table";

const ListWrapper = styled.div`
      //padding: 70px 80px 50px;
      //top: 50%;
      //transform: translateY(-50%);
      //left: 0;
      //right: 0;
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      margin: 0 auto;
      width: 60vw;
      font-size: 14px;
      //height: 90vh;
      //position: fixed;
`;


const ListView = () => (
    <ListWrapper>
        <h1>Lista zakupów</h1>
        <img src={bag} alt="shoping bag"/>
        <AppContext.Consumer>
            {(context) => (
                (context.foodList.length) ?
                    <TableMarkup data={context.foodList}/>
                    :
                    <span>Nothing here</span>


                // (context.foodList.length) ?
                //
                //     context.foodList.filter((item) => (
                //         item.currentQuantity < item.minimalQuantity
                //     )).map(item =>
                //         <ListItem {...item}
                //                   key={item.id}
                //                   shop={false}
                //                   categry="Pieczywo"
                //         >{item.maximalQuantity - item.currentQuantity} </ListItem>)
                //     :
                //     <>
                //         <span>Nothing here</span>
                //         <TableMarkup data={item}/>
                //     </>
            )}
        </AppContext.Consumer>
    </ListWrapper>
);

export default ListView;

