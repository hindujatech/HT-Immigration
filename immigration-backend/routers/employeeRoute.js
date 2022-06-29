var multer = require('multer');
var express = require('express')

var router = express.Router()
var employee = require('../controllers/employeeCtrl')
var router = express.Router()
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, './uploads');
    },
    filename: function(req, file, cb) {
        let extArray = file.mimetype.split("/");
        let extension = extArray[extArray.length - 1];
        cb(null, new Date().getTime() + '.' + extension);
    }
})
const upload = multer({ storage: storage })
    //ideal database connect apis
router.get('/get_reportee_mapping_list/:manager_id', employee.get_reportee_mapping_list)

//employee add,edit,get 
router.post('/add', employee.addEmployee);
router.put('/update/:mail', employee.updateEmployee);
router.get('/get/:id', employee.getEmployee);
router.get('/getAll/:type', employee.getAllEmployee);
router.get('/getEmployeeRequest/:id', employee.getEmployeeRequest);
router.post('/download/docs', employee.downloadDocs);
router.get('/reporte_list/:id', employee.getReporteeList);
router.get('/get_employee_details/:employee_id', employee.get_employee_details)
router.get('/chat_employee_details/:employee_id', employee.chat_employee_details)
router.get('/get_employee_passport_details/:employee_id', employee.get_employee_passport_details)
router.post('/upload/docs',
    upload.fields([{
        name: 'file',
        maxCount: 15
    }]), employee.uploaddocs);
router.post('/upload/update/docs',
    upload.fields([{
        name: 'file',
        maxCount: 15
    }]), employee.Updateuploaddocs);
router.post('/GMR/upload/docs',
    upload.fields([{
        name: 'file',
        maxCount: 15
    }]), employee.gmruploaddocs);
router.post('/gmr/status/update/:img_id', employee.gmrStatusUpdate);
// router.post('/upload/docs/mail', employee.docUploadMail);
// }
module.exports = router;