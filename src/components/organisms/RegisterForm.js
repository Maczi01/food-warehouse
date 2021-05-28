import styled from "styled-components";
import React, {useState} from 'react'
import {Link} from "react-router-dom";
import {FormattedMessage} from "react-intl";
import eyeclosed from "../../asstets/img/eyeclosed.svg"
import eyeopen from "../../asstets/img/eyeopen.svg"
import SecurityContainer from "../molecules/SecurityContainer";
import StyledTitle from "../atoms/StyledTitle";
import StyledInput from "../atoms/StyledInput";
import PasswordWrapper from "../atoms/PasswordWrapper";
import StyledPassword from "../atoms/StyledPassword";
import FormIcon from "../atoms/FormIcon";
import Button from "../atoms/Button";
import ItemsContainer from "../atoms/ItemsContainer";
import Form from "../atoms/Form";
import ConfirmButton from "../atoms/ConfirmButton";
import Paragraph from "../atoms/Paragraph";

const RegisterForm = ({handleRegister}) => {
    const [type, setType] = useState(false);
    return (
        <SecurityContainer>
            <StyledTitle>Login</StyledTitle>
            <ItemsContainer>
                <Form
                    onSubmit={handleRegister}
                    autocomplete="off">
                    <StyledInput
                        type="email"
                        name="email"
                        placeholder="Email"/>
                    <PasswordWrapper>
                        <StyledPassword type={type ? "text" : "password"} name="password" placeholder="Password"/>
                        <FormIcon
                            onClick={() => setType(!type)}
                            src={type ? eyeclosed : eyeopen}/>
                    </PasswordWrapper>
                    <ConfirmButton>
                        <FormattedMessage id="sign up"/>
                    </ConfirmButton>
                </Form>
                <Paragraph>
                    Register new account! Its free!
                    <FormattedMessage id="sign up"/>
                    <FormattedMessage id="have account"/>
                    <Link to="/login">
                        <FormattedMessage id="log in"/>
                    </Link>
                </Paragraph>
            </ItemsContainer>
        </SecurityContainer>
    );
}
export default RegisterForm;