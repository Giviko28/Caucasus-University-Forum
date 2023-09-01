import React, { useState } from 'react';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
    const maxPagesToShow = 5; // Maximum number of pages to display in the pagination
    const halfMaxPagesToShow = Math.floor(maxPagesToShow / 2);

    const renderPaginationLinks = () => {
        const pages = [];

        // Calculate the range of pages to display
        let startPage = Math.max(currentPage - halfMaxPagesToShow, 1);
        let endPage = Math.min(currentPage + halfMaxPagesToShow, totalPages);

        // Handle cases where the range needs adjustment
        if (currentPage <= halfMaxPagesToShow) {
            endPage = maxPagesToShow;
        }
        if (currentPage >= totalPages - halfMaxPagesToShow) {
            startPage = totalPages - maxPagesToShow + 1;
        }

        // Add 'Go to First' link if not on the first page
        if (startPage > 1) {
            pages.push(
                <li key="first">
                    <button onClick={() => onPageChange(1)}>1</button>
                </li>
            );
            if (startPage > 2) {
                pages.push(<li key="ellipsis-1">...</li>);
            }
        }

        // Render the page links within the calculated range
        for (let i = startPage; i <= endPage; i++) {
            pages.push(
                <li key={i} className={i === currentPage ? 'active' : ''}>
                    <button onClick={() => onPageChange(i)}>{i}</button>
                </li>
            );
        }

        // Add 'Go to Last' link if not on the last page
        if (endPage < totalPages) {
            if (endPage < totalPages - 1) {
                pages.push(<li key="ellipsis-2">...</li>);
            }
            pages.push(
                <li key="last">
                    <button onClick={() => onPageChange(totalPages)}>{totalPages}</button>
                </li>
            );
        }

        return pages;
    };

    return (
        <ul style={{
            display:"flex",
            listStyle: 'none'
        }} className="pagination">
            {renderPaginationLinks()}
        </ul>
    );
};

export default Pagination;
