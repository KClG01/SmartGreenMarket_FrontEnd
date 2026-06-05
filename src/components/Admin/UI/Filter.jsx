/**
 * Filter — status chip buttons
 * Props:
 *   value    : string  — "" | "active" | "paused" | "pending"
 *   onChange : (val: string) => void
 */
const OPTIONS = [
    { label: "Tất cả",         value: "" },
    { label: "Đang hoạt động", value: "active" },
    { label: "Tạm ngưng",      value: "paused" },
    { label: "Đăng ký",        value: "pending" },
];

export default function Filter({ value, onChange }) {
    return (
        <div className="flex items-center gap-2">
            {OPTIONS.map((opt) => (
                <button
                    key={opt.value}
                    onClick={() => onChange(opt.value)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors font-['Geist',sans-serif]
                        ${value === opt.value
                            ? "bg-emerald-800 text-white"
                            : "bg-stone-100 text-neutral-600 hover:bg-stone-200"
                        }`}
                >
                    {opt.label}
                </button>
            ))}
        </div>
    );
}