import { ReactNode } from 'react';

interface TableProps<T> {
  columns: { label: string; key: keyof T }[];
  data: T[];
  renderCell?: (key: keyof T, row: T) => ReactNode;
  onRowClick?: (row: T) => void;
}

const Table = <T,>({
  columns,
  data,
  renderCell,
  onRowClick,
}: TableProps<T>) => {
  const handleRowClick = (row: T) => onRowClick?.(row);

  return (
    <table className="w-full table-auto border-collapse overflow-hidden rounded-lg ring ring-gray-200">
      {/* 테이블 헤더 */}
      <thead className="bg-gray-200">
        <tr>
          {columns.map((col) => {
            return (
              <th key={String(col.key)} className="p-4 text-left font-semibold">
                {col.label}
              </th>
            );
          })}
        </tr>
      </thead>
      {/* 테이블 내용 */}
      <tbody className="text-gray-700">
        {data.length === 0 ? (
          <tr>
            <td colSpan={columns.length} className="p-4 text-center">
              데이터가 없습니다.
            </td>
          </tr>
        ) : (
          <>
            {data.map((row, rowIndex) => {
              return (
                <tr
                  className={
                    'border-t border-gray-100 cursor-pointer hover:bg-gray-100'
                  }
                  key={rowIndex}
                  onClick={() => handleRowClick(row)}
                >
                  {columns.map((col) => (
                    <td
                      key={String(col.key)}
                      className={'p-4 text-ellipsis whitespace-nowrap'}
                    >
                      {renderCell
                        ? renderCell(col.key, row)
                        : String(row[col.key])}
                    </td>
                  ))}
                </tr>
              );
            })}
          </>
        )}
      </tbody>
    </table>
  );
};

export default Table;
