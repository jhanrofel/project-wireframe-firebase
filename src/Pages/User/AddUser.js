import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import Header from "../../Components/Header";
import InputGroup from "../../Components/InputGroup";
import Button from "../../Components/Button";
import { db } from "../../Database/config";
import { collection, addDoc, getDocs } from "firebase/firestore";

function AddUser() {
  const navigate = useNavigate();
  const usersCollectionRef = collection(db, "users");
  const [formValues, setFormValues] = useState({
    fullname: "",
    email: "",
    password: "",
    confirm: "",
  });
  const [formErrors, setFormErrors] = useState({
    fullname: "",
    email: "",
    password: "",
    confirm: "",
  });

  const [users, setUsers] = useState([]);

  const getUsers = async () => {
    const data = await getDocs(usersCollectionRef);
    setUsers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  };

  useEffect(() => {
    getUsers(); // eslint-disable-next-line
  }, []);

  const onChangeHandler = (e) => {
    let name = e.target.name;
    let value = e.target.value;

    switch (name) {
      case "fullname":
        setFormValues((state) => ({ ...state, fullname: value }));
        setFormErrors((state) => ({ ...state, fullname: "" }));
        break;
      case "email":
        setFormValues((state) => ({ ...state, email: value }));
        setFormErrors((state) => ({ ...state, email: "" }));
        break;
      case "password":
        setFormValues((state) => ({ ...state, password: value }));
        setFormErrors((state) => ({ ...state, password: "" }));
        break;
      case "confirm":
        setFormValues((state) => ({ ...state, confirm: value }));
        setFormErrors((state) => ({ ...state, confirm: "" }));
        break;
      default:
        break;
    }
  };

  const onAddUserHandler = async (e) => {
    e.preventDefault();

    if (formValues.fullname === "")
      setFormErrors((state) => ({
        ...state,
        fullname: "Fullname is required.",
      }));
    if (formValues.email === "")
      setFormErrors((state) => ({
        ...state,
        email: "Email is required.",
      }));
    if (formValues.password === "")
      setFormErrors((state) => ({
        ...state,
        password: "Password is required.",
      }));
    if (formValues.confirm === "")
      setFormErrors((state) => ({
        ...state,
        confirm: "Confirm password is required.",
      }));

    if (
      formValues.fullname !== "" &&
      formValues.email !== "" &&
      formValues.password !== "" &&
      formValues.confirm !== ""
    ) {
      try {
        /* email validation */
        const apos = formValues.email.indexOf("@");
        const dotpos = formValues.email.lastIndexOf(".");
        if (apos < 1 || dotpos - apos < 2) throw new Error("Invalid email.");

        if (formValues.password !== formValues.confirm)
          throw new Error("Confirm password does not match.");

        if (users.find((user) => user.email === formValues.email))
          throw new Error("Email exist.");

        await createUser().then(() => navigate("/"));
      } catch (error) {
        alert(error.message);
        return;
      }
    }
  };

  const createUser = async () => {
    await addDoc(usersCollectionRef, {
      fullname: formValues.fullname,
      email: formValues.email,
      password: formValues.password,
    });
  };

  return (
    <div>
      <div className="main">
        <Header text="User Creation" />
        <InputGroup
          type="text"
          label="Full Name"
          name="fullname"
          placeholder="Anne Hunter"
          value={formValues.fullname}
          error={formErrors.fullname}
          onChangeHandler={onChangeHandler}
        />
        <InputGroup
          type="text"
          label="Email"
          name="email"
          placeholder="anne@hunter@mail.com"
          value={formValues.email}
          error={formErrors.email}
          onChangeHandler={onChangeHandler}
        />
        <InputGroup
          type="password"
          label="Password"
          name="password"
          placeholder="******"
          value={formValues.password}
          error={formErrors.password}
          onChangeHandler={onChangeHandler}
        />
        <InputGroup
          type="password"
          label="Confirm Password"
          name="confirm"
          placeholder="******"
          value={formValues.confirm}
          error={formErrors.confirm}
          onChangeHandler={onChangeHandler}
        />
        <p className="formError">{formErrors.form}</p>
        <Button
          name="register"
          text="Back to User List"
          variant="light"
          link="/"
          className={"btn-cyan"}
          onClick={() => navigate("/")}
        />
        <Button
          name="register"
          text="Create"
          variant="light"
          link="/"
          className={"btn-cyan"}
          onClick={onAddUserHandler}
        />
      </div>
    </div>
  );
}

export default AddUser;
