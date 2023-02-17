import { useEffect } from 'react';
import { FormattedMessage } from 'react-intl';
import { useParams } from 'react-router-dom';

import { useInventory } from '../../../services/inventory.hook';
import List from '../components/list.component';
import { Heading } from './main-view.styled';

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
