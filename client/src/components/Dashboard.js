import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Row, Col, Container, Card, Button, Form } from "react-bootstrap";
import appContext from "../AppContext";
function calculate_age(dob) {
    dob = new Date(dob);
    var diff_ms = Date.now() - dob.getTime();
    var age_dt = new Date(diff_ms);

    return Math.abs(age_dt.getUTCFullYear() - 1970);
}
export default function Dashboard({ user }) {
    const [isEditing, setisEditing] = useState(false);
    const [formdata, setformdata] = useState(user);
    const { token, setToken } = useContext(appContext);

    const handleChange = (key) => (e) => {
        setformdata((prevState) => ({
            ...prevState,
            [key]: e.target.value,
        }));
    };
    useEffect(() => {
        setformdata(user);
    }, [user]);
    const handleSubmit = (event) => {
        event.preventDefault();
        if (!isEditing) return setisEditing(true);
        axios
            .post("https://qkressb.herokuapp.com/api/update", { ...formdata, token })
            .then((res) => {
                console.log(res);
                setToken(res.data.token);
                window.localStorage.setItem("token", res.data.token);
                setisEditing(!isEditing);
            })
            .catch((err) => {
                console.log(err.response.data);
            });
    };
    const logout = () => {
        window.localStorage.removeItem("token");
        setToken(null);
    };
    const handleChangeDob = (key) => (e) => {
        console.log(calculate_age(e.target.value));
        setformdata((prevState) => ({
            ...prevState,
            [key]: e.target.value,
            age: calculate_age(e.target.value),
        }));
    };
    return (
        <Container className="mt-4">
            <Row xx={12} className="justify-content-center">
                <Button variant="primary" onClick={logout}>
                    Logout
                </Button>
            </Row>
            <Row className="mt-4">
                <Col>
                    <Card mb={3}>
                        <Form onSubmit={handleSubmit}>
                            <div className="card-body">
                                {Object.keys(formdata).map((key) => {
                                    return (
                                        <React.Fragment key={key}>
                                            <Row>
                                                <Col sm={3}>
                                                    <h6 style={{ textTransform: "capitalize" }} className="mb-0">
                                                        {key}
                                                    </h6>
                                                </Col>
                                                <Form.Control
                                                    value={formdata[key] || ""}
                                                    type={`${key === "dob" ? "date" : "text"}`}
                                                    onChange={key === "dob" ? handleChangeDob(key) : handleChange(key)}
                                                    className="col-md-9 text-secondary"
                                                    readOnly={!isEditing || !["address", "dob"].includes(key)}
                                                />
                                            </Row>
                                            <hr />
                                        </React.Fragment>
                                    );
                                })}
                                <Row>
                                    <Col sm={12}>
                                        <Button type="submit" className="btn btn-info">
                                            {isEditing ? "UPDATE" : "Edit"}
                                        </Button>
                                    </Col>
                                </Row>
                            </div>
                        </Form>
                    </Card>

                    {/* {isEditing && <UpdateProfile />} */}
                </Col>
            </Row>
        </Container>
    );
}
