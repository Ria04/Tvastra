
const express = require("express");
const mainController = require("../controllers/maincontroller.js");
const logicController = require("../controllers/logincontroller.js");
const maincontroller = require("../controllers/maincontroller.js");

const router = express.Router();
const app = express();

router.route("/").get(mainController.login);
router.route("/signup").get(mainController.signup);
router.route("/home").get(mainController.home);
router.route("/doctor").get(mainController.doctor);
router.route("/hospital").get(mainController.hospital);
router.route("/feedback").get(mainController.feedback);
router.route("/faq").get(mainController.faq);
router.route("/doctorsprofile").get(mainController.doctorsprofile);
router.route("/doctorsprofile/:id").get(mainController.doctorsprofilerender);
router.route("/getfilter").get(mainController.getfilter);
router.route("/dentistry").get(mainController.dentistry);
router.route("/contactus").get(mainController.contactus);
router.route("/aboutus").get(mainController.aboutus);
router.route("/about-hospital").get(mainController.abouthospital);
router.route("/tvastraplus").get(mainController.tvastraplus);
router.route("/appointment").get(mainController.appointment);
router.route("/otppage").get(mainController.otppage);
router.route("/otpnumberpage").get(mainController.otpnumberpage);
router.route("/forgotpassword").get(mainController.forgotpassword);
router.route("/logout").get(logicController.logout);
router.route("/myappointments").get(mainController.myappointments);
router.route("/medicalrecords").get(mainController.medicalrecords);
router.route("/settings").get(mainController.settings);
router.route("/myprofile").get(mainController.myprofile);
router.route("/delete/:id").post(logicController.deleterecord);
router.route("/deleteslot/:id").post(logicController.deleteslot);
router.route("/deletedoctor/:id").post(logicController.deletedoctor);
router.route("/sort").post(logicController.sort)

router.route("/isdoctor").get(mainController.isdoctor);
router.route("/demo").get(mainController.demo);
router.route("/editschedule").get(mainController.editschedule);
router.route("/getschedule/:docid").get(logicController.getschedule)
router.route("/getslots/:docid/:index").get(logicController.getslots)


router.route("/disableslot/:id/:value").get(logicController.disable);
router.route("/disablesingleslot/:scheduleid/:slotid/:value").get(logicController.disablesingleslot);

router.route("/bookslot/:doctorid/:time/:day/:slotid").post(logicController.bookslot);
router.route("/bookslot/:doctorid/:time/:day/:slotid/:scheduleid/:appid").post(logicController.bookslotreschedule);


router.route("/bookcurrentslot").get(logicController.bookcurrentslot);
router.route("/admindashboard").get(mainController.admindashboard);
router.route("/adminpaginationpage/:page").get(mainController.adminpaginationpage)
router.route("/adminusers").get(mainController.adminusers);
router.route("/admineditprofileid/:id/:isdoctor").get(mainController.admineditprofileid);
router.route("/admineditprofile").get(mainController.admineditprofile);
router.route("/adminuserappointments/:id").get(mainController.adminuserappointmentsid);
router.route("/adminuserappointments").get(mainController.adminuserappointments);
router.route("/adminusermedicalrecords/:id").get(mainController.adminusermedicalrecordsid);
router.route("/adminusermedicalrecords").get(mainController.adminusermedicalrecords);
router.route("/admindelete/:id").post(mainController.admindeleterecord);
router.route("/admindoctors").get(mainController.admindoctors);
router.route("/adminallappointments/:id").get(maincontroller.adminallappointmentsid);
router.route("/adminformpage").get(mainController.adminformpage);

router.route("/adminallappointments").get(maincontroller.adminallappointments);
router.route("/adminhospitals").get(maincontroller.adminallhospitals);
router.route("/drpagination/:id").get(mainController.drpagination);
router.route("/adminhospitalform/:hospitalname").get(mainController.adminhospitalname);






router.route("/bookappointment").post(logicController.bookappointment);
router.route("/deleteappointment/:appointmentid").post(logicController.deleteappointment);
router.route("/admindeleteappointment/:appointmentid").post(logicController.admindeleteappointment);


router.route("/reschedule/:drid/:appointmentid").get(mainController.reschedulepage);
router.route("/reschedule").get(maincontroller.reschedule);

router.route("/viewrecord/:id").get(mainController.viewrecordid);
router.route("/viewrecord").get(mainController.viewrecord);


router.route("/signup").post(logicController.signup);
router.route("/").post(logicController.login);
router.route("/generatenewpassword").post(logicController.generatenewpassword);
router.route("/getemail").post(logicController.getemail);
router.route("/editschedule").post(logicController.editschedule);
router.route("/addfilter").post(logicController.addfilter);


module.exports = router;
