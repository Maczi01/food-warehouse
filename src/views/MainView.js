import React from 'react';
import List from '../components/organisms/List'
import AppContext from "../context/context";
import styled from "styled-components";
import {FormattedMessage} from "react-intl";
import Button from "../components/atoms/Button";

const ViewWrapper = styled.div`
     width: 75vw;
     margin: 0 auto;
     display: flex;
     flex-direction: column;
     
     @media (max-width: ${({theme}) => theme.mobile}) {
        width: 100vw;
     }
`

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


const ZmieniToNaFilterView = ({match}) => {
    // const {parameter} = useParams();
    // const {parameter} = this.props.match.params
    // const { parameter } = useParams()
    // const {match} = {props}
    const parameter = match.params.parameter;
    console.log(parameter)
    return (<AppContext.Consumer>
            {(context) => {
                // (
                const newFoodList = parameter ?
                 context.foodList.filter(item => item.category === parameter) : context.foodList

                return (
                    <ViewWrapper>
                        <Heading>
                            <FormattedMessage id="what in inventory"/>
                        </Heading>
                        <List
                            items={newFoodList}
                            deleteItem={context.deleteItem}
                            decreaseQuantity={context.decreaseQuantity}
                            increaseQuantity={context.increaseQuantity}
                            editName={context.editName}
                            editItem={context.editItem}
                            toEdit={true}
                            shop={true}
                            parameter={parameter}
                        />
                    </ViewWrapper>
                )
                // )
            }
            }
        </AppContext.Consumer>
    )
}

export default ZmieniToNaFilterView