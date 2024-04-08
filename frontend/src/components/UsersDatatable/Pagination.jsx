import React from "react";

export default function Pagination({
    meta,
    fetchUsers,
    firstPage,
    previousPage,
    nextPage,
    lastPage,
}) {
    console.log("Meta:", meta);
    console.log("FetchUsers:", fetchUsers);

    /**
     * Render the pagination number
     * 
     * @param object meta 
     * @returns 
     */

    const renderPaginationNumbers = (meta) => {
        let paginationNumbers = [];
        let head = 1;
        let tail = meta.current_page + 1;

        // If the current page is greater than 2, then we need
        // to only show the previous page and the next page
        if (meta.current_page > 2){
            head = meta.current_page - 1;
            tail = meta.current_page = 1;
        }

        // Ensure that the tail doesn't go past the last page
        if (tail > meta.last_page){
            tail = meta.last_page;
        }

        for (let i = 1; i <= tail; i++) {
            paginationNumbers.push(
                <button 
                    key={i} 
                    onClick={() => {
                        fetchUsers(`${import.meta.env.VITE_API_URL}/api/v1/users?page=${i}`);
                    }}
                className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-medium py-2 px-4"
                > {i} </button>
            ); 
        }
        return paginationNumbers;
    };
    return (
        <div className="flex justify-between items-center mt-4">
            <div>
                <span className="text-gray-700">
                    {meta.from} - {meta.to} of {meta.total} items (page{" "}
                    {meta.current_page} of {meta.last_page})
                </span>
            </div>
            <div>
                <button
                    onClick={firstPage}
                    className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-medium py-2 px-4"
                >
                    First
                </button>
                <button
                    onClick={previousPage}
                    className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-medium py-2 px-4 "
                >
                    Previous
                </button>

               {renderPaginationNumbers(meta)}

                <button
                    onClick={nextPage}
                    className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-medium py-2 px-4 "
                >
                    Next
                </button>
                <button
                    onClick={lastPage}
                    className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-medium py-2 px-4"
                >
                    Last
                </button>
            </div>
        </div>
    );
}
