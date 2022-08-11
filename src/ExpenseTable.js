
const ExpenseTable = (props) => {
    const {itemDetails} = props

    const onClickEdit = () => {
        console.log()
    }

    const onClickDelete = async () => {
        const url = `http://localhost:4000/expense_data/${itemDetails.id}`
        const options = {
            method: "DELETE"
        }
        await fetch(url , options)
        window.location.reload()
    }

    return(
        <tr key={itemDetails.id}>
            <td>{itemDetails.id}</td>
            <td>{itemDetails.amount}</td>
            <td>{itemDetails.date}</td>
            <td>{itemDetails.category}</td>
            <td>{itemDetails.details}</td>
            <td><button className='table-btn' onClick={onClickEdit}>edit</button></td>
            <td><button className='table-btn' onClick={onClickDelete}>delete</button></td>
        </tr>
    )
}

export default ExpenseTable