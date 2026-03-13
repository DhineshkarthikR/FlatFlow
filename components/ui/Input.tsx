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
        <div className="space-y-1.5">
            {label && (
                <label
                    htmlFor={inputId}
                    className="block text-sm font-medium text-[var(--text-body)]"
                >
                    {label}
                </label>
            )}
            <div className="relative">
                <input
                    id={inputId}
                    type={currentType}
                    className={`w-full px-4 py-2.5 bg-[var(--bg-input)] rounded-xl border border-[var(--border-color)] text-sm text-[var(--text-heading)] placeholder:text-[var(--text-muted)] focus:outline-none focus:ring-2 focus:ring-[var(--accent-primary)]/50 focus:border-[var(--accent-primary)] transition-all shadow-inner ${error ? "border-red-500/50 focus:ring-red-500/50" : "hover:border-[var(--border-color)]"} ${isPassword ? "pr-10" : ""} ${className}`}
                    {...props}
                />
                {isPassword && (
                    <button
                        type="button"
                        aria-label={showPassword ? "Hide password" : "Show password"}
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--text-muted)] hover:text-[var(--text-body)] focus:outline-none transition-colors"
                    >
                        {showPassword ? (
                            <EyeOff className="h-4 w-4" />
                        ) : (
                            <Eye className="h-4 w-4" />
                        )}
                    </button>
                )}
            </div>
            {error && <p className="text-xs text-red-400 mt-1">{error}</p>}
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
        <div className="space-y-1.5">
            {label && (
                <label
                    htmlFor={inputId}
                    className="block text-sm font-medium text-[var(--text-body)]"
                >
                    {label}
                </label>
            )}
            <textarea
                id={inputId}
                className={`w-full px-4 py-2.5 bg-[var(--bg-input)] rounded-xl border border-[var(--border-color)] text-sm text-[var(--text-heading)] placeholder:text-[var(--text-muted)] focus:outline-none focus:ring-2 focus:ring-[var(--accent-primary)]/50 focus:border-[var(--accent-primary)] transition-all shadow-inner resize-none ${error ? "border-red-500/50 focus:ring-red-500/50" : "hover:border-[var(--border-color)]"} ${className}`}
                rows={4}
                {...props}
            />
            {error && <p className="text-xs text-red-400 mt-1">{error}</p>}
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
        <div className="space-y-1.5">
            {label && (
                <label
                    htmlFor={inputId}
                    className="block text-sm font-medium text-[var(--text-body)]"
                >
                    {label}
                </label>
            )}
            <select
                id={inputId}
                className={`w-full px-4 py-2.5 bg-[var(--bg-input)] rounded-xl border border-[var(--border-color)] text-sm text-[var(--text-heading)] focus:outline-none focus:ring-2 focus:ring-[var(--accent-primary)]/50 focus:border-[var(--accent-primary)] transition-all shadow-inner appearance-none ${error ? "border-red-500/50 focus:ring-red-500/50" : "hover:border-[var(--border-color)]"} ${className}`}
                {...props}
            >
                {options.map((opt) => (
                    <option key={opt.value} value={opt.value} className="bg-[var(--bg-elevated)] text-[var(--text-heading)]">
                        {opt.label}
                    </option>
                ))}
            </select>
            {error && <p className="text-xs text-red-400 mt-1">{error}</p>}
        </div>
    );
}
