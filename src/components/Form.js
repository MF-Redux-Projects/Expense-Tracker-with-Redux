import {createTransaction, updateTransaction} from "../features/transaction/transactionSlice";
import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";

export default function Form() {
    const [name, setName] = useState('');
    const [amount, setAmount] = useState();
    const [type, setType] = useState('income');
    const [editMode, setEditMode] = useState(false);
    const {isLoading, isError, editing} = useSelector((state) => state.transaction);


    const dispatch = useDispatch();

    const resetForm = () => {
        setName('');
        setAmount('');
        setType('income');
    }

    //listen to editMode
    useEffect(() => {
        const {name, amount, type, id} = editing || {};
        if (id) {
            setEditMode(true)
            setName(name);
            setAmount(amount);
            setType(type);
        } else {
            resetForm();
            setEditMode(false)
        }
    }, [editing]);


    const handleCreate = (e) => {
        e.preventDefault();
        const newTransaction = {
            name,
            amount: Number(amount),
            type,
        }
        dispatch(createTransaction(newTransaction));
        resetForm();
    }

    const handleUpdate = (e) => {
        e.preventDefault();
        dispatch(updateTransaction({
            id: editing?.id,
            data: {
                name,
                amount: Number(amount),
                type,
            }
        }));
        resetForm();
        setEditMode(false);
    }

    const handleCancelEdit = () => {
        resetForm();
        setEditMode(false);
    }

    return (
        <div className="form">
            <h3>Add new transaction</h3>

            <form action="" onSubmit={editMode ? handleUpdate : handleCreate}>
                <div className="form-group">
                    <label>Name</label>
                    <input
                        type="text"
                        name="name"
                        placeholder="Enter title"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>

                <div className="form-group radio">
                    <label>Type</label>
                    <div className="radio_group">
                        <input
                            id={'income'}
                            type="radio"
                            value="income"
                            name="type"
                            required
                            checked={type === 'income'}
                            onChange={(e) => setType(e.target.value)}
                        />
                        <label htmlFor='income'>Income</label>
                    </div>
                    <div className="radio_group">
                        <input
                            id={'expense'}
                            type="radio"
                            value="expense"
                            name="type"
                            checked={type === 'expense'}
                            onChange={(e) => setType(e.target.value)}
                        />
                        <label htmlFor={'expense'}>Expense</label>
                    </div>
                </div>

                <div className="form-group">
                    <label>Amount</label>
                    <input
                        type="number"
                        placeholder="Enter amount"
                        name="amount"
                        required
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                    />
                </div>

                <button className="btn" disabled={isLoading}>
                    {editMode ? 'Update Transaction' : 'Add Transaction'}
                </button>
                {!isLoading && isError && <p className='error'>There was an error occured</p>}
            </form>

            {editMode && <button className="btn cancel_edit" onClick={handleCancelEdit}>Cancel Edit</button>}
        </div>
    );
}
