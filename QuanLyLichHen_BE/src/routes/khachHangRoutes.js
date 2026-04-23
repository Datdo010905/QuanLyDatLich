const express = require('express');
const router = express.Router();
const khachHangController = require('../controllers/khachHangController');

router.get('/get-all-khachhang', khachHangController.getAll);
router.get('/get-byId-khachhang/:id', khachHangController.getByID);
router.post('/insert-khachhang', khachHangController.create);
router.put('/update-khachhang/:id', khachHangController.update);
router.delete('/delete-khachhang/:id', khachHangController.remove);

module.exports = router;