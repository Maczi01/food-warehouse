import PropTypes from 'prop-types';
import { FormattedMessage, injectIntl } from 'react-intl';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

import { useInventory } from '../../../services/inventory.store';
import { FormWrapper } from '../../../shared/ui/Form';
import { Heading } from '../../../shared/ui/Page';
import ProductForm from '../components/product-form.component';

const EditViewComponent = ({ intl }) => {
  const { id: selectedId } = useParams();
  const { state, editItem } = useInventory();
  const { formatMessage } = intl;

  const item = state.inventory.find((item) => item.id === selectedId);

  const handleSubmitForm = (values) => {
    editItem(values);
    notify(values.name);
  };

  const notify = (name) => {
    toast.success(formatMessage({ id: 'PRODUCT.EDIT.MESSAGE.SUCCESS', values: { name } }), {
      position: toast.POSITION.TOP_CENTER,
    });
  };

  return (
    <FormWrapper>
      <Heading>
        <FormattedMessage id="PRODUCT.EDIT.HEADER" />
      </Heading>
      <ProductForm onSubmit={handleSubmitForm} values={item} />
    </FormWrapper>
  );
};

EditViewComponent.propTypes = {
  intl: PropTypes.object,
};

export default injectIntl(EditViewComponent);
