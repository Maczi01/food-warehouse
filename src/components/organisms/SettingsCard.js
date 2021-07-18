import React, { useContext } from "react";
import styled from "styled-components";
import user from "../../assets/img/user.svg";
import { auth } from "../../firebase/firebaseConfig";
import { FormattedMessage } from "react-intl";
import { AppContext } from "../../context/context";
import StyledLabel from "../atoms/StyledLabel";
import StyledSelect from "../atoms/StyledSelect";

const SettingsWrapper = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  margin: 0 auto;
  padding: 20px;
  width: 50vw;
  @media (max-width: ${({ theme }) => theme.mobile}) {
    width: 100vw;
  }
`;

const UserCard = styled.div`
  display: flex;
  justify-content: space-between;
  width: 40vw;
  margin: 0 auto;
  padding: 15px 0;
`;

const UserAvatarWrapper = styled.img`
  width: 100px;
  height: 100px;
  display: flex;
  justify-content: center;
  margin: 0 auto;
`;
const UserMailWrapper = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
`;
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
  background: ${({ theme }) => theme.colors.pink};
  color: ${({ theme }) => theme.colors.white};
`;

const OptionsWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  margin: 0 auto;
`;
const OptionsItem = styled.div`
      width: 100%;
      display: flex;
      justify-content: center;
               @media (max-width: ${({ theme }) => theme.mobile}) {
          flex-direction: column;
          border: 1px solid   ${({ theme }) => theme.colors.darkblue});
  
    }
`;

const Heading = styled.h1`
  padding: 10px;
  color: ${({ theme }) => theme.colors.blue};
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin: 0 auto;
  width: 75vw;
`;
const Paragraph = styled.p`
  padding: 15px;
`;

const SettingsCard = () => {
  const { handleLanguageChange, toggleTheme, language } =
    useContext(AppContext);

  return (
    <>
      <Heading>
        <FormattedMessage id="settings" />
      </Heading>
      <SettingsWrapper>
        <UserCard>
          <UserAvatarWrapper src={user} alt="Avatar icon" />
          <UserMailWrapper>
            <Paragraph>
              <FormattedMessage id="logged as" />
              {auth.currentUser.email}
            </Paragraph>
            <Button onClick={() => auth.signOut()}>
              <FormattedMessage id="logout" />
            </Button>
          </UserMailWrapper>
        </UserCard>
        <OptionsWrapper>
          <OptionsItem>
            <StyledLabel>
              <FormattedMessage id="change language" />
            </StyledLabel>
            <StyledSelect
              onChange={handleLanguageChange}
              defaultValue={language.locale}
              data-testid="select-option"
            >
              <option value="pl">Polski</option>
              <option value="en">English</option>
            </StyledSelect>
          </OptionsItem>
          <OptionsItem>
            <StyledLabel>
              <FormattedMessage id="dark mode" />
            </StyledLabel>
            <StyledSelect onChange={toggleTheme} defaultValue="off">
              <option value="on" label="on" />
              <option value="off" label="off" />
            </StyledSelect>
          </OptionsItem>
        </OptionsWrapper>
      </SettingsWrapper>
    </>
  );
};
export default SettingsCard;
