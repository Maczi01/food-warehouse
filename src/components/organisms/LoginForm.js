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
import Form from "../atoms/Form";
import StyledPassword from "../atoms/StyledPassword";

const LoginForm = ({handleLogin}) => {
    const [type, setType] = useState(false);
    return (
        <SecurityContainer>
            <StyledTitle>Login</StyledTitle>
            <Paragraph>
                <FormattedMessage id="Login welcome mesage"/>
            </Paragraph>
            <ItemsContainer>
                <Form
                    onSubmit={handleLogin}
                    autocomplete="off">
                    <StyledInput
                        type="email"
                        name="email"
                        placeholder="Email"/>
                    <PasswordWrapper>
                        <StyledPassword
                            type={type ? "text" : "password"}
                            name="password"
                            placeholder="Password"/>
                        <FormIcon
                            onClick={() => setType(!type)}
                            src={type ? eyeclosed : eyeopen}/>
                    </PasswordWrapper>
                    <ConfirmButton>
                        <FormattedMessage id="log in"/>
                    </ConfirmButton>
                </Form>
                <Paragraph>
                    <FormattedMessage id="have not account"/>
                    <Link to="/register">
                        <FormattedMessage id="sign in"/>
                    </Link>
                </Paragraph>
            </ItemsContainer>
        </SecurityContainer>
    )
};

export default LoginForm;