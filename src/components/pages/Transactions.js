import {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {fetchTotalTransactions, fetchTransactions} from "../../features/transaction/transactionSlice";
import Transaction from "../Transactions/Transaction";
import {Col, Form as BootstrapForm} from "react-bootstrap";
import {searchFilter, typeFilter} from "../../features/filter/filterSlice";
import ExpensePagination from "../ExpensePagination";
import {setPage} from "../../features/pagination/paginationSlice";
import TransactionForm from "../TransactionForm";

const Transactions = () => {
    const dispatch = useDispatch();
    const [input, setInput] = useState('');

    const {transactions, isLoading, isError, editing} = useSelector((state) => state.transaction);
    const {type, search} = useSelector((state) => state.filter);
    const {page, limit} = useSelector(state => state.pagination);

    useEffect(() => {
        dispatch(fetchTransactions({type, search, page, limit}));
        dispatch(fetchTotalTransactions({type, search}));
    }, [dispatch, type, search, page, limit]);

    const handleTypeFilter = (e) => {
        dispatch(typeFilter(e.target.value))
        dispatch(setPage(1));
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(searchFilter(input))
        dispatch(setPage(1));
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
                <ExpensePagination/>
            </>
        )


    }

    return (
        <div className={'w-100'}>
            <div className={'transaction-header mb-4'}>
                <BootstrapForm className={'row align-items-center'} onSubmit={handleSubmit}>
                    <Col xs={12} md={6}>
                        <div className="transaction-type-filter">
                            <BootstrapForm.Check
                                inline
                                label="All"
                                name="type"
                                type='radio'
                                id={`type-all`}
                                value={'all'}
                                checked={type === 'all'}
                                onChange={handleTypeFilter}
                            />
                            <BootstrapForm.Check
                                inline
                                label="Income"
                                name="type"
                                type='radio'
                                id={`type-income`}
                                value={'income'}
                                checked={type === 'income'}
                                onChange={handleTypeFilter}
                            />
                            <BootstrapForm.Check
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
                        <BootstrapForm.Control
                            className={'w-100'}
                            type="text"
                            placeholder="Search transactions"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                        />
                    </Col>
                </BootstrapForm>
                {editing?.id && <TransactionForm/>}
            </div>
            <div className="conatiner_of_list_of_transactions">
                {content}
            </div>
        </div>
    );
};

export default Transactions;