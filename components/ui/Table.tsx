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
        <div className="overflow-x-auto rounded-lg border border-gray-200">
            <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-surface">
                    <tr>
                        {columns.map((col) => (
                            <th
                                key={col.key}
                                className="px-4 py-3 text-left text-xs font-semibold text-muted uppercase tracking-wider"
                            >
                                {col.label}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                    {data.length === 0 ? (
                        <tr>
                            <td
                                colSpan={columns.length}
                                className="px-4 py-8 text-center text-muted text-sm"
                            >
                                {emptyMessage}
                            </td>
                        </tr>
                    ) : (
                        data.map((item, index) => (
                            <tr key={index} className="hover:bg-gray-50 transition-colors">
                                {columns.map((col) => (
                                    <td
                                        key={col.key}
                                        className="px-4 py-3 text-sm text-body whitespace-nowrap"
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
