import React, {Fragment, useState} from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

const Signup = ({history}) => {
    const [userName, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setconfirmPassword] = useState('');
    const [isLoading, setLoading] = useState(true);

    const register = ()=>{
        if(password !== confirmPassword || password.length<=0 || confirmPassword.length<=0){
            alert("Password & Confirm password are either empty or not same!")
        }else{
            fetch('http://localhost:5000/user/signup',{
            method:'post',
            headers:{
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                userName,
                email,
                password
            })
        })
        .then((response) => response.json())
        .then((res) => {
            if(res.message === 'success'){
                history.push('/payee')
            }
        })
        .catch((error) => console.log(error))
        .finally(() => setLoading(false));
        }
    }

    return (
            <Form>
            <Form.Group controlId="Username">
                    <Form.Label>User Name</Form.Label>
                    <Form.Control type="username" placeholder="User Name" value={userName}
                     onChange={(event) => {
                        setUsername(event.target.value);
                     }} />
                </Form.Group>
                <Form.Group controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" placeholder="Enter email" value={email}
                     onChange={(event) => {
                        setEmail(event.target.value);
                     }} />
                </Form.Group>
                <Form.Group controlId="Password">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" value={password}
                     onChange={(event) => {
                        setPassword(event.target.value);
                     }} />
                </Form.Group>
                <Form.Group controlId="confirmPassword">
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control type="password" placeholder="Confirm Password" value={confirmPassword}
                     onChange={(event) => {
                        setconfirmPassword(event.target.value);
                     }} />
                </Form.Group>
                <Button variant="primary" type="submit" onClick={(event) => {
                        event.preventDefault()
                        register()
                    }}>
                    Signup
                </Button>
            </Form>
    )
}

export default Signup;