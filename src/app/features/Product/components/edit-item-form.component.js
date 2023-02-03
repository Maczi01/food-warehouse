import { Field, Form, Formik } from 'formik';
import PropTypes from "prop-types";
import React from 'react';
import { FormattedMessage } from 'react-intl';
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
import { ValidationSchemaForFoodList } from '../../../shared/utills/ValidationSchemaForFoodList';
import { properties } from '../../../shared/utills/itemProperties';

const EditItemForm = ({ item, editItem }) => {
  const handleSubmitForm = (values) => {
    editItem(values);
    notify(values.name);
  };

  const notify = (name) => {
    toast.success(`Succesfully edited ${name}`, {
      position: toast.POSITION.TOP_CENTER,
    });
  };

  return (
    <FormWrapper>
      <Heading>
        <FormattedMessage id={'edit product'} />
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
        validationSchema={ValidationSchemaForFoodList}
        validateOnChange={false}
        validateOnBlur={false}
      >
        {({ errors, touched, handleBlur, isSubmitting }) => (
          <Form>
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
              <StyledLabel htmlFor={'category'}>
                <FormattedMessage id={'choose category'} />
              </StyledLabel>
              <Field
                name={'category'}
                onBlur={handleBlur}
                as={StyledSelect}
                errors={errors.category && touched.category}
              >
                {properties.categories.map((category) => (
                  <FormattedMessage
                    id={category}
                    key={category}
                  >
                    {(text) => <option value={category}>{text}</option>}
                  </FormattedMessage>
                ))}
              </Field>
            </FormItem>
            {errors.category && touched.category ? <ErrorText>{errors.category}</ErrorText> : null}
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
              <StyledLabel htmlFor={'maximalQuantity'}>
                <FormattedMessage id={'maximal quantity'} />
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
                <FormattedMessage id={'minimal quantity'} />
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
                <FormattedMessage id={'current quantity'} />
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
              <Link to={'/'}>
                <ButtonIcon icon={decline} />
              </Link>
              <ButtonIcon
                disabled={isSubmitting}
                type={'submit'}
                icon={accept}
              />
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
};

export default EditItemForm;
