let signupdata = require("../databases/mongo.js");
let medicaldata = require("../databases/medicaldata.js");
const doctordata = require("../databases/doctordata.js");
const schedules = require("../databases/schedules.js");
var moment = require('moment');
const { findByIdAndUpdate } = require("../databases/medicaldata.js");
const appointmentdata = require("../databases/appointmentdata.js");



function signup(req, res) {
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;
    const gender = req.body.gender;
    const date = req.body.date;
    const phone_number = req.body.phone_number;
    const city = req.body.city;
    const state = req.body.state;
    const country = req.body.country;
    req.body.isdoctor = Boolean(req.body.isdoctor);
    const isdoctor = req.body.isdoctor;


    req.session.email = email;
    req.session.isdoctor = isdoctor;
    req.session.username = name;
    req.session.number = phone_number;
    req.session.gender = gender;
    req.session.city = city;
    req.session.state = state;
    req.session.country = country;
    req.session.date = date;

    req.session.myprofilepic = "https://cdn2.iconfinder.com/data/icons/medical-services-2/256/Doctor2-512.png";


    signupdata.findOne({ email: email }).then((presentuser) => {
        if (presentuser) {
            console.log("user already present");
            console.log(presentuser);
            return res.redirect("/");
        }
        else {
            signupdata.insertMany(
                {
                    name: name,
                    email: email,
                    password: password,
                    gender: gender,
                    date: date,
                    phone_number: phone_number,
                    city: city,
                    state: state,
                    country: country,
                    isdoctor: isdoctor,
                    img: "https://cdn2.iconfinder.com/data/icons/medical-services-2/256/Doctor2-512.png"
                }).then((newuser) => {
                    return res.redirect("/demo");

                }).catch(err => {
                    console.log(err);
                });


        }

    }).catch(err => {
        console.log(err);
    });


}




function login(req, res) {
    const email = req.body.email;
    const password = req.body.password;
    signupdata.findOne({ email: email, password: password }).then((user) => {
        if (user) {
            if (user.email == "admin@gmail.com" && user.password == "RiYo@0402") {
                req.session.username = user.name;
                req.session.isadmin=true;
                req.session.number = user.phone_number;
                req.session.email = user.email;
                req.session.gender = user.gender;
                req.session.city = user.city;
                req.session.state = user.state;
                req.session.country = user.country;
                req.session.date = user.date;
                req.session.userid = user.id;
                req.session.myprofilepic = user.img;
                req.session.isdoctor = user.isdoctor;
                console.log(user);
                console.log(req.session.number);
                return res.redirect("/admindashboard");
            }

            else {
                console.log("login-successful");
                req.session.username = user.name;
                req.session.number = user.phone_number;
                req.session.email = user.email;
                req.session.gender = user.gender;
                req.session.city = user.city;
                req.session.state = user.state;
                req.session.country = user.country;
                req.session.date = user.date;
                req.session.userid = user.id;
                req.session.myprofilepic = user.img;
                req.session.isdoctor = user.isdoctor;
                req.session.isadmin=false;
                console.log(user);
                console.log(req.session.number);
                if (user.isdoctor == true) {
                    doctordata.findOne({ _id: req.session.userid }).then((doctor) => {
                        if (doctor) {
                            req.session.username = user.name;
                            req.session.isdoctor = user.isdoctor;
                            req.session.yourhospital = doctor.yourhospital;
                            req.session.achievements = doctor.achievements;
                            req.session.exp = doctor.exp;
                            req.session.qualifications = doctor.qualifications;
                            req.session.awards = doctor.awards;
                            req.session.specialization = doctor.specialization;
                            req.session.fees = doctor.fees;
                            req.session.description = doctor.description;
                            req.session.treatments = doctor.treatments;


                            req.flash("success", "Login Successful");
                            return res.redirect("/home");
                        }
                        else {
                            return res.redirect("/isdoctor");
                        }
                    })

                }
                else {
                    req.flash("success", "Login Successful");
                    return res.redirect("/home");
                }

            }
        }
        else {

            req.flash("fail", "Failure");
            req.flash("fail", "Invalid email or password");
            return res.redirect("/");
        }

    }).catch(err => {

    });

}

function getemail(req, res) {
    const email = req.body.email;
    signupdata.findOne({ email: email }).then((user) => {
        if (user) {
            req.session.username = user.name;
            req.session.number = user.phone_number;
            req.session.email = user.email;
            req.session.gender = user.gender;
            req.session.city = user.city;
            req.session.state = user.state;
            req.session.country = user.country;
            req.session.date = user.date;
            req.session.userid = user.id;
            req.session.myprofilepic = user.img;
            req.session.isdoctor = user.isdoctor;
            req.session.tempemail = user.email;
            req.session.number = user.phone_number;
            console.log(req.session.tempemail);
            return res.redirect(307, "/forgototp/12345");
        }
        else {
            req.flash("fail", "Failure");
            req.flash("fail", "Invalid email");
            return res.redirect("/");
        }
    })


}

function generatenewpassword(req, res) {
    const password1 = req.body.newpassword1;
    const password2 = req.body.newpassword2;
    var useremail = req.session.tempemail;
    console.log(useremail);

    signupdata.findOneAndUpdate({ email: useremail }, { password: password1 }).then((founduser) => {
        console.log(founduser);
        return res.redirect("/");

    })

}

function logout(req, res) {
    req.session.destroy();
    res.redirect("/");
}



function deleterecord(req, res) {
    const id = req.params.id;
    medicaldata.deleteOne({ _id: id }).then(() => {
        return res.redirect("/medicalrecords");
    }).catch(err => {
        console.log(err);
    });


}
function deleteslot(req, res) {
    const id = req.params.id;
    schedules.deleteOne({ _id: id }).then(() => {
        return res.redirect("/editschedule");
    }).catch(err => {
        console.log(err);
    });


}
function deletedoctor(req, res) {
    const id = req.params.id;
    doctordata.deleteOne({ _id: id }).then(() => {
        signupdata.deleteOne({ _id: id }).then(() => {

            return res.redirect("/doctor");
        }).catch(err => {
            console.log(err);
        });

    }).catch();





}

function editschedule(req, res) {

    const email = req.session.email;
    const days = req.body.days;
    const selecthospital = req.body.selecthospital;
    const fromtime = req.body.fromtime;
    const totime = req.body.totime;
    const interval = req.body.interval;
    const createdby = req.session.userid;

    var st = fromtime;
    var et = totime;
    var intervaltime = parseInt(interval);
    var resultarr = [{ time: st, isdisabled: false, day: days, hospital: selecthospital, isbooked: false }];
    var eta = et.split(":");
    var ethr = parseInt(eta[0]);
    var etm = parseInt(eta[1]);


    while (st != et) {
        intervaltime = parseInt(interval);
        var a = st.split(":");
        var hr = parseInt(a[0]);
        var min = parseInt(a[1]);
        if (hr == ethr) {
            break;
        }
        if ((min + intervaltime) >= 60) {
            min = (min + intervaltime) - 60;
            intervaltime = 00;
            hr += 1;
            if (hr >= 24) {
                hr = 1;

            }


        }

        var result = hr + ":" + (min + intervaltime);

        resultarr.push({ time: result, isdisabled: false, day: days, hospital: selecthospital, isbooked: false });
        st = result;
    }


    console.log(resultarr);

    schedules.findOne({ email: email, days: days }).then((user) => {
        if (user) {
            console.log(user);
            req.flash("fail", "Failure");
            req.flash("fail", "schedule already present");
            return res.redirect("/editschedule");
        }
        else {
            schedules.create(
                {
                    email:email,
                    createdby: createdby,
                    date: new Date(),
                    days: days,
                    selecthospital: selecthospital,
                    fromtime: fromtime,
                    totime: totime,
                    interval: interval,
                    schedule: resultarr,
                    isdisabled: false

                }).then((newuser) => {
                    console.log(newuser);
                    return res.redirect("/editschedule");
                }).catch(err => {
                    console.log(err);
                });

        }


    })


}

async function getschedule(req, res) {
    const id = req.params.docid;
    var result = [];


    function getday(number) {
        switch (number) {
            case 0: var day = "sunday";
                return day;
                break;
            case 1: var day = "monday";
                return day;
                break;
            case 2: var day = "tuesday";
                return day;
                break;
            case 3: var day = "wednesday";
                return day;
                break;
            case 4: var day = "thursday";
                return day;
                break;
            case 5: var day = "friday";
                return day;
                break;
            case 6: var day = "saturday";
                return day;
                break;
        }
    }
    var n = new Date().getDay();
    console.log(n);
    var p = n;
    for (var i = 0; i <= 6; i++) {
        var day = getday(p);
        console.log(day);
        const a = await schedules.findOne({ createdby: id, isdisabled: false, days: day }).then((found) => {
            if (found) {
                return found;
            }
            else {
                return { days: day, schedule: [] };
            }
        }).catch((err) => {
            return err;
        });
        result.push(a);
        if ((p + 1) > 6) {
            p = 0;
        }
        else {
            p = p + 1;
        }
    }
    console.log(result);
    req.session.myschedule = result;
    res.status(200).send(result);
}




function disable(req, res) {
    const id = req.params.id;
    const value = req.params.value;
    schedules.findByIdAndUpdate({ _id: id }, {
        isdisabled: value
    }).then((d) => {
        console.log(d);
        return res.redirect("/editschedule");
    }).catch();


}

function disablesingleslot(req, res) {
    const slotid = req.params.slotid;
    const scheduleid = req.params.scheduleid;

    const value = req.params.value;

    schedules.findOne({ _id: scheduleid })
        .then((user) => {
            var slot = user.schedule.id(slotid);
            slot.isdisabled = value;
            user.save();
            return res.redirect("/editschedule");
        }).catch();

}

function getslots(req, res) {
    const index = req.params.index;
    const data = req.session.myschedule;

    const morning = []
    const afternoon = [];
    const evening = [];

    const dateindex = parseInt(index);

    var nowDate = new Date();
    var date = new Date(Date.now() + index * 24 * 60 * 60 * 1000).toString().slice(4, 15);
    req.session.currentdate = date;

    var current_schedule_id = data[index]._id;
    req.session.current_schedule_id = current_schedule_id;

    for (var i = 0; i < data[index].schedule.length; i++) {
        var timearray = data[index].schedule[i].time.split(":");
        var hr = parseInt(timearray[0]);
        if (hr < 12 && data[index].schedule[i].isdisabled == false && data[index].schedule[i].isbooked == false) {
            morning.push(data[index].schedule[i]);
        }
        else if (hr >= 12 && hr <= 18 && data[index].schedule[i].isdisabled == false && data[index].schedule[i].isbooked == false) {
            afternoon.push(data[index].schedule[i]);
        }
        else if (hr > 18 && data[index].schedule[i].isdisabled == false && data[index].schedule[i].isbooked == false) {
            evening.push(data[index].schedule[i]);
        }
    }
    console.log(morning);
    console.log(afternoon);
    console.log(evening);

    const hospital = data[index].selecthospital;
    console.log(hospital);
    res.status(200).send([morning, afternoon, evening, hospital]);


}

function bookslot(req, res) {
    const doctorid = req.params.doctorid;
    const day = req.params.day;
    const fromtime = req.params.time;
    const slotid = req.params.slotid;


    console.log(fromtime);
    req.session.slotday = day;
    req.session.slotdoctorid = doctorid;
    req.session.slotfromtime = fromtime;
    req.session.current_slot_id = slotid;
    req.session.booked = false;

    return res.redirect("/bookcurrentslot");




}
function bookslotreschedule(req, res) {
    const doctorid = req.params.doctorid;
    const day = req.params.day;
    const fromtime = req.params.time;
    const slotid = req.params.slotid;
    const scheduleid = req.params.scheduleid;
    const appid = req.params.appid;

    schedules.findOne({ _id: scheduleid })
        .then((user) => {
            var slot = user.schedule.id(slotid);
            
            slot.isbooked = false;
            slot.bookeddate = null;
            user.save();
            
            
        }).catch();

    appointmentdata.deleteOne({ _id: appid }).then((u) => {
        if (u) {
            console.log("user deleted");
        }
    })



    req.session.slotday = day;
    req.session.slotdoctorid = doctorid;
    req.session.slotfromtime = fromtime;
    req.session.current_slot_id = slotid;
    req.session.booked = false;
    return res.redirect("/bookcurrentslot");


}

async function bookcurrentslot(req, res) {

    const doctorid = req.session.slotdoctorid;
    const day = req.session.slotday;
    const fromtime = req.session.slotfromtime;
    const date = req.session.currentdate;

    console.log(fromtime);
    console.log(req.session.userid);

    var appuser = { username: req.session.username, number: req.session.number };
    if (req.session.booked) {

        schedules.findOne({ createdby: doctorid, days: day }).then((user) => {
            if (user) {

                doctordata.findOne({ _id: doctorid }).then((doctordata) => {
                    res.render("slotbooking", {
                        drdata: doctordata,
                        fromtime: fromtime,
                        schedule: user,
                        loggedin: true,
                        username: req.session.username,
                        profilepic: req.session.myprofilepic,
                        day: day,
                        phonenumber: req.session.number,
                        email: req.session.email,
                        currentdate: date,
                        booked: true,
                        appointmentdata: appuser

                    })
                }).catch();


            }
        }).catch();
    }
    else {

        schedules.findOne({ createdby: doctorid, days: day }).then((user) => {
            if (user) {

                doctordata.findOne({ _id: doctorid }).then((doctordata) => {
                    return res.render("slotbooking", {
                        drdata: doctordata,
                        fromtime: fromtime,
                        schedule: user,
                        loggedin: true,
                        username: req.session.username,
                        profilepic: req.session.myprofilepic,
                        day: day,
                        phonenumber: req.session.number,
                        email: req.session.email,
                        currentdate: date,
                        booked: false,
                        appointmentdata: appuser

                    })
                }).catch();

            }
        }).catch();
    }



}

function bookappointment(req, res) {
    const drname = req.body.drname;
    const drid = req.body.drid;
    const drhospital = req.body.drhospital;
    const slottime = req.body.currenttime;
    const scheduleday = req.body.scheduleday;
    const scheduledate = req.body.scheduledate;
    const username = req.session.username;
    const phonenumber = req.session.number;
    const scheduleid = req.session.current_schedule_id;
    const slotid = req.session.current_slot_id;
 


    if (req.session.username == drname) {
        req.flash("fail", "Cannot appoint yourself");
        return res.redirect("/doctor");
    }
    else {

        req.session.booked = true;
        appointmentdata.create({
            userid: req.session.userid,
            drname: drname,
            drhospital: drhospital,
            time: slottime,
            username: username,
            number: phonenumber,
            date: scheduledate,
            day: scheduleday,
            slotid: slotid,
            scheduleid: scheduleid,
            drid: drid,
            status: status
        }).then((user) => {

        }).catch();

        schedules.findOne({ _id: scheduleid })
            .then((user) => {
                var slot = user.schedule.id(slotid);
                slot.isbooked = true;
                slot.bookeddate = scheduledate;
                user.save();
            }).catch();

        return res.redirect("/bookcurrentslot");


    }

}

function deleteappointment(req, res) {
    appointmentid = req.params.appointmentid;
    appointmentdata.findOne({ _id: appointmentid }).then((user1) => {

        schedules.findOne({ _id: user1.scheduleid })
            .then((user) => {
                var slot = user.schedule.id(user1.slotid);
                slot.isbooked = false;
                slot.bookeddate = null;
                user.save();
                console.log(user);
            }).catch();
    }).catch();




    appointmentdata.deleteOne({ _id: appointmentid }).then(() => {

        return res.redirect("/myappointments");
    }).catch();

}

function admindeleteappointment(req, res) {
    appointmentid = req.params.appointmentid;
    appointmentdata.findOne({ _id: appointmentid }).then((user1) => {

        schedules.findOne({ _id: user1.scheduleid })
            .then((user) => {
                var slot = user.schedule.id(user1.slotid);
                slot.isbooked = false;
                slot.bookeddate = null;
                user.save();
                console.log(user);
            }).catch();
    }).catch();



    appointmentdata.findById({ _id: appointmentid }).then((data) => {
        appointmentdata.deleteOne({ _id: appointmentid }).then(() => {

            return res.redirect("/adminuserappointments/" + data.userid);
        }).catch();

    })


}

async function addfilter(req, res) {
    const location = req.body.state;
    const treatment = req.body.treatments;
    const hospitals = req.body.hospitals;
    const exp = req.body.exp;
    const searchvalue = req.body.searchtext;


    var filter = [];
    var locationlist = [];
    var treatmentlist = [];
    var hospitallist = [];
    var explist = [];

    if (searchvalue) {
        hospitallist.push(searchvalue);
        filter.push(searchvalue);

    }

    if (location) {
        if (typeof (location) == "string") {
            filter.push(location);
            locationlist.push(location);

        } else {
            for (var i = 0; i < location.length; i++) {
                filter.push(location[i]);
                locationlist.push(location[i]);
            }
        }
    }
    if (treatment) {
        if (typeof (treatment) == "string") {
            filter.push(treatment);
            treatmentlist.push(treatment);

        } else {
            for (var j = 0; j < treatment.length; j++) {
                filter.push(treatment[j]);
                treatmentlist.push(treatment[j]);
            }
        }

    }

    if (hospitals) {
        if (typeof (hospitals) == "string") {
            filter.push(hospitals);
            hospitallist.push(hospitals);

        } else {
            for (var i = 0; i < hospitals.length; i++) {
                filter.push(hospitals[i]);
                hospitallist.push(hospitals[i]);
            }
        }

    }
    if (exp) {
        if (typeof (exp) == "string") {
            filter.push(exp);
        } else {
            for (var i = 0; i < exp.length; i++) {
                filter.push(exp[i]);
            }
        }
    }



    var query = {
        "yourhospital": { $all: hospitallist },
        "state": { $all: locationlist },
        "treatments": { $all: treatmentlist }
    }

    if (hospitallist.length == 0) {
        delete query["yourhospital"];
    }
    if (treatmentlist.length == 0) {
        delete query["treatments"];
    }
    if (locationlist.length == 0) {
        delete query["state"];
    }


    req.session.query = query;



    console.log(query);
    console.log(filter);



    req.session.filter = filter;
    res.redirect("/doctor");
}

async function sort(req, res) {

    var sort = req.body.sort.split("-");

    if (sort[0] == "name") {
        if (sort[1] == "asc") {
            var query = { "name": 1 };
        }
        else if (sort[1] == "desc") {
            var query = { "name": -1 };
        }
    }
    if (sort[0] == "exp") {
        if (sort[1] == "asc") {
            var query = { "exp": 1 };
        }
        else if (sort[1] == "desc") {
            var query = { "exp": -1 };
        }
    }
    if (sort[0] == "fees") {
        if (sort[1] == "asc") {
            var query = { "fees": 1 };
        }
        else if (sort[1] == "desc") {
            var query = { "fees": -1 };
        }
    }
    req.session.sortBy = query;
    console.log("hello", req.body.sort);
    return res.redirect("/doctor");
};









module.exports = {
    signup: signup,
    login: login,
    getemail: getemail,
    generatenewpassword: generatenewpassword,
    logout: logout,
    deleterecord: deleterecord,
    editschedule: editschedule,
    deleteslot: deleteslot,
    deletedoctor: deletedoctor,
    getschedule: getschedule,
    disable: disable,
    disablesingleslot: disablesingleslot,
    getslots: getslots,
    bookslot: bookslot,
    bookcurrentslot: bookcurrentslot,
    bookappointment: bookappointment,
    deleteappointment: deleteappointment,
    bookslotreschedule: bookslotreschedule,
    addfilter: addfilter,
    admindeleteappointment: admindeleteappointment,
    sort: sort
}

