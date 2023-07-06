import { Typography } from '@mui/material';
import PropTypes from 'prop-types';
import { FormattedMessage, injectIntl } from 'react-intl';

import { FormWrapper } from '../../../shared/ui/Form';
import { toast } from '../../../shared/utils/toast';
import { useAddInventoryMutation } from '../../Inventory/data-access/mutations/add-inventory.mutation';
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
  const addItem = useAddInventoryMutation();
  const { formatMessage } = intl;

  const handleSubmit = async (values) => {
    try {
      await addItem.mutateAsync(values);
      toast.success(formatMessage({ id: 'PRODUCT.ADD.MESSAGE.SUCCESS' }, { name: values.name }));
    } catch (error) {
      toast.error(formatMessage({ id: 'PRODUCT.ADD.MESSAGE.ERROR' }));
    }
  };

  return (
    <FormWrapper>
      <Typography variant="h1">
        <FormattedMessage id="PRODUCT.ADD.HEADER" />
      </Typography>
      <ProductForm onSubmit={handleSubmit} values={defaultValues} />
    </FormWrapper>
  );
};

AddViewComponent.propTypes = {
  intl: PropTypes.object,
};

export default injectIntl(AddViewComponent);
