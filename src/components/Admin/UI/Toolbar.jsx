import { Plus } from "lucide-react";
import SearchBar from "./SearchBar";

/**
 * Toolbar — top action bar: search + filter button + add CTA
 * Props:
 *   search            : string
 *   onSearch          : (val: string) => void
 *   onAdd             : () => void
 *   addLabel          : string
 *   searchPlaceholder : string
 */
export default function Toolbar({ search, onSearch, onAdd, addLabel = "Thêm mới", searchPlaceholder }) {
    return (
        <div className="w-full p-4 bg-white rounded-xl border border-neutral-200 flex justify-between items-center gap-4">
            <div className="flex items-center gap-3">
                <SearchBar
                    value={search}
                    onChange={onSearch}
                    placeholder={searchPlaceholder}
                />
            </div>
            {onAdd ? (
                <button
                    type="button"
                    onClick={onAdd}
                    className="cursor-pointer flex items-center gap-2 rounded-lg bg-emerald-800 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-emerald-700 font-['Geist',sans-serif]"
                >
                    <Plus className="h-4 w-4" />
                    {addLabel}
                </button>
            ) : null}
        </div>
    );
}