import { Box, Typography } from '@mui/material';
import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { FormattedMessage, injectIntl } from 'react-intl';
import { useParams } from 'react-router-dom';

import FormWrapper from '../../../shared/ui/Form/form-wrapper.component';
import { toast } from '../../../shared/utils/toast';
import { useGetInventoriesQuery } from '../../Inventory/data-access/get-inventories.query';
import { useEditInventoryMutation } from '../../Inventory/data-access/mutations/edit-inventory.mutation';
import ProductForm from '../components/product-form.component';

const EditViewComponent = ({ intl }) => {
  const { id: selectedId } = useParams();
  const editItem = useEditInventoryMutation();
  const inventory = useGetInventoriesQuery();
  const { formatMessage } = intl;

  const item = inventory.data.find((item) => item.id === selectedId);

  const handleSubmit = async (values) => {
    try {
      await editItem.mutateAsync(values);
      toast.success(formatMessage({ id: 'PRODUCT.EDIT.MESSAGE.SUCCESS' }, { name }));
    } catch (error) {
      toast.error(formatMessage({ id: 'PRODUCT.EDIT.MESSAGE.ERROR' }));
    }
  };

  useEffect(() => {
    inventory.refetch();
  }, []);

  if (inventory.isFetching) {
    return <FormattedMessage id="GLOBAL.STATUS.LOADING" />;
  }

  return (
      //   TODO, tu byl <FormWrapper>
    <FormWrapper>
      <Typography variant="h1">
        <FormattedMessage id="PRODUCT.EDIT.HEADER" />
      </Typography>
      <ProductForm onSubmit={handleSubmit} values={item} />
    </FormWrapper>
  );
};

EditViewComponent.propTypes = {
  intl: PropTypes.object,
};

export default injectIntl(EditViewComponent);
