import PropTypes from "prop-types";
import React from 'react';
import { FormattedMessage } from 'react-intl';
import styled from 'styled-components';

import user from '../../../shared/assets/icons/user.svg';
import { useTheme } from '../../../shared/theme/theme';
import { StyledLabel } from '../../../shared/ui/Form';
import { StyledSelect } from '../../../shared/ui/Select';
import { useLanguage } from '../../../shared/utills/Translation';

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
    border: 1px solid ${({ theme }) => theme.colors.darkblue});

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

const SettingsCard = ({ signOut, currentMail }) => {
  const { changeLanguage, language } = useLanguage();
  const { toggleTheme } = useTheme();
  return (
    <>
      <Heading>
        <FormattedMessage id={'settings'} />
      </Heading>
      <SettingsWrapper>
        <UserCard>
          <UserAvatarWrapper
            src={user}
            alt={'Avatar icon'}
          />
          <UserMailWrapper>
            <Paragraph>
              <FormattedMessage id={'logged as'} />
              {currentMail}
            </Paragraph>
            <Button
              onClick={() => signOut()}
              data-testid={'signOut'}
            >
              <FormattedMessage id={'logout'} />
            </Button>
          </UserMailWrapper>
        </UserCard>
        <OptionsWrapper>
          <OptionsItem>
            <StyledLabel>
              <FormattedMessage id={'change language'} />
            </StyledLabel>
            <StyledSelect
              onChange={changeLanguage}
              defaultValue={language.locale}
              data-testid={'language'}
            >
              <option value={'pl'}>Polski</option>
              <option value={'en'}>English</option>
            </StyledSelect>
          </OptionsItem>
          <OptionsItem>
            <StyledLabel data-testid={'label'}>
              <FormattedMessage id={'dark mode'} />
            </StyledLabel>
            <StyledSelect
              onChange={toggleTheme}
              defaultValue={'off'}
              data-testid={'theme'}
            >
              <option
                value={'on'}
                label={'on'}
              />
              <option
                value={'off'}
                label={'off'}
              />
            </StyledSelect>
          </OptionsItem>
        </OptionsWrapper>
      </SettingsWrapper>
    </>
  );
};

SettingsCard.propTypes = {
  signOut: PropTypes.func,
  currentMail: PropTypes.string,
};
export default SettingsCard;
