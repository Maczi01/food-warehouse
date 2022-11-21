import React, {useState} from 'react'
import {Link} from "react-router-dom";
import {FormattedMessage} from "react-intl";

import eyeclosed from "../../../shared/assets/icons/eyeclosed.svg"
import eyeopen from "../../../shared/assets/icons/eyeopen.svg"
import {PasswordWrapper, StyledPassword, StyledInputAuth} from "../../../shared/ui/Input";
import ItemsContainerComponent from "./items-container.component";
import StyledTitleComponent from "./styled-title.component";
import {FormIcon, Form} from "../../../shared/ui/Form";
import {Paragraph} from "../../../shared/ui/Paragraph";
import {ConfirmButton} from "../../../shared/ui/Button";

const LoginForm = ({handleLogin, error, removeBorder}) => {
    const [type, setType] = useState(false);
    return (
        <>
            <StyledTitleComponent>
                <FormattedMessage id="login"/>
            </StyledTitleComponent>
            <Paragraph>
                <FormattedMessage id="Login welcome mesage"/>
            </Paragraph>
            <ItemsContainerComponent>
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
            </ItemsContainerComponent>

        </>
    )
};

export default LoginForm;
