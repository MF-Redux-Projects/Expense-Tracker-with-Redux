import {useSelector} from "react-redux";
import numberWithCommas from "../utils/numberWithCommas";

export default function Balance() {
    const {transactions} = useSelector(state => state.transaction);

    const calculateBalance = () => {
        let balance = 0;
        transactions.forEach(transaction => {
            if (transaction.type === 'income') {
                balance += transaction.amount;
            } else {
                balance -= transaction.amount;
            }
        })
        return numberWithCommas(balance);
    }

    return (
        <div className="top_card">
            <p>Your Current Balance</p>
            <h3>
                <span>৳</span>
                <span>{transactions?.length > 0 ? calculateBalance() :0}</span>
            </h3>
        </div>
    );
}
