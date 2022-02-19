import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import {AuthContext} from '../contexts/AuthContext'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

export const Login = () => {

    const {isAuth,toggleAuth}=useContext(AuthContext)
const [form,setForm]=useState()
const navigate=useNavigate()

const handleChange=(e)=>{
    const {name,value}=e.target
    setForm({...form,[name]:value})
}

const handleSubmit=(e)=>{
    e.preventDefault()
 
    fetch("http://localhost:5000/loginTeacher", {
      method: 'POST',
      body: JSON.stringify(form),
      headers: {
          'Content-Type': 'application/json',
      },
  }).then((res)=>res.json()).then((d)=>{
      toggleAuth(d)
      if(d.status)
      navigate('/home')
      else
    window.errorHead.innerText=d.error

  })
}

    
  return (
    <div style={{width:"20rem", margin:"auto"}}>
        <h5 id="errorHead"></h5>
   
      <Form action="GET" onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formGroupEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            required
            onChange={handleChange}
            name="email"
            placeholder="Enter Email"
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formGroupPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            required
            onChange={handleChange}
            name="password"
            placeholder="Password"
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
        {/* <input type="submit" /> */}
      </Form>
    </div>
  );
};
