interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) => {
  if (totalPages <= 1) return null;

  // 보여줄 페이지 번호 계산
  const pages: (number | '...')[] = [];

  const createRange = (start: number, end: number) => {
    const range = [];
    for (let i = start; i <= end; i++) range.push(i);
    return range;
  };

  // 페이지가 적으면 모두 다 보여줌
  if (totalPages <= 7) {
    pages.push(...createRange(1, totalPages));
  }
  // 많으면 축약 처리
  else {
    // 초반 4페이지: 1~5 + ... + 마지막 페이지 표시
    if (currentPage <= 4) {
      pages.push(...createRange(1, 5), '...', totalPages);
    }
    // 끝 4페이지: 처음 페이지 + ... + 끝 5페이지 표시
    else if (currentPage >= totalPages - 3) {
      pages.push(1, '...', ...createRange(totalPages - 4, totalPages));
    }
    // 중간 페이지: 처음, ..., 현재-2 ~ 현재+2, ..., 마지막 페이지 표시
    else {
      pages.push(
        1,
        '...',
        currentPage - 2,
        currentPage - 1,
        currentPage,
        currentPage + 1,
        currentPage + 2,
        '...',
        totalPages,
      );
    }
  }

  return (
    <div className="flex items-center justify-center gap-1">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="border-gray-400 h-8 w-8 rounded-sm border text-center text-sm hover:bg-gray-200 disabled:border-gray-300 disabled:text-gray-300 disabled:cursor-not-allowed! disabled:hover:bg-white"
      >
        {'<'}
      </button>

      {pages.map((page, idx) =>
        page === '...' ? (
          <span
            key={`ellipsis-${idx}`}
            className="text-sm rounded-sm border-gray-400 h-8 w-8 border py-1 text-center select-none"
          >
            ...
          </span>
        ) : (
          <button
            key={page}
            onClick={() => onPageChange(page as number)}
            className={`text-sm border-gray-400 h-8 w-8 rounded-sm border text-center ${
              currentPage === page &&
              'bg-gray-500 text-gray-50 hover:bg-gray-500'
            } hover:bg-gray-200`}
          >
            {page}
          </button>
        ),
      )}

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className=" border-gray-400 h-8 w-8 rounded-sm border text-center text-sm hover:bg-gray-200 disabled:border-gray-300 disabled:text-gray-300 disabled:cursor-not-allowed! disabled:hover:bg-white"
      >
        {'>'}
      </button>
    </div>
  );
};

export default Pagination;
