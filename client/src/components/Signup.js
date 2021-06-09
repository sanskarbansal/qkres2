import axios from "axios";
import React, { useState } from "react";
import { Form, Button, Container, Row, Col, Alert } from "react-bootstrap";

export default function Signup({ setlogin }) {
    const [formdata, setformdata] = useState({
        username: "",
        password: "",
        email: "",
        firstName: "",
        lastName: "",
        error: "",
    });

    const handleChange = (field) => {
        return (event) => {
            setformdata((prevState) => ({
                ...prevState,
                [field]: event.target.value,
            }));
        };
    };
    const handleSubmit = (event) => {
        event.preventDefault();
        const { username, password, email, firstName, lastName } = formdata;
        if (!username || !password || !email || !firstName || !lastName) return alert("Please enter all the details");
        axios
            .post("http://localhost:8080/api/register", formdata)
            .then((res) => setlogin(true))
            .catch((err) => {
                setformdata({ ...formdata, error: err.response.data.error });
            });
    };
    return (
        <Container fluid="md" className="mt-5">
            <Row>
                <Col>
                    {formdata.error && <Alert variant="danger">{formdata.error}</Alert>}
                    <h1>Signup</h1>
                    <Form onSubmit={handleSubmit}>
                        <Row>
                            <Form.Group as={Col} md="6">
                                <Form.Label>First name</Form.Label>
                                <Form.Control type="text" name="firstName" placeholder="Enter Firstname" onChange={handleChange("firstName")} />
                            </Form.Group>
                            <Form.Group as={Col} md="6">
                                <Form.Label>Last name</Form.Label>
                                <Form.Control type="text" name="lastName" placeholder="Enter Lastname" onChange={handleChange("lastName")} />
                            </Form.Group>
                        </Row>
                        <Form.Group className="mb-3">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control onChange={handleChange("email")} type="email" placeholder="Enter email" />
                            <Form.Text className="text-muted">We'll never share your email with anyone else.</Form.Text>
                        </Form.Group>

                        <Form.Group>
                            <Form.Label>Username</Form.Label>
                            <Form.Control onChange={handleChange("username")} type="text" placeholder="Enter username" />
                        </Form.Group>

                        <Form.Group>
                            <Form.Label>Password</Form.Label>
                            <Form.Control autoComplete="off" onChange={handleChange("password")} type="password" placeholder="Password" />
                        </Form.Group>
                        <Button variant="primary" type="submit">
                            Register
                        </Button>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
}