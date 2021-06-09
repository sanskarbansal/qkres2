import React, { useState } from "react";
import { Container, Button, Row, ButtonGroup } from "react-bootstrap";
import Login from "./Login";
import Signup from "./Signup";

export default function Home() {
    const [isLogin, setisLogin] = useState(true);

    return (
        <Container className="mt-3">
            <Row xs={12} className="justify-content-center">
                <ButtonGroup>
                    <Button onClick={() => setisLogin(true)} variant={`${isLogin ? "" : "outline-"}primary`}>
                        Login
                    </Button>
                    <Button onClick={() => setisLogin(false)} variant={`${!isLogin ? "" : "outline-"}primary`}>
                        Signup
                    </Button>
                </ButtonGroup>
            </Row>
            <Row>
                {isLogin && <Login />}
                {!isLogin && <Signup setlogin={setisLogin} />}
            </Row>
        </Container>
    );
}
