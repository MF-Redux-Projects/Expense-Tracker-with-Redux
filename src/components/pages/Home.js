import React from 'react';
import Balance from "../Balance";
import Form from "../Form";
import TransactionsList from "../Transactions/TransactionsList";

const Home = () => {
    return (
        <>
            <Balance />
            <Form />
            <TransactionsList />
        </>
    );
};

export default Home;