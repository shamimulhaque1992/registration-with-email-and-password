import {
  createUserWithEmailAndPassword,
  getAuth,
  sendEmailVerification,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  updateProfile
} from "firebase/auth";
import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import app from "../../firebase.init";

const auth = getAuth(app);
const Forms = () => {
  const [registered, setRegistered] = useState(false);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [resetsuccess, setResetSuccess] = useState("");
  const [confermation, setConfermation] = useState("");
  const [password, setPassword] = useState("");
  const [validated, setValidated] = useState(false);
  const handleFormSubmit = (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.stopPropagation();
      return;
    }
    if (!/(?=.*?[#?!@$%^&*-])/.test(password)) {
      alert("Please enter atleast one special character");
      setError("password should be atleast one character");
      return;
    }
    setConfermation("Welcome");

    setValidated(true);

    if (registered) {
      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          console.log(user);
          setPassword("");
          setEmail("");
          // ...
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredentials) => {
          const user = userCredentials.user;
          console.log(user);
          setPassword("");
          setEmail("");
          veryfyEmail();
          setUsername();
          // setEmail(user)
        })
        .catch((error) => {
          console.log(error);
        });
    }

    e.preventDefault();
  };


  const setUsername = () => {
    updateProfile(auth.currentUser, {displayName: name})
    .then(() => {
      setConfermation("User data recorded!")
    })
    .catch((error) => {
      console.log(error);
    })
  }
  const handleNameBlur = (e) => {
    setName(e.target.value);
  }
  const handleEmailBlur = (e) => {
    setEmail(e.target.value);
  };
  const handlePasswordBlur = (e) => {
    setPassword(e.target.value);
  };

  const handleOneChangeRegistered = (e) => {
    setRegistered(e.target.checked);
  };

  const veryfyEmail = (e) => {
    sendEmailVerification(auth.currentUser).then(() => {
      console.log("email veryfication sent");
    });
  };

  const handlePasswordReset = (e) => {
    sendPasswordResetEmail(auth, email)
      .then(() => {
        setResetSuccess("An Email has been sent to reset your password");
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <div className="registration w-50 mx-auto mt-5">
      <h1 className="text-primary">
        Please {registered ? "Login" : "Register"}!!
      </h1>
      <Form noValidate validated={validated} onSubmit={handleFormSubmit}>
        {!registered && <Form.Group className="mb-3" controlId="formBasicName">
          <Form.Label>Name</Form.Label>
          <Form.Control
            onBlur={handleNameBlur}
            type="text"
            placeholder="Your name"
            required
          />
          
          <Form.Control.Feedback type="invalid">
            Please provide your name.
          </Form.Control.Feedback>
        </Form.Group>}
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            onBlur={handleEmailBlur}
            type="email"
            placeholder="Enter email"
            required
          />
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
          <Form.Control.Feedback type="invalid">
            Please provide a valid city.
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            onBlur={handlePasswordBlur}
            type="password"
            placeholder="Password"
            required
          />
          <Form.Control.Feedback type="invalid">
            Please provide a valid Password.
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicCheckbox">
          <Form.Check
            onChange={handleOneChangeRegistered}
            type="checkbox"
            label="Check me out"
          />
        </Form.Group>
        <p className="text-danger">{error}</p>
        <p className="text-success">{confermation}</p>
        <p className="text-success">{resetsuccess}</p>
        <Button onClick={handlePasswordReset} variant="link">
          Forget Password?
        </Button>
        <br />
        <Button variant="primary" type="submit">
          {registered ? "Login" : "Register"}
        </Button>
      </Form>
    </div>
  );
};

export default Forms;
