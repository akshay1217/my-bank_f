import React,{ useState, useEffect, useContext, Fragment } from 'react';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import { BankContext } from '../contextProvider/BankContext';

const AddPayee = ()=>{

    const {isLoggedIn, setIsLoggedIn} = useContext(BankContext);
    const [payeeListToAdd, setPayeeListToAdd] = useState([]);
    const [isLoading, setLoading] = useState(true);

    const addPayee =(payeeId)=>{
        fetch('http://localhost:5000/payee/add',{
            method:'post',
            headers:{
                'Content-Type': 'application/json',
                token : localStorage.getItem("token")
            },
            body: JSON.stringify({
                userId : localStorage.getItem("userId"),
                payeeId:payeeId,
            })
        })
          .then((response) => response.json())
          .then((res) => {
              console.log(res)
              FetchPayeeListToAdd()
            })
          .catch((error) => console.log(error))
          .finally(() => setLoading(false));
    }

    const FetchPayeeListToAdd = ()=>{
        fetch('http://localhost:5000/payee/payeeToAdd',{
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
          .then((res) => setPayeeListToAdd([...res]))
          .catch((error) => console.log(error))
          .finally(() => setLoading(false));
    }

    useEffect(() => {
        FetchPayeeListToAdd()
    }, []);

    return(
        <Fragment>
        <Table responsive>
        <thead>
            <tr>
            <th>#</th>
            <th>Payee</th>
            <th>Action</th>
            </tr>
        </thead>
        <tbody>
                {
                    payeeListToAdd.map((item, index)=>{
                        return(
                            <tr>
                                <td key="index">{index+1}</td>
                                <td key="username">{item.userName}</td>
                                <td key="btn">
                                    <Button onClick = {()=>{
                                            addPayee(item._id)
                                    }}> Add</Button>
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

export default AddPayee;