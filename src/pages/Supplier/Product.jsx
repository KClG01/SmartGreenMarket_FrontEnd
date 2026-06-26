import { useState, useEffect } from "react";
import { Search } from "lucide-react";
import OrderTable from "../../components/Supplier/Order/OrderTable";
import OrderStatusStats from "../../components/Supplier/Order/OrderStatusStats";
import DetailOrderModal from "../../components/Supplier/Order/DetailOrderModal";
import SupplierPageHeader, { SUPPLIER_PAGE_CLASS } from "../../components/Supplier/UI/SupplierPageHeader";
import { orderService, parseOrderList } from "../../services/api/orderService";

export default function ProductSupplierPage() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [detailRow, setDetailRow] = useState(null);

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

  const handleViewOrder = async (row) => {
    setDetailRow(row);
    try {
      const detail = await orderService.getById(row.id);
      setDetailRow(detail ?? row);
    } catch (error) {
      console.error("Lỗi khi tải chi tiết đơn hàng:", error);
    }
  };

  return (
    <div
      className={SUPPLIER_PAGE_CLASS}
      style={{ fontFamily: "'Be Vietnam Pro', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" }}
    >
      <OrderStatusStats orders={data} />

      {/* Search box — mirrors .toolbar / .search-box in the mockup */}
      <div className="flex items-center gap-2.5">
        <div
          className="flex items-center gap-2 px-3 h-[34px] rounded-[10px] flex-1 max-w-[340px]"
          style={{ background: "#ffffff", border: "0.5px solid #e5e7eb" }}
        >
          <Search className="w-[15px] h-[15px] shrink-0" style={{ color: "#80899a" }} />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Tìm theo mã đơn hoặc tên đại lý..."
            className="flex-1 h-full bg-transparent border-none outline-none text-[13px]"
            style={{ color: "#111827" }}
          />
        </div>
      </div>

      <OrderTable
        data={data}
        search={search}
        loading={loading}
        onView={handleViewOrder}
      />

      <DetailOrderModal
        isOpen={detailRow !== null}
        onClose={() => setDetailRow(null)}
        order={detailRow}
        onUpdate={fetchOrders}
      />
    </div>
  );
}