const express = require('express');
const router = express.Router();

const {
    getRevenueByMonth,
    getQuantityPerMonth,
    getCategoryByMonth
} = require('../controllers/reportController');

const { isAuthenticatedUser, authorizeRoles } = require('../middlewares/auth');

//report route
router.route('/admin/report-revenue').post(getRevenueByMonth);
router.route('/admin/report-quantity').get(getQuantityPerMonth);
router.route('/admin/report-category').post(getCategoryByMonth);
module.exports = router