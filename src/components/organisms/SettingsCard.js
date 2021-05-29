import React, {useContext} from 'react';
import styled from "styled-components";
import user from '../../asstets/img/user.svg'
import {auth} from "../../firebase/firebaseConfig";
import {FormattedMessage} from "react-intl";
import PropTypes from "prop-types";
import Menu from "../molecules/Menu";
import Modal from "../molecules/Modal";
import {AppContext} from "../../context/context";


const SettingsWrapper = styled.div`
      display: flex;
      justify-content: center;
      flex-direction: column;
      margin: 0 auto;
      padding: 20px;
      width: 50vw;
      @media (max-width: ${({theme}) => theme.mobile}) {
        width: 100vw;
     }
`;

const UserCard = styled.div`
      display: flex;
      justify-content: space-between;
      width: 40vw;
      margin: 0 auto;
      padding: 15px 0;
`

const UserAvatarWrapper = styled.img`
      width: 100px;
      height: 100px;
      display: flex;
      justify-content: center;
      margin: 0 auto;
`
const UserMailWrapper = styled.div`
     display: flex;
     align-items: center;
     flex-direction: column;
`
const Button = styled.button`
    width: 170px;
    height: 50px;
    outline: none;
    border: none;
    font-size: 20px;
    font-weight: 600;
    letter-spacing: 5px;
    border-radius: 5px;
    cursor: pointer;
    background: ${({theme}) => theme.colors.pink};
    color: ${({theme}) => theme.colors.white};
`

const ButtonMode = styled.button`
    display: block;
    appearance: none;
    outline: 0;
    border: 1px solid white;
    width: 300px;
    border-radius: 3px;
    margin: 6px;
    text-align: center;
    font-size: 18px;
    color: black;
    transition-duration: 0.25s;
    font-weight: 300;
    background-color: ${({theme}) => theme.colors.gray};
        @media (max-width: ${({theme}) => theme.mobile}) {
          height: 50px;
    }
`

const OptionsWrapper = styled.div`
      width: 100%;
      display: flex;
      flex-direction: column;
      margin: 0 auto;
`
const OptionsItem = styled.div`
      width: 100%;
      display: flex;
      justify-content: center;
               @media (max-width: ${({theme}) => theme.mobile}) {
          flex-direction: column;
          border: 1px solid   ${({theme}) => theme.colors.darkblue});
  
    }
`
const StyledLabel = styled.label`
      background-color: ${({theme}) => theme.colors.blue};
      color: ${({theme}) => theme.colors.white};
      text-align: center;
      justify-content: center;  
      transition: 0.2s ease-out all;
      font-size: 18px;
      height: 70px;
      width: 300px;
      margin: 6px;
      display: flex;
      text-decoration: none;
      align-items: center;
      @media (max-width: ${({theme}) => theme.mobile}) {
          height: 50px;
      }
`
const StyledInput = styled.input`
    display: block;
    appearance: none;
    outline: 0;
    border: 1px solid white;
    width: 300px;
    border-radius: 3px;
    margin: 6px;
    text-align: center;
    font-size: 18px;
    color: black;
    transition-duration: 0.25s;
    font-weight: 300;
    background-color: ${({theme}) => theme.colors.gray};
          @media (max-width: ${({theme}) => theme.mobile}) {
          height: 50px;
    }
`
const StyledSelect = styled.select`
    display: block;
    appearance: none;
    outline: 0;
    border: 1px solid white;
    width: 300px;
    border-radius: 3px;
    margin: 6px;
    text-align: center;
    font-size: 18px;
    color: black;
    transition-duration: 0.25s;
    font-weight: 300;
    background-color: ${({theme}) => theme.colors.gray};
      text-align-last:center;
               @media (max-width: ${({theme}) => theme.mobile}) {
          height: 50px;
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
`
const Paragraph = styled.p`
    padding: 15px;
`


const SettingsCard = () => {

        const {handleLanguageChange, toggleTheme, locale} = useContext(AppContext);


        return (
            <>
                {/*<Modal/>*/}

                <Heading>
                    <FormattedMessage id="settings"/>
                </Heading>
                <SettingsWrapper>
                    <UserCard>
                        <UserAvatarWrapper src={user} alt="Avatar icon"/>
                        <UserMailWrapper>
                            <Paragraph>
                                <FormattedMessage id="logged as"/>
                                {auth.currentUser.email}
                            </Paragraph>
                            <Button onClick={() => auth.signOut()}>
                                <FormattedMessage id="logout"/>
                            </Button>
                        </UserMailWrapper>
                    </UserCard>
                    <OptionsWrapper>
                        <OptionsItem>
                            <StyledLabel>
                                <FormattedMessage id="change language"/>
                            </StyledLabel>
                            <StyledSelect onChange={handleLanguageChange} defaultValue={locale}>
                                <option value="pl">Polski</option>
                                <option value="en">English</option>
                            </StyledSelect>
                        </OptionsItem>
                        <OptionsItem>
                            <StyledLabel>
                                <FormattedMessage id="dark mode"/>
                            </StyledLabel>
                            <StyledSelect onChange={toggleTheme} defaultValue="off">
                                <option value="on" label="on"/>
                                <option value="off" label="off"/>
                            </StyledSelect>
                        </OptionsItem>
                        <OptionsItem>
                            <StyledLabel>
                                Notifications
                            </StyledLabel>
                            <StyledSelect defaultValue="off">
                                <option value="on" label="on"/>
                                <option value="off" label="off"/>
                            </StyledSelect>
                        </OptionsItem>
                        <OptionsItem>
                            <StyledLabel htmlFor="currentQuantity">
                                <FormattedMessage id="add unit"/>
                            </StyledLabel>
                            <StyledInput/>
                        </OptionsItem>
                    </OptionsWrapper>
                    <Button> About...</Button>
                </SettingsWrapper>
            </>)
    }
;

SettingsCard.propTypes = {
    toggleViewMode: PropTypes.func.isRequired,
    handleChange: PropTypes.func.isRequired,
    locale: PropTypes.string,
}

SettingsCard.defaultProps = {
    locale: 'en'
}


export default SettingsCard;