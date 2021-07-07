import React from 'react';
import styled from "styled-components";
import {FormattedMessage} from "react-intl";
import beverages from "../assets/categoryIcons/beverages.svg";
import bread from "../assets/categoryIcons/bread.svg";
import dairy from "../assets/categoryIcons/dairy.svg";
import meat from "../assets/categoryIcons/meat.svg";
import pasta from "../assets/categoryIcons/pasta.svg";
import all from "../assets/categoryIcons/all.svg";
import other from "../assets/categoryIcons/other.svg";
import spieces from "../assets/categoryIcons/spieces.svg";
import sweets from "../assets/categoryIcons/sweets.svg";
import vegetables from "../assets/categoryIcons/vegetables.svg";
import {Link} from "react-router-dom";
import MainTemplate from "../components/templates/MainTemplate";

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
        grid-column-gap: 0;
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
     @media (max-width: ${({theme}) => theme.mobile}) {
         margin: 5px;
         width: 150px;
     }
  
    @keyframes appear {
      0% {
        opacity: 0;
        top: 35px;
    }
      100% {
        opacity: 1;
        top: 0;
    } 
};`;

const Paragraph = styled.p`
    margin-top: 10px;
    font-size: 18px;
    font-weight: bold;
    text-align: center;
    color: ${({theme}) => theme.colors.blue};
    ::first-letter{
        text-transform: uppercase;
    }
`;

const Icon = styled.img`
    justify-content: center;
    margin: 0;
    width: 150px;
    height: 150px;
    transition: all .6s ease 0s; 
    :active {
      transform: scale(0.95);
    }
      @media (max-width: ${({theme}) => theme.mobile}) {
        width: 100px;
        height: 100px;
     }
`;

const FilterView = () => (
    <MainTemplate>
        <Heading>
            <FormattedMessage id="what in inventory"/>
        </Heading>
        <GridWrapper>
            <IconWrapper as={Link} to={'/filter/all'}>
                <Icon src={all}/>
                <Paragraph>
                    <FormattedMessage id="all categories"/>
                </Paragraph>
            </IconWrapper>

            <IconWrapper as={Link} to={'/filter/beverages'}>
                <Icon src={beverages}/>
                <Paragraph>
                    <FormattedMessage id="beverages"/>
                </Paragraph>
            </IconWrapper>

            <IconWrapper as={Link} to={'/filter/baking'}>
                <Icon src={bread}/>
                <Paragraph>
                    <FormattedMessage id="baking"/>
                </Paragraph>
            </IconWrapper>

            <IconWrapper as={Link} to={'/filter/dairy'}>
                <Icon src={dairy}/>
                <Paragraph>
                    <FormattedMessage id="dairy"/>
                </Paragraph>
            </IconWrapper>

            <IconWrapper as={Link} to={'/filter/meatFishesSeafood'}>
                <Icon src={meat}/>
                <Paragraph>
                    <FormattedMessage id="meat and more"/>
                </Paragraph>
            </IconWrapper>

            <IconWrapper as={Link} to={'/filter/pasta'}>
                <Icon src={pasta}/>
                <Paragraph>
                    <FormattedMessage id="pasta"/>
                </Paragraph>
            </IconWrapper>

            <IconWrapper as={Link} to={'/filter/spieces'}>
                <Icon src={spieces}/>
                <Paragraph>
                    <FormattedMessage id="spieces"/>
                </Paragraph>
            </IconWrapper>

            <IconWrapper as={Link} to={'/filter/sweetsAndSnacks'}>
                <Icon src={sweets}/>
                <Paragraph>
                    <FormattedMessage id="sweets"/>
                </Paragraph>
            </IconWrapper>

            <IconWrapper as={Link} to={'/filter/vegetablesAndFruits'}>
                <Icon
                    // onClick={() => sendMail()}
                    src={vegetables}
                />
                <Paragraph>
                    <FormattedMessage id="vegetables and fruits"/>
                </Paragraph>
            </IconWrapper>

            <IconWrapper as={Link} to={'/filter/others'}>
                <Icon src={other}/>
                <Paragraph>
                    <FormattedMessage id="others"/>
                </Paragraph>
            </IconWrapper>
        </GridWrapper>
    </MainTemplate>
);

export default FilterView