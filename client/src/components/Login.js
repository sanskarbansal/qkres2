import axios from "axios";
import React, { useState, useContext } from "react";
import { Form, Container, Row, Col, Alert } from "react-bootstrap";
import appContext from "../AppContext";

export default function Login() {
    const { setToken } = useContext(appContext);
    const [formdata, setformdata] = useState({
        username: "",
        password: "",
    });
    const [error, seterror] = useState("");
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
        const { username, password } = formdata;
        if (!username || !password) return alert("Please enter all the details");
        axios
            .post("https://qkressb.herokuapp.com/api/login", formdata)
            .then((res) => {
                let token = res.data.token;
                window.localStorage.setItem("token", token);
                setToken(token);
            })
            .catch((err) => {
                console.log(err.response.data);
                seterror(err.response.data.error);
            });
    };
    return (
        <Container fluid="md" className="mt-5">
            <Row>
                <Col>
                    {error && <Alert variant="danger">{error}</Alert>}

                    <h1>Login</h1>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group controlId="formBasicUsername">
                            <Form.Label>Username</Form.Label>
                            <input className="input" value={formdata.username} onChange={handleChange("username")} type="text" placeholder="Enter username" />
                        </Form.Group>

                        <Form.Group controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <input
                                className="input"
                                value={formdata.password}
                                autoComplete="off"
                                onChange={handleChange("password")}
                                type="password"
                                placeholder="Password"
                            />
                        </Form.Group>
                        <button className="btn-outline-primary" type="submit">
                            LOGIN
                        </button>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
}
