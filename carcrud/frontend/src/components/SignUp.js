import React, { useState } from "react";

const CARS_API_URL =
  process.env.REACT_APP_API_URL ||
  process.env.REACT_APP_FALLBACK_API_URL;

const SIGNUP_URL =
  process.env.REACT_APP_SIGNUP_URL ||
  process.env.REACT_APP_API_SIGNUP_URL ||
  (CARS_API_URL ? CARS_API_URL.replace(/\/cars\/?$/, "/signup") : null) ||
  "http://localhost:8080/api/signup";

export default function SignUp() {
  const [form, setForm] = useState({name:"", email:"", password:"", confirm:""});
  const [message, setMessage] = useState("");

  const handleChange = e => setForm({...form, [e.target.name]: e.target.value});

  const handleSubmit = async e => {
    e.preventDefault();
    if(form.password !== form.confirm) {
      setMessage("Passwords do not match");
      return;
    }
    try {
      const payload = {
        name: form.name,
        email: form.email,
        password: form.password
      };

      const res = await fetch(SIGNUP_URL, {
        method: "POST",
        headers: {"Content-Type":"application/json"},
        body: JSON.stringify(payload)
      });

      const contentType = res.headers.get("content-type") || "";
      let responseMessage = "";

      if (contentType.includes("application/json")) {
        const data = await res.json();
        responseMessage = data.message || data.error || "Request completed.";
      } else {
        responseMessage = await res.text();
      }

      if (!res.ok) {
        setMessage(responseMessage || `Sign up failed with status: ${res.status}`);
        return;
      }

      setMessage(responseMessage || "Sign up successful");
    } catch(err) {
      setMessage("Error: " + err.message);
    }
  };

  return (
    <div style={{padding:"1rem"}}>
      <h2>Sign Up</h2>
      {message && <p>{message}</p>}
      <form onSubmit={handleSubmit}>
        <input name="name" placeholder="Name" onChange={handleChange}/><br/>
        <input name="email" placeholder="Email" onChange={handleChange}/><br/>
        <input type="password" name="password" placeholder="Password" onChange={handleChange}/><br/>
        <input type="password" name="confirm" placeholder="Confirm Password" onChange={handleChange}/><br/>
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
}