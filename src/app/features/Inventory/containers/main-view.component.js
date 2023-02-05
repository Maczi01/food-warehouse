import { useEffect } from 'react';
import { FormattedMessage } from 'react-intl';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';

import { useInventory } from '../../../services/inventory.hook';
import List from '../components/list.component';

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
  @media (max-width: ${({ theme }) => theme.mobile}) {
    padding: 9rem 0 1rem;
    font-size: 26px;
    width: 100vw;
  }
`;

const allCategoryName = 'all';

const MainViewComponent = () => {
  const { parameter } = useParams();
  const { state, getForCurrentUser } = useInventory();

  useEffect(() => {
    getForCurrentUser();
  }, []);

  const newFoodList =
    parameter === allCategoryName ? state.inventory : state.inventory.filter((item) => item.category === parameter);

  return (
    <>
      <Heading>
        <FormattedMessage id="INVENTORY.HEADER.WHAT_IN_INVENTORY" />
      </Heading>
      <List items={newFoodList} parameter={parameter} />
    </>
  );
};

export default MainViewComponent;
