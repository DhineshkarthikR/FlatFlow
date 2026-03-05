export default function LoadingSkeleton({ rows = 5 }: { rows?: number }) {
    return (
        <div className="space-y-4 animate-pulse">
            {Array.from({ length: rows }).map((_, i) => (
                <div key={i} className="flex items-center space-x-4">
                    <div className="h-4 bg-gray-200 rounded w-1/4" />
                    <div className="h-4 bg-gray-200 rounded w-1/2" />
                    <div className="h-4 bg-gray-200 rounded w-1/4" />
                </div>
            ))}
        </div>
    );
}

export function CardSkeleton() {
    return (
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6 animate-pulse">
            <div className="flex items-center justify-between">
                <div className="space-y-2">
                    <div className="h-3 bg-gray-200 rounded w-24" />
                    <div className="h-6 bg-gray-200 rounded w-16" />
                </div>
                <div className="h-12 w-12 bg-gray-200 rounded-lg" />
            </div>
        </div>
    );
}
