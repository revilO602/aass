import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function Login() {
    //simple login form
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    
    return (
        <div>
            <h1>Login</h1>
            <form>
                <label>
                    Username:
                    <input type="text" value={username} onChange={e => setUsername(e.target.value)} />
                </label>
                
                <label>
                    Password:
                    <input type="password" value={password} onChange={e => setPassword(e.target.value)} />
                </label>
                <input type="submit" value="Submit" />
            </form>
        </div>
    )
}
