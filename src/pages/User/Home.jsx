import Banner from "../../components/User/Home/Banner";
import FavProduct from "../../components/User/Home/FavProduct";
import BestSellingProduct from "../../components/User/Home/BestSellingProduct";

export function Home() {
    return (
        <div className="w-full flex flex-col items-center gap-0 pb-16 bg-gray-50">
            <Banner />
            <FavProduct />
            <BestSellingProduct title="Bán Chạy Nhất" />
            <BestSellingProduct title="Rau Củ Theo Mùa" />
        </div>
    );
}