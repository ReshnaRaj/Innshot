const UserModel = require("../Model/UserModel");
const StaffModel = require("../Model/StaffModel");
const AdminModel = require("../Model/AdminModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const sendmail = require("../Service/mailservice");
const { verifyLink, verifystaffLink } = require("../Middleware/authuser");

// const maxtime= 3*24*60*60
// const createtoken=(id)=>{
//     return jwt.sign({id},process.env.SECRET,{
//         expiresIn:maxtime,
//     })

// }
// const handleErrors=(err)=>{
//     let errors={email:"",password:""}
// if(err.code===11000){
//     errors.email="This email is already registered"
//     return errors
// }
// if(err.message.includes('users validation failed')){
//     console.log(err.message,"error messageconsoling....")
//     Object.values(err.errors).forEach(({properties})=>{
//         errors[properties.path]=properties.message
//     })
// }return errors
// }
module.exports.register = async (req, res, next) => {
  try {
    const { name, email, phone, password } = req.body;
    const existingemail = await UserModel.findOne({ email });
    if (existingemail) {
      res.json({ error: "Email is already registered", created: false });
    } else {
      const user = await UserModel.create({ name, email, phone, password });

      // console.log(req.body)
      sendmail(
        email,
        "please Activate your account",
        `${process.env.BASE_URL}/verifyemail/${user._id}`
      );

      res.status(201).json({ user, created: true });
    }
  } catch (error) {
    console.log(error);
    // const errors=handleErrors(error)
    res.json({ error, created: false });
  }
};
module.exports.login = async (req, res, next) => {
  try {
    console.log("login page");
    const { email, password } = req.body;
    const user = await UserModel.findOne({ email });

    if (user) {
      if (user.verifiyd) {
        // console.log("user verified working")
        const validpassword = await bcrypt.compare(password, user.password);
        if (validpassword) {
          const userId = user._id;
          const token = jwt.sign({ userId }, process.env.JWT_SECRET_KEY, {
            expiresIn: "1d",
          });

          console.log(token, "tyuy");
          res
            .status(200)
            .json({
              user,
              token,
              created: true,
              message: "Login Successfully",
            });
        } else {
          const errors = { password: "password is incorrect" };
          res.json({ errors, created: false });
        }
      } else {
        const errors = { email: "not verified" };
        res.json({ errors });
      }
    } else {
      const errors = { email: "No user with the entered mail id" };
      res.json({ errors, created: false });
    }
  } catch (error) {
    console.log(error);
    // const errors=handleErrors(error)
    res.json({ error, created: false });
  }
};
module.exports.verifyuser = async (req, res) => {
  try {
    console.log("verify user is working...");
    const { id } = req.params;
    console.log(req.params, "rrrrr");
    const result = await verifyLink(id);
    if (!result) {
      throw new Error("cannot verify the user");
    }
    res.json({ success: { status: true } });
  } catch (error) {
    res.json({ error: error.message });
  }
};
module.exports.isUserAuth = async (req, res, next) => {
  try {
    console.log(req.userId, "userID getting...");
    let userDetials = await UserModel.findById(req.userId);
    console.log(userDetials, "user detaills consoling...");
    // userDetials.auth=true
    res.json({
      auth: true,
      _id: userDetials._id,
      name: userDetials.name,
      email: userDetials.email,
      phone: userDetials.phone,
    });
  } catch (error) {
    res.json({ auth: false, status: "error", message: error.message });
  }
};
module.exports.isStaffAuth = async (req, res, next) => {
  try {
    // console.log(req.staffId,"staff Id getting....")
    let staffDetails = await StaffModel.findById(req.staffId);
    // console.log(staffDetails,"staff detials consoling...")
    staffDetails.auth = true;
    if (staffDetails) {
      res.json({
        auth: true,
        _id: staffDetails._id,
        name: staffDetails.name,
        email: staffDetails.email,
        phone: staffDetails.phone,
      });
    }
  } catch (error) {
    res.json({ auth: false, message: error.message });
  }
};
module.exports.staffreg = async (req, res, next) => {
  try {
    // console.log("staff register page is working..");
    const { name, email, phone, password } = req.body;
    const staffuser = await StaffModel.create({ name, email, phone, password });
    // const staff = await StaffModel.findOne({ email });
    // const phones = await StaffModel.findOne({ phone });
    // console.log(staffuser,"new staff registration.")
    sendmail(
      email,
      "please Activate your account As a resort owner",
      `${process.env.BASE_URL}/staff/verifystaffemail/${staffuser._id}`
    );

    // console.log(staffuser,"staffff")
    res.status(201).json({ staffuser, created: true });
  } catch (error) {
    console.log(error);
    // const errors=handleErrors(error)
    res.json({ error, created: false });
  }
};
module.exports.stafflogin = async (req, res, next) => {
  try {
    console.log("staff login page");
    const { email, password } = req.body;
    const staff = await StaffModel.findOne({ email });

    if (staff) {
      if (staff.verified) {
        if (staff.admin_approval === "Unblock") {
          console.log("staff verified working");
          const auth = await bcrypt.compare(password, staff.password);
          console.log(auth, "authentication working");
          if (auth) {
            const staffId = staff._id;
            console.log(staff._id, "staff id");
            const token = jwt.sign({ staffId }, process.env.JWT_SECRET_KEY, {
              expiresIn: 30000,
            });
            console.log(token, "token coming.....");

            res.status(200).json({ staff, token, created: true });
          } else {
            const errors = { password: "Password is incorrect" };
            res.json({ errors, created: false });
          }
        } else {
          const errors = { message: "Sorry You cannot  access this page" };
          res.json({ errors, created: false });
        }
      } else {
        const errors = { email: "Email not verified" };
        res.json({ errors, created: false });
      }
    } else {
      const errors = { email: "No user with the entered email address" };
      res.json({ errors, created: false });
    }
  } catch (error) {
    console.log(error);
    // const errors = handleErrors(error);
    res.json({ error, created: false });
  }
};

module.exports.verifystaff = async (req, res) => {
  console.log("verify staff ");
  try {
    console.log("verify userstaff is working...");
    const { id } = req.params;
    console.log(req.params, "rrrdcfvgbhnjrr");
    const result = await verifystaffLink(id);
    console.log(result, "result of verify staff");
    if (!result) {
      throw new Error("cannot verify the user");
    }
    res.json({ success: { status: true } });
    // res.json({result,status:true})
  } catch (error) {
    res.json({ error: error.message });
  }
};
module.exports.adminlogin = async (req, res) => {
  console.log("admin login page working");
  try {
    const { email, password } = req.body;
    const admin = await AdminModel.findOne({ email });
    if (admin) {
      const validatePassword = await bcrypt.compare(password, admin.password);
      if (validatePassword) {
        const adminId = admin._id;
        // console.log(adminId,"adminId getting...")
        const token = jwt.sign({ adminId }, process.env.JWT_SECRET_KEY, {
          expiresIn: 30000,
        });
        // const token=jwt.sign({adminId},process.env.JWT_SECRET_KEY,{
        //     expiresIn:30000
        // })
        // console.log(token,"token coming....")
        res.status(200).json({ admin, token, created: true });
      } else {
        const errors = { email: "Incorrect email or password" };
        res.json({ errors, created: false });
      }
    } else {
      const errors = { email: "No Admin with this mail id" };
      res.json({ errors, created: false });
    }
  } catch (error) {
    const errors = { email: "something gone wrong" };
    res.json({ errors, created: false });
  }
};
module.exports.isAdminAuth = async (req, res) => {
  try {
    console.log(req.adminId, "tttt");
    let admin = await AdminModel.findById(req.adminId);
    const admindetails = {
      email: admin.email,
    };
    console.log(admindetails, "tttt");
    res.json({
      auth: true,
      result: admindetails,
      status: "success",
      message: "signin success",
    });
  } catch (error) {
    res.status(400).json({ auth: false, message: `something went wrong` });
  }
};
