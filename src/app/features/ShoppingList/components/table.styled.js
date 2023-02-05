import styled from 'styled-components';

export const TableWrapper = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  margin: 0 auto;
  @media (max-width: ${({ theme }) => theme.mobile}) {
    width: 100vw;
  }
`;

export const StyledTable = styled.table`
  padding-top: 15px;
  margin: 20px;
  border: none;
  border-collapse: collapse;
  border-radius: 20px;

  @media (max-width: ${({ theme }) => theme.mobile}) {
    margin: 0 auto;
  }
  td,
  th {
    @media (max-width: ${({ theme }) => theme.mobile}) {
      padding: 20px 20px;
    }
    border: none;
    padding: 20px 50px;
    color: ${({ theme }) => theme.colors.white};
    border-top: 1px solid ${({ theme }) => theme.colors.blue};
  }
  td {
    padding: 20px 50px;
    vertical-align: top;
    color: black;
    @media (max-width: ${({ theme }) => theme.mobile}) {
      padding: 20px 20px;
    }
  }
  thead > tr {
    background-color: ${({ theme }) => theme.colors.blue};
  }
`;
