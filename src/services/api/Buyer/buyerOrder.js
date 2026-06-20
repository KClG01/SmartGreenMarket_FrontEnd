import axiosClient from "../axiosClient";

export const buyerOrder = {
    getAll: (dealer_slug) => axiosClient.get(`/storefronts/${dealer_slug}/orders/`).then((res) => res.data),

            // {
            //     "count": 0,
            //     "next": "string",
            //     "previous": "string",
            //     "page": 0,
            //     "page_size": 0,
            //     "has_more": true,
            //     "results": [
            //       {
            //         "id": 0,
            //         "order_code": "string",
            //         "status": "pending",
            //         "dealer_name": "string",
            //         "customer_name": "string",
            //         "payment_method": "string",
            //         "subtotal_amount": "-15.81",
            //         "discount_amount": "-6947",
            //         "shipping_fee": "8150402772.",
            //         "total_amount": "-3391483",
            //         "item_count": 0,
            //         "delivery_time": "2026-06-20T04:35:49.764Z",
            //         "delivery_date": "string",
            //         "delivery_slot": "string",
            //         "delivery_slot_name": "string",
            //         "created_at": "2026-06-20T04:35:49.764Z"
            //       }
            //     ]
            //   }     

    getById: (dealer_slug, id) => axiosClient.get(`/storefronts/${dealer_slug}/orders/${id}/`).then((res) => res.data),

            // {
            //     "id": 0,
            //     "order_code": "string",
            //     "status": "pending",
            //     "dealer_name": "string",
            //     "customer_name": "string",
            //     "customer_phone": "string",
            //     "payment_method": "string",
            //     "receiver_name": "string",
            //     "receiver_phone": "string",
            //     "delivery_address": "string",
            //     "delivery_time": "2026-06-20T04:36:33.562Z",
            //     "delivery_date": "string",
            //     "delivery_slot": "string",
            //     "delivery_slot_name": "string",
            //     "note": "string",
            //     "shipping_address": "string",
            //     "subtotal_amount": "-55948984",
            //     "discount_amount": "-134724756763.",
            //     "shipping_fee": "-65430456.93",
            //     "total_amount": "44255",
            //     "paid_amount": "866",
            //     "debt_amount": "-03",
            //     "items": [
            //       {
            //         "id": 0,
            //         "dealer_product_id": 0,
            //         "product_name": "string",
            //         "product_unit": "string",
            //         "product_thumbnail_url": "string",
            //         "quantity": 2147483647,
            //         "unit_price": "2323457.07",
            //         "subtotal": "-76496."
            //       }
            //     ],
            //     "payments": [
            //       {
            //         "id": 0,
            //         "payment_method": "cash",
            //         "payment_type": "full",
            //         "amount": "-664680431",
            //         "status": "pending",
            //         "paid_at": "2026-06-20T04:36:33.562Z",
            //         "created_at": "2026-06-20T04:36:33.562Z"
            //       }
            //     ],
            //     "status_histories": [
            //       {
            //         "id": 0,
            //         "status": "pending",
            //         "label": "string",
            //         "old_status": "string",
            //         "new_status": "string",
            //         "note": "string",
            //         "changed_by_name": "string",
            //         "created_at": "2026-06-20T04:36:33.562Z"
            //       }
            //     ],
            //     "delivered_at": "2026-06-20T04:36:33.562Z",
            //     "completed_at": "2026-06-20T04:36:33.562Z",
            //     "created_at": "2026-06-20T04:36:33.562Z",
            //     "updated_at": "2026-06-20T04:36:33.562Z"
            //   }

    create: (dealer_slug, data) => axiosClient.post(`/storefronts/${dealer_slug}/orders/`, data).then((res) => res.data),

    // {
    //     "items": [
    //       {
    //         "dealer_product_id": 1,
    //         "quantity": 2
    //       }
    //     ],
    //     "customer_address_id": 1, Nguồn: addresses[].id (address của buyer)
    //     "delivery_date": "2026-06-20", Nguồn: dates[].date từ delivery-slots
    //     "delivery_slot": "morning", Nguồn: dates[].slots[].id (morning / afternoon)
    //     "note": "Giao buổi sáng"
    //   }
    //Phí ship cố định 10.000 VND, thanh toán COD. Trừ tồn ngay. Trạng thái ban đầu: pending.

    confirmReceived: (dealer_slug, id) => axiosClient.post(`/storefronts/${dealer_slug}/orders/${id}/confirm-received/`).then((res) => res.data),

    //Chuyển shipping → completed, đánh dấu COD đã thanh toán.

    //Khung giờ giao hàng
    
    getDelivery: (dealer_slug) => axiosClient.get(`/storefronts/${dealer_slug}/delivery-slots/`).then((res) => res.data),
    //Trả danh sách ngày (2 ngày: hôm nay và ngày mai) và slot Sáng/Chiều. FE không tự tính — chỉ render slot available=true và gửi lại delivery_date+delivery_slot hoặc delivery_time khi đặt hàng.
};

export const handleApiError = (error, defaultMessage = "Có lỗi xảy ra") => {
    const message =
        error.response?.data?.message || error.message || defaultMessage;
    console.error("API Error:", error);
    return message;
};
