import Transaction from "./Transaction";
import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {fetchTransactions} from "../../features/transaction/transactionSlice";
import {Link} from "react-router-dom";

export default function TransactionsList() {
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
        content = (
            <>
                {[...transactions].reverse().slice(0, 5).map((transaction) => <Transaction key={transaction.id} transaction={transaction}/>)}
                {transactions.length > 5 && <li style={{textAlign: 'center'}}><Link to={'/transactions'} className={'btn btn-primary'}>View All</Link></li>}
            </>
        )
    }
    return (
        <>
            <p className="second_heading">Your Transactions:</p>
            <div className="conatiner_of_list_of_transactions">
                <ul>
                    {content}
                </ul>
            </div>
        </>
    );
}
