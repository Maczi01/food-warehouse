import React, {useContext} from 'react';
import ListItem from "../molecules/ListItem";
import styled from "styled-components";
import {Link} from "react-router-dom";
import {FormattedMessage} from "react-intl";
import bag from "../../asstets/img/bag.svg";
import {routes} from "../../routes/routes";
import {AppContext} from "../../context/context";

const UlWrapper = styled.ul`
    width: 75vw;
    padding: 0;
    margin: 40px auto 0;
    @media (max-width: ${({theme}) => theme.mobile}) {
       width: 100vw;
       font-size: 10px;
       margin: 10px auto 0;
    }
`

const InfoWrapper = styled.h1`
     margin: 0 auto;
     height: 70px;
     display: flex;
     width: 75vw;
     align-items: center;
     justify-content: center;
     background-color: ${({theme}) => theme.colors.blue};
     color: ${({theme}) => theme.colors.white};
`

const CategoryWrapper = styled.div`
    margin: 0 auto;
    height: 70px;
    display: flex;
    width: 75vw;
    font-size: 20px;
    align-items: center;
    justify-content: center;
    background-color: ${({theme}) => theme.colors.yellow};
    color: ${({theme}) => theme.colors.blue};
    @media (max-width: ${({theme}) => theme.mobile}) {
        width: 100vw;
    }
`

const Paragraph = styled.p`
  margin-top: 10px;
  font-size: 18px;
  font-weight: 600;
  text-decoration: none;
`

const Image = styled.img`
margin: 25px;
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
      width: 60vw;
     @media (max-width: ${({theme}) => theme.mobile}) {
        padding: 9rem 0 1rem;
        font-size: 26px;
        width: 100vw;
     }
`;

const EmptyListWrapper = styled.div`
 display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      margin: 0 auto;
      width: 60vw;
      font-size: 14px;
`

// const List = ({items, deleteItem, decreaseQuantity, increaseQuantity, editName, editItem, toEdit, parameter}) => {
const List = ({items, parameter}) => {

    const {decreaseQuantity, increaseQuantity, deleteItem} = useContext(AppContext);

    return (
        <>
            <CategoryWrapper>
                {parameter === "all" ? "All categories" : parameter}
            </CategoryWrapper>
            <Link to={'/'}> <Paragraph>🡄 back to select category</Paragraph></Link>
            <UlWrapper>
                {
                    items.length ?
                        items.map(item => (
                            <ListItem {...item}
                                      key={item.id}
                                      deleteItem={() => deleteItem(item.id)}
                                      // toEdit={toEdit}
                                      // editItem={editItem}
                                      decreaseQuantity={() => decreaseQuantity(item)}
                                      increaseQuantity={() => increaseQuantity(item)}
                                      // editName={() => editName(item)}
                            />
                        )) :
                        <EmptyListWrapper>
                            <Heading>
                                <Image src={bag} alt="shoping bag"/>
                                Nothing here,
                                <Link to={routes.add}>add something
                                </Link>
                            </Heading>
                        </EmptyListWrapper>
                }
            </UlWrapper>
        </>)
};


export default List;
