import React, {useState} from 'react'
import {Link} from "react-router-dom";
import {FormattedMessage} from "react-intl";
import eyeclosed from "../../asstets/img/eyeclosed.svg"
import eyeopen from "../../asstets/img/eyeopen.svg"
import PasswordWrapper from "../atoms/auth/PasswordWrapper";
import ItemsContainer from "../atoms/auth/ItemsContainer";
import StyledInput from "../atoms/auth/StyledInput";
import StyledTitle from "../atoms/auth/StyledTitle";
import FormIcon from "../atoms/auth/FormIcon";
import Paragraph from "../atoms/auth/Paragraph";
import ConfirmButton from "../atoms/auth/ConfirmButton";
import Form from "../atoms/auth/Form";
import StyledPassword from "../atoms/auth/StyledPassword";

const LoginForm = ({handleLogin, previousLoginAttemptFailed}) => {
    const [type, setType] = useState(false);
    return (
        <>
            <StyledTitle>
                <FormattedMessage id="login"/>
            </StyledTitle>
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
                            previousLoginAttemptFailed={previousLoginAttemptFailed}
                            type={type ? "text" : "password"}
                            name="password"
                            placeholder="Password"/>
                        <FormIcon
                            onClick={() => setType(!type)}
                            src={type ? eyeopen : eyeclosed}/>
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
        </>
    )
};

export default LoginForm;