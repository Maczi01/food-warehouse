import React from 'react';
import styled from "styled-components";
import user from '../asstets/img/user.svg'
import {auth} from "../firebase/firebase";


const SettingsWrapper = styled.div`
      display: flex;
      justify-content: center;
      //align-items: center;
      flex-direction: column;
      margin: 0 auto;
      padding: 20px;
      width: 50vw;
      //background-color: orange;
`;

const UserCard = styled.div`
      //padding-top: 10px;
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
     //justify-content: center;
     align-items: center;
     flex-direction: column;
`
const Button = styled.button`
    //padding: 20px 30px;
    //margin-top: 30px;
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

const OptionsWrapper = styled.div`
      width: 100%;
      display: flex;
      flex-direction: column;
      margin: 0 auto;
      //justify-content: center;
      //align-items: center;
`
const OptionsItem = styled.div`
      width: 100%;
      display: flex;
      justify-content: center;
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

    // &:focus{
    //       width: 300px;
    //
    //   background-color: #bcffb8;
    // }
    //
    // &:focus{
    //   width: 300px;
    //       background-color: ${({theme}) => theme.colors.gray};

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

    // &:focus{
    //       width: 300px;
    //
    //   background-color: #bcffb8;
    // }
    //
    // &:focus{
    //   width: 300px;
    //       background-color: ${({theme}) => theme.colors.gray};

  }
`

const Heading = styled.h1`
     //margin-top: 30px;
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

const notify = () => {
    // toast.success("Wylogowano!", {
    //     position: toast.POSITION.TOP_CENTER
    // });
    console.log("dupa")
}

const SettingsCard = () => (
    <>
        <Heading>Ustawienia</Heading>
        <SettingsWrapper>
            <UserCard>
                <UserAvatarWrapper src={user} alt="Avatar icon"/>
                <UserMailWrapper>
                    <Paragraph>Jesteś zalogowany jako {auth.currentUser.email}</Paragraph>
                    <Button onClick={() => auth.signOut()}>Wyloguj</Button>
                </UserMailWrapper>
            </UserCard>
            <OptionsWrapper>
                <OptionsItem>
                    <StyledLabel>Zmień język</StyledLabel>
                    <StyledSelect>
                        <option>Polski</option>
                        <option>English</option>
                    </StyledSelect>
                </OptionsItem>
                <OptionsItem>
                    <StyledLabel>Tryb ciemny</StyledLabel>
                    <StyledSelect

                    >
                        <option value="on" label="Włączony"/>
                        <option value="off" label="Wyłączony"/>
                    </StyledSelect>
                </OptionsItem>
                <OptionsItem>
                    <StyledLabel>Tryb ciemny</StyledLabel>
                    <StyledSelect
                    >
                        <option value="on" label="Włączony"/>
                        <option value="off" label="Wyłączony"/>
                    </StyledSelect>
                </OptionsItem>
                <OptionsItem>
                    <StyledLabel htmlFor="currentQuantity">
                        Dodaj jednostkę
                    </StyledLabel>
                    <StyledInput/>

                </OptionsItem>
                <OptionsItem>
                    <StyledLabel htmlFor="currentQuantity">
                        Dodaj kategorię
                    </StyledLabel>
                    <StyledInput/>

                </OptionsItem>
            </OptionsWrapper>
        </SettingsWrapper>
    </>
)

export default SettingsCard;