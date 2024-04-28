import React, { useState, useEffect } from 'react';
import { Formik } from 'formik';
import * as yup from 'yup';
import { Form, Button, Col, Row } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { isLoggedInState } from '../../AtomData/atom';

function SignInForm() {
  const schema = yup.object().shape({
    email: yup.string().email('Invalid email address').required('Email is required'),
    password: yup.string().required('Password is required').min(6, 'Password must be at least 6 characters'),
  });

  const [selectedStorage, setSelectedStorage] = useState('localStorage');
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useRecoilState(isLoggedInState);

  const handleSelectedCheckBox = (storageType) => { 
    localStorage.setItem('selectedStorage', storageType);
    setSelectedStorage(storageType);
  };

  useEffect(() => {
    const storage = selectedStorage === 'localStorage' ? localStorage : sessionStorage;
    const loginStatus = storage.getItem('isLoggedIn');
    setIsLoggedIn(loginStatus === 'true');
  }, [selectedStorage,setIsLoggedIn]);

  const handleSubmit = () => {
    const storage = selectedStorage === 'localStorage' ? localStorage : sessionStorage;
    storage.setItem('isLoggedIn', 'true');
    setIsLoggedIn(true);
    navigate('/');
  };

  return (
    <div className='p-5'>
      <Formik
        validationSchema={schema}
        onSubmit={handleSubmit}
        initialValues={{
          email: '',
          password: '',
        }}
      >
        {({ handleSubmit, handleChange, values, touched, errors }) => (
          <Form noValidate onSubmit={handleSubmit}>
            <Row className="mb-3">
              <Form.Group as={Col} controlId="validationFormikUsername">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  value={values.email}
                  onChange={handleChange}
                  isValid={touched.email && !errors.email}
                  isInvalid={touched.email && !!errors.email}
                  style={{ width: '100%' }}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.email}
                </Form.Control.Feedback>
              </Form.Group>
            </Row>
            <Row className="mb-3">
              <Form.Group as={Col} controlId="validationFormikPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  name="password"
                  value={values.password}
                  onChange={handleChange}
                  isInvalid={!!errors.password}
                  style={{ width: '100%' }}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.password}
                </Form.Control.Feedback>
              </Form.Group>
            </Row>
            <Row className="mb-3">
              <Col>
                <Form.Check
                  type="checkbox"
                  label="Use Local Storage"
                  checked={selectedStorage === 'localStorage'}
                  onChange={() => handleSelectedCheckBox('localStorage')}
                />
              </Col>
              <Col>
                <Form.Check
                  type="checkbox"
                  label="Use Session Storage"
                  checked={selectedStorage === 'sessionStorage'}
                  onChange={() => handleSelectedCheckBox('sessionStorage')}
                />
              </Col>
            </Row>
            <div className='text-end'>
              <Button type="submit">Submit</Button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default SignInForm;
