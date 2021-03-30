var express = require('express');
var app = express();
const compression = require("compression");
const path = require("path");
const cors = require("cors");
const bodyParser = require("body-parser");
const fs = require('fs');
const logger = require("morgan");
const session = require("express-session");
const mainroutes = require("./backend/routes/mainroutes");
const cookieParser = require('cookie-parser');
const OtpManager = require("./OtpManager");
const otpRepository = require("./otpRepository");
const otpSender = require("./otpSender");
var mongoose = require('mongoose');
var flash = require('connect-flash');
const multer = require('multer');
var moment = require('moment');

app.use(flash());
const port = process.env.PORT || 4000;


mongoose.connect("mongodb+srv://riya:Ria@0402@cluster0.k4hgx.mongodb.net/Tvastra?retryWrites=true&w=majority", { useNewUrlParser: true, useFindAndModify: false });

const connection = mongoose.connection;

connection.once("open", function () {
  console.log("MongoDB database connection established successfully");
});

const signupdata = require("./backend/databases/mongo.js");
const doctordata = require("./backend/databases/doctordata.js");
const { doctor } = require('./backend/controllers/maincontroller');
const hospitaldata = require('./backend/databases/hospitaldata');
const schedules = require('./backend/databases/schedules');
const appointmentdata = require('./backend/databases/appointmentdata');
const medicaldata = require('./backend/databases/medicaldata.js');


app.use(session({
  cookie: { path: "/", maxAge: 1000 * 60 * 60 * 24 },
  secret: "KonfinitySecretKey",
  saveUninitialized: false,
  resave: false
}));


const otpManager = new OtpManager(otpRepository, {
  otpLength: 5,
  validityTime: 5,
});

app.use(compression());

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(logger("dev"));
app.use(cookieParser());
app.use(express.json());



app.set("views", __dirname + "/frontend/views");
app.engine("html", require("ejs").renderFile);
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "/frontend/images/")));
app.use(express.static(path.join(__dirname, "/frontend/css")));
app.use(express.static(path.join(__dirname, "/frontend/fonts/")));
app.use(express.static(path.join(__dirname, "/frontend/js/")));
app.use(express.static(path.join(__dirname)));

app.set('port', process.env.PORT || port); // set express to use this port





var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads');
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  },

})

var upload = multer({
  storage: storage
})


app.post("/addmedicalrecord", upload.array('myfiles', 3), (req, res) => {
  const name = req.body.name;
  const date = req.body.date;
  const title = req.body.title;
  const type = req.body.typeofreport;
  const medicalid = req.session.userid;
  const pics = req.files;
  var picarray = [];
  for (var i = 0; i < pics.length; i++) {
    picarray.push(pics[i].path);
  }

  medicaldata.insertMany(
    {
      medicalid: medicalid,
      name: name,
      title: title,
      date: date,
      typeofreport: type,
      imgs: picarray
    }).then((newuser) => {
      return res.redirect("/medicalrecords");
    }).catch(err => {
      console.log(err);
    });

});







app.post("/updateprofile", upload.single('profile-image'), (req, res) => {




  if (req.session.isdoctor == true) {
    const id = req.session.userid;
    const name = req.body.name;
    const gender = req.body.gender;
    const date = req.body.date;
    const phone_number = req.body.number;
    const city = req.body.city;
    const state = req.body.state;
    const country = req.body.country;

    const yourhospital = JSON.parse(req.body.yourhospital).map(function (item) {
      return item['value'];
    }).toString();

    console.log(yourhospital);

    const achievements = JSON.parse(req.body.achievements).map(function (item) {
      return item['value'];
    }).toString();;
    const exp = req.body.exp;
    const qualifications = JSON.parse(req.body.qualifications).map(function (item) {
      return item['value'];
    }).toString();;
    const awards = JSON.parse(req.body.awards).map(function (item) {
      return item['value'];
    }).toString();;
    const specialization = JSON.parse(req.body.specialization).map(function (item) {
      return item['value'];
    }).toString();


    if (req.body.treatments) {
      var treatments = JSON.parse(req.body.treatments).map(function (item) {
        return item['value'];
      }).toString();
    }



    const description = req.body.description;
    const fees = req.body.fees;







    if (req.file) {
      var finalimagepath = req.file.path;
    }
    else {
      var finalimagepath = req.session.myprofilepic;
    }

    req.session.yourhospital = yourhospital;
    req.session.achievements = achievements;
    req.session.exp = exp;
    req.session.qualifications = qualifications;
    req.session.awards = awards;
    req.session.specialization = specialization;
    req.session.fees = fees;
    req.session.description = description;
    req.session.treatments = treatments;
    req.session.myprofilepic = finalimagepath;
    req.session.username = name;
    req.session.number = phone_number;
    req.session.gender = gender;
    req.session.city = city;
    req.session.state = state;
    req.session.country = country;
    req.session.date = date;


    signupdata.findByIdAndUpdate({ _id: id }, {
      img: finalimagepath,
      name: name,
      gender: gender,
      date: date,
      city: city,
      state: state,
      country: country,
      phone_number: phone_number
    }).then((user) => {

      console.log(user);
    }).catch();
    doctordata.findByIdAndUpdate({ _id: id }, {
      img: finalimagepath,
      img: finalimagepath,
      name: name,
      gender: gender,
      date: date,
      city: city,
      state: state,
      country: country,
      phone_number: phone_number,
      yourhospital: yourhospital,
      achievements: achievements,
      exp: exp,
      qualifications: qualifications,
      awards: awards,
      specialization: specialization,
      fees: fees,
      description: description,
      treatments: treatments

    }).then((user1) => {

      console.log(user1);
      return res.redirect("/myprofile");



    }).catch();



  }

  else {

    const id = req.session.userid;
    const name = req.body.name;
    const gender = req.body.gender;
    const date = req.body.date;
    const phone_number = req.body.number;
    const city = req.body.city;
    const state = req.body.state;
    const country = req.body.country;
    if (req.file) {
      var finalimagepath = req.file.path;
    }
    else {
      var finalimagepath = req.session.myprofilepic;

    }

    req.session.myprofilepic = finalimagepath;
    req.session.username = name;
    req.session.number = phone_number;
    req.session.gender = gender;
    req.session.city = city;
    req.session.state = state;
    req.session.country = country;
    req.session.date = date;


    signupdata.findByIdAndUpdate({ _id: id }, { img: finalimagepath, name: name, gender: gender, date: date, city: city, state: state, country: country, phone_number: phone_number }).then((user) => {
      if (user) {
        console.log(user);

        return res.redirect("/myprofile");
      }
    }).catch();

  }


});

app.post("/updateprofile/:id/:isdoctor", upload.single('profile-image'), async (req, res) => {


  const isdoctor = req.params.isdoctor;

  if (isdoctor === "true") {
    const id = req.params.id;
    const name = req.body.name;
    const gender = req.body.gender;
    const date = req.body.date;
    const phone_number = req.body.number;
    const city = req.body.city;
    const state = req.body.state;
    const country = req.body.country;


    const yourhospital = JSON.parse(req.body.yourhospital).map(function (item) {
      return item['value'];
    }).toString();

    console.log(yourhospital);

    const achievements = JSON.parse(req.body.achievements).map(function (item) {
      return item['value'];
    }).toString();;
    const exp = req.body.exp;
    const qualifications = JSON.parse(req.body.qualifications).map(function (item) {
      return item['value'];
    }).toString();;
    const awards = JSON.parse(req.body.awards).map(function (item) {
      return item['value'];
    }).toString();;
    const specialization = JSON.parse(req.body.specialization).map(function (item) {
      return item['value'];
    }).toString();


    if (req.body.treatments) {
      var treatments = JSON.parse(req.body.treatments).map(function (item) {
        return item['value'];
      }).toString();
    }



    const description = req.body.description;
    const fees = req.body.fees;

    const q = await doctordata.findOne({ _id: id });
    const c = q.img;

    if (req.file) {
      var finalimagepath = req.file.path;
    }
    else {
      var finalimagepath = c;
    }





    signupdata.findByIdAndUpdate({ _id: id }, {
      img: finalimagepath,
      name: name,
      gender: gender,
      date: date,
      city: city,
      state: state,
      country: country,
      phone_number: phone_number
    }).then((user) => {

      console.log(user);
    }).catch();
    doctordata.findByIdAndUpdate({ _id: id }, {
      img: finalimagepath,
      name: name,
      gender: gender,
      date: date,
      city: city,
      state: state,
      country: country,
      phone_number: phone_number,
      yourhospital: yourhospital,
      achievements: achievements,
      exp: exp,
      qualifications: qualifications,
      awards: awards,
      specialization: specialization,
      fees: fees,
      description: description,
      treatments: treatments

    }).then((user1) => {

      console.log(user1);
      return res.redirect("/admineditprofileid/" + id + "/" + isdoctor);



    }).catch();



  }

  else {

    const id = req.params.id;
    const name = req.body.name;
    const gender = req.body.gender;
    const date = req.body.date;
    const phone_number = req.body.number;
    const city = req.body.city;
    const state = req.body.state;
    const country = req.body.country;
    if (req.file) {
      var finalimagepath = req.file.path;
    }
    else {
      var p = await signupdata.findById({ _id: id });
      var finalimagepath = p.img;

    }

    signupdata.findByIdAndUpdate({ _id: id }, { img: finalimagepath, name: name, gender: gender, date: date, city: city, state: state, country: country, phone_number: phone_number }).then((user) => {
      if (user) {
        console.log(user);

        return res.redirect("/admineditprofileid/" + id + "/" + isdoctor);
      }
    }).catch();

  }


});







app.post("/get-doctor-details", upload.single('profileimage'), (req, res) => {
  const email = req.session.email;

  const yourhospital = JSON.parse(req.body.yourhospital).map(function (item) {
    return item['value'];
  }).toString();
  const achievements = JSON.parse(req.body.achievements).map(function (item) {
    return item['value'];
  }).toString();;
  const exp = req.body.exp;
  const qualifications = JSON.parse(req.body.qualifications).map(function (item) {
    return item['value'];
  }).toString();;
  const awards = JSON.parse(req.body.awards).map(function (item) {
    return item['value'];
  }).toString();;
  const specialization = JSON.parse(req.body.specialization).map(function (item) {
    return item['value'];
  }).toString();
  const description = req.body.description;
  const fees = req.body.fees;

  if (req.file) {
    var finalimagepath = req.file.path;
  }
  else {
    var finalimagepath = "https://cdn2.iconfinder.com/data/icons/medical-services-2/256/Doctor2-512.png";
  }

  console.log(finalimagepath);

  const hosimg = "https://cdn2.iconfinder.com/data/icons/jetflat-buildings/90/008_010_hospital_clinic_building-128.png";
  const treat = "Info Not Available";
  const beds = "Info Not Available";
  const special = "Info Not Available";
  const location = "Info Not Available";

  var hosarray=yourhospital.split(",");
for(var i=0;i<hosarray.length;i++){
  var h=hosarray[i];
  hospitaldata.findOne({ name: h }).then((data) => {
    if (!data) {
      hospitaldata.insertMany({
        name: yourhospital,
        img: hosimg,
        treatment: treat,
        beds: beds,
        specialization: special,
        location: location
      }).then((h) => {
        console.log(h);
      }).catch();
    }
  }).catch();
}
  


  req.session.yourhospital = yourhospital;
  req.session.achievements = achievements;
  req.session.exp = exp;
  req.session.qualifications = qualifications;
  req.session.awards = awards;
  req.session.specialization = specialization;
  req.session.fees = fees;
  req.session.description = description;
  req.session.myprofilepic = finalimagepath;

  console.log(req.session.myprofilepic);

  signupdata.findOneAndUpdate({ email: email }, { img: finalimagepath }).then((user) => {
    doctordata.findOne({ _id: req.session.userid }).then((presentuser) => {
      if (presentuser) {
        console.log("userpresent")
      }
      else {
        doctordata.insertMany(
          {
            _id: req.session.userid,
            name: req.session.username,
            city: req.session.city,
            state: req.session.state,
            country: req.session.country,
            img: finalimagepath,
            email: req.session.email,
            password: req.session.password,
            gender: req.session.gender,
            date: req.session.date,
            phone_number: req.session.phone_number,
            yourhospital: yourhospital,
            achievements: achievements,
            exp: exp,
            qualifications: qualifications,
            awards: awards,
            specialization: specialization,
            fees: fees,
            description: description,

          }).then((newuser) => {
            console.log(newuser);
            req.flash("success", "Login Successful");
            return res.redirect("/home");
          }).catch(err => {
            console.log(err);
          });
      }
    })
  }).catch();




});

app.post("/uploadhospitaldata/:hospital", upload.single('profileimage'), async (req, res) => {
  const hospital = req.params.hospital;
  const hospitalname = req.body.hospitalname;
  const desc = req.body.des;
  if (req.body.speciality) {
    var specialization = JSON.parse(req.body.speciality).map(function (item) {
      return item['value'];
    }).toString();
  }
  const beds = req.body.beds;
  const address = req.body.address;
  if (req.file) {
    var profilepic = req.file.path;
  }
  else {
    var profilepic = "https://cdn2.iconfinder.com/data/icons/jetflat-buildings/90/008_010_hospital_clinic_building-128.png";
  }

  if (req.body.treatments) {
    var treatments = JSON.parse(req.body.treatments).map(function (item) {
      return item['value'];
    }).toString();
  }


  hospitaldata.findOneAndUpdate({ name: hospital }, {
    name: hospitalname,
    img: profilepic,
    treatment: treatments,
    beds: beds,
    specialization: specialization,
    location: address,
    description: desc
  }).then().catch();

  schedules.find({ hospital: hospital }).then((data) => {
    for (var i = 0; i < data.length; i++) {
      data[i].selecthospital = hospitalname;
      for (var j = 0; j < data[i].schedule.length; j++) {
        data[i].schedule[j].hospital = hospitalname;
      }
      data[i].save();
    }
  }).catch();

  const ad = await appointmentdata.find({ drhospital: hospital });
  for (var q = 0; q < ad.length; q++) {
    ad[q].drhospital = hospitalname;
    ad[q].save();
  }
  const dr = await doctordata.find({ yourhospital: hospital });
  for (var p = 0; p < dr.length; p++) {
    dr[p].yourhospital = hospitalname;
    dr[p].save();
  }


  return res.redirect("/adminhospitals");
});





app.post("/otp/:token", (req, res) => {

  const number = req.body.number;

  signupdata.findOne({ phone_number: number }).then((user) => {
    if (user) {
      const otp = otpManager.create(req.params.token);
      req.body.recieverNumber ="919284970819";
      console.log(req.body);

      otpSender.send(otp, req.body);
      
      console.log(`Your token code is ${otp.token} and otp is ${otp.code}`);
      res.redirect('/otppage');

    }
    else {

      req.flash("fail", "Failure");
      req.flash("fail", "Invalid number");
      return res.redirect("/otpnumberpage");
    }

  })

});
app.post("/forgototp/:token", async(req, res) => {

  console.log(req.params,req.body);
  const otp = otpManager.create(req.params.token);
  req.body.recieverNumber ="919284970819";
  console.log(req.body);
  console.log(otp)
  await otpSender.send(otp, req.body);
  console.log(`Your token code is ${otp.token} and otp is ${otp.code}`);
  req.flash("forgotpassword", "i forgot");
  res.redirect('/otppage');


});


app.post("/verifyotp/:token", (req, res) => {
  var code = req.body.number1 + req.body.number2 + req.body.number3 + req.body.number4 + req.body.number5;
  console.log(code);
  const verificationResults = otpManager.VerificationResults;
  const verificationResult = otpManager.verify(
    req.params.token,
    code
  );
  let statusCode;
  let bodyMessage;

  switch (verificationResult) {
    case verificationResults.valid:
      req.flash("success", "Login Successful");
      return res.redirect("/home");
      break;
    case verificationResults.notValid:
      req.flash("fail", "Failure");
      req.flash("fail", "Invalid OTP");
      return res.redirect("/otppage");
      break;
    case verificationResults.checked:
      req.flash("fail", "Failure");
      req.flash("fail", "code already used");
      return res.redirect("/otppage");
      break;
    case verificationResults.expired:
      req.flash("fail", "Failure");
      req.flash("fail", "OTP expired");
      return res.redirect("/otppage");
      break;
    default:
      req.flash("fail", "Failure");
      req.flash("fail", "cannot send");
      return res.redirect("/otppage");
  }
  res.status(statusCode).send(bodyMessage);
});

app.post("/forgotverifyotp/:token", (req, res) => {
  var code = req.body.number1 + req.body.number2 + req.body.number3 + req.body.number4 + req.body.number5;
  console.log(code);
  const verificationResults = otpManager.VerificationResults;
  const verificationResult = otpManager.verify(
    req.params.token,
    code
  );
  let statusCode;
  let bodyMessage;

  switch (verificationResult) {
    case verificationResults.valid:

      return res.redirect("/forgotpassword");
      break;
    case verificationResults.notValid:
      req.flash("fail", "Failure");
      req.flash("fail", "Invalid OTP");
      return res.redirect("/otppage");
      break;
    case verificationResults.checked:
      req.flash("fail", "Failure");
      req.flash("fail", "code already used");
      return res.redirect("/otppage");
      break;
    case verificationResults.expired:
      req.flash("fail", "Failure");
      req.flash("fail", "OTP expired");
      return res.redirect("/otppage");
      break;
    default:
      req.flash("fail", "Failure");
      req.flash("fail", "cannot send");
      return res.redirect("/otppage");
  }
  res.status(statusCode).send(bodyMessage);
});





app.post("/webhooks/message-status", (req, res) => {
  console.log(req.body);
  res.status(200).end();
});

app.post("/webhooks/inbound-message", (req, res) => {
  res.send("inbound-message called");
});







app.use("/", mainroutes);


app.listen(port, () => {
  console.log("app listening on port : ", port);
})






module.exports = app;
