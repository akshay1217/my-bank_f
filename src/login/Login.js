import React, {Fragment, useState, useContext} from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import {BankContext} from '../contextProvider/BankContext';

const Login = ({history}) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setLoading] = useState(true);
    const {isLoggedIn, setIsLoggedIn} = useContext(BankContext);

    const CheckError =(response) => {
        if (response.status >= 200 && response.status <= 299) {
            setIsLoggedIn(true)
          return response.json();
        } else {
          throw Error(response.statusText);
        }
      }

    const login = ()=>{
        if(password.length<=0 || email.length<=0){
            alert("Email or Password missing!")
        }else{
            fetch('http://localhost:5000/user/login',{
            method:'post',
            headers:{
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email,
                password
            })
        })
        .then(CheckError)
        .then((res) => {
            localStorage.setItem("userId",res.userId)
            localStorage.setItem("token",res.token)
            console.log(res)
            history.push('/payee')            
        })
        .catch((error) => console.log(error))
        .finally(() => setLoading(false));
        }
    }

    return (
            <Form>
                <Form.Group controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" placeholder="Enter email" value={email}
                     onChange={(event) => {
                        setEmail(event.target.value);
                     }} />
                </Form.Group>
                <Form.Group controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" value={password}
                     onChange={(event) => {
                        setPassword(event.target.value);
                     }} />
                </Form.Group>
                <Button variant="primary" type="submit" onClick={(event) => {
                        event.preventDefault()
                        login()
                    }} >
                    Login
                </Button>
                {' '}
                <Button variant="primary" type="submit" onClick={(event) => {
                        history.push('/signup')
                    }} >
                    Sign up
                </Button>
            </Form>
    )
}

export default Login;