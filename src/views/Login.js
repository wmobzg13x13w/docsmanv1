import React, { useState, useContext } from "react";
import {
  Card,
  CardBody,
  CardTitle,
  Form,
  FormGroup,
  Label,
  Input,
  Button,
  Container,
  Row,
  Col,
  Alert,
} from "reactstrap";

import { useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";

const Login = () => {
  const { login, loading, error } = useContext(AuthContext); // Use error from AuthContext
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [localError, setLocalError] = useState(null); // For local client-side validation

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent page reload
    setLocalError(null); // Clear client-side errors

    // Client-side validation
    if (!email || !password) {
      setLocalError("Email and password are required.");
      return;
    }

    try {
      await login(email, password); // Call the login function from AuthContext
      navigate("/"); // Redirect on successful login
    } catch (err) {
      // The errors from the AuthContext are already set; no need to handle them here
      console.error("Login failed:", err);
      setLocalError(err);
    }
  };

  return (
    <Container
      className='d-flex justify-content-center align-items-center'
      style={{ height: "100vh" }}>
      <Row xs='12' sm='12' md='12' lg='12'>
        <Col xs='12' sm='12' md='12' lg='12'>
          <Card>
            <CardBody>
              <CardTitle tag='h4' className='text-center'>
                Login
              </CardTitle>

              {/* Show client-side validation errors */}
              {localError && <Alert color='danger'>{localError}</Alert>}

              {/* Show server-side errors from AuthContext */}
              {error && <Alert color='danger'>{error}</Alert>}

              <Form onSubmit={handleSubmit}>
                <FormGroup>
                  <Label for='email'>Email</Label>
                  <Input
                    type='email'
                    name='email'
                    id='email'
                    placeholder='Enter your email'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </FormGroup>
                <FormGroup>
                  <Label for='password'>Password</Label>
                  <Input
                    type='password'
                    name='password'
                    id='password'
                    placeholder='Enter your password'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </FormGroup>
                <Button color='primary' block disabled={loading}>
                  {loading ? "Logging in..." : "Login"}
                </Button>
              </Form>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;
