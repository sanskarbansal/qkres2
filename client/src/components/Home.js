import React, { useState } from "react";
import { Row } from "react-bootstrap";
import Login from "./Login";
import Signup from "./Signup";
export default function Home() {
    const [isLogin, setisLogin] = useState(true);

    return (
        <div className="mt-3">
            <Row xs={12} className="justify-content-center">
                <div>
                    <button onClick={() => setisLogin(true)} className={`${isLogin ? "active" : ""} btn-outline-primary`}>
                        Login
                    </button>
                    <button onClick={() => setisLogin(false)} className={`${!isLogin ? "active" : ""} btn-outline-primary`}>
                        Signup
                    </button>
                </div>
            </Row>
            <Row>
                {isLogin && <Login />}
                {!isLogin && <Signup setlogin={setisLogin} />}
            </Row>
        </div>
    );
}
