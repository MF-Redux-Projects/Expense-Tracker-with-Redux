import deleteImage from "../../assets/images/delete.svg";
import editImage from "../../assets/images/edit.svg";
import {useDispatch} from "react-redux";
import {editActive, removeTransaction} from "../../features/transaction/transactionSlice";
import numberWithCommas from "../../utils/numberWithCommas";
import {setPage} from "../../features/pagination/paginationSlice";

export default function Transaction({transaction}) {
    const dispatch = useDispatch();
    const {name, type, amount, id} = transaction || {};

    const handleEdit = () => {
        dispatch(editActive(transaction));
    }

    const handleDelete = () => {
        dispatch(removeTransaction(id));
        dispatch(setPage(1));
    }

    return (
        <div className={`transaction ${type}`}>
            <p className={'m-0'}>{name}</p>
            <div className="right">
                <p className={'m-0'}>৳ {numberWithCommas(amount)}</p>
                <button className="link" onClick={handleEdit}>
                    <img alt="Edit" className="icon" src={editImage} />
                </button>
                <button className="link" onClick={handleDelete}>
                    <img alt="Delete" className="icon" src={deleteImage} />
                </button>
            </div>
        </div>
    );
}
