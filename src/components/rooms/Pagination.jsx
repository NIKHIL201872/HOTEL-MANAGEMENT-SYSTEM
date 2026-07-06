import { ChevronLeft, ChevronRight } from "lucide-react";
import {memo} from "react";

const getPageNumbers = (currentPage, totalPages, delta = 1) => {
    const range = [];
    const rangeWithDots = [];
    let last;

    for (let i = 1; i <= totalPages; i++) {
        if (
            i === 1 ||
            i === totalPages ||
            (i >= currentPage - delta && i <= currentPage + delta)
        ) {
            range.push(i);
        }
    }

    for (const i of range) {
        if (last) {
            if (i - last === 2) {
                rangeWithDots.push(last + 1);
            } else if (i - last > 2) {
                rangeWithDots.push("...");
            }
        }
        rangeWithDots.push(i);
        last = i;
    }

    return rangeWithDots;
};

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
    if (totalPages <= 1) return null;

    const goToPage = (p) => onPageChange(Math.min(Math.max(p, 1), totalPages));

    return (
        <div className="flex items-center justify-center flex-wrap gap-2 pt-2">
            <button
                onClick={() => goToPage(currentPage - 1)}
                disabled={currentPage === 1}
                className="h-8 px-3 flex items-center justify-center gap-1 rounded-lg border border-gray-200 text-[#3F2E24] text-sm font-medium disabled:opacity-40 disabled:cursor-not-allowed hover:bg-gray-100"
            >
                <ChevronLeft size={16} />
                Prev
            </button>

            {getPageNumbers(currentPage, totalPages).map((p, i) =>
                    p === "..." ? (
                        <span
                            key={`dots-${i}`}
                            className="w-8 h-8 flex items-center justify-center text-gray-400 text-sm"
                        >
            ...
          </span>
                    ) : (
                        <button
                            key={p}
                            onClick={() => goToPage(p)}
                            className={`w-8 h-8 flex items-center justify-center rounded-lg text-sm font-medium transition shrink-0 ${
                                p === currentPage
                                    ? "bg-[#3F2E24] text-white"
                                    : "text-gray-600 border border-gray-200 hover:bg-gray-100"
                            }`}
                        >
                            {p}
                        </button>
                    ),
            )}

            <button
                onClick={() => goToPage(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="h-8 px-3 flex items-center justify-center gap-1 rounded-lg border border-gray-200 text-[#3F2E24] font-bold text-sm font-medium disabled:opacity-40 disabled:cursor-not-allowed hover:bg-gray-100"
            >
                Next
                <ChevronRight size={16} />
            </button>
        </div>
    );
};

export default memo(Pagination);