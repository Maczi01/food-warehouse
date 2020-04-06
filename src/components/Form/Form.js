import React from 'react'
import AppContext from "../../context/context";
import {v4 as uuidv4} from 'uuid';
import styles from './Form.module.scss'
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

class Form extends React.Component {

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
                        {/*<form onSubmit={(e) => context.addItem(e, this.state)}>*/}
                        <form onSubmit={this.handleSubmitForm}
                              autoComplete="off"
                        >
                            <div className={styles.formItem}>
                                <input className={styles.input}
                                       onChange={this.handleInputChange}
                                       name="name"
                                       type="text"
                                       value={this.state.name}
                                       placeholder=""/>
                                <label className={styles.label} htmlFor="name">
                                    name
                                </label>
                            </div>
                            <div className={styles.formItem}>

                                <input className={styles.input}
                                       onChange={this.handleInputChange}
                                       name="currentQuantity"
                                       type="number"
                                       value={this.state.currentQuantity}
                                       placeholder=""/>
                                <label className={styles.label} htmlFor="currentQuantity">
                                    current quantity
                                </label>
                            </div>
                            <div className={styles.formItem}>
                                <input className={styles.input}
                                       onChange={this.handleInputChange}
                                       name="minimalQuantity"
                                       type="number"
                                       value={this.state.minimalQuantity}
                                       placeholder=""/>
                                <label className={styles.label} htmlFor="minimalQuantity">
                                    minimal quantity
                                </label>
                            </div>
                            <div className={styles.formItem}>
                                <input className={styles.input}
                                       onChange={this.handleInputChange}
                                       name="maximalQuantity"
                                       type="number"
                                       value={this.state.maximalQuantity}
                                       placeholder=""/>
                                <label className={styles.label} htmlFor="maximalQuantity">
                                    maximal quantity
                                </label>
                            </div>
                            <button className={styles.button} onClick={() => this.notify(this.state.name)}>add new
                                item
                            </button>
                            <ToastContainer autoClose={1000}/>
                        </form>
                    </div>
                )}
            </AppContext.Consumer>
        )
    }
    ;
}

export default Form;



