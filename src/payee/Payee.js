import React,{ useState, useEffect, useContext, Fragment } from 'react';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import { BankContext } from '../contextProvider/BankContext';

const Payee = ({ history })=> {

    const {isLoggedIn, setIsLoggedIn} = useContext(BankContext);
    const [payeeList, setPayeeList] = useState([]);
    const [isLoading, setLoading] = useState(true);

    const fetchPayeeList = () =>{
        fetch('http://localhost:5000/payee',{
            method:'post',
            headers:{
                'Content-Type': 'application/json',
                token : localStorage.getItem("token")
            },
            body: JSON.stringify({
                userId : localStorage.getItem("userId"),
            })
        })
          .then((response) => response.json())
          .then((res) => setPayeeList([...res]))
          .catch((error) => console.log(error))
          .finally(() => setLoading(false));
    }

    useEffect(() => {
        fetchPayeeList()
    }, []);

    const deletePayeelist = (payeeId) =>{
        const userId = localStorage.getItem("userId")
        fetch("http://localhost:5000/payee/delete",{   // String literal Example
        // fetch('http://localhost:5000/cart/delete/'+userId+'/'+itemId,{
            method:'delete',
            headers:{
                'Content-Type': 'application/json',
                token : localStorage.getItem("token")
            },
            body:JSON.stringify({
                'userId' :userId,
                'payeeId':payeeId,
            })
        })
        .then((response) => response.json())
        .then((res) => {
            fetchPayeeList()
        })
        .catch((error) => console.log(error))
        .finally(() => setLoading(false));
    }

    return(
        <Fragment>
            <Table responsive>
            <thead>
                <tr>
                <th>#</th>
                <th>Payee</th>
                <th>Date Added</th>
                <th>Action</th>
                </tr>
            </thead>
            <tbody>
                    {
                        payeeList.map((item, index)=>{
                            return(
                                <tr>
                                    <td key="index">{index+1}</td>
                                    <td key="username">{item.userName}</td>
                                    <td key="date">{item.createdAt}</td>
                                    <td key="btn">
                                        <Button onClick = {()=>{
                                                deletePayeelist(item._id)
                                        }}> Delete</Button>
                                    </td>
                                </tr>
                            )
                        })
                    }
            </tbody>
            </Table>
        </Fragment>
    )
}

export default Payee;