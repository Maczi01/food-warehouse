import React, { useContext, useState } from "react";
import { AuthContext } from "../providers/Auth";
import { auth, db } from "../firebase/firebaseConfig";
import { Redirect } from "react-router-dom";
import RegisterForm from "../components/organisms/RegisterForm";
import AuthTemplate from "../components/templates/AuthTemplate";
import { toast, ToastContainer } from "react-toastify";

const RegisterView = ({ history }) => {
  const [error, setError] = useState(false);

  const handleRegister = (event) => {
    event.preventDefault();
    const { email, password } = event.target.elements;
    auth
      .createUserWithEmailAndPassword(email.value, password.value)
      .then((cred) => {
        return db.collection("users").doc(cred.user.uid).set({
          userMail: email.value,
        });
        history.push("/");
      })
      .catch((error) => {
        setError(true);
        notifyErrorLogin(error.message);
        console.log(error);
      });
  };

  const notifyErrorLogin = (error) => {
    toast.error(error, {
      position: toast.POSITION.TOP_CENTER,
    });
  };

  const removeBorder = () => {
    setError(false);
  };

  const { currentUser } = useContext(AuthContext);
  if (currentUser) {
    return <Redirect to="/" />;
  }
  return (
    <AuthTemplate>
      <RegisterForm
        removeBorder={removeBorder}
        error={error}
        handleRegister={handleRegister}
      />
      <ToastContainer autoClose={2500} />
    </AuthTemplate>
  );
};
export default RegisterView;
