const express = require('express');
const router = express.Router();
const lichHenController = require('../controllers/lichHenController');

// Route lich hẹn
router.get('/get-all-lichhen', lichHenController.getAll);
router.get('/get-byId-lichhen/:id', lichHenController.getByID);
router.post('/insert-lichhen', lichHenController.create);
router.put('/update-lichhen/:id', lichHenController.updateStatus);
router.delete('/delete-lichhen/:id', lichHenController.remove);

// Route chi tiết lịch hẹn
router.get('/get-all-CTlichhen', lichHenController.getAllCT);
router.get('/get-byId-CTlichhen/:id', lichHenController.getCTByID);
router.post('/insert-CTlichhen', lichHenController.createCT);
router.delete('/delete-CTlichhen/:id', lichHenController.removeCT);

module.exports = router;