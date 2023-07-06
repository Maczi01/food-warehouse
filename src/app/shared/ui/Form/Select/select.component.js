import {Box, FormControl, Select as MUISelect} from '@mui/material';
import {useField} from 'formik';
import PropTypes from 'prop-types';
import {useEffect} from 'react';
import {FormattedMessage} from 'react-intl';

import {Error} from '../error.component';
import {Label} from '../label.component';

const styles = {
    wrapper: {
        display: 'flex',
        flexDirection: 'column',
    },
    formControl: {
        display: 'flex', flexDirection: 'row', width: '100%', '@media (max-width: 767px)': {
            flexDirection: 'column',
        }
    },
}
const Select = ({name, label, showError, error, onBlur, options, onChange}) => {
    // eslint-disable-next-line no-unused-vars
    const [field, meta, helpers] = useField(name);

    const handleBlur = (event) => {
        helpers.setTouched(true);

        if (onBlur) {
            onBlur(event);
        }
    };

    const handleChange = (event) => {
        helpers.setValue(event.target.value);

        if (onChange) {
            onChange(event);
        }
    };

    useEffect(() => {
        helpers.setError(error);
    }, [error]);

    return (
        <Box sx={styles.wrapper}>
            <FormControl sx={styles.formControl}>
                <Label name={name} id={label}/>
                <MUISelect
                  name={name}
                  value={field.value}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  data-testid={name}
                >
                    {options.map((option) => (
                        <FormattedMessage id={option.translationKey} key={option.name}>
                            {(text) => (
                                <option key={option.name} value={option.name}>
                                    {text}
                                </option>
                            )}
                        </FormattedMessage>
                    ))}
                </MUISelect>
            </FormControl>
            <Error testid={`error-${name}`} show={showError} message={error}/>
        </Box>
    );
};

Select.propTypes = {
    name: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    showError: PropTypes.bool.isRequired,
    error: PropTypes.string,
    onBlur: PropTypes.func,
    onChange: PropTypes.func,
    options: PropTypes.arrayOf(PropTypes.shape({name: PropTypes.string, translationKey: PropTypes.string})),
};

Select.defaultProps = {
    showError: false,
};

export {Select};
