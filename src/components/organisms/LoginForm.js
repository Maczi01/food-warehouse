import styled from "styled-components";
import React, {useState} from 'react'
import {Link} from "react-router-dom";
import {FormattedMessage} from "react-intl";
import eyeclosed from "../../asstets/img/eyeclosed.svg"
import eyeopen from "../../asstets/img/eyeopen.svg"
import SecurityContainer from "../molecules/SecurityContainer";
import PasswordWrapper from "../atoms/PasswordWrapper";
import ItemsContainer from "../atoms/ItemsContainer";
import StyledInput from "../atoms/StyledInput";
import StyledTitle from "../atoms/StyledTitle";
import FormIcon from "../atoms/FormIcon";
import Paragraph from "../atoms/Paragraph";
import ConfirmButton from "../atoms/ConfirmButton";




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

const Form = styled.form`
    display: flex;
    flex-direction: column;
`;






const LoginForm = ({handleLogin}) => {
    const [type, setType] = useState(false);

    return (
        <SecurityContainer>
            <StyledTitle>Login</StyledTitle>
            <Paragraph>
                <FormattedMessage id="Login welcome mesage"/>
            </Paragraph>
            <ItemsContainer>
                <Form onSubmit={handleLogin} autocomplete="off">
                    <StyledInput type="email" name="email" placeholder="Email"/>
                    <PasswordWrapper>
                        <StyledPassword type={type ? "text" : "password"} name="password" placeholder="Password"/>
                        <FormIcon
                            onClick={() => setType(!type)}
                            src={type ? eyeclosed : eyeopen}/>
                    </PasswordWrapper>
                    <ConfirmButton>
                        <FormattedMessage id="log in"/>
                    </ConfirmButton>
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