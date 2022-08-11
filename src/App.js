import { useEffect, useState } from 'react'
import './App.css'
import { Table } from 'react-bootstrap'
// const axios = require('axios');
import ExpenseTable from './ExpenseTable'


const App = () => {

    const [expenseData , setExpenseData] = useState([])
    const [dataLength , setDataLength] = useState(false)

    const [amount , setAmount] = useState("")
    const [date , setDate] = useState("")
    const [category , setCategory] = useState("")
    const [details , setDetails] = useState("")

    
    const onChangeAmount = (e) => {
      setAmount(e.target.value)
    }

    const onChangeDate = (e) => {
      setDate(e.target.value)
    }

    const onChangeCategory = (e) => {
      setCategory(e.target.value)
    }

    const onChangeDetails = (e) => {
      setDetails(e.target.value)
    }

    const expensePostApi = async () => {
        const newData = {amount: amount,date: date,category: category,details: details}

        const url = 'http://localhost:4000/expense_data'
        const options = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json"
            },
            body: JSON.stringify(newData)
        }

        await fetch(url,options)
        window.location.reload()
    }

    const onClickSave = (e) => {
      e.preventDefault()
      expensePostApi()
    }

    const expenseGetApi = async() => {
        
        const url = 'http://localhost:4000/expense_data'
        const options = {
            method: "GET"
        }
        const fetchedData = await fetch(url,options)
        const response = await fetchedData.json()
        
        if (response.length !== 0){
            setDataLength(true)
        }else{
            setDataLength(false)
        }

        setExpenseData(response)
    }

    useEffect(() => {
        expenseGetApi()
    },[])


    return(
        <>
        <div className='expense-page'>
            <form className="expense-container" onSubmit={onClickSave}>
                <div className="input-container">
                    <input className="input-name" type='button' value="Amount" />
                    <input name='amount' value={amount} className="input-text" type='text' onChange={onChangeAmount}  />
                </div>
                <div className="input-container">
                    <input className="input-name" type='button' value="Date" />
                    <input name='date' value={date} className="input-text" type='date' onChange={onChangeDate}  />
                </div>
                <div className="input-container">
                    <input className="input-name" type='button' value="Category" />
                    <input name='category' value={category} className="input-text" type='text' onChange={onChangeCategory}  />
                </div>
                <div className="input-container">
                    <input className="input-name" type='button' value="Details" />
                    <input name='details' value={details} className="input-text" type='text' onChange={onChangeDetails}  />
                </div>

                <div className="input-container">
                    <button type='submit' className="button">Save</button>
                    <button className="button">Cancel</button>
                </div>
            </form>


           {dataLength &&   (<Table className='crops-table' striped bordered hover size="sm">
                <thead>
                    <tr className='header-row'>
                        <th className='header-row'>id</th>
                        <th className='header-row'>Amount</th>
                        <th className='header-row'>Date</th>
                        <th className='header-row'>Category</th>
                        <th className='header-row'>Details</th>
                        <th className='header-row'></th>
                        <th className='header-row'></th>
                    </tr>
                </thead>
                <tbody>
                {expenseData.map(item => (
                    <ExpenseTable key={item.id} itemDetails={item} />
                ))}
                </tbody>
            </Table>)
           }
            </div>
        </>
    )
}

export default App