import React from 'react';
import _ from 'lodash';
import PropTypes from 'prop-types';

const Pagination = (props) => {
    const {itemsCount, pageSize, currentPage} = props;
    // here itemsCount -> total list size
    // pageSize -> no. of items I need to show on each page
    // pagesCount -> no. of page link [1 2 3 4] => total count 4
    console.log(currentPage);

    const pagesCount = Math.ceil(itemsCount / pageSize);
    if(pagesCount === 1) return null;
    //pages is array derived from range 
    const pages = _.range(1 , pagesCount + 1);

    return ( 
        <nav>
            <ul className="pagination">
                {pages.map(page => (
                    // changing className dynamically -> active link or not
                    <li key={page} className={page === currentPage ? "page-item active":"page-item"}>
                        <a className="page-link" onClick={() => props.onPageChange(page)}>{page}</a>
                    </li>
                ))}
                
            </ul>
        </nav>
     );
}

Pagination.propTypes = {
    //calling the imported PropTypes
    itemsCount: PropTypes.number.isRequired, 
    pageSize:PropTypes.number.isRequired, 
    currentPage: PropTypes.number.isRequired
}
 
export default Pagination;