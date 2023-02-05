import { Field, Form, Formik } from 'formik';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { Link } from 'react-router-dom';

import accept from '../../../shared/assets/icons/accept.svg';
import decline from '../../../shared/assets/icons/decline.svg';
import { ButtonContainer, ButtonIcon } from '../../../shared/ui/Button';
import { ErrorText, FormItem, StyledLabel } from '../../../shared/ui/Form';
import { StyledInput } from '../../../shared/ui/Input';
import { StyledSelect } from '../../../shared/ui/Select';
import { categories, units } from '../../../shared/utils/item-properties';
import { routes } from '../../../shared/utils/routes';
import { ProductFormSchema } from './product-form.schema';

const ProductForm = ({ values, onSubmit }) => {
  const handleSubmit = (values) => {
    onSubmit(values);
  };

  return (
    <Formik
      enableReinitialize
      initialValues={values}
      onSubmit={handleSubmit}
      validationSchema={ProductFormSchema}
      validateOnChange={false}
      validateOnBlur={false}
    >
      {({ errors, touched, handleBlur, isSubmitting }) => (
        <Form>
          <FormItem>
            <StyledLabel htmlFor="currentQuantity">
              <FormattedMessage id="PRODUCT.FORM.NAME" />
            </StyledLabel>
            <Field
              name="name"
              type="text"
              placeholder=""
              errors={errors.name && touched.name}
              as={StyledInput}
              data-testid="name"
            />
          </FormItem>
          {errors.name && touched.name ? (
            <ErrorText data-testid="error-name">
              <FormattedMessage id={errors.name} />
            </ErrorText>
          ) : null}
          <FormItem>
            <StyledLabel htmlFor="category">
              <FormattedMessage id="PRODUCT.FORM.CHOOSE_CATEGORY" />
            </StyledLabel>
            <Field
              name="category"
              onBlur={handleBlur}
              as={StyledSelect}
              errors={errors.category && touched.category}
              data-testid="category"
            >
              {categories.map((category) => (
                <FormattedMessage id={category.translationKey} key={category.name}>
                  {(text) => <option value={category.name}>{text}</option>}
                </FormattedMessage>
              ))}
            </Field>
          </FormItem>
          {errors.category && touched.category ? (
            <ErrorText data-testid="error-category">
              <FormattedMessage id={errors.category} />
            </ErrorText>
          ) : null}
          <FormItem>
            <StyledLabel htmlFor="unit">
              <FormattedMessage id="PRODUCT.FORM.CHOOSE_UNIT" />
            </StyledLabel>
            <Field
              name="unit"
              onBlur={handleBlur}
              placeholder=""
              errors={errors.category && touched.category}
              as={StyledSelect}
              data-testid="unit"
            >
              {units.map((unit) => (
                <FormattedMessage id={unit.translationKey} key={unit.name}>
                  {(text) => <option value={unit.name}>{text}</option>}
                </FormattedMessage>
              ))}
            </Field>
          </FormItem>
          {errors.unit && touched.unit ? (
            <ErrorText data-testid="error-unit">
              <FormattedMessage id={errors.unit} />
            </ErrorText>
          ) : null}
          <FormItem>
            <StyledLabel htmlFor="maximalQuantity">
              <FormattedMessage id="PRODUCT.FORM.MAXIMAL_QUANTITY" />
            </StyledLabel>
            <Field
              name="maximalQuantity"
              type="number"
              placeholder=""
              errors={errors.maximalQuantity && touched.maximalQuantity}
              as={StyledInput}
              data-testid="maximalQuantity"
            />
          </FormItem>
          {errors.maximalQuantity && touched.maximalQuantity ? (
            <ErrorText data-testid="error-maximal-quantity">
              <FormattedMessage id={errors.maximalQuantity} />
            </ErrorText>
          ) : null}
          <FormItem>
            <StyledLabel htmlFor="minimalQuantity">
              <FormattedMessage id="PRODUCT.FORM.MINIMAL_QUANTITY" />
            </StyledLabel>
            <Field
              name="minimalQuantity"
              type="number"
              placeholder=""
              errors={errors.minimalQuantity && touched.minimalQuantity}
              as={StyledInput}
              data-testid="minimalQuantity"
            />
          </FormItem>
          {errors.minimalQuantity && touched.minimalQuantity ? (
            <ErrorText data-testid="error-minimal-quantity">
              <FormattedMessage id={errors.minimalQuantity} />
            </ErrorText>
          ) : null}
          <FormItem>
            <StyledLabel htmlFor="currentQuantity">
              <FormattedMessage id="PRODUCT.FORM.CURRENT_QUANTITY" />
            </StyledLabel>
            <Field
              name="currentQuantity"
              type="number"
              as={StyledInput}
              placeholder=""
              errors={errors.currentQuantity && touched.currentQuantity}
              data-testid="currentQuantity"
            />
          </FormItem>
          {errors.currentQuantity && touched.currentQuantity ? (
            <ErrorText data-testid="error-current-quantity">
              <FormattedMessage id={errors.currentQuantity} />
            </ErrorText>
          ) : null}
          <ButtonContainer>
            <Link to={routes.home.path}>
              <ButtonIcon icon={decline} />
            </Link>
            <ButtonIcon disabled={isSubmitting} type="submit" icon={accept} data-testid="accept" />
          </ButtonContainer>
        </Form>
      )}
    </Formik>
  );
};

ProductForm.propTypes = {
  values: PropTypes.object,
  onSubmit: PropTypes.func,
};

export default ProductForm;
