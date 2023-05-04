import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Login() {
    //simple login form
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();

    const handleLogin = async () => {
        try {
          const response = await fetch(
            `http://localhost:8081/login`,{
            method: "POST",
            mode: "cors",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email: username, password: password }),
            }

          );
          const data = await response.json();

          if (data.id) {
            localStorage.setItem("id", JSON.stringify(data.id));
            navigate("/trainingSelection");
          }
          else {
            alert("Wrong username or password!");
          }

        } catch (error) {
          console.error("API request failed:", error);
        }
      };


    return (
        <div>
            <h1>Login</h1>
            <form>
                <label>
                    Email:
                    <input type="text" value={username} onChange={e => setUsername(e.target.value)} />
                </label>

                <label>
                    Password:
                    <input type="password" value={password} onChange={e => setPassword(e.target.value)} />
                </label>
                <button type="button" onClick={handleLogin}>Login</button>
            </form>
        </div>
    )
}
