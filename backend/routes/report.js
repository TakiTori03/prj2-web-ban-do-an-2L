const express = require('express');
const router = express.Router();

const {
    getRevenueByMonth,
    getQuantityPerMonth,
    getCategoryByMonth,
    getCalculateTotals
} = require('../controllers/reportController');

const { isAuthenticatedUser, authorizeRoles } = require('../middlewares/auth');

//report route
router.route('/admin/report-revenue').post(getRevenueByMonth);
router.route('/admin/report-quantity').post(getQuantityPerMonth);
router.route('/admin/report-category').post(getCategoryByMonth);
router.route('/admin/report-total').get(getCalculateTotals)
module.exports = router