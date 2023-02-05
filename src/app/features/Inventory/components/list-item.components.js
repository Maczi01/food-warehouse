import PropTypes from 'prop-types';
import { useNavigate } from 'react-router';

import edit from '../../../shared/assets/icons/edit.svg';
import minus from '../../../shared/assets/icons/minus.svg';
import plus from '../../../shared/assets/icons/plus.svg';
import remove from '../../../shared/assets/icons/remove.svg';
import { routes } from '../../../shared/utils/routes';
import {
  Container,
  InfoWrapper,
  ItemWrapper,
  NameWrapper,
  QuantityBarInside,
  QuantityBarOutside,
  StyledButton,
} from './list-item.styled';

const ListItem = ({
  id,
  name,
  unit,
  currentQuantity,
  maximalQuantity,
  decreaseQuantity,
  increaseQuantity,
  deleteItem,
}) => {
  const navigate = useNavigate();
  return (
    <ItemWrapper data-testid="item">
      <Container>
        <NameWrapper data-testid="itemName">{name}</NameWrapper>
        <InfoWrapper data-testid="itemUnit">{unit} </InfoWrapper>
        <InfoWrapper data-testid="itemQuantities">
          {currentQuantity} z {maximalQuantity}
        </InfoWrapper>
      </Container>
      <QuantityBarOutside>
        <QuantityBarInside style={{ width: `${(currentQuantity / maximalQuantity) * 100}%` }} />
      </QuantityBarOutside>
      <Container>
        <StyledButton src={minus} onClick={decreaseQuantity} data-testid="decreaseQuantity" />
        <StyledButton src={plus} onClick={increaseQuantity} data-testid="increaseQuantity" />
        <StyledButton src={edit} onClick={() => navigate(routes.product.edit.url(id))} data-testid="editItem" />
        <StyledButton src={remove} onClick={deleteItem} data-testid="deleteItem" />
      </Container>
    </ItemWrapper>
  );
};

const NumberOrStringType = PropTypes.oneOfType([PropTypes.string, PropTypes.number]);

ListItem.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  unit: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  deleteItem: PropTypes.func.isRequired,
  decreaseQuantity: PropTypes.func,
  increaseQuantity: PropTypes.func,
  maximalQuantity: NumberOrStringType.isRequired,
  currentQuantity: NumberOrStringType.isRequired,
};

ListItem.defaultProps = {
  currentQuantity: 0,
};

export default ListItem;
