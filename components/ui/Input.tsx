import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    error?: string;
}

export default function Input({
    label,
    error,
    className = "",
    id,
    type,
    ...props
}: InputProps) {
    const inputId = id || label?.toLowerCase().replace(/\s+/g, "-");
    const [showPassword, setShowPassword] = useState(false);

    const isPassword = type === "password";
    const currentType = isPassword ? (showPassword ? "text" : "password") : type;

    return (
        <div className="space-y-1">
            {label && (
                <label
                    htmlFor={inputId}
                    className="block text-sm font-medium text-heading"
                >
                    {label}
                </label>
            )}
            <div className="relative">
                <input
                    id={inputId}
                    type={currentType}
                    className={`w-full px-3 py-2 rounded-lg border border-gray-300 text-sm text-heading placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors ${error ? "border-red-500 focus:ring-red-500" : ""
                        } ${isPassword ? "pr-10" : ""} ${className}`}
                    {...props}
                />
                {isPassword && (
                    <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 focus:outline-none"
                    >
                        {showPassword ? (
                            <EyeOff className="h-4 w-4" />
                        ) : (
                            <Eye className="h-4 w-4" />
                        )}
                    </button>
                )}
            </div>
            {error && <p className="text-xs text-red-600">{error}</p>}
        </div>
    );
}

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
    label?: string;
    error?: string;
}

export function Textarea({
    label,
    error,
    className = "",
    id,
    ...props
}: TextareaProps) {
    const inputId = id || label?.toLowerCase().replace(/\s+/g, "-");

    return (
        <div className="space-y-1">
            {label && (
                <label
                    htmlFor={inputId}
                    className="block text-sm font-medium text-heading"
                >
                    {label}
                </label>
            )}
            <textarea
                id={inputId}
                className={`w-full px-3 py-2 rounded-lg border border-gray-300 text-sm text-heading placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors resize-none ${error ? "border-red-500 focus:ring-red-500" : ""
                    } ${className}`}
                rows={4}
                {...props}
            />
            {error && <p className="text-xs text-red-600">{error}</p>}
        </div>
    );
}

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
    label?: string;
    error?: string;
    options: { value: string; label: string }[];
}

export function Select({
    label,
    error,
    options,
    className = "",
    id,
    ...props
}: SelectProps) {
    const inputId = id || label?.toLowerCase().replace(/\s+/g, "-");

    return (
        <div className="space-y-1">
            {label && (
                <label
                    htmlFor={inputId}
                    className="block text-sm font-medium text-heading"
                >
                    {label}
                </label>
            )}
            <select
                id={inputId}
                className={`w-full px-3 py-2 rounded-lg border border-gray-300 text-sm text-heading focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors ${error ? "border-red-500 focus:ring-red-500" : ""
                    } ${className}`}
                {...props}
            >
                {options.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                        {opt.label}
                    </option>
                ))}
            </select>
            {error && <p className="text-xs text-red-600">{error}</p>}
        </div>
    );
}
