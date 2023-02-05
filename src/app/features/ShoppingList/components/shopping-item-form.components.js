import { Form, Formik } from 'formik';
import PropTypes from 'prop-types';
import { FormattedMessage, injectIntl } from 'react-intl';

import accept from '../../../shared/assets/icons/accept.svg';
import decline from '../../../shared/assets/icons/decline.svg';
import { ButtonContainer, ButtonIcon } from '../../../shared/ui/Button';
import { FormWrapper } from '../../../shared/ui/Form';
import { Input } from '../../../shared/ui/Form/Input';
import { Select } from '../../../shared/ui/Form/Select';
import { Heading } from '../../../shared/ui/Page';
import { units } from '../../../shared/utils/item-properties';
import { toast } from '../../../shared/utils/toast';
import { ShoppingItemFormSchema } from './shopping-item-form.schema';

const defaultValues = {
  name: '',
  unit: '',
  neededQuantity: 0,
};

const ShoppingItemForm = ({ addItemToShoppingList, setShowAddShopModal, intl }) => {
  const { formatMessage } = intl;

  const handleSubmit = (values) => {
    addItemToShoppingList(values);
    notify(values.name);
  };

  const notify = (name) => {
    toast.success(formatMessage({ id: 'SHOPPING_LIST.FORM.MESSAGE.SUCCESS', values: { name } }), {
      position: toast.POSITION.TOP_CENTER,
    });
  };

  return (
    <FormWrapper>
      <Heading>
        <FormattedMessage id="SHOPPING_LIST.FORM.ADD_PRODUCT" />
      </Heading>
      <Formik
        enableReinitialize
        initialValues={defaultValues}
        onSubmit={handleSubmit}
        validationSchema={ShoppingItemFormSchema}
        validateOnChange={false}
        validateOnBlur={false}
      >
        {({ errors, touched, handleBlur }) => (
          <Form>
            <Input
              name="name"
              showError={errors.name && touched.name}
              label="SHOPPING_LIST.FORM.NAME"
              error={errors.name}
            />
            <Select
              name="unit"
              showError={errors.unit && touched.unit}
              label="SHOPPING_LIST.FORM.CHOOSE_UNIT"
              error={errors.unit}
              options={units}
              onBlur={handleBlur}
            />
            <Input
              name="neededQuantity"
              showError={errors.neededQuantity && touched.neededQuantity}
              label="SHOPPING_LIST.FORM.QUANTITY"
              error={errors.neededQuantity}
            />

            <ButtonContainer>
              <ButtonIcon onClick={() => setShowAddShopModal((prev) => !prev)} icon={decline} />
              <ButtonIcon type="submit" icon={accept} />
            </ButtonContainer>
          </Form>
        )}
      </Formik>
    </FormWrapper>
  );
};

ShoppingItemForm.propTypes = {
  addItemToShoppingList: PropTypes.func,
  setShowAddShopModal: PropTypes.func,
  intl: PropTypes.object,
};

export default injectIntl(ShoppingItemForm);
