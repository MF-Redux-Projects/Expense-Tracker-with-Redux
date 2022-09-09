import React from 'react';
import Balance from "../Balance";
import TransactionForm from "../TransactionForm";
import TransactionsList from "../Transactions/TransactionsList";
import {Col, Row} from "react-bootstrap";

const Home = () => {
    return (
        <>
            <div className="main py-5">
                <div className="container">
                    <Row className={'justify-content-center'}>
                        <Col md={8}>
                            <Balance/>
                            <TransactionForm/>
                            <TransactionsList/>
                        </Col>
                    </Row>
                </div>
            </div>
        </>
    );
};

export default Home;