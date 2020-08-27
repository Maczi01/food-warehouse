import styled from "styled-components";
import React, {useState} from 'react'
import {Link} from "react-router-dom";
import {FormattedMessage} from "react-intl";
import eyeclosed from "../../asstets/img/eyeclosed.svg"
import eyeopen from "../../asstets/img/eyeopen.svg"

const RegisterContainer = styled.div`
        align-items: center;
        margin: auto;
        width: 60vw;
        text-align: center;
        background-color: ${({theme}) => theme.colors.yellow};
        border-radius: 10px;
        height: 60vh;
        display: flex;
        flex-direction: column;
        justify-content: center;
        @media (max-width: ${({theme}) => theme.mobile}) {
          width: 100vw;
        }
`

const StyledInput = styled.input`
    margin-bottom: 30px;
    padding: 2px 0;
    padding-bottom: 5px;
    width: 250px;
    background-color: transparent;
    border: none;
    outline: none;
    border-bottom: 1.5px solid;
    border-bottom-color: grey;
    font-weight: 700;
    color: ${({theme}) => theme.colors.blue};
    opacity: 0.55;
`

const ItemsContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`

const StyledTitle = styled.div`
    font-size: 20px;
    margin-bottom: 50px;
    letter-spacing: 5px;
    text-align: center;
    opacity: 0.5;
`

const Button = styled.button`
    padding: 20px 30px;
    margin-top: 30px;
    outline: none;
    border: none;
    font-size: medium;
    font-weight: 600;
    letter-spacing: 5px;
    border-radius: 5px;
    cursor: pointer;
    background: ${({theme}) => theme.colors.green};
    color: grey;
`

const Form = styled.form`
display: flex;
flex-direction: column;
`

const StyledPassword = styled.input`
    margin-bottom: 30px;
    padding: 2px 0;
    padding-bottom: 5px;
    width: 230px;
    background-color: transparent;
    border: none;
    outline: none;
    border-bottom: 1.5px solid;
    border-bottom-color: grey;
    font-weight: 700;
    color: ${({theme}) => theme.colors.blue};
    opacity: 0.55;
`

const Icon = styled.img`
    justify-content: center;
    margin: 0;
    width: 20px;
    height: 20px;
    transition: all .6s ease 0s; 
    :active {
      transform: scale(0.95);
    }
      @media (max-width: ${({theme}) => theme.mobile}) {
        width: 100px;
        height: 100px;
     }
`;

const PasswordWrapper = styled.div`
    display: flex;
`;

const RegisterForm = ({handleRegister}) => {
    const [type, setType] = useState(false);

    return (
        <RegisterContainer>
            <StyledTitle>Login</StyledTitle>
            <ItemsContainer>
                <Form onSubmit={handleRegister} autocomplete="off">
                    <StyledInput type="email" name="email" placeholder="Email"/>
                    <PasswordWrapper>
                        <StyledPassword type={type ? "text" : "password"} name="password" placeholder="Password"/>
                        <Icon
                            onClick={() => setType(!type)}
                            src={type ? eyeclosed : eyeopen}/>
                    </PasswordWrapper>
                    <Button>
                        <FormattedMessage id="sign up"/>
                    </Button>
                </Form>
                <span>
                    Register new account!
                <FormattedMessage id="have account"/>
                <Link to="/login">
                <FormattedMessage id="log in"/>
            </Link>
            </span>
            </ItemsContainer>
        </RegisterContainer>
    );
}
export default RegisterForm;