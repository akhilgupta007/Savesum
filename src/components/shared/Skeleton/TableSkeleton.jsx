import React from 'react';
import Skeleton from './Skeleton';

const TableSkeleton = ({ columns = 5, rows = 5 }) => {
  return (
    <div className="w-full bg-white rounded-xl border border-[#EBEBEB] shadow-sm overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left font-inter">
          <thead className="bg-[#F9FAFB] border-b border-[#EBEBEB]">
            <tr>
              {Array.from({ length: columns }).map((_, i) => (
                <th key={`th-${i}`} className="px-6 py-4">
                  <Skeleton className="h-4 w-24" />
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-[#EBEBEB]">
            {Array.from({ length: rows }).map((_, rowIndex) => (
              <tr key={`tr-${rowIndex}`} className="hover:bg-[#F9FAFB] transition-colors">
                {Array.from({ length: columns }).map((_, colIndex) => (
                  <td key={`td-${rowIndex}-${colIndex}`} className="px-6 py-4">
                    <Skeleton className={`h-4 ${colIndex === 0 ? 'w-32' : 'w-20'}`} />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TableSkeleton;
