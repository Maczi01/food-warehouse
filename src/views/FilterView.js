import React from 'react';
import styled from "styled-components";
import {FormattedMessage} from "react-intl";
import beverages from "../asstets/categoryIcon/beverages.svg";
import bread from "../asstets/categoryIcon/bread.svg";
import dairy from "../asstets/categoryIcon/dairy.svg";
import meat from "../asstets/categoryIcon/meat.svg";
import pasta from "../asstets/categoryIcon/pasta.svg";
import all from "../asstets/categoryIcon/all.svg";
import other from "../asstets/categoryIcon/other.svg";
import spieces from "../asstets/categoryIcon/spieces.svg";
import sweets from "../asstets/categoryIcon/sweets.svg";
import vegetables from "../asstets/categoryIcon/vegetables.svg";
import {Link} from "react-router-dom";

const ViewWrapper = styled.div`
     width: 80vw;
     margin: 0 auto;
     @media (max-width: ${({theme}) => theme.mobile}) {
        width: 100vw;
      

     }
`

const GridWrapper = styled.div`
     
     display: flex;
     justify-content: center;
     flex-wrap: wrap;
   @media (max-width: ${({theme}) => theme.mobile}) {
        display: grid;
        grid-template-columns: 1fr 1fr;
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

const IconWrapper = styled.div`
    display: flex;
    flex-direction: column;
    text-align: center;
    width: 200px;
    margin: 20px 5px;
    align-items: center;
    animation: appear 0.3s ease;
    position: relative;
    @keyframes appear {
      0% {
        opacity: 0;
        top: 35px;
    }
      100% {
        opacity: 1;
        top: 0;
    }
};`

const Paragraph = styled.p`
    margin-top: 10px;
    font-size: 18px;
    font-weight: bold;
    text-align: center;
    color: ${({theme}) => theme.colors.blue};
`

const Icon = styled.img`
    justify-content: center;
    margin: 0;
    width: 150px;
    height: 150px;
`

const FilterView = () => (
    <ViewWrapper>
        <Heading>
            <FormattedMessage id="what in inventory"/>
        </Heading>
        <GridWrapper>
            <IconWrapper as={Link} to={'/filter/all'}>
                <Icon src={all}/>
                <Paragraph>
                    all items
                </Paragraph>
            </IconWrapper>

            <IconWrapper as={Link} to={'/filter/beverages'}>
                <Icon src={beverages}/>
                <Paragraph>
                    Beverages
                </Paragraph>
            </IconWrapper>

            <IconWrapper as={Link} to={'/filter/baking'}>
                <Icon src={bread}/>
                <Paragraph>
                    Baking
                </Paragraph>
            </IconWrapper>

            <IconWrapper as={Link} to={'/filter/dairy'}>
                <Icon src={dairy}/>
                <Paragraph>
                    Dairy
                </Paragraph>
            </IconWrapper>

            <IconWrapper as={Link} to={'/filter/meatFishesSeafood'}>
                <Icon src={meat}/>
                <Paragraph>
                    Meat, fiches, seafood
                </Paragraph>
            </IconWrapper>

            <IconWrapper as={Link} to={'/filter/pasta'}>
                <Icon src={pasta}/>
                <Paragraph>
                    Pasta, rice, groats
                </Paragraph>
            </IconWrapper>

            <IconWrapper as={Link} to={'/filter/spieces'}>
                <Icon src={spieces}/>
                <Paragraph>
                    Loose products, spieces
                </Paragraph>
            </IconWrapper>

            <IconWrapper as={Link} to={'/filter/sweetsAndSnacks'}>
                <Icon src={sweets}/>
                <Paragraph>
                    Sweets and snacks
                </Paragraph>
            </IconWrapper>

            <IconWrapper as={Link} to={'/filter/vegetablesAndFruits'}>
                <Icon
                    // onClick={() => sendMail()}
                    src={vegetables}
                />
                <Paragraph>
                    Vegetables and fruits
                </Paragraph>
            </IconWrapper>

            <IconWrapper as={Link} to={'/filter/others'}>
                <Icon src={other}/>
                <Paragraph>
                    Others
                </Paragraph>
            </IconWrapper>
        </GridWrapper>
    </ViewWrapper>
);

export default FilterView