import React,{ useState, useEffect, useContext, Fragment } from 'react';

const HomePage = ({ history })=> {
    return(
            <div style={{marginLeft:20}}>
            This is Home Page 
                <button style={{marginLeft:400}} onClick={() => {
                    history.push('/login')
                }}>Login</button>
                <button style={{marginLeft:20}} onClick={() => {
                    history.push('/signup')
                }}>Signup  </button>  
            </div>
    )
}

export default HomePage;