import React from "react";

interface Column<T> {
    key: string;
    label: string;
    render?: (item: T) => React.ReactNode;
}

interface TableProps<T> {
    columns: Column<T>[];
    data: T[];
    emptyMessage?: string;
}

export default function Table<T extends Record<string, unknown>>({
    columns,
    data,
    emptyMessage = "No data found",
}: TableProps<T>) {
    return (
        <div className="overflow-x-auto rounded-xl border border-white/5 bg-[#131A2A]/50 backdrop-blur-md">
            <table className="min-w-full divide-y divide-white/5">
                <thead className="bg-[#0B0F19]/50">
                    <tr>
                        {columns.map((col) => (
                            <th
                                key={col.key}
                                className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider"
                            >
                                {col.label}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody className="divide-y divide-white/5 bg-transparent">
                    {data.length === 0 ? (
                        <tr>
                            <td
                                colSpan={columns.length}
                                className="px-6 py-12 text-center text-gray-500 text-sm"
                            >
                                {emptyMessage}
                            </td>
                        </tr>
                    ) : (
                        data.map((item, index) => (
                            <tr key={index} className="hover:bg-white/5 transition-colors duration-200">
                                {columns.map((col) => (
                                    <td
                                        key={col.key}
                                        className="px-6 py-4 text-sm text-gray-300 whitespace-nowrap"
                                    >
                                        {col.render
                                            ? col.render(item)
                                            : (item[col.key] as React.ReactNode)}
                                    </td>
                                ))}
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
        </div>
    );
}
