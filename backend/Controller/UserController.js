const AdventureModel = require("../Model/AdventureModel");
const ResortModel = require("../Model/ResorttModel");
const DestinationModel = require("../Model/DestinationModel");
const BookingModel = require("../Model/BookingModel");
const UserModel = require("../Model/UserModel");
const bcrypt=require('bcrypt')
// const stripe=require('stripe')(process.env.STRIPE_SECRET_KEY)
// const {v4:uuidv4}=require('uuid')
const Razorpay = require("razorpay");
const crypto = require("crypto");
const StaffModel = require("../Model/StaffModel");
const key_id =process.env.KEY_ID;
const key_secret =process.env.KEY_SECRET

module.exports.UserResort = async (req, res, next) => {
  try {
    // console.log("user resort listing...")
    const resortt = await ResortModel.find({ verify: 'verified' }) 
    // console.log(resortt,"resort showing working.....")
    res.status(200).json({ resortt, success: true });
  } catch (error) {
    console.log(error, "error consoling...");
  }
};
// module.exports.UserResortMain = async (req, res, next) => {
//   try {
//     // console.log("user resort listing...")
//     const resortt = await ResortModel.find({ verify: 'verified' }).limit(3);
//     // console.log(resortt,"resort showing working.....")
//     res.status(200).json({ resortt, success: true });
//   } catch (error) {
//     console.log(error, "error consoling...");
//   }
// };
module.exports.getoneresort = async (req, res, next) => {
  try {
    let resortId = req.params.id;
    let oneresortdata = await ResortModel.findById(resortId).populate(
      "resortowner"
    );
    res.status(200).json({ oneresortdata, success: true });
  } catch (error) {
    res.json({ message: error.message });
  }
};

module.exports.getsimilarstay = async (req, res, next) => {
  try {
    const place = req.params.data;
    // console.log(place,"place is getting...")
    // const {excludedResortId} = req.body;
    // console.log(excludedResortId,"hhhhhhh")
    const similarStays = await ResortModel.find({
      verify: true,
      place,
      // _id: { $ne: excludedResortId },
    });
    // console.log(similarStays, "similar stays");
    res.json({ success: true, similarStays });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ success: false, message: "Failed to fetch similar stays" });
  }
};

module.exports.UserAdventure = async (req, res, next) => {
  try {
    const adventure = await AdventureModel.find({ verify: true });
    // console.log(adventure," adventure.....")
    res.status(200).json({ adventure, success: true });
  } catch (error) {
    console.log(error, "error consoling...");
  }
};
module.exports.getoneAdv = async (req, res) => {
  try {
    // console.log("getting...");
    let advId = req.params.id;
    let oneadvdata = await AdventureModel.findById(advId).populate(
      "resortowner"
    );
    res.status(200).json({ oneadvdata, success: true });
  } catch (error) {
    
  }
};
module.exports.UserDestinations = async (req, res, next) => {
  try {
    const destination = await DestinationModel.find({ verify: true });
    // console.log(destination,"destination.......")
    res.status(200).json({ destination, success: true });
  } catch (error) {
    console.log(error, "error consoling...");
  }
};
module.exports.getonedest = async (req, res) => {
  // console.log("one destination data");
  try {
    console.log("getting...");
    let destId = req.params.id;
    let onedestdata = await DestinationModel.findById(destId).populate(
      "resortowner"
    );
    res.status(200).json({ onedestdata, success: true });
  } catch (error) {}
};
module.exports.resort_book = async (req, res) => {
  try {
    // console.log("working of resort booking...");
    const { resortId, traveler, fromDate, toDate, payment ,pricee,count_rooms} = req.body;
    // console.log(req.body,"request body....")
    console.log(pricee,"updated price..")
    console.log( count_rooms,"count user entered rooms..")
    // formatting the date 
    const formatDate = (dateString) => {
      const date = new Date(dateString);
      const day = date.getDate();
      const month = date.getMonth() + 1; // Months are zero-based
      const year = date.getFullYear();
      return `${day}/${month}/${year}`;
    };
   
    const traveller = await UserModel.findOne({ email: traveler.email });
    
    const resortt = await ResortModel.findOne({ _id: resortId });
    if (count_rooms > resortt.number_room) {
      return res.status(400).json({ error: "Insufficient rooms available in the resort" });
    }
    const newRoomsAvailable =  resortt.number_room- count_rooms;
    await ResortModel.findByIdAndUpdate(resortt._id, { $set: { number_room: newRoomsAvailable } });
  
    const existingBooking = await BookingModel.findOne({
      resortId: resortt._id,
       $or: [
        { status:{$eq:"booked"}},
        { status:{$ne:"cancelled"} }
      ],
      fromDate:formatDate(fromDate),
      toDate:formatDate(toDate)
    });
    console.log(existingBooking, "existing booking");
    if (existingBooking) {
      return res
        .status(400)
        .json({ error: "Resort already booked for the selected dates" });
    }
    if (payment === "cod") {
      
     console.log(formatDate,"tttt")
    //  this code is for formatting the date 
      const update_from = formatDate(fromDate);
      // console.log(update_from, typeof update_from, "tttt");
      const update_to = formatDate(toDate);
      const fromDateParts = update_from.split("/");
      const toDateParts = update_to.split("/");
      const fromDateObj = new Date(
        fromDateParts[2],
        fromDateParts[1] - 1,
        fromDateParts[0]
      );
      const toDateObj = new Date(
        toDateParts[2],
        toDateParts[1] - 1,
        toDateParts[0]
      );

      const timeDifference = toDateObj.getTime() - fromDateObj.getTime();
      const dayCount = Math.ceil(timeDifference / (1000 * 60 * 60 * 24));

      console.log(dayCount, "count of days");
      console.log(pricee,"22222333")

      const newBooking = new BookingModel({
        resortId: resortt._id,
        traveler: traveller,
        fromDate: formatDate(fromDate),
        toDate: formatDate(toDate),
        Booked_at: new Date(),
        "payment.payment_method": payment,
        "payment.payment_amount": pricee ,
        selected_rooms:count_rooms ,
      });
      // console.log(newBooking,"from date and to date....")
      const savedBooking = await newBooking.save();
      res.json({ savedBooking, success: true });
    } else {
      try {
      // formatting the date 
        const update_from = formatDate(fromDate);
        console.log(update_from, typeof update_from, "tttt");
        const update_to = formatDate(toDate);
        const fromDateParts = update_from.split("/");
        const toDateParts = update_to.split("/");
        const fromDateObj = new Date(
          fromDateParts[2],
          fromDateParts[1] - 1,
          fromDateParts[0]
        );
        const toDateObj = new Date(
          toDateParts[2],
          toDateParts[1] - 1,
          toDateParts[0]
        );

        const timeDifference = toDateObj.getTime() - fromDateObj.getTime();
        const dayCount = Math.ceil(timeDifference / (1000 * 60 * 60 * 24));

        console.log(dayCount, "count of days");
        console.log(resortt.price, "thhhhhh");
        const instance = new Razorpay({
          key_id,
          key_secret,
        });
        const options = {
          amount: pricee  * 100,
          currency: "INR",
          receipt: crypto.randomBytes(10).toString("hex"),
        };
        instance.orders.create(options, (error, order) => {
          if (error) {
            console.log(error, "909099");
            return res.status(500).json({ message: "something went wrong" });
          }

          console.log("hhyjj");
          res.status(200).json({ data: order });
        });
      } catch (error) {
        console.log(error, "7777");
        res.status(500).json({ message: "INTERNAL SERVER ERROR" });
      }
    }
  } catch (error) {
    console.log(error, "123456");
  }
};
 

module.exports.verifyPayment = async (req, res) => {
  try {
    console.log(req.body, "teena comes");
    console.log(req.userId, "yuyuyyu");
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      resortdat,
      checkInDate,
      checkOutDate,
      paymentt,
      real_amount,count_room
    
    } = req.body;
    console.log(req.body,"0000")
    const sign = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSign = crypto
      .createHmac("sha256", key_secret)
      .update(sign.toString())
      .digest("hex");
    if (razorpay_signature === expectedSign) {
      const user = req.userId;
      const bookedresort = resortdat;
      // console.log(bookedresort,"booke4444")
   
      

      // this is written for saving the day of count in database and the day should be stored in database
      const formatDate = (dateString) => {
        const date = new Date(dateString);
        const day = date.getDate();
        const month = date.getMonth() + 1; // Months are zero-based
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
      };
      const update_from = formatDate(checkInDate);
      console.log(update_from, typeof update_from, "tttt");
      const update_to = formatDate(checkOutDate);
      const fromDateParts = update_from.split("/");
      const toDateParts = update_to.split("/");
      const fromDateObj = new Date(
        fromDateParts[2],
        fromDateParts[1] - 1,
        fromDateParts[0]
      );
      const toDateObj = new Date(
        toDateParts[2],
        toDateParts[1] - 1,
        toDateParts[0]
      );

      const timeDifference = toDateObj.getTime() - fromDateObj.getTime();
      const dayCount = Math.ceil(timeDifference / (1000 * 60 * 60 * 24));

      console.log(dayCount, "count of days");
      console.log(real_amount,"price new...")
      const newBooking = new BookingModel({
        resortId: bookedresort,
        traveler: user,
        fromDate: formatDate(checkInDate),
        toDate: formatDate(checkOutDate),
        Booked_at: new Date(),
        "payment.payment_method": paymentt,
        "payment.payment_amount": real_amount,
        "payment.payment_status": "completed",
        "payment.payment_id": razorpay_payment_id,
        selected_rooms:count_room,
      });
      const savedBooking = await newBooking.save();
      res.json({
        savedBooking,
        success: true,
        message: "Payment Verified Successfully",
      });
      // return res.status(200).json({message:'Payment Verified Successfully'})
    } else {
      return res.status(400).json({ message: "Invalid Signature sent" });
    }
  } catch (error) {
    console.log(error, "ioioioioioiio");
  }
};
module.exports.getbookeddata = async (req, res) => {
  try {
    // console.log("getting data....")
    const id = req.userId;
    // console.log(id,"id getting booked")
    let bookedresort = await BookingModel.find({ traveler: id })
      .populate("resortId", "resortname address price place")
      .sort({ Booked_at: -1 });

    // console.log(bookedresort, "ppppp");
    console.log(bookedresort[0]._id, "p");
    res.status(200).json({ result: bookedresort });
  } catch (error) {}
};
 

module.exports.CancelBooking = async (req, res, next) => {
  try {
    const bookId = req.params.id;
    const bookedData = await BookingModel.findById(bookId);

    if (!bookedData) {
      return res.status(404).json({ message: "Booking not found" });
    }

    if (bookedData.status === "cancelled") {
      return res.status(400).json({ message: "Booking is already cancelled" });
    }

    const updatedBooking = await BookingModel.findByIdAndUpdate(
      bookId,
      { $set: { status: "cancelled" } },
      { new: true }
    );
console.log(updatedBooking,"updated booking....")
    if (!updatedBooking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    // Get the resortId from the updatedBooking data
    const resortId = updatedBooking.resortId;

    // Find the corresponding resort data
    const resortData = await ResortModel.findById(resortId);
    console.log(resortData,"resort data in booking...")

    if (!resortData) {
      return res.status(404).json({ message: "Resort data not found" });
    }

    // Increment the selectedRooms count by the number of rooms booked in this particular booking
    const roomsBooked = updatedBooking.selected_rooms;
    console.log(roomsBooked,"numbe rof rooms booked...")
    resortData.number_room += roomsBooked;

    // Save the updated resort data
    await resortData.save();

    return res.json({
      message: "Booking cancelled successfully",
      data: updatedBooking,
    });
  } catch (error) {
    console.log(error, "error consoling....");
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

// module.exports.CancelBooking = async (req, res, next) => {
//   try {
//     const BookId = req.params.id;
//     const BookedData = await BookingModel.findById(BookId);

//     if (BookedData) {
//       const updatedBooking = await BookingModel.findByIdAndUpdate(
//         BookId,
//         { $set: { status: "cancelled" } },
//         { new: true }
//       );
//       console.log(updatedBooking, "status updated");

//       if (updatedBooking) {
//         // Additional logic or actions after successful cancellation
//         res.json({
//           message: "Booking cancelled successfully",
//           data: updatedBooking,
//         });
//       } else {
//         res.status(404).json({ message: "Booking not found" });
//       }
//       const resortId = updatedBooking.resortId;

      
//       const resortData = await ResortModel.findById(resortId);
//       console.log(resortData,"resort dat in booking page")
//       if (!resortData) {
//         return res.status(404).json({ message: "Resort data not found" });
//       }
//       const roomsBooked = updatedBooking.selected_rooms.length;
//       resortData.number_room += roomsBooked;
//       await resortData.save();
//     } else {
//       res.status(400).json({
//         message: "Cancellation is not available for this payment method",
//       });
//     }
//   } catch (error) {
//     console.log(error, "error consoling....");
//     res.status(500).json({ message: "Internal Server Error" });
//   }
// };
module.exports.updatePassword = async (req, res) => {
  console.log(req.body,"request body data getting...")
  const _id = req.userId;
  const { old, newPass } = req.body;
  try {
    let user = await UserModel.findById(_id);
    const isMatch = await bcrypt.compare(old, user.password);

    if (isMatch) {
      const salt = await bcrypt.genSalt(10);
      const hashPassword = await bcrypt.hash(newPass.trim(), salt);
      const userupdate = await UserModel.findByIdAndUpdate(
        { _id },
        { $set: { password: hashPassword } }
      );
      res.json({ status: "success", result: userupdate });
    } else {
      res.json({ status: "failed", message: "credentials are incorrect" });
    }
  } catch (error) {
    res.json({ status: "error", message: error.message });
  }
};
module.exports.getStaff=async(req,res)=>{
  try {
    const id=req.params.id
    console.log(id)
    const staff=await StaffModel.find({_id:id})
    console.log(staff,"staff999")
    res.json({success:true,result:staff})
  } catch (error) {
    res.status(400).json({success:false,message:error.message})
    
  }
}
