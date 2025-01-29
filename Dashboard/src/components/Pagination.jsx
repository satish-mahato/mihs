const Pagination = ({ currentPage, totalPages, setCurrentPage }) => {
    const goToPage = (page) => setCurrentPage(Math.max(1, Math.min(page, totalPages)));
  
    return (
      <div className="flex items-center justify-center mt-6">
        <button
          onClick={() => goToPage(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-4 py-2 border rounded mx-1 bg-gray-200 hover:bg-gray-300 disabled:bg-gray-100"
        >
          Prev
        </button>
        <span className="px-4 py-2">{`Page ${currentPage} of ${totalPages}`}</span>
        <button
          onClick={() => goToPage(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-4 py-2 border rounded mx-1 bg-gray-200 hover:bg-gray-300 disabled:bg-gray-100"
        >
          Next
        </button>
      </div>
    );
  };
  
  export default Pagination;
  