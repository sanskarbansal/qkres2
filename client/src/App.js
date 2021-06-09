import "./App.css";
import Home from "./components/Home";
import AppContext from "./AppContext";
import { useState, useEffect } from "react";
import jwt from "jwt-decode";
import Dashboard from "./components/Dashboard";

function App() {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState("");

    useEffect(() => {
        if (token) {
            try {
                let data = jwt(token);
                setUser(data);
            } catch (err) {
                console.log(err.message);
            }
        }
    }, [token]);
    useEffect(() => {
        let token = window.localStorage.getItem("token");
        try {
            jwt(token);
            setToken(token);
        } catch (err) {
            setUser(null);
            return console.log(err.message);
        }
        if (token) setToken(token);
    }, []);

    return (
        <AppContext.Provider value={{ setUser, setToken, token }}>
            <div className="App">
                {!token && <Home />}
                {token && user && <Dashboard user={user} />}
            </div>
        </AppContext.Provider>
    );
}

export default App;
