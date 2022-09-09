import React, {useEffect} from 'react';
import TransactionsList from "../Transactions/TransactionsList";
import {useDispatch, useSelector} from "react-redux";
import {fetchTransactions} from "../../features/transaction/transactionSlice";
import Transaction from "../Transactions/Transaction";
import {Link} from "react-router-dom";
import {Form} from "react-bootstrap";

const Transactions = () => {
    const dispatch = useDispatch();
    const {transactions, isLoading, isError} = useSelector((state) => state.transaction);

    useEffect(() => {
        dispatch(fetchTransactions());
    }, [dispatch]);
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
                    <div>
                        <Form.Check
                            inline
                            label="All"
                            name="type"
                            type='radio'
                            id={`type-all`}
                            value={'all'}
                        />
                        <Form.Check
                            inline
                            label="Income"
                            name="type"
                            type='radio'
                            id={`type-income`}
                            value={'income'}
                        />
                        <Form.Check
                            inline
                            label="Expense"
                            name="type"
                            type='radio'
                            id={`type-expense`}
                            value={'expense'}
                        />
                    </div>
                </div>
                <div className="transaction-search">
                    <Form.Control type="text" placeholder="Search transactions" />
                </div>
            </div>
            <div className="conatiner_of_list_of_transactions">
                {content}
            </div>
        </>
    );
};

export default Transactions;