import PropTypes from 'prop-types';
import { FormattedMessage, injectIntl } from 'react-intl';

import { useInventory } from '../../../services/inventory.store';
import { FormWrapper } from '../../../shared/ui/Form';
import { Heading } from '../../../shared/ui/Page';
import { toast } from '../../../shared/utils/toast';
import ProductForm from '../components/product-form.component';

const defaultValues = {
  name: '',
  category: '',
  unit: '',
  currentQuantity: 0,
  minimalQuantity: 0,
  maximalQuantity: 0,
};

const AddViewComponent = ({ intl }) => {
  const { addItem } = useInventory();
  const { formatMessage } = intl;

  const handleSubmitForm = (values) => {
    addItem(values);
    notify(values.name);
  };

  const notify = (name) => {
    toast.success(formatMessage({ id: 'PRODUCT.ADD.MESSAGE.SUCCESS' }, { name }), {
      position: toast.POSITION.TOP_CENTER,
    });
  };

  return (
    <FormWrapper>
      <Heading>
        <FormattedMessage id="PRODUCT.ADD.HEADER" />
      </Heading>
      <ProductForm onSubmit={handleSubmitForm} values={defaultValues} />
    </FormWrapper>
  );
};

AddViewComponent.propTypes = {
  intl: PropTypes.object,
};

export default injectIntl(AddViewComponent);
