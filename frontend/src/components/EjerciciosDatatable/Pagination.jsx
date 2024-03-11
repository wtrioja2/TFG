import React from "react";

export default function Pagination({
    meta,
    fetchEjercicios,
    firstPage,
    previousPage,
    nextPage,
    lastPage,
}) {

    /**
     * Render the pagination number
     * 
     * @param object meta 
     * @returns 
     */

    const renderPaginationNumbers = (meta) => {
        let paginationNumbers = [];
        let head = 1;
        let tail = meta && meta.current_page ? meta.current_page + 1 : 1;
    
        if (meta && meta.current_page && meta.current_page > 2) {
            head = meta.current_page - 1;
            tail = meta.current_page = 1;
        }
    
        if (meta && meta.last_page && tail > meta.last_page) {
            tail = meta.last_page;
        }
    
        for (let i = head; i <= tail; i++) {
            paginationNumbers.push(
                <button
                    key={i}
                    onClick={() => {
                        fetchEjercicios(`${import.meta.env.VITE_API_URL}/api/v1/ejercicios?page=${i}`);
                    }}
                    className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-medium py-2 px-4"
                >
                    {i}
                </button>
            );
        }
        return paginationNumbers;
    };
    
    return (
        <div className="flex justify-between items-center mt-4">
            <div>
                <span className="text-gray-700">
                    {meta && meta.from && meta.to && meta.total && meta.current_page && meta.last_page && (
                    <>
                        {meta.from} - {meta.to} of {meta.total} items (page{" "}
                        {meta.current_page} of {meta.last_page})
                    </>
                    )}
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