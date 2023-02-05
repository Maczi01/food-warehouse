import styled from 'styled-components';

export const SettingsWrapper = styled.div`
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

export const UserCard = styled.div`
  display: flex;
  justify-content: space-between;
  width: 40vw;
  margin: 0 auto;
  padding: 15px 0;
`;

export const UserAvatarWrapper = styled.img`
  width: 100px;
  height: 100px;
  display: flex;
  justify-content: center;
  margin: 0 auto;
`;

export const UserMailWrapper = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
`;

export const Button = styled.button`
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

export const OptionsWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  margin: 0 auto;
`;

export const OptionsItem = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  @media (max-width: ${({ theme }) => theme.mobile}) {
    flex-direction: column;
    border: 1px solid ${({ theme }) => theme.colors.darkblue});

  }
`;

export const Heading = styled.h1`
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

export const Paragraph = styled.p`
  padding: 15px;
`;
