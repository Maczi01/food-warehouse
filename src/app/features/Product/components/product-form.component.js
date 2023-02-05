import { Field, Form, Formik } from 'formik';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { Link } from 'react-router-dom';

import accept from '../../../shared/assets/icons/accept.svg';
import decline from '../../../shared/assets/icons/decline.svg';
import { ButtonContainer, ButtonIcon } from '../../../shared/ui/Button';
import { Error, FormItem, StyledLabel } from '../../../shared/ui/Form';
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
          <Error data-testid="error-name" show={touched.name} message={errors.name} />
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
          <Error testid="error-category" show={touched.category} message={errors.category} />
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
          <Error testid="error-unit" show={touched.unit} message={errors.unit} />
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
          <Error testid="error-maximal-quantity" show={touched.maximalQuantity} message={errors.maximalQuantity} />
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
          <Error testid="error-minimal-quantity" show={touched.minimalQuantity} message={errors.minimalQuantity} />
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
          <Error testid="error-current-quantity" show={touched.currentQuantity} message={errors.currentQuantity} />
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
