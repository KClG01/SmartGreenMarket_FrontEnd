import FavProductCard from "./FavProductCard";

const PRODUCTS = [
    { id: 1, name: "Rau muống sạch", price: "15.000đ", unit: "/bó" },
    { id: 2, name: "Cải xanh hữu cơ", price: "20.000đ", unit: "/bó" },
    { id: 3, name: "Xà lách lô lô", price: "25.000đ", unit: "/kg" },
    { id: 4, name: "Cà chua bi đà lạt", price: "35.000đ", unit: "/kg" },
    { id: 5, name: "Bắp cải trắng", price: "18.000đ", unit: "/kg" },
];

export default function FavProduct() {
    return (
        <section className="w-full max-w-[1280px] mx-auto px-10 pt-10">
            <div className="flex justify-between items-end mb-6">
                <h2 className="text-emerald-950 text-2xl font-bold font-playfair">Sản phẩm được yêu thích</h2>
                <a href="#" className="text-emerald-700 text-sm font-medium hover:underline">Xem tất cả →</a>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
                {PRODUCTS.map((p) => (
                    <FavProductCard key={p.id} name={p.name} price={p.price} unit={p.unit} />
                ))}
            </div>
        </section>
    );
}