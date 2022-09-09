import {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {fetchTotalTransactions} from "../features/transaction/transactionSlice";
import {Pagination} from "react-bootstrap";
import {setPage} from "../features/pagination/paginationSlice";

const ExpensePagination = () => {
    const dispatch = useDispatch();
    const {transactionCount} = useSelector(state => state.transaction);
    const {page: currentPage, limit} = useSelector(state => state.pagination);

    const totalPage = Math.ceil(transactionCount / limit);
    if(totalPage === 1) return null;
    const pages = Array.from({length: totalPage}, (_, i) => i + 1);

    const handlePageChange = (page) => {
        dispatch(setPage(page));
    }
    return (
        <Pagination className='justify-content-center w-100 mt-4'>
            {
                pages.map(page => (
                    <Pagination.Item key={page} active={page === currentPage} onClick={() => handlePageChange(page)}>
                        {page}
                    </Pagination.Item>
                ))
            }
        </Pagination>
    );
};

export default ExpensePagination;