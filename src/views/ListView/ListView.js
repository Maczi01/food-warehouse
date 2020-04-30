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
       @media (min-width: ${({theme}) => theme.mobile}) {
      width: 100vw;
    }
`;

const Heading = styled.h1`
     padding: 10px;
     color: ${({theme}) => theme.colors.blue};
     text-align: center;
     display: flex;
     justify-content: center;
     align-items: center;
     flex-direction: column;
     margin: 0 auto;
     width: 75vw;
     @media (max-width: ${({theme}) => theme.mobile}) {
        padding: 9rem 0 1rem;
        font-size: 26px;
        width: 100vw;
     }
`


const ListView = () => (
    <ListWrapper>
        <Heading>Lista zakupów</Heading>
        <img src={bag} alt="shoping bag"/>
        <AppContext.Consumer>
            {(context) => (
                (context.foodList.length) ?
                    <TableMarkup data={context.foodList}/>
                    :
                    <span>Nothing here</span>
            )}
        </AppContext.Consumer>
    </ListWrapper>
);

export default ListView;

