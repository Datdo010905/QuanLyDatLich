const express = require('express');
const router = express.Router();
const dichVuController = require('../controllers/dichVuController');

//endpoint như [HttpGet] 
router.get('/get-all-DichVuToc', dichVuController.getDichVuToc);
router.get('/get-all-DichVuCSD', dichVuController.getDichVuCSD);

module.exports = router;