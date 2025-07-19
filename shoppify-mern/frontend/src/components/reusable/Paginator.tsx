import React from 'react';
 
interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}
 
const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
  const getPages = () => {
    const pages: (number | string)[] = [];
    console.log(pages)
    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      if (currentPage <= 3) {
        pages.push(1, 2, 3, 4, '...', totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1, '...', totalPages - 3, totalPages - 2, totalPages - 1, totalPages);
      } else {
        pages.push(1, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages);
      }
    }
    console.log(pages)
    return pages;
  };
 
  return (
    <div className="flex justify-center items-center space-x-1 mt-4">
      <button
        className="px-3 py-1 text-black rounded border border-gray-300 hover:bg-gray-200 disabled:opacity-50"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        &laquo; Previous
      </button>
 
      {getPages().map((page, idx) =>
        page === '...' ? (
          <span key={idx} className="px-3 py-1 border border-transparent text-gray-500">
            ...
          </span>
        ) : (
          <button
            key={idx}
            className={`px-3 py-1 rounded border ${
              currentPage === page
                ? 'bg-blue-500 text-black border-blue-500'
                : 'border-gray-300 text-black hover:bg-gray-200'
            }`}
            onClick={() => onPageChange(Number(page))}
          >
            {page}
          </button>
        )
      )}
 
      <button
        className="px-3 py-1 text-black rounded border border-gray-300 hover:bg-gray-200 disabled:opacity-50"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        Next &raquo;
      </button>
    </div>
  );
};
 
export default Pagination;
 