import { useState, useEffect } from "react";
import OrderTable from "../../components/Supplier/Order/OrderTable";
import OrderStatusStats from "../../components/Supplier/Order/OrderStatusStats";
import SupplierPageHeader, { SUPPLIER_PAGE_CLASS } from "../../components/Supplier/UI/SupplierPageHeader";
import { orderService, parseOrderList } from "../../services/api/orderService";

export default function OrderSupplierPage() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const response = await orderService.getAll({ page: 1, page_size: 100 });
      setData(parseOrderList(response));
    } catch (error) {
      console.error("Lỗi khi tải danh sách đơn hàng:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <div className={SUPPLIER_PAGE_CLASS}>
      <SupplierPageHeader
        title="Quản lý đơn hàng"
        description="Theo dõi các phiếu nhập hàng từ đại lý gửi tới nhà cung cấp"
      />

      <OrderStatusStats orders={data} />

      <div className="flex justify-between items-center">
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Tìm theo mã đơn hoặc tên đại lý..."
          className="px-4 py-2 border border-neutral-200 rounded-lg text-sm w-80 outline-none focus:border-emerald-600"
        />
      </div>

      <OrderTable data={data} search={search} loading={loading} />
    </div>
  );
}
