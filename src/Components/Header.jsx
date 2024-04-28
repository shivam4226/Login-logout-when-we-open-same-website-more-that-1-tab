import React, { useEffect, useState } from 'react';
import { Button, Container, Form, Nav, Navbar, Offcanvas } from 'react-bootstrap';
import { Navigate, useNavigate } from 'react-router-dom';
import { useRecoilState, useRecoilValue } from 'recoil';
import { isLoggedInState } from '../AtomData/atom';

function OffcanvasExample() {
  const navigate = useNavigate();
  const [loginStatus, setIsloginStatus] = useState();
  const isLoggedIns = useRecoilValue(isLoggedInState);
  const [isLoggedIn, setIsLoggedIn] = useRecoilState(isLoggedInState);
  const expand = 'md';

  useEffect(() => {
    const storageSlection = localStorage.getItem('selectedStorage');
    const handleStorageChange = () => {
      if (storageSlection == 'sessionStorage') {
        setIsloginStatus(sessionStorage.getItem('isLoggedIn') === 'true');
      } else {
        setIsloginStatus(localStorage.getItem('isLoggedIn') === 'true');
      }
    };

    window.addEventListener('storage', handleStorageChange);
    if (storageSlection == 'sessionStorage') {
      const isLoginStatus = sessionStorage.getItem('isLoggedIn');
      if (isLoginStatus) {
        setIsloginStatus(isLoginStatus === 'true');
      }

    } else {
      const isLoginStatus = localStorage.getItem('isLoggedIn');
      if (isLoginStatus) {
        setIsloginStatus(isLoginStatus === 'true');
      }
    }

    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, [isLoggedIns]);


  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    sessionStorage.removeItem('isLoggedIn');
    localStorage.removeItem('selectedStorage');
    sessionStorage.removeItem('selectedStorage');
    setIsloginStatus(false);
    setIsLoggedIn(false)
    console.log('this function is calling');
  };


  return (
    <Navbar expand={expand} className="bg-body-tertiary mb-3">
      <Container fluid>
        <Navbar.Brand href="/">ImageGallery</Navbar.Brand>
        <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${expand}`} />
        <Navbar.Offcanvas
          id={`offcanvasNavbar-expand-${expand}`}
          aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
          placement="end"
        >
          <Offcanvas.Header closeButton>
            <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${expand}`}>
              ImageGallery
            </Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            <Nav className="justify-content-start flex-grow-1 pe-3">
              <Nav.Link href="/">Home</Nav.Link>
            </Nav>
            <div className="d-flex justify-content-end">
              <Form className="d-flex">
                <Form.Control
                  type="search"
                  placeholder="Search"
                  className="me-2"
                  aria-label="Search"
                />
                <Button variant="outline-success">Search</Button>
              </Form>
              {loginStatus ?
                <Button variant="outline-danger ms-3" onClick={handleLogout}>Logout</Button>
                :
                <Button variant="outline-danger ms-3" onClick={() => navigate('/auth')}>Login</Button>
              }
            </div>
          </Offcanvas.Body>
        </Navbar.Offcanvas>
      </Container>
    </Navbar>
  );
}

export default OffcanvasExample;
