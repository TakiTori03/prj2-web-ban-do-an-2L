const Order = require('../models/order');
const catchAsyncErrors = require('../middlewares/catchAsyncErrors');




exports.getRevenueByMonth = catchAsyncErrors(async (req, res, next) => {
    const { year } = req.body;

    const amountPerMonth = await Order.aggregate([
        {
            $match: {
                orderStatus: 'Delivered',
                createdAt: {
                    $gte: new Date(`${year}-01-01T00:00:00Z`),
                    $lt: new Date(`${year + 1}-01-01T00:00:00Z`)
                }
            } // Lọc chỉ đơn hàng đã giao hàng
        },
        {
            $group: {
                _id: { $month: '$createdAt' }, // Nhóm theo tháng
                totalRevenue: { $sum: '$totalPrice' } // Tính tổng doanh thu
            }
        },
        {
            $sort: { _id: 1 } // Sắp xếp theo tháng tăng dần
        }
    ]);

    const revenueByMonth = Array.from({ length: 12 }, (_, i) => {
        const matchingObject = amountPerMonth.find(obj => obj._id === i + 1);
        return matchingObject ? matchingObject.totalRevenue : 0;
    });


    res.status(200).json({
        success: true,
        revenueByMonth
    })
});

exports.getQuantityPerMonth = catchAsyncErrors(async (req, res, next) => {
    const quantityPerMonth = await Order.aggregate([
        {
            $match: { orderStatus: 'Delivered' } // Lọc chỉ đơn hàng đã giao hàng
        },
        {
            $unwind: '$orderItems' // Tách mảng orderItems thành các bản ghi riêng lẻ
        },
        {
            $group: {
                _id: { $month: '$createdAt' }, // Nhóm theo tháng
                totalQuantity: { $sum: '$orderItems.quantity' } // Tính tổng số lượng sản phẩm
            }
        },
        {
            $sort: { _id: 1 } // Sắp xếp theo tháng tăng dần
        }
    ])
    const quantityByMonth = Array.from({ length: 12 }, (_, i) => {
        const matchingObject = quantityPerMonth.find(obj => obj._id === i + 1);
        return matchingObject ? matchingObject.totalQuantity : 0;
    });


    res.status(200).json({
        success: true,
        quantityByMonth
    })
});

exports.getCategoryByMonth = catchAsyncErrors(async (req, res, next) => {
    const { month, year } = req.body;

    const startDate = new Date(year, month - 1, 1);
    const endDate = new Date(year, month, 0, 23, 59, 59);


    const salesStats = await Order.aggregate([
        {
            // Lọc các đơn hàng trong khoảng thời gian chỉ định
            $match: {
                orderStatus: 'Delivered',
                createdAt: {
                    $gte: startDate,
                    $lte: endDate
                }
            }
        },
        {
            // Giải nén mảng orderItems để có thể truy cập từng sản phẩm riêng lẻ
            $unwind: '$orderItems'
        },
        {
            // Tham gia bảng Product để lấy thông tin category của từng sản phẩm
            $lookup: {
                from: 'products',
                localField: 'orderItems.product',
                foreignField: '_id',
                as: 'productDetails'
            }
        },
        {
            // Giải nén mảng productDetails để truy cập trực tiếp thông tin sản phẩm
            $unwind: '$productDetails'
        },
        {
            // Nhóm theo category và tính tổng số lượng bán ra
            $group: {
                _id: '$productDetails.category',
                totalQuantitySold: { $sum: '$orderItems.quantity' }
            }
        },
        {
            // Sắp xếp kết quả theo thứ tự giảm dần của số lượng bán ra
            $sort: { totalQuantitySold: -1 }
        }
    ]);


    res.status(200).json({
        success: true,
        salesStats
    })

});