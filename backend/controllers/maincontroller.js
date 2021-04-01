
let medicaldata = require("../databases/medicaldata.js");
const { deleteModel } = require("mongoose");
const signupdata = require("../databases/mongo.js");
const schedules = require("../databases/schedules.js");
const doctordata = require("../databases/doctordata.js");
const appointmentdata = require("../databases/appointmentdata.js");
const hospitaldata = require("../databases/hospitaldata.js");



function login(req, res) {
    res.render("login", {
        msg1: req.flash("fail")
    });
}


function drpagination(req, res) {
    const page = req.params.id;
    req.session.drpage = page;
    return res.redirect("/doctor");
}




async function doctor(req, res) {
    const perpage = 4;
    const page = req.session.drpage || 1;



    if (req.session.username) {
        if (req.session.filter) {
            var filter = req.session.filter;
        }
        else {
            var filter = "undefined";

        }
        var c = await doctordata.find({});



        doctordata.find({}).sort(req.session.sortBy).skip((perpage * page) - perpage).limit(perpage).then((alldata) => {
            if (alldata) {
                schedules.find({}).then(async (scheduledata) => {
                    if (req.session.query) {
                        console.log(req.session.query);
                        var a = await doctordata.find(req.session.query);
                        var drdata = await doctordata.find(req.session.query).sort(req.session.sortBy).skip((perpage * page) - perpage).limit(perpage);
                        console.log(drdata);
                    }
                    else {
                        var a = await doctordata.find({});
                        var drdata = alldata;
                    }
                    console.log(alldata);
                    res.render("doctor", {
                        username: req.session.username,
                        phonenumber: req.session.number,
                        profilepic: req.session.myprofilepic,
                        d: req.session.doctordata,
                        schedule: scheduledata,
                        loggedin: true,
                        alldata: drdata,
                        filterdata: c,
                        filterp: a,
                        filter: filter,
                        msg: req.flash("fail"),
                        page:page,
                        isadmin:req.session.isadmin


                    });

                }).catch();

            }
            else {
                res.render("doctor", {
                    username: req.session.username,
                    phonenumber: req.session.number,
                    profilepic: req.session.myprofilepic,
                    loggedin: true,
                    isadmin:req.session.isadmin

                });
            }
        }).catch();

    }
    else {
        req.flash("fail", "Failure");
        req.flash("fail", "please login first");
        return res.redirect("/");
    }
}
function signup(req, res) {
    res.render("signup");
}
async function home(req, res) {
    if (req.session.username) {

        res.render("index", {
            msg: req.flash("success"),
            username: req.session.username,
            phonenumber: req.session.number,
            profilepic: req.session.myprofilepic,
            loggedin: true,
            isadmin:req.session.isadmin


        });
    }
    else {
        res.render("index", {
            loggedin: false,
            isadmin:req.session.isadmin

        });
    }
}

async function getfilter(req, res) {
    var drdata = await doctordata.find({});
    var array = [];
    var farray = [];
    for (var i = 0; i < drdata.length; i++) {
        array.push(drdata[i].yourhospital);
    }
    for (var j = 0; j < array.length; j++) {
        if (!farray.includes(array[j])) {
            farray.push(array[j]);
        }
    }
    res.status(200).send(farray);
}

function forgotpassword(req, res) {
    res.render("forgotpasswordpage");
}

async function hospital(req, res) {
    if (req.session.username) {
        const a = await hospitaldata.find();
        res.render("hospital", {
            username: req.session.username,
            phonenumber: req.session.number,
            profilepic: req.session.myprofilepic,
            hospitaldata: a,
            loggedin: true,
            isadmin:req.session.isadmin

        });
    }
    else {
        req.flash("fail", "Failure");
        req.flash("fail", "please login first");
        return res.redirect("/");
    }
}
function otppage(req, res) {
    res.render("otppage", {
        msg1: req.flash("fail"),
        forgot: req.flash("forgotpassword")
    });

}
function feedback(req, res) {
    if (req.session.username) {
        res.render("feedback", {
            username: req.session.username,
            phonenumber: req.session.number,
            profilepic: req.session.myprofilepic,
            isadmin:req.session.isadmin,

            loggedin: true
        });
    }
    else {
        res.render("feedback", {
            loggedin: false
        });
    }
}
function faq(req, res) {
    if (req.session.username) {
        res.render("faq", {
            username: req.session.username,
            phonenumber: req.session.number,
            profilepic: req.session.myprofilepic,
            isadmin:req.session.isadmin,

            loggedin: true
        });
    }
    else {
        res.render("faq", {
            loggedin: false
        });
    }
}
function doctorsprofile(req, res) {

    if (req.session.username) {
        res.render("doctorsprofile", {
            username: req.session.username,
            phonenumber: req.session.number,
            profilepic: req.session.myprofilepic,
            doctor: req.session.doctorinfo,
            loggedin: true,
            isadmin:req.session.isadmin

        });
    }
    else {
        res.render("doctorsprofile", {
            loggedin: false
        });
    }
}

function doctorsprofilerender(req, res) {
    const id = req.params.id;
    doctordata.findOne({ _id: id }).then((doctor) => {
        req.session.doctorinfo = doctor;
        console.log(req.session.doctorinfo);
        return res.redirect("/doctorsprofile");
    }).catch();

}










function dentistry(req, res) {
    if (req.session.username) {
        res.render("dentistry", {
            username: req.session.username,
            phonenumber: req.session.number,
            profilepic: req.session.myprofilepic,
            isadmin:req.session.isadmin,

            loggedin: true
        });
    }
    else {
        req.flash("fail", "Failure");
        req.flash("fail", "please login first");
        return res.redirect("/");
    }
}
function contactus(req, res) {
    if (req.session.username) {
        res.render("contactus", {
            username: req.session.username,
            phonenumber: req.session.number,
            profilepic: req.session.myprofilepic,
            isadmin:req.session.isadmin,

            loggedin: true
        });
    }
    else {
        res.render("contactus", {
            loggedin: false
        });
    }
}
function appointment(req, res) {
    if (req.session.username) {
        res.render("appointment", {
            username: req.session.username,
            phonenumber: req.session.number,
            profilepic: req.session.myprofilepic,
            isadmin:req.session.isadmin,


            loggedin: true
        });
    }
    else {
        res.render("appointment", {
            loggedin: false
        });
    }
}
function aboutus(req, res) {
    if (req.session.username) {
        res.render("aboutus", {
            username: req.session.username,
            phonenumber: req.session.number,
            profilepic: req.session.myprofilepic,
            isadmin:req.session.isadmin,

            loggedin: true
        });
    }
    else {
        req.flash("fail", "Failure");
        req.flash("fail", "please login first");
        return res.redirect("/");
    }
}

function abouthospital(req, res) {
    if (req.session.username) {

        res.render("abouthospital", {
            username: req.session.username,
            phonenumber: req.session.number,
            profilepic: req.session.myprofilepic,
            isadmin:req.session.isadmin,

            loggedin: true
        });
    }
    else {
        res.render("abouthospital", {
            loggedin: false
        });
    }
}
function tvastraplus(req, res) {
    if (req.session.username) {
        res.render("tvastra-plus", {
            username: req.session.username,
            phonenumber: req.session.number,
            profilepic: req.session.myprofilepic,
            isadmin:req.session.isadmin,

            loggedin: true
        });
    }
    else {
        res.render("tvastra-plus", {
            loggedin: false
        });
    }
}
function otpnumberpage(req, res) {
    res.render("otpnumberpage", {
        msg1: req.flash("fail")

    });
}
async function myappointments(req, res) {
    if (req.session.username) {
        const uid = req.session.userid.toString();
        const allappdata = await appointmentdata.find({ userid: uid });
        for (var i = 0; i < allappdata.length; i++) {
            const date = new Date(Date.now() + 0 * 24 * 60 * 60 * 1000).toString().slice(4, 15);

            if (new Date(allappdata[i].date) < date) {
                const status = "complete";
                appointmentdata.findByIdAndUpdate({ _id: allappdata[i]._id }, { status: status }).then((c) => { console.log(c); }).catch();
            }
            else if (new Date(allappdata[i].date > date)) {
                const status = "notcomplete";
                appointmentdata.findByIdAndUpdate({ _id: allappdata[i]._id }, { status: status }).then((c) => { console.log(c); }).catch();

            }
        }

        console.log(allappdata);
        res.render("myappointments", {
            username: req.session.username,
            phonenumber: req.session.number,
            profilepic: req.session.myprofilepic,
            isdoctor: req.session.isdoctor,
            allappdata: allappdata,
            loggedin: true,
            isadmin:req.session.isadmin

        });










    }
    else {
        res.render("myappointments", {
            loggedin: false
        });
    }
}
function medicalrecords(req, res) {
    if (req.session.username) {
        medicaldata.find({ medicalid: req.session.userid })
            .then((data) => {
                console.log(data);
                res.render("medicalrecords", {
                    loggedin: true,
                    username: req.session.username,
                    phonenumber: req.session.number,
                    profilepic: req.session.myprofilepic,
                    isdoctor: req.session.isdoctor,
                    isadmin:req.session.isadmin,

                    data: data
                });
            }).catch(() => {
                res.render("medicalrecords", {
                    loggedin: true,
                    username: req.session.username,
                    phonenumber: req.session.number,
                    profilepic: req.session.myprofilepic,
                    isdoctor: req.session.isdoctor,
                    isadmin:req.session.isadmin,

                })
            });

    }
    else {
        res.render("medicalrecords", {
            loggedin: false
        });
    }
}
function settings(req, res) {
    if (req.session.username) {
        res.render("settings", {
            username: req.session.username,
            phonenumber: req.session.number,
            profilepic: req.session.myprofilepic,
            isdoctor: req.session.isdoctor,
            isadmin:req.session.isadmin,

            loggedin: true
        });
    }
    else {
        res.render("settings", {
            loggedin: false
        });
    }
}
function myprofile(req, res) {
    if (req.session.username) {
        res.render("myprofile", {
            loggedin: true,
            username: req.session.username,
            id: req.session.userid,
            phonenumber: req.session.number,
            email: req.session.email,
            gender: req.session.gender,
            date: req.session.date,
            state: req.session.state,
            city: req.session.city,
            country: req.session.country,
            profilepic: req.session.myprofilepic,
            isdoctor: req.session.isdoctor,
            yourhospital: req.session.yourhospital,
            achievements: req.session.achievements,
            exp: req.session.exp,
            qualifications: req.session.qualifications,
            awards: req.session.awards,
            specialization: req.session.specialization,
            fees: req.session.fees,
            description: req.session.description,
            treatments: req.session.treatments,
            isadmin:req.session.isadmin


        });
    }
    else {
        res.render("myprofile", {
            loggedin: false
        });
    }
}

function isdoctor(req, res) {
    if (req.session.username) {
        res.render("isdoctor", {
            username: req.session.username,
            phonenumber: req.session.number,
            profilepic: req.session.myprofilepic,
            isadmin:req.session.isadmin,

            msg: req.flash("fail"),
            loggedin: true,

        });
    }
    else {
        res.render("isdoctor", {
            loggedin: false,
            isadmin:req.session.isadmin

        });
    }
}

function demo(req, res) {

    signupdata.findOne({ email: req.session.email }).then((user) => {
        if (user) {
            req.session.userid = user.id;
            if (user.isdoctor == true) {
                return res.redirect("/isdoctor");
            }
            else {
                req.flash("success", "Login Successful");
                return res.redirect("/home");
            }
        }

    });



}

async function editschedule(req, res) {
    console.log(req.session.isdoctor);
    
    if (req.session.username) {
        schedules.find({ createdby: req.session.userid })
            .then((data) => {
                console.log(data);

                res.render("editschedule", {
                    msg1: req.flash("fail"),
                    loggedin: true,
                    username: req.session.username,
                    phonenumber: req.session.number,
                    profilepic: req.session.myprofilepic,
                    isdoctor: req.session.isdoctor,
                    data: data,
                    hospital:req.session.yourhospital,
                    isadmin:req.session.isadmin

                });
            }).catch(() => {
                res.render("editschedule", {
                    loggedin: true,
                    username: req.session.username,
                    phonenumber: req.session.number,
                    profilepic: req.session.myprofilepic,
                    isdoctor: req.session.isdoctor,
                    isadmin:req.session.isadmin


                })
            });

    }
    else {
        res.render("medicalrecords", {
            loggedin: false
        });
    }

}
function reschedulepage(req, res) {
    const drid = req.params.drid;
    const appointid = req.params.appointmentid;

    req.session.rescheduledrid = drid;
    req.session.rescheduleappointmentid = appointid;

    return res.redirect("/reschedule");


}
function reschedule(req, res) {
    doctordata.findOne({ _id: req.session.rescheduledrid }).then((user) => {
        appointmentdata.findOne({ _id: req.session.rescheduleappointmentid }).then((app) => {
            res.render("reschedulepage", {
                alldata: user,
                appdata: app,
                username: req.session.username,
                phonenumber: req.session.number,
                profilepic: req.session.myprofilepic,
                loggedin: true,
                isadmin:req.session.isadmin

            });
        }).catch();


    }).catch();
}
function adminpaginationpage(req, res) {
    const page = req.params.page;
    req.session.page = page;
    return res.redirect("/admindashboard");
}

async function admindashboard(req, res) {
    var perpage = 3;
    var page = req.session.page || 1;
    var usercount=await signupdata.find({ isdoctor: false });
    var alldoctors = await doctordata.find().then((doctors) => { return doctors }).catch();
    var doctorcount = alldoctors.length;
    var allappointments = await appointmentdata.find().then((app) => { return app }).catch();
    var appointmentcount = allappointments.length;
    signupdata.find({ isdoctor: false }).skip((perpage * page) - perpage).limit(perpage).then((data) => {
        if (data) {
            res.render("admindashboard", {
                loggedin: true,
                username: req.session.username,
                phonenumber: req.session.number,
                email: req.session.email,
                gender: req.session.gender,
                date: req.session.date,
                state: req.session.state,
                city: req.session.city,
                country: req.session.country,
                profilepic: req.session.myprofilepic,
                isdoctor: req.session.isdoctor,
                userdata: data,
                doctorcount: doctorcount,
                appcount: appointmentcount,
                usercount:usercount,
                page:page,
                isadmin:req.session.isadmin

            });
        }
        else {
            res.render("admindashboard", {
                loggedin: true,
                username: req.session.username,
                phonenumber: req.session.number,
                email: req.session.email,
                gender: req.session.gender,
                date: req.session.date,
                state: req.session.state,
                city: req.session.city,
                country: req.session.country,
                profilepic: req.session.myprofilepic,
                isdoctor: req.session.isdoctor,
                isadmin:req.session.isadmin

            });
        }
    }).catch();

}

function adminusers(req, res) {
    signupdata.find({ isdoctor: false }).then((userdata) => {

        res.render("adminusers", {
            loggedin: true,
            username: req.session.username,
            phonenumber: req.session.number,
            profilepic: req.session.myprofilepic,
            userdata: userdata,
            isadmin:req.session.isadmin
        });
    }).catch();
}

async function admineditprofileid(req, res) {
    const id = req.params.id;
    const isdoctor = req.params.isdoctor;
    if (isdoctor == "true") {
        const currentuser = await doctordata.findOne({ _id: id }).then((data) => {
            console.log(data);
            return data;
        }).catch(() => {
            console.log("error");
        });
        req.session.adminuser = currentuser;
        return res.redirect("/admineditprofile");
    }
    else {
        const currentuser2 = await signupdata.findOne({ _id: id }).then((data) => {
            console.log(data);
            return data;
        }).catch(() => {
            console.log("error");
        });
        req.session.adminuser = currentuser2;
        return res.redirect("/admineditprofile");
    }

}

function admineditprofile(req, res) {
    return res.render("admineditprofile", {
        loggedin: true,
        username: req.session.username,
        phonenumber: req.session.number,
        profilepic: req.session.myprofilepic,
        userdata: req.session.adminuser,
        isadmin:req.session.isadmin
    });

}

async function adminuserappointmentsid(req, res) {
    const id = req.params.id;
    const currentuser = await appointmentdata.find({ userid: id }).then((data) => {
        console.log(data);
        return data;
    }).catch(() => {
        console.log("error");
    });

    req.session.adminuserappointments = currentuser;
    return res.redirect("/adminuserappointments");
}

function adminuserappointments(req, res) {
    return res.render("adminuserappointments", {
        loggedin: true,
        username: req.session.username,
        phonenumber: req.session.number,
        profilepic: req.session.myprofilepic,
        allappdata: req.session.adminuserappointments,
        isadmin:req.session.isadmin
    });

}

async function adminusermedicalrecordsid(req, res) {
    const id = req.params.id;
    const currentuser = await medicaldata.find({ medicalid: id }).then((data) => {
        console.log(data);
        return data;
    }).catch(() => {
        console.log("error");
    });

    req.session.adminusermedicalrecords = currentuser;
    return res.redirect("/adminusermedicalrecords");
}

function adminusermedicalrecords(req, res) {
    return res.render("adminusermedicalrecords", {
        loggedin: true,
        username: req.session.username,
        phonenumber: req.session.number,
        profilepic: req.session.myprofilepic,
        data: req.session.adminusermedicalrecords,
        isadmin:req.session.isadmin
    });

}

function admindeleterecord(req, res) {
    const id = req.params.id;
    medicaldata.deleteOne({ _id: id }).then(() => {
        return res.redirect("/adminusermedicalrecords/" + id);
    }).catch(err => {
        console.log(err);
    });


}
function admindoctors(req, res) {
    signupdata.find({ isdoctor: true }).then((userdata) => {

        res.render("admindoctors", {
            loggedin: true,
            username: req.session.username,
            phonenumber: req.session.number,
            profilepic: req.session.myprofilepic,
            userdata: userdata,
            isadmin:req.session.isadmin
        });
    }).catch();
}


async function adminallappointmentsid(req, res) {
    const id = req.params.id;
    const data = await appointmentdata.find({ drid: id }).then((data1) => {
        console.log(data1);
        return data1;
    }).catch();
    req.session.adminallappointments = data;
    return res.redirect("/adminallappointments");
}



function adminallappointments(req, res) {
    return res.render("adminallappointments", {
        loggedin: true,
        username: req.session.username,
        phonenumber: req.session.number,
        profilepic: req.session.myprofilepic,
        userdata: req.session.adminallappointments,
        isadmin:req.session.isadmin
    })
}


function adminallhospitals(req, res) {
    hospitaldata.find({}).then((data) => {
        return res.render("adminallhospitals", {
            loggedin: true,
            username: req.session.username,
            phonenumber: req.session.number,
            profilepic: req.session.myprofilepic,
            userdata: data,
            isadmin:req.session.isadmin
        })
    }).catch();

}
function adminhospitalname(req, res) {
    const hospitalname = req.params.hospitalname;
    req.session.adminhospitalname = hospitalname;
    return res.redirect("/adminformpage");

}
function adminformpage(req, res) {
    return res.render("adminformpage", {
        loggedin: true,
        username: req.session.username,
        phonenumber: req.session.number,
        profilepic: req.session.myprofilepic,
        hospital: req.session.adminhospitalname,
        isadmin:req.session.isadmin
    })

}
async function viewrecordid(req, res) {
    const id = req.params.id;
    console.log(id);
    var x = await medicaldata.findOne({ _id: id });
    console.log(x);
    req.session.rec = x;
    console.log(req.session.username);
    return res.redirect("/viewrecord");


}
function viewrecord(req, res) {
    return res.render("record", {
        loggedin: true,
        username: req.session.username,
        phonenumber: req.session.number,
        profilepic: req.session.myprofilepic,
        isdoctor: req.session.isdoctor,
        data: req.session.rec,
        isadmin:req.session.isadmin

    });
}




module.exports = {
    viewrecordid: viewrecordid,
    viewrecord: viewrecord,
    login: login,
    doctor: doctor,
    signup: signup,
    home: home,
    hospital: hospital,
    feedback: feedback,
    faq: faq,
    doctorsprofile: doctorsprofile,
    dentistry: dentistry,
    contactus: contactus,
    appointment: appointment,
    aboutus, aboutus,
    abouthospital: abouthospital,
    tvastraplus: tvastraplus,
    otppage: otppage,
    otpnumberpage: otpnumberpage,
    forgotpassword: forgotpassword,
    myappointments: myappointments,
    medicalrecords: medicalrecords,
    settings: settings,
    myprofile: myprofile,
    isdoctor: isdoctor,
    demo: demo,
    editschedule: editschedule,
    doctorsprofilerender: doctorsprofilerender,
    reschedulepage: reschedulepage,
    reschedule: reschedule,
    admindashboard: admindashboard,
    adminusers: adminusers,
    admineditprofileid: admineditprofileid,
    admineditprofile: admineditprofile,
    adminuserappointmentsid: adminuserappointmentsid,
    adminuserappointments: adminuserappointments,
    adminusermedicalrecordsid: adminusermedicalrecordsid,
    adminusermedicalrecords: adminusermedicalrecords,
    admindeleterecord: admindeleterecord,
    admindoctors: admindoctors,
    adminpaginationpage: adminpaginationpage,
    adminallappointmentsid: adminallappointmentsid,
    adminallappointments: adminallappointments,
    adminallhospitals: adminallhospitals,
    drpagination: drpagination,
    adminhospitalname: adminhospitalname,
    adminformpage: adminformpage,
    getfilter: getfilter



}