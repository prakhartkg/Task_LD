const express = require('express');
const { authenticate, handler, payloadHandler: payload } = require('../../middleware');
const { departmentController: department } = require('./../../controller');

const router = express.Router();

router.post('/', authenticate, handler(department.addDepartment, payload.addDepartment));
router.get('/all', authenticate, handler(department.getAllDepartments, payload.getAllDepartments));

module.exports = router;
