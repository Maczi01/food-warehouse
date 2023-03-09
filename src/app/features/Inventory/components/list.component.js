import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { Link } from 'react-router-dom';

import bag from '../../../shared/assets/icons/bag.svg';
import { categories } from '../../../shared/utils/item-properties';
import { routes } from '../../../shared/utils/routes';
import {useDecreaseQuantityMutation} from '../mutations/decrease-quantity.mutation';
import {useDeleteInventoryMutation} from '../mutations/delete-inventory.mutation';
import {useIncreaseQuantityMutation} from '../mutations/increase-inventory.mutation';
import ListItem from './list-item.components';
import { CategoryWrapper, EmptyListWrapper, Heading, Image, Paragraph, UlWrapper } from './list.styled';

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
  const deleteItem = useDeleteInventoryMutation();
  const increaseQuantity = useIncreaseQuantityMutation();
  const decreaseQuantity =  useDecreaseQuantityMutation();

  return (
    <>
      <CategoryWrapper>
        <Header category={parameter} />
      </CategoryWrapper>
      <Link to={routes.home.path}>
        <Paragraph>
          <FormattedMessage id="INVENTORY.LIST.GO_BACK_BUTTON" />
        </Paragraph>
      </Link>
      <UlWrapper>
        {items.length ? (
          items.map((item) => (
            <ListItem
              {...item}
              key={item.id}
              deleteItem={() => deleteItem.mutateAsync(item.id)}
              decreaseQuantity={() => decreaseQuantity.mutateAsync(item)}
              increaseQuantity={() => increaseQuantity.mutateAsync(item)}
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
