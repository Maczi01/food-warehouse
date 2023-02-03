import PropTypes from "prop-types";
import React, { useEffect } from 'react';
import { FormattedMessage } from 'react-intl';
import styled from 'styled-components';

import { useInventory } from '../../../services/inventory.store';
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

const MainViewComponent = ({ match }) => {
  const parameter = match.params.parameter;
  const { state, getForCurrentUser } = useInventory();

  useEffect(() => {
    getForCurrentUser();
  }, []);

  const newFoodList =
    parameter === 'all' ? state.inventory : state.inventory.filter((item) => item.category === parameter);
  return (
    <>
      <Heading>
        <FormattedMessage id={'what in inventory'} />
      </Heading>
      <List
        items={newFoodList}
        parameter={parameter}
      />
    </>
  );
};

MainViewComponent.propTypes = {
    match: PropTypes.object,
};

export default MainViewComponent;
