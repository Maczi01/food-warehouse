import React from 'react'
import AppContext from "../../context/context";
import {v4 as uuidv4} from 'uuid';
import styles from './Form.module.scss'
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {Formik, Form} from 'formik';
import accept from '../../asstets/img/accept.svg'
import decline from '../../asstets/img/decline.svg'


class Formm extends React.Component {

    state = {
        id: "",
        name: "",
        currentQuantity: "",
        minimalQuantity: "",
        maximalQuantity: "",
    };

    handleInputChange = e => {
        this.setState({
            [e.target.name]: e.target.value,
        });
    };

    handleSubmitForm = e => {
        const {addItem} = this.props
        addItem(e, this.state);
        this.setState({
            id: 0,
            name: "",
            currentQuantity: "",
            minimalQuantity: "",
            maximalQuantity: "",
        });
    };

    notify = () => {
        toast.success("Dodano", {
            position: toast.POSITION.TOP_CENTER
        });
    }

    render() {

        return (
            <AppContext.Consumer>
                {context => (
                    <div className={styles.wrapper}>
                        <h2>Dodaj nowy produkt</h2>
                        <Formik
                            initialValues={{name: 'xxx', currentQuantity: '', minimalQuantity: '', maximalQuantity: ''}}
                            onSubmit={this.handleSubmitForm}
                        >
                            {() => (
                                <Form>
                                    <div className={styles.formItem}>
                                        <input className={styles.input}
                                               onChange={this.handleInputChange}
                                               name="name"
                                               type="text"
                                               value={this.state.name}
                                               placeholder=""/>
                                    </div>
                                    <div className={styles.formItem}>

                                        <input className={styles.input}
                                               onChange={this.handleInputChange}
                                               name="currentQuantity"
                                               type="number"
                                               value={this.state.currentQuantity}
                                               placeholder=""/>
                                    </div>
                                    <div className={styles.formItem}>
                                        <input className={styles.input}
                                               onChange={this.handleInputChange}
                                               name="minimalQuantity"
                                               type="number"
                                               value={this.state.minimalQuantity}
                                               placeholder=""/>
                                    </div>
                                    <div className={styles.formItem}>
                                        <input className={styles.input}
                                               onChange={this.handleInputChange}
                                               name="maximalQuantity"
                                               type="number"
                                               value={this.state.maximalQuantity}
                                               placeholder=""/>
                                    </div>
                                    <button onClick={console.log("ok")} type="submit" className={styles.button}>add new item</button>
                                </Form>
                            )}
                        </Formik>
                    </div>
                )}
            </AppContext.Consumer>
        )
    }
}
;


export default Formm;




