import styled from "styled-components";
import React, {useState} from 'react'
import {Link} from "react-router-dom";
import {FormattedMessage} from "react-intl";
import eyeclosed from "../../asstets/img/eyeclosed.svg"
import eyeopen from "../../asstets/img/eyeopen.svg"
import SecurityContainer from "../molecules/SecurityContainer";




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

const ItemsContainer = styled.div`
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
`;

const StyledTitle = styled.h2`
    font-size: 20px;
    margin-bottom: 50px;
    letter-spacing: 5px;
    text-align: center;
    opacity: 0.5;
`;

const Button = styled.button`
    padding: 20px 30px;
    margin: 30px;
    outline: none;
    border: none;
    font-size: medium;
    font-weight: 600;
    letter-spacing: 5px;
    border-radius: 5px;
    cursor: pointer;
    background: ${({theme}) => theme.colors.green};
    color: grey;
`;

const Form = styled.form`
    display: flex;
    flex-direction: column;
`;

const Paragraph = styled.p`
    font-size: 20px;
    margin-bottom: 50px;
    letter-spacing: 5px;
    text-align: center;
    opacity: 0.5;
    width: 50vw;
`;

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




const LoginForm = ({handleLogin}) => {
    const [type, setType] = useState(false);

    return (
        <SecurityContainer>
            <StyledTitle>Login</StyledTitle>
            <Paragraph>
                I'm still working on this application, but if you want to try, use this data<br/>
                login: test@test.com <br/>
                password: tested
            </Paragraph>
            <ItemsContainer>
                <Form onSubmit={handleLogin} autocomplete="off">
                    <StyledInput type="email" name="email" placeholder="Email"/>
                    <PasswordWrapper>
                        <StyledPassword type={type ? "text" : "password"} name="password" placeholder="Password"/>
                        <Icon
                            onClick={() => setType(!type)}
                            src={type ? eyeclosed : eyeopen}/>
                    </PasswordWrapper>
                    <Button>
                        <FormattedMessage id="log in"/>
                    </Button>
                </Form>
                <span>
                <FormattedMessage id="have not account"/>
                <Link to="/register">
                <FormattedMessage id="sign up"/>
                </Link>
            </span>
            </ItemsContainer>
        </SecurityContainer>
    )
};

export default LoginForm;