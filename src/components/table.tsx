import React, { useState } from 'react';
import axios from 'axios';

const url = 'https://60a5e4e5c0c1fd00175f49c4.mockapi.io/employees';
interface Employee {
    id?: number,
    name: string, 
    email: string,
    position: string
}
const Table = () => {
    //Define States
    const initEmployeeState = {
        name: "",
        email: "",
        position: ""
    };
    const initPagination = {
        currentPage: 1,
        pageSize: 5,
    };
    const [employees, setEmployees] = React.useState<Employee[]>([])
    const [inAddingMode, setInAddingMode] = useState(false);
    const [initEmployee, setInitEmployee] = React.useState(initEmployeeState)
    const [isValid, setIsValid] = React.useState(false)
    const [pagination, setPagination] = React.useState(initPagination)
    const [pageCount, setPageCount] = React.useState(1)

    //Get Data
    React.useEffect(() => {
        getData()
    }, [])

    const getData = async () => {
        const response = await axios.get(url);
        const pageCount = Math.ceil(response.data.length / pagination.pageSize);
        setEmployees(response.data)
        setPageCount(pageCount)
    }


    //Logic code 
    const renderHeader = () => {
        let headerElement = ['id', 'name', 'email', 'position']

        return headerElement.map((key, index) => {
            return <th key={index}>{key.toUpperCase()}</th>
        })
    }

    const renderBody = () => {
        if (employees) {
            const upperLimit = pagination.currentPage * pagination.pageSize;
            const renderData = employees.slice((upperLimit - pagination.pageSize), upperLimit);
            return renderData && renderData.map(({ id, name, email, position }) => {
                return (
                    <tr key={id}>
                        <td>{id}</td>
                        <td>{name}</td>
                        <td>{email}</td>
                        <td>{position}</td>
                    </tr>
                )
            })
        }
    }

    const handleInputChange = (event:any) => {
        const { name, value } = event.target;
        if (value) {
            setIsValid(true);
        }
        setInitEmployee({ ...initEmployee, [name]: value });
    };

    const onAdd = () => {
        setInAddingMode(true);
    }

    const onSave = async () => {
        //For demo, I just make a simple validation, that prevent all fields are empty
        if(isValid){
            await axios.post(url, initEmployee);
            getData();
        };
        setInAddingMode(false);
    }

    const createPagination = () => {
        let controls = [];
        for (let i = 1; i <= pageCount; i++) {
            const activeClassName = i === pagination.currentPage ? 'selected' : '';
            controls.push(
                <button
                key={i}
                className={`control ${activeClassName}`}
                onClick={() => setPagination({ ...pagination, currentPage: i })}
                >
                {i}
                </button>
            );
        }
        return controls;
    }

    return (
        <>
            <div className='container'>
                <h1 id='title'>Hello Health Table</h1>
                <div>
                    <table className='table' id='employee'>
                        <thead>
                            <tr>{renderHeader()}</tr>
                        </thead>
                        <tbody >
                            {renderBody()}
                            <tr>
                                {  
                                    inAddingMode && 
                                        <React.Fragment>
                                        <td>add</td>
                                        <td><input className='form-control' name='name' onChange={handleInputChange}/></td>
                                        <td><input className='form-control' name='email' onChange={handleInputChange}/></td>
                                        <td><input className='form-control' name='position' onChange={handleInputChange}/></td>
                                        </React.Fragment>
                                }
                            </tr>
                            <tr>
                                {
                                    !inAddingMode && 
                                    <React.Fragment>
                                        <td colSpan={4}>
                                            <button onClick={() => onAdd()}>+ New</button>
                                        </td>
                                    </React.Fragment>
                                }
                                {
                                    inAddingMode && 
                                    <React.Fragment>
                                        <td colSpan={4}>
                                            <button onClick={() => onSave()}>Save/Close</button>
                                        </td>
                                    </React.Fragment>
                                }
                            </tr>
                          
                        </tbody>
                    </table>

                    <div className='pagination'>
                        {createPagination()}
                    </div>
                </div>
            </div>
        </>
    )
}
export default Table;
