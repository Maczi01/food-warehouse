import PropTypes from 'prop-types';
import { FormattedMessage, injectIntl } from 'react-intl';

import { useInventory } from '../../../services/inventory.store';
import { FormWrapper } from '../../../shared/ui/Form';
import { Heading } from '../../../shared/ui/Page';
import { toast } from '../../../shared/utils/toast';
import ProductForm from '../components/product-form.component';

const defaultValues = {
  name: '',
  category: 'all',
  unit: 'piece',
  currentQuantity: 0,
  minimalQuantity: 0,
  maximalQuantity: 0,
};

const AddViewComponent = ({ intl }) => {
  const { addItem } = useInventory();
  const { formatMessage } = intl;

  const handleSubmit = async (values) => {
    try {
      await addItem(values);
      toast.success(formatMessage({ id: 'PRODUCT.ADD.MESSAGE.SUCCESS' }, { name: values.name }));
    } catch (error) {
      toast.error(formatMessage({ id: 'PRODUCT.ADD.MESSAGE.ERROR' }));
    }
  };

  return (
    <FormWrapper>
      <Heading>
        <FormattedMessage id="PRODUCT.ADD.HEADER" />
      </Heading>
      <ProductForm onSubmit={handleSubmit} values={defaultValues} />
    </FormWrapper>
  );
};

AddViewComponent.propTypes = {
  intl: PropTypes.object,
};

export default injectIntl(AddViewComponent);
