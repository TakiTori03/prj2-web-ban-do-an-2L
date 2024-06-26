const Order = require('../models/order');
const catchAsyncErrors = require('../middlewares/catchAsyncErrors');

exports.getRevenueByMonth = catchAsyncErrors(async (req, res, next) => {
    let { year } = req.body;

    let startDate = new Date(`${year}-01-01T00:00:00.000Z`);
    let endDate = new Date(`${year}-12-31T23:59:59.999Z`);



    const monthRevenue = await Order.aggregate([
        {
            $match: {
                orderStatus: 'Delivered',
                createdAt: {
                    $gte: startDate,
                    $lte: endDate
                }
            }
        },
        {
            $group: {
                _id: { month: { $month: "$createdAt" } },
                totalRevenue: { $sum: "$totalPrice" }
            }
        },
        {
            $sort: { "_id.month": 1 }
        },
        {
            $project: {
                month: "$_id.month",
                totalRevenue: 1,
                _id: 0
            }
        }
    ]);

    // console.log(revenueByMonth)
    res.status(200).json({
        success: true,
        monthRevenue
    })
});

exports.getQuantityPerMonth = catchAsyncErrors(async (req, res, next) => {
    let { year } = req.body;

    let startDate = new Date(`${year}-01-01T00:00:00.000Z`);
    let endDate = new Date(`${year}-12-31T23:59:59.999Z`);

    const quantityPerMonth = await Order.aggregate([
        {
            $match: {
                orderStatus: 'Delivered',
                createdAt: {
                    $gte: startDate,
                    $lte: endDate
                }
            }// Lọc chỉ đơn hàng đã giao hàng
        },
        {
            $unwind: '$orderItems' // Tách mảng orderItems thành các bản ghi riêng lẻ
        },
        {
            $group: {
                _id: {
                    month: { $month: '$createdAt' }
                }, // Nhóm theo tháng
                totalQuantity: { $sum: '$orderItems.quantity' } // Tính tổng số lượng sản phẩm
            }
        },
        {
            $sort: { "_id.month": 1 } // Sắp xếp theo tháng tăng dần
        },
        {
            $project: {
                month: "$_id.month",
                totalQuanlity: 1,
                _id: 0
            }
        }
    ])



    res.status(200).json({
        success: true,
        quantityPerMonth
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

exports.getCalculateTotals = catchAsyncErrors(async (req, res, next) => {
    const total = await Order.aggregate([
        { $match: { orderStatus: 'Delivered' } },
        {
            $unwind: '$orderItems' // Tách mảng orderItems thành các bản ghi riêng lẻ
        },
        {
            $group: {
                _id: null,
                totalRevenue: { $sum: '$totalPrice' },
                totalProductsSold: { $sum: '$orderItems.quantity' }
            }
        }
    ]);

    if (total.length > 0) {
        const { totalRevenue, totalProductsSold } = total[0];
        res.status(200).json({
            success: true,
            totalRevenue,
            totalProductsSold
        })
    }
})