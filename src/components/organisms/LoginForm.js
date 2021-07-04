import React, {useState} from 'react'
import {Link} from "react-router-dom";
import {FormattedMessage} from "react-intl";
import eyeclosed from "../../assets/img/eyeclosed.svg"
import eyeopen from "../../assets/img/eyeopen.svg"
import PasswordWrapper from "../atoms/PasswordWrapper";
import ItemsContainer from "../atoms/ItemsContainer";
import StyledTitle from "../atoms/StyledTitle";
import FormIcon from "../atoms/FormIcon";
import Paragraph from "../atoms/Paragraph";
import ConfirmButton from "../atoms/ConfirmButton";
import Form from "../atoms/Form";
import StyledPassword from "../atoms/StyledPassword";
import StyledInputAuth from "../atoms/StyledInputAuth";

const LoginForm = ({handleLogin, error, removeBorder}) => {
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
                    <StyledInputAuth
                        onFocus={removeBorder}
                        error={error}
                        type="email"
                        name="email"
                        placeholder="Email"/>
                    <PasswordWrapper>
                        <StyledPassword
                            onFocus={removeBorder}
                            error={error}
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