import Transaction from "./Transaction";
import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {fetchTotalTransactions, fetchTransactions} from "../../features/transaction/transactionSlice";
import {Link} from "react-router-dom";

export default function TransactionsList() {
    const dispatch = useDispatch();
    const {transactions,transactionCount, isLoading, isError} = useSelector((state) => state.transaction);

    useEffect(() => {
        dispatch(fetchTransactions({'type': '', 'search': '','page': '', 'limit': ''}));
        dispatch(fetchTotalTransactions({'type': '', 'search': ''}));
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
                {transactionCount > 5 && <div className={'text-center mt-4'}><Link to={'/transactions'} className={'btn btn-primary d-inline-block w-auto px-5 py-2'}>View All</Link></div>}
            </>
        )
    }
    return (
        <>
            <p className="second_heading">Your Transactions:</p>
            <div className="conatiner_of_list_of_transactions">
                <div>
                    {content}
                </div>
            </div>
        </>
    );
}
