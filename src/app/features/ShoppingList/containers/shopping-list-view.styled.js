import styled from 'styled-components';

export const TableWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin: 0 auto;
  width: 80vw;
  font-size: 14px;
  overflow-y: auto;

  @media (max-width: ${({ theme }) => theme.mobile}) {
    width: 100vw;
  }
`;

export const Heading = styled.h1`
  padding: 12px;
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

export const Image = styled.img`
  margin: 5px;
  width: 150px;
  height: 150px;
`;
