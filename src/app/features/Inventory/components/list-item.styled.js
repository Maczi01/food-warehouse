import styled from 'styled-components';

export const ItemWrapper = styled.li`
    display: flex;
    justify-content: space-between;
    margin: 10px 0;
    align-items: center;
    color: ${({ theme }) => theme.colors.blue};
    @media (max-width: ${({ theme }) => theme.mobile}) {
        width: 100vw;
        flex-direction: column;
        border: 2px solid ${({ theme }) => theme.colors.blue};
    }
    animation: appear 0.3s ease;
    position: relative;
    @keyframes appear {
      0% {
        opacity: 0;
        top: 30px;
    }
      100% {
        opacity: 1;
        top: 0;
    }
    
`;

export const NameWrapper = styled.span`
  font-size: 14px;
  width: 100px;
  margin: 0 auto;
  margin-bottom: 20px;
  @media (max-width: ${({ theme }) => theme.mobile}) {
    font-size: 1.2rem;
    margin: 0 auto;
    width: auto;
  }
`;

export const InfoWrapper = styled.span`
  font-size: 14px;
  width: 100px;
  margin: 0 20px;
  margin-bottom: 20px;
  align-items: center;
  @media (max-width: ${({ theme }) => theme.mobile}) {
    font-size: 1.2rem;
    width: auto;
  }
`;

export const StyledButton = styled.img`
  margin: 0 30px;
  margin-bottom: 20px;
  height: 40px;
  width: 40px;
  cursor: pointer;
  justify-content: space-around;
  @media (max-width: ${({ theme }) => theme.mobile}) {
    height: 30px;
    width: auto;
  }
`;

export const Container = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 10px;
`;

export const QuantityBarOutside = styled.div`
  margin: 0 auto;
  width: 300px;
  border: 4px solid ${({ theme }) => theme.colors.blue};
  height: 30px;
  margin-bottom: 20px;
  padding: 4px;
  @media (max-width: ${({ theme }) => theme.mobile}) {
    margin-bottom: 10px;
  }
`;

export const QuantityBarInside = styled.div`
  height: 100%;
  background-color: ${({ theme }) => theme.colors.green};
`;
