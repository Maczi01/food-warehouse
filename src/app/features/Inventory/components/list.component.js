import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import { useInventory } from '../../../services/inventory.store';
import bag from '../../../shared/assets/icons/bag.svg';
import { categories } from '../../../shared/utils/item-properties';
import { routes } from '../../../shared/utils/routes';
import ListItem from './list-item.components';

const UlWrapper = styled.ul`
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

const CategoryWrapper = styled.div`
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

const Paragraph = styled.p`
  margin-top: 10px;
  font-size: 18px;
  font-weight: 600;
  text-decoration: none;
`;

const Image = styled.img`
  margin: 25px;
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
  width: 60vw;
  @media (max-width: ${({ theme }) => theme.mobile}) {
    padding: 9rem 0 1rem;
    font-size: 26px;
    width: 100vw;
  }
`;

const EmptyListWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin: 0 auto;
  width: 60vw;
  font-size: 14px;
`;

const Header = ({ category }) => {
  const categoryName = categories.find((cat) => cat.name === category);

  if (!categoryName) {
    return null;
  }

  return <FormattedMessage id={categoryName.translationKey} />;
};

Header.propTypes = {
  category: PropTypes.string,
};

const List = ({ items, parameter }) => {
  const { increaseQuantity, decreaseQuantity, deleteItem, editItem } = useInventory();

  return (
    <>
      <CategoryWrapper>
        <Header category={parameter} />
      </CategoryWrapper>
      <Link to={routes.home.path}>
        <Paragraph>
          🡄 <FormattedMessage id="INVENTORY.LIST.GO_BACK_BUTTON" />
        </Paragraph>
      </Link>
      <UlWrapper>
        {items.length ? (
          items.map((item) => (
            <ListItem
              {...item}
              key={item.id}
              deleteItem={() => deleteItem(item.id)}
              editItem={editItem}
              decreaseQuantity={() => decreaseQuantity(item)}
              increaseQuantity={() => increaseQuantity(item)}
            />
          ))
        ) : (
          <EmptyListWrapper>
            <Heading>
              <Image src={bag} alt="shopping bag" />
              Nothing here,
              <Link to={routes.product.add.path}>add something</Link>
            </Heading>
          </EmptyListWrapper>
        )}
      </UlWrapper>
    </>
  );
};

List.propTypes = {
  items: PropTypes.array,
  parameter: PropTypes.string.isRequired,
};

List.defaultProps = {
  items: [],
  parameter: 'all',
};

export default List;
