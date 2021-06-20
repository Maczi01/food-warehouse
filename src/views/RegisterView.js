import React, {useCallback, useContext} from 'react';
import {AuthContext} from "../providers/Auth";
import {auth} from '../firebase/firebaseConfig'
import {Redirect} from 'react-router-dom';
import RegisterForm from "../components/organisms/RegisterForm";
import AuthTemplate from "../components/templates/AuthTemplate";
import {db} from '../firebase/firebaseConfig'

const RegisterView = ({history}) => {

        // const handleRegister = useCallback(
        //     async event => {
        //         event.preventDefault();
        //         const {email, password} = event.target.elements;
        //         try {
        //             await auth.createUserWithEmailAndPassword(email.value, password.value)
        //                 .then(cred => {
        //                     return db.collection('users').doc(cred.user.uid).set({
        //                         foodList: []
        //                     });
        //                 })
        //             history.push("/")
        //         } catch (err) {
        //             console.error("Register Error")
        //             alert("alert");
        //         }
        //     }, [history]
        // );

        const handleRegister = event => {
            event.preventDefault();
            const {email, password} = event.target.elements;
            auth.createUserWithEmailAndPassword(email.value, password.value)
                // .then(cred => {
                //     return db.collection('users').doc(cred.user.uid)
                //         // .set({
                // //         foodList: []
                // //     });
                // })

            history.push("/")
        }

        const {currentUser} = useContext(AuthContext);
        if (currentUser) {
            return <Redirect to="/"/>
        }
        return (
            <AuthTemplate>
                <RegisterForm handleRegister={handleRegister}/>
            </AuthTemplate>
        )
    }
;

export default RegisterView;


