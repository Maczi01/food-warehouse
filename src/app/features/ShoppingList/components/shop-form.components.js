import { Field, Form, Formik } from 'formik';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import accept from '../../../shared/assets/icons/accept.svg';
import decline from '../../../shared/assets/icons/decline.svg';
import { ButtonContainer, ButtonIcon } from '../../../shared/ui/Button';
import { ErrorText, FormItem, FormWrapper, StyledLabel } from '../../../shared/ui/Form';
import { StyledInput } from '../../../shared/ui/Input';
import { Heading } from '../../../shared/ui/Page';
import { StyledSelect } from '../../../shared/ui/Select';
import { properties } from '../../../shared/utills/item-properties';
import { ShoppingListSchema } from '../../../shared/utills/shopping-list.schema';

const ShopForm = ({ addItemToShoppingList, setShowAddShopModal }) => {
  const handleSubmitForm = (values) => {
    addItemToShoppingList(values);
    notify(values.name);
  };

  const notify = (name) => {
    toast.success(`Succesfully added ${name}`, {
      position: toast.POSITION.TOP_CENTER,
    });
  };

  return (
    <FormWrapper>
      <Heading>
        <FormattedMessage id={'add product'} />
      </Heading>
      <Formik
        enableReinitialize
        initialValues={{
          name: '',
          unit: '',
          neededQuantity: 0,
        }}
        onSubmit={(values, { setSubmitting, resetForm }) => {
          setSubmitting(true);
          handleSubmitForm(values);
          setSubmitting(false);
          resetForm({});
        }}
        validationSchema={ShoppingListSchema}
        validateOnChange={false}
        validateOnBlur={false}
      >
        {({ errors, touched, handleBlur, handleSubmit }) => (
          <Form
            autoComplete={'off'}
            onSubmit={handleSubmit}
          >
            <FormItem>
              <StyledLabel htmlFor={'currentQuantity'}>
                <FormattedMessage id={'name'} />
              </StyledLabel>
              <Field
                name={'name'}
                type={'text'}
                placeholder={''}
                errors={errors.name && touched.name}
                as={StyledInput}
              />
            </FormItem>
            {errors.name && touched.name ? <ErrorText>{errors.name}</ErrorText> : null}
            <FormItem>
              <StyledLabel htmlFor={'unit'}>
                <FormattedMessage id={'choose unit'} />
              </StyledLabel>
              <Field
                name={'unit'}
                onBlur={handleBlur}
                placeholder={''}
                errors={errors.category && touched.category}
                as={StyledSelect}
              >
                {properties.units.map((unit) => (
                  <FormattedMessage
                    id={unit}
                    key={unit}
                  >
                    {(text) => <option value={text}>{unit}</option>}
                  </FormattedMessage>
                ))}
              </Field>
            </FormItem>
            {errors.unit && touched.unit ? <ErrorText>{errors.unit}</ErrorText> : null}

            <FormItem>
              <StyledLabel htmlFor={'neededQuantity'}>
                <FormattedMessage id={'quantity'} />
              </StyledLabel>
              <Field
                name={'neededQuantity'}
                type={'number'}
                as={StyledInput}
                placeholder={''}
                errors={errors.neededQuantity && touched.neededQuantity}
              />
            </FormItem>
            {errors.neededQuantity && touched.neededQuantity ? <ErrorText>{errors.neededQuantity}</ErrorText> : null}
            <ButtonContainer>
              <ButtonIcon
                onClick={() => setShowAddShopModal((prev) => !prev)}
                icon={decline}
              />
              <ButtonIcon
                type={'submit'}
                icon={accept}
              />
            </ButtonContainer>
          </Form>
        )}
      </Formik>
    </FormWrapper>
  );
};

ShopForm.propTypes = {
  addItemToShoppingList: PropTypes.func,
  setShowAddShopModal: PropTypes.func,
};

export default ShopForm;
