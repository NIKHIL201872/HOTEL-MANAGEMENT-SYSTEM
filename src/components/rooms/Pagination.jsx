import React, { useMemo } from 'react';

function Pagination({ currentPage, totalPages, onPageChange }) {
  const pageNumbers = useMemo(
    () => Array.from({ length: totalPages }, (_, i) => i + 1),
    [totalPages]
  );

  if (totalPages <= 1) return null;

  return (
    <div className="flex justify-center items-center gap-2 pt-4">
      <button 
        disabled={currentPage === 1}
        onClick={() => onPageChange(Math.max(currentPage - 1, 1))}
        className="px-4 py-2 rounded-lg bg-white border border-[#2B1D14]/15 text-[#2B1D14] font-bold text-xs uppercase tracking-wider disabled:opacity-40 hover:bg-[#2B1D14]/5 transition cursor-pointer"
      >
        Prev
      </button>
      {pageNumbers.map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={`w-9 h-9 rounded-lg font-bold text-xs transition cursor-pointer ${
            currentPage === page
              ? 'bg-[#2B1D14] text-white shadow-sm'
              : 'bg-white border border-[#2B1D14]/15 text-[#2B1D14] hover:bg-[#2B1D14]/5'
          }`}
        >
          {page}
        </button>
      ))}
      <button 
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(Math.min(currentPage + 1, totalPages))}
        className="px-4 py-2 rounded-lg bg-white border border-[#2B1D14]/15 text-[#2B1D14] font-bold text-xs uppercase tracking-wider disabled:opacity-40 hover:bg-[#2B1D14]/5 transition cursor-pointer"
      >
        Next
      </button>
    </div>
  );
}

export default React.memo(Pagination);