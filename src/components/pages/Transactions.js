import React, {useEffect, useState} from 'react';
import TransactionsList from "../Transactions/TransactionsList";
import {useDispatch, useSelector} from "react-redux";
import {fetchTransactions} from "../../features/transaction/transactionSlice";
import Transaction from "../Transactions/Transaction";
import {Link} from "react-router-dom";
import {Form} from "react-bootstrap";
import {typeFilter} from "../../features/filter/filterSlice";

const Transactions = () => {
    const dispatch = useDispatch();
    const [search, setSearch] = useState('');
    const {transactions, isLoading, isError} = useSelector((state) => state.transaction);
    const {type} = useSelector((state) => state.filter);

    useEffect(() => {
        dispatch(fetchTransactions({type, search}));
    }, [dispatch, type, search]);

    const handleTypeFilter = (e) => {
        dispatch(typeFilter(e.target.value))
    }

    //decide what to show
    let content;
    if (isLoading) {
        content = <p>Loading...</p>;
    }
    if (!isLoading && isError) {
        content = <p>There was an error occured</p>;
    }
    if (!isLoading && !isError && transactions?.length === 0) {
        content = <p>No transactions found</p>;
    }
    if (!isLoading && !isError && transactions?.length > 0) {
        content = [...transactions].reverse().map((transaction) => <Transaction key={transaction.id}
                                                                                transaction={transaction}/>);

        if (transactions?.length > 5) {
            content = (
                <>
                    {content}
                    <Link to={'/transactions'} className={'btn btn-primary'}>View All</Link>
                </>
            )
        }
    }

    return (
        <>
            <div className={'transaction-header d-flex justify-content-between align-items-center mb-4'}>
                <div className="transaction-type-filter">
                    <Form.Check
                        inline
                        label="All"
                        name="type"
                        type='radio'
                        id={`type-all`}
                        value={'all'}
                        checked={type === 'all'}
                        onChange={handleTypeFilter}
                    />
                    <Form.Check
                        inline
                        label="Income"
                        name="type"
                        type='radio'
                        id={`type-income`}
                        value={'income'}
                        checked={type === 'income'}
                        onChange={handleTypeFilter}
                    />
                    <Form.Check
                        inline
                        label="Expense"
                        name="type"
                        type='radio'
                        id={`type-expense`}
                        value={'expense'}
                        checked={type === 'expense'}
                        onChange={handleTypeFilter}
                    />
                </div>
                <div className="transaction-search">
                    <Form.Control
                        type="text"
                        placeholder="Search transactions"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </div>
            </div>
            <div className="conatiner_of_list_of_transactions">
                {content}
            </div>
        </>
    );
};

export default Transactions;