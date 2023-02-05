import { Field, Form, Formik } from 'formik';
import PropTypes from 'prop-types';
import { FormattedMessage, injectIntl } from 'react-intl';
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import accept from '../../../shared/assets/icons/accept.svg';
import decline from '../../../shared/assets/icons/decline.svg';
import { ButtonContainer, ButtonIcon } from '../../../shared/ui/Button';
import { ErrorText, FormItem, FormWrapper, StyledLabel } from '../../../shared/ui/Form';
import { StyledInput } from '../../../shared/ui/Input';
import { Heading } from '../../../shared/ui/Page';
import { StyledSelect } from '../../../shared/ui/Select';
import { categories, units } from '../../../shared/utils/item-properties';
import { routes } from '../../../shared/utils/routes';
import { ItemFormSchema } from '../item-form.schema';

const EditItemForm = ({ item, editItem, intl }) => {
  const { formatMessage } = intl;

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
        <FormattedMessage id={'PRODUCT.EDIT.HEADER'} />
      </Heading>
      <Formik
        enableReinitialize
        initialValues={item}
        onSubmit={(values, { setSubmitting, resetForm }) => {
          setSubmitting(true);
          handleSubmitForm(values);
          setSubmitting(false);
          resetForm({});
        }}
        validationSchema={ItemFormSchema}
        validateOnChange={false}
        validateOnBlur={false}
      >
        {({ errors, touched, handleBlur, isSubmitting }) => (
          <Form>
            <FormItem>
              <StyledLabel htmlFor={'currentQuantity'}>
                <FormattedMessage id={'PRODUCT.FORM.NAME'} />
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
              <StyledLabel htmlFor={'category'}>
                <FormattedMessage id={'PRODUCT.FORM.CHOOSE_CATEGORY'} />
              </StyledLabel>
              <Field
                name={'category'}
                onBlur={handleBlur}
                as={StyledSelect}
                errors={errors.category && touched.category}
              >
                {categories.map((category) => (
                  <FormattedMessage id={category.translationKey} key={category.name}>
                    {(text) => <option value={category.name}>{text}</option>}
                  </FormattedMessage>
                ))}
              </Field>
            </FormItem>
            {errors.category && touched.category ? <ErrorText>{errors.category}</ErrorText> : null}
            <FormItem>
              <StyledLabel htmlFor={'unit'}>
                <FormattedMessage id={'PRODUCT.FORM.CHOOSE_UNIT'} />
              </StyledLabel>
              <Field
                name={'unit'}
                onBlur={handleBlur}
                placeholder={''}
                errors={errors.category && touched.category}
                as={StyledSelect}
              >
                {units.map((unit) => (
                  <FormattedMessage id={unit.translationKey} key={unit.name}>
                    {(text) => <option value={unit.name}>{text}</option>}
                  </FormattedMessage>
                ))}
              </Field>
            </FormItem>
            {errors.unit && touched.unit ? <ErrorText>{errors.unit}</ErrorText> : null}
            <FormItem>
              <StyledLabel htmlFor={'maximalQuantity'}>
                <FormattedMessage id={'PRODUCT.FORM.MAXIMAL_QUANTITY'} />
              </StyledLabel>
              <Field
                name={'maximalQuantity'}
                type={'number'}
                placeholder={''}
                errors={errors.maximalQuantity && touched.maximalQuantity}
                as={StyledInput}
              />
            </FormItem>
            {errors.maximalQuantity && touched.maximalQuantity ? <ErrorText>{errors.maximalQuantity}</ErrorText> : null}
            <FormItem>
              <StyledLabel htmlFor={'minimalQuantity'}>
                <FormattedMessage id={'PRODUCT.FORM.MINIMAL_QUANTITY'} />
              </StyledLabel>
              <Field
                name={'minimalQuantity'}
                type={'number'}
                placeholder={''}
                errors={errors.minimalQuantity && touched.minimalQuantity}
                as={StyledInput}
              />
            </FormItem>
            {errors.minimalQuantity && touched.minimalQuantity ? <ErrorText>{errors.minimalQuantity}</ErrorText> : null}
            <FormItem>
              <StyledLabel htmlFor={'currentQuantity'}>
                <FormattedMessage id={'PRODUCT.FORM.CURRENT_QUANTITY'} />
              </StyledLabel>
              <Field
                name={'currentQuantity'}
                type={'number'}
                as={StyledInput}
                placeholder={''}
                errors={errors.currentQuantity && touched.currentQuantity}
              />
            </FormItem>
            {errors.currentQuantity && touched.currentQuantity ? <ErrorText>{errors.currentQuantity}</ErrorText> : null}
            <ButtonContainer>
              <Link to={routes.home.path}>
                <ButtonIcon icon={decline} />
              </Link>
              <ButtonIcon disabled={isSubmitting} type={'submit'} icon={accept} />
            </ButtonContainer>
            <ToastContainer autoClose={2500} />
          </Form>
        )}
      </Formik>
    </FormWrapper>
  );
};

EditItemForm.propTypes = {
  item: PropTypes.object,
  editItem: PropTypes.func,
  intl: PropTypes.object,
};

export default injectIntl(EditItemForm);
