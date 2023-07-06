import {ButtonGroup, FormControl, IconButton} from '@mui/material';
import {createStyles} from '@mui/styles';
import {Form, Formik} from 'formik';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';

import acceptDisabled from '../../../shared/assets/icons/accept-disabled.svg';
import accept from '../../../shared/assets/icons/accept.svg';
import decline from '../../../shared/assets/icons/decline.svg';
import {Input} from '../../../shared/ui/Form/Input';
import {Select} from '../../../shared/ui/Form/Select';
import {categories, units} from '../../../shared/utils/item-properties';
import {routes} from '../../../shared/utils/routes';
import {ProductFormSchema} from './product-form.schema';

const useStyles = createStyles(() => ({
    image: {
        height: '70px',
    }
}));

const styles = {
    buttonGroup: {display: 'flex', justifyContent: 'flex-end'}
}
const ProductForm = ({values, onSubmit}) => {

    const classes = useStyles();
    const handleSubmit = async (values) => {
        await onSubmit(values);
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
            {({errors, touched, handleBlur, isSubmitting}) => (
                <FormControl sx={{display: 'flex',
                    flexDirection: 'column'}}>
                    <Input name="name" showError={errors.name && touched.name} label="PRODUCT.FORM.NAME"
                           error={errors.name}/>
                    <Select
                        name="category"
                        showError={errors.category && touched.category}
                        label="PRODUCT.FORM.CHOOSE_CATEGORY"
                        error={errors.category}
                        options={categories}
                        onBlur={handleBlur}
                    />
                    <Select
                        name="unit"
                        showError={errors.unit && touched.unit}
                        label="PRODUCT.FORM.CHOOSE_UNIT"
                        error={errors.unit}
                        options={units}
                        onBlur={handleBlur}
                    />
                    <Input
                        name="maximalQuantity"
                        type="number"
                        showError={errors.maximalQuantity && touched.maximalQuantity}
                        label="PRODUCT.FORM.MAXIMAL_QUANTITY"
                        error={errors.maximalQuantity}
                    />
                    <Input
                        name="minimalQuantity"
                        type="number"
                        showError={errors.minimalQuantity && touched.minimalQuantity}
                        label="PRODUCT.FORM.MINIMAL_QUANTITY"
                        error={errors.minimalQuantity}
                    />
                    <Input
                        name="currentQuantity"
                        type="number"
                        showError={errors.currentQuantity && touched.currentQuantity}
                        label="PRODUCT.FORM.CURRENT_QUANTITY"
                        error={errors.currentQuantity}
                    />

                    <ButtonGroup sx={styles.buttonGroup}>
                        <Link to={routes.home.path}>
                            <IconButton icon={decline}>
                                <img style={classes.image} src={decline} alt=""/>
                            </IconButton>
                        </Link>
                        <IconButton
                            disabled={isSubmitting}
                            type="submit"
                            data-testid="accept"
                        >
                            <img style={classes.image} src={isSubmitting ? acceptDisabled : accept} alt=""/>
                        </IconButton>
                    </ButtonGroup>
                </FormControl>
            )}
        </Formik>
    );
};

ProductForm.propTypes = {
    values: PropTypes.object,
    onSubmit: PropTypes.func,
};

export default ProductForm;
