import React from 'react';
import { SmartPaginationProps } from './SmartTableInterface';



const SmartPagination: React.FC<SmartPaginationProps> = (props) => {

    const {
        currentPage,
        setCurrentPage,
        classList,
        totalPages,
        navigationIcon
    } = props;

    const generatePageNumbers = (currentPage: number, maxPages: number, pagesToShow: number) => {
        const pageNumbers = [];
        const ellipses = '...';
        // Pages to show before and after the current page
        const range = Math.floor((pagesToShow - 3) / 2);
        let start = Math.max(2, currentPage - range);
        let end = Math.min(maxPages - 1, currentPage + range);
        // Adjust the range if it exceeds the maximum pages
        console.log("start " , start , " end =- " , end);
        pageNumbers.push(1);
        // Display ellipses if needed before the current page
        if (currentPage - range > 2) {
            pageNumbers.push(ellipses);
        }

        // Add pages and ellipses
        for (let i = start; i <= end; i++) {
            pageNumbers.push(i);
        }
        // Display ellipses if needed after the current page
        if (currentPage + range < maxPages - 1) {
            pageNumbers.push(ellipses);
        }
        // Add ellipses if needed before the first page
        if(maxPages > range ){
           pageNumbers.push(maxPages);
        }

        return pageNumbers;
    }

    let class_list = ["smart-table-pagination pagination is-right "];
    if (classList) {
        class_list = [...class_list, ...classList]
    }

    const leftIcon=()=>{
        return navigationIcon ? "fa " + navigationIcon + "-left" : "fa fa-arrow-left";
    }

    const rightIcon=()=>{
        return navigationIcon ? "fa " + navigationIcon + "-right" : "fa fa-arrow-right";
    }
   // console.log(" current page = " , currentPage , " total pages " , totalPages);

    return (
        <nav className={class_list.join(" ")} role="navigation" aria-label="pagination">
            <ul className="pagination-list">
              <li key={"previous"} onClick={() => setCurrentPage(currentPage - 1)}  >
                <button disabled={currentPage === 1} 
                       className='pagination-link button'  aria-label="Goto page 1"> 
                       <i className={leftIcon()} aria-hidden="true"></i></button>
             </li>
                {generatePageNumbers(currentPage, totalPages, 5).map((pageNumber, index) => (
                    pageNumber === "..." ? <li key={index}><span className="pagination-ellipsis">&hellip;</span></li> :
                        <li key={index} onClick={() => setCurrentPage(parseInt(pageNumber + ""))}
                       ><button  className={currentPage===pageNumber ? "pagination-link is-current" : "pagination-link"} aria-label="Goto page 1">{pageNumber}</button></li>
                ))}
                <li key={"next"} onClick={() => setCurrentPage(currentPage + 1)} 
                       ><button disabled={currentPage === totalPages}  
                       className='pagination-link button'  aria-label="Goto page 1">
                        <i className={rightIcon()} aria-hidden="true"></i> </button>
                </li>
            </ul>
        </nav>
    );
};

export default SmartPagination