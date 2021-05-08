import logo from './logo.svg';
import 'bootstrap/dist/css/bootstrap.min.css';
import ReCAPTCHA from "react-google-recaptcha"
import './App.css'
import {
  Container, Col, Form,
  FormGroup, Label, Input,
  Button,
} from 'reactstrap';
import { emailRex, pincodeRex } from './utils/constants'
import { postData, validateReCaptcha } from './utils/ApiService'
import React, { useState } from "react";
function App() {
  const [state, setState] = useState({
    email: '',
    age: '',
    pincode: '',
  });
  const [validate, setValidate] = useState({
    email: '',
    age: '',
    pincode: '',
    recaptcha: false
  })

  const onChange = async (value) => {
    console.log("Captcha value:", value)
    let verified = false;
    verified = await validateReCaptcha(value);
    setValidate({ ...state, recaptcha: verified });
  }
  const handleChange = (event) => {
    let value = event.target.value;
    if (event.target.name === 'age') {
      if (value) {
        if (value >= 1 && value <= 120) {
          setValidate({ ...validate, age: true })
          setState({ ...state, age: event.target.value });
        }
        else {
          setValidate({ ...validate, age: false })
          setState({ ...state, age: event.target.value });
        }
      }
      else {
        setState({ ...state, age: '' })
      }
    }
    if (event.target.name === 'email') {
      if (value) {
        if (emailRex.test(value)) {
          setValidate({ ...validate, email: true })
          setState({ ...state, email: event.target.value });
        }
        else {
          setValidate({ ...validate, email: false })
          setState({ ...state, email: event.target.value });
        }
      }
      else {
        setState({ ...state, email: '' })
      }
    }
    if (event.target.name === 'pincode') {
      if (value) {
        if (pincodeRex.test(value)) {
          setValidate({ ...validate, pincode: true })
          setState({ ...state, pincode: event.target.value });
        }
        else {
          setValidate({ ...validate, pincode: false })
          setState({ ...state, pincode: event.target.value });
        }
      }
      else {
        setState({ ...state, pincode: '' })
      }
    }
  }
  const handleSubmit = () => {
    if (Object.values(validate).every(item => item === true)) {
      postData(state);
    }
    else {
      alert('Please fill proper data')
    }
  }
  return (
    <Container className="App">
      <h2 className='header'>Check Vaccine Availability</h2>
      <Form className="form" onSubmit={ handleSubmit } method='POST' inline>
        <Col sm="12" md={{ size: 6, offset: 3 }}>
          <FormGroup>
            <Label for='email' className='label' >Email :</Label>
            <Input
              className='input'
              type="email"
              name="email"
              id="email"
              placeholder="myemail@email.com"
              value={ state.email }
              required
              valid={ validate.email === true }
              invalid={ validate.email === false }
              onChange={ (event) => {
                handleChange(event)
              } }
            />
          </FormGroup>
        </Col>
        <Col sm="12" md={{ size: 6, offset: 3 }}>
          <FormGroup>
            <Label for="age" className='label'>Age :</Label>
            <Input
              type="number"
              name="age"
              id="age"
              value={ state.age }
              placeholder='18'
              required
              valid={ validate.age === true }
              invalid={ validate.age === false }
              onChange={ (event) => {
                handleChange(event)
              } }
            />
          </FormGroup>
        </Col>
        <Col sm="12" md={{ size: 6, offset: 3 }}>
          <FormGroup>
            <Label for="pincode" className='label'>Pincode :</Label>
            <Input
              type="number"
              name="pincode"
              id="pincode"
              value={ state.pincode }
              placeholder='101101'
              required
              valid={ validate.pincode === true }
              invalid={ validate.pincode === false }
              onChange={ (event) => {
                handleChange(event)
              } }
            />
          </FormGroup>
        </Col>
        <Col sm="12" md={{ size: 6, offset: 3 }}>
          <FormGroup className='captcha'>
            <ReCAPTCHA sitekey="6LfMm8saAAAAADXGqckjNQwjDm1a6tVWZnF6N-7v" onChange={ onChange } />
          </FormGroup>
        </Col>
        <Col sm="12" md={{ size: 6, offset: 3 }} className='button'>
          <Button color='primary' disabled={ !validate.captcha }>Submit</Button>
        </Col>
      </Form>
    </Container>
  );
}

export default App;
