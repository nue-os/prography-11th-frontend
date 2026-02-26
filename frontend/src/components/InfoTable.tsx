import React from 'react';

interface TableItem {
  label: React.ReactNode;
  value: React.ReactNode;
}

interface TableRow {
  items: TableItem[];
}

interface InfoTableProps {
  rows: TableRow[];
}

const InfoTable = ({ rows }: InfoTableProps) => {
  return (
    <table className="border-gray-300 w-full table-fixed border">
      <tbody>
        {rows.map((row, rowIndex) => (
          <tr key={rowIndex} className="border-gray-400 border">
            {row.items.map((item, itemIndex) => (
              <React.Fragment key={itemIndex}>
                <th className="bg-gray-300 border-gray-400 border p-3 font-medium w-1/6">
                  {item.label}
                </th>
                <td className="p-3">{item.value}</td>
              </React.Fragment>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default InfoTable;
