import Transaction from "./Transaction";
import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {fetchTransactions} from "../../features/transaction/transactionSlice";

export default function Transactions() {
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
        content = transactions.map((transaction) => <Transaction key={transaction.id} transaction={transaction} />);
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
