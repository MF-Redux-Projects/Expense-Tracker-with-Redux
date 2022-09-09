import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {fetchTransactions} from "../../features/transaction/transactionSlice";
import Transaction from "../Transactions/Transaction";
import {Col, Form, Pagination} from "react-bootstrap";
import {searchFilter, typeFilter} from "../../features/filter/filterSlice";

const Transactions = () => {
    const dispatch = useDispatch();
    const [input, setInput] = useState('');

    const {transactions, isLoading, isError} = useSelector((state) => state.transaction);
    const {type, search} = useSelector((state) => state.filter);
    const {page, limit} = useSelector(state => state.pagination);

    useEffect(() => {
        dispatch(fetchTransactions({type, search, page, limit}));
    }, [dispatch, type, search, page, limit]);

    const handleTypeFilter = (e) => {
        dispatch(typeFilter(e.target.value))
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(searchFilter(input))
    }

    let items = [];
    for (let number = 1; number <= 5; number++) {
        items.push(
            <Pagination.Item key={number} active={number === page}>
                {number}
            </Pagination.Item>,
        );
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
        content = (
            <>
                {[...transactions].reverse().map((transaction) => (
                    <Transaction key={transaction.id} transaction={transaction}/>
                ))}
                <Pagination className='justify-content-center w-100 mt-4'>{items}</Pagination>
            </>
        )


    }

    return (
        <>
            <div className={'transaction-header mb-4'}>
                <Form className={'row align-items-center'} onSubmit={handleSubmit}>
                    <Col xs={12} md={6}>
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
                    </Col>
                    <Col xs={12} md={6}>
                        <Form.Control
                            className={'w-100'}
                            type="text"
                            placeholder="Search transactions"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                        />
                    </Col>
                </Form>
            </div>
            <div className="conatiner_of_list_of_transactions">
                {content}
            </div>
        </>
    );
};

export default Transactions;