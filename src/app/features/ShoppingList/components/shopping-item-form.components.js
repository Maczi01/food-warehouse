import {ButtonGroup,FormControl, IconButton, Typography} from '@mui/material';
import {Formik} from 'formik';
import PropTypes from 'prop-types';
import {FormattedMessage, injectIntl} from 'react-intl';

import accept from '../../../shared/assets/icons/accept.svg';
import decline from '../../../shared/assets/icons/decline.svg';
import {FormWrapper} from '../../../shared/ui/Form';
import {Input} from '../../../shared/ui/Form/Input';
import {Select} from '../../../shared/ui/Form/Select';
import {units} from '../../../shared/utils/item-properties';
import {toast} from '../../../shared/utils/toast';
import {ShoppingItemFormSchema} from './shopping-item-form.schema';

const defaultValues = {
    name: '',
    unit: 'piece',
    neededQuantity: 0,
};

const ShoppingItemForm = ({onSubmit, onCancel, intl}) => {
    const {formatMessage} = intl;

    const handleSubmit = async (values) => {
        try {
            await onSubmit(values);
            toast.success(formatMessage({id: 'SHOPPING_LIST.FORM.MESSAGE.SUCCESS'}, {name: values.name}));
        } catch (error) {
            toast.error(formatMessage({id: 'SHOPPING_LIST.FORM.MESSAGE.ERROR'}));
        }
    };

    const handleCancel = () => {
        onCancel();
    };

    return (
      <FormWrapper>
        <Typography variant="h1">
          <FormattedMessage id="SHOPPING_LIST.FORM.ADD_PRODUCT"/>
        </Typography>
        <Formik
          enableReinitialize
          initialValues={defaultValues}
          onSubmit={handleSubmit}
          validationSchema={ShoppingItemFormSchema}
          validateOnChange={false}
          validateOnBlur={false}
        >
          {({errors, touched, handleBlur, isSubmitting}) => (
            <FormControl
              sx={{display: 'flex',
                flexDirection: 'column'}}
            >
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

              <ButtonGroup>
                <IconButton onClick={handleCancel}>
                  <img src={decline} alt="decline"/>
                </IconButton>
                <IconButton type="submit" disabled={isSubmitting}>
                  <img src={accept} alt="accept"/>
                </IconButton>
              </ButtonGroup>
            </FormControl>
                )}
        </Formik>
      </FormWrapper>
    );
};

ShoppingItemForm.propTypes = {
    onSubmit: PropTypes.func,
    onCancel: PropTypes.func,
    intl: PropTypes.object,
};

export default injectIntl(ShoppingItemForm);
