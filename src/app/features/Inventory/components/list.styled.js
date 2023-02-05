import styled from 'styled-components';

export const UlWrapper = styled.ul`
  width: 75vw;
  padding: 0;
  margin: 40px auto 0;
  overflow-y: auto;
  @media (max-width: ${({ theme }) => theme.mobile}) {
    width: 100vw;
    font-size: 10px;
    margin: 10px auto 0;
  }
`;

export const CategoryWrapper = styled.div`
  margin: 0 auto;
  height: 70px;
  display: flex;
  width: 75vw;
  font-size: 20px;
  align-items: center;
  justify-content: center;
  background-color: ${({ theme }) => theme.colors.yellow};
  color: ${({ theme }) => theme.colors.blue};
  @media (max-width: ${({ theme }) => theme.mobile}) {
    width: 100vw;
  }
`;

export const Paragraph = styled.p`
  margin-top: 10px;
  font-size: 18px;
  font-weight: 600;
  text-decoration: none;
`;

export const Image = styled.img`
  margin: 25px;
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
  width: 60vw;
  @media (max-width: ${({ theme }) => theme.mobile}) {
    padding: 9rem 0 1rem;
    font-size: 26px;
    width: 100vw;
  }
`;

export const EmptyListWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin: 0 auto;
  width: 60vw;
  font-size: 14px;
`;
