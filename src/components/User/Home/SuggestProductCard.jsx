import { ShoppingCart } from "lucide-react";

export default function FavProductCard({ name = "Rau", price = "45.000đ", unit = "/kg", image }) {
    return (
        <div className="bg-white rounded-2xl shadow-sm border border-stone-100 flex flex-col overflow-hidden hover:shadow-md hover:-translate-y-1 transition-all duration-200">
            <div className="relative overflow-hidden">
                <img
                    src={image || "./public/images/rau.jpg"}
                    alt={name}
                    className="w-full h-48 object-cover"
                />
            </div>
            <div className="p-4 flex flex-col gap-3 flex-1">
                <span className="text-zinc-800 text-sm font-medium leading-snug line-clamp-2">{name}</span>
                <div className="flex items-baseline gap-1">
                    <span className="text-emerald-800 text-base font-bold">{price}</span>
                    <span className="text-neutral-400 text-xs">{unit}</span>
                </div>
                <button className="w-full py-2 bg-green-100 hover:bg-green-200 text-green-900 text-sm font-medium rounded-xl flex items-center justify-center gap-2 transition-colors mt-auto">
                    <ShoppingCart className="w-4 h-4" />
                    Thêm vào giỏ
                </button>
            </div>
        </div>
    );
}