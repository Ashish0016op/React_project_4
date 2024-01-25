import React, { useState, useReducer } from 'react';

import Card from '../UI/Card/Card';
import classes from './Login.module.css';
import Button from '../UI/Button/Button';

const emailReducer = (state, action) => {
  if (action.type === 'email') {
    return {value: action.value, isValid: action.value.includes('@') };
  }
  if(action.type==='email_blur'){
    return {value:state.value,isValid:false};
  }
  return {value:'',isValid:false};
};

const passReducer = (state, action) => {
  if (action.type === 'password') {
    return {value: action.value, isValid: action.value.trim().length>6 };
  }
  if(action.type==='password_blur'){
    return {value:state.value,isValid:false}
  }
  return {value:'',isValid:false};
};

const Login = (props) => {
  const [enteredCollege, setEnteredCollege] = useState('');
  const [collegeIsValid, setCollegeIsValid] = useState();
  const [formIsValid, setFormIsValid] = useState(false);
  const [emailState, emailDispatch] = useReducer(emailReducer, {
    value: '',
    isValid: false,
  });
  const [passwordState, passDispatch] = useReducer(passReducer, {
    value: '',
    isValid: false,
  });

  const emailChangeHandler = (event) => {
    emailDispatch({
      type: 'email',
      value: event.target.value,
    });
    setFormIsValid(
      event.target.value.includes('@')
    )
  };

  const passwordChangeHandler = (event) => {
    passDispatch({
      type: 'password',
      value: event.target.value,
    });
    setFormIsValid(
      emailState.value.includes('@') && event.target.value.trim().length>6
    )
  };

  const collegeChangeHandler = (event) => {
    setEnteredCollege(event.target.value);
  };

  const validateEmailHandler = () => {
    emailDispatch({
      type: 'email_blur',
    });
  };

  const validatePasswordHandler = () => {
    passDispatch({
      type: 'password_blur',
    });
    
  };

  const validateCollegeHandler = () => {
    setCollegeIsValid(enteredCollege !== '');
  };
  const submitHandler = (event) => {
    event.preventDefault();
    props.onLogin(emailState.value, passwordState.value);
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <div
          className={`${classes.control} ${
            emailState.isValid === false ? classes.invalid : ''
          }`}
        >
          <label htmlFor="email">E-Mail</label>
          <input
            type="email"
            id="email"
            value={emailState.value}
            onChange={emailChangeHandler}
            onBlur={validateEmailHandler}
          />
        </div>
        <div
          className={`${classes.control} ${
            passwordState.isValid === false ? classes.invalid : ''
          }`}
        >
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={passwordState.value}
            onChange={passwordChangeHandler}
            onBlur={validatePasswordHandler}
          />
        </div>
        <div
          className={`${classes.control} ${
            collegeIsValid === false ? classes.invalid : ''
          }`}
        >
          <label htmlFor="college">College Name</label>
          <input
            type="text"
            id="college"
            value={enteredCollege}
            onChange={collegeChangeHandler}
            onBlur={validateCollegeHandler}
          />
        </div>
        <div className={classes.actions}>
          <Button type="submit" className={classes.btn} disabled={!formIsValid}>
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;
