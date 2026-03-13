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
        <div className="overflow-x-auto rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-surface)]/50 backdrop-blur-md transition-colors duration-300">
            <table className="min-w-full divide-y divide-[var(--border-subtle)]">
                <thead className="bg-[var(--bg-primary)]/50">
                    <tr>
                        {columns.map((col) => (
                            <th
                                key={col.key}
                                className="px-6 py-4 text-left text-xs font-semibold text-[var(--text-muted)] uppercase tracking-wider"
                            >
                                {col.label}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody className="divide-y divide-[var(--border-subtle)] bg-transparent">
                    {data.length === 0 ? (
                        <tr>
                            <td
                                colSpan={columns.length}
                                className="px-6 py-12 text-center text-[var(--text-muted)] text-sm"
                            >
                                {emptyMessage}
                            </td>
                        </tr>
                    ) : (
                        data.map((item, index) => (
                            <tr key={index} className="hover:bg-[var(--bg-surface-hover)] transition-colors duration-200">
                                {columns.map((col) => (
                                    <td
                                        key={col.key}
                                        className="px-6 py-4 text-sm text-[var(--text-body)] whitespace-nowrap"
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
