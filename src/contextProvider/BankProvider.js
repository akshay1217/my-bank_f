import React, { useState, useEffect } from 'react';
import {BankContext} from './BankContext';
import Button from 'react-bootstrap/Button';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';

export const BankProvider = ({children, history}) => {

    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        if(localStorage.getItem('userId')){
            setIsLoggedIn(true)
        }
    }, [])
    return (
        <BankContext.Provider
            value = {{
                isLoggedIn : isLoggedIn,
                setIsLoggedIn:setIsLoggedIn,
            }}
            >
                <>
                <Navbar bg="light" variant="light">
                    <Navbar.Brand href="#home">My Bank</Navbar.Brand>

                    { 
                    isLoggedIn && <> <Nav className="mr-auto">
                            <Nav.Link href="/loadMoney">Load Money</Nav.Link>
                            <Nav.Link href="/payee">Payee</Nav.Link>
                            <Nav.Link href="/transactions">Transactions</Nav.Link>
                            <Nav.Link href="/transferMoney">Transfer Money</Nav.Link>
                            </Nav>
                            <Form inline>
                            <Button variant="outline-primary" onClick={() => {
                            localStorage.clear()
                            history.push('/login')
                            }}>Log Out</Button>
                            </Form>
                            </>
                    }
                </Navbar>
            {children}  </>
        </BankContext.Provider>
    )
}
