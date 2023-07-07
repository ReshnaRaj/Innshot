const AdventureModel = require("../Model/AdventureModel");
const ResortModel = require("../Model/ResorttModel");
const DestinationModel = require("../Model/DestinationModel");
const BookingModel = require("../Model/BookingModel");
const UserModel = require("../Model/UserModel");
// const stripe=require('stripe')(process.env.STRIPE_SECRET_KEY)
// const {v4:uuidv4}=require('uuid')
const Razorpay = require("razorpay");
const crypto = require("crypto");
const key_id = process.env.KEY_ID;
const key_secret = process.env.KEY_SECRET;
module.exports.UserResort = async (req, res, next) => {
  try {
    const resortt = await ResortModel.find({ verify: true });
    // console.log(resort,"resort showing working.....")
    res.status(200).json({ resortt, success: true });
  } catch (error) {
    console.log(error, "error consoling...");
  }
};
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
    // console.log(resort,"resort showing working.....")
    res.status(200).json({ adventure, success: true });
  } catch (error) {
    console.log(error, "error consoling...");
  }
};
module.exports.getoneAdv = async (req, res) => {
  try {
    console.log("getting...");
    let advId = req.params.id;
    let oneadvdata = await AdventureModel.findById(advId).populate(
      "resortowner"
    );
    res.status(200).json({ oneadvdata, success: true });
  } catch (error) {}
};
module.exports.UserDestinations = async (req, res, next) => {
  try {
    const destination = await DestinationModel.find({ verify: true });
    // console.log(resort,"resort showing working.....")
    res.status(200).json({ destination, success: true });
  } catch (error) {
    console.log(error, "error consoling...");
  }
};
module.exports.getonedest = async (req, res) => {
  console.log("one destination data");
  try {
    console.log("getting...");
    let destId = req.params.id;
    let onedestdata = await DestinationModel.findById(destId).populate(
      "resortowner"
    );
    res.status(200).json({ onedestdata, success: true });
  } catch (error) {}
};
// module.exports.resort_book=async(req,res)=>{
//   console.log(req.body,"request body")
//   try {
//      const {resortId,traveler,fromDate,toDate,payment}=req.body
//      const traveller = await UserModel.findOne({ email: traveler.email });
//      const resortt = await ResortModel.findOne({ _id: resortId });
//       const formatDate = (dateString) => {
//       const date = new Date(dateString);
//       const day = date.getDate();
//       const month = date.getMonth() + 1; // Months are zero-based
//       const year = date.getFullYear();
//       return `${day}/${month}/${year}`;
//     };
//          const newBooking = new BookingModel({
//       resortId: resortt,
//       traveler: traveller,
//       fromDate: formatDate(fromDate),
//       toDate: formatDate(toDate),
//       Booked_at: new Date(),

//       // Add other properties from req.body as needed
//     });
//     newBooking.save().then(async (bookResponse)=>{
//       const session=await stripe.checkout.sessions.create({
//         payment_method_types:['card'],

//         line_items: [
//           {
//             currency:'inr',
//             name:resortId.resortname,
//             amount:resortId.price*100,

//             // Provide the exact Price ID (for example, pr_1234) of the product you want to sell

//           },
//         ],
//         mode: 'payment',
//         success_url: `${YOUR_DOMAIN}/success.html`,
//         cancel_url: `${YOUR_DOMAIN}/cancel.html`,

//       })
//       re.json({url:session.url})

//     })

//   } catch (error) {
//     res.status(500).json({error:error.message})

//   }
// }

// module.exports.resort_book = async (req, res) => {
//   try {
//     console.log(req.body,"request body consoling...")
//     const { resortId, traveler, fromDate, toDate,payment } = req.body;
//     const traveller = await UserModel.findOne({ email: traveler.email });
//     const resortt = await ResortModel.findOne({ _id: resortId });

//     // Check if there is an existing booking for the same resort, traveler, and date range
//     const existingBooking = await BookingModel.findOne({
//       resortId: resortt,
//       traveler: traveller,

//     });

//     if (existingBooking) {
//       return res.status(400).json({ error: "Resort already booked for the selected dates" });
//     }

//     const formatDate = (dateString) => {
//       const date = new Date(dateString);
//       const day = date.getDate();
//       const month = date.getMonth() + 1; // Months are zero-based
//       const year = date.getFullYear();
//       return `${day}/${month}/${year}`;
//     };

//     const newBooking = new BookingModel({
//       resortId: resortt,
//       traveler: traveller,
//       fromDate: formatDate(fromDate),
//       toDate: formatDate(toDate),
//       Booked_at: new Date(),
//       payment:payment

//       // Add other properties from req.body as needed
//     });

//     const savedBooking = await newBooking.save();
//     console.log(savedBooking, "saved in database/..");
//     res.json(savedBooking);
//   } catch (error) {
//     console.log(error, "error in saving...");
//     res.status(500).json({ error: "Error in saving booking" });
//   }
// };
// module.exports.resort_book=async(req,res)=>{
//   console.log(req.body,"rrrrrrr")
//   // const { resortId,traveler,fromDate,toDate,payment,token } = req.body;

//   try {
//    const customer=await stripe.customers.create({
//     email:token.email,
//     source:token.id
//    })
//    const paymentt=await stripe.paymentIntents.create({
//     amount:resortId.price*100,
//     customer:customer.id,
//     currency:'inr',
//     receipt_email:token.email
//    },{
//     idempotencyKey:uuidv4()
//    }
//    )
//    console.log(paymentt,"00000")
//    if(paymentt){

//           console.log(req.body,"request body consoling...")
//           const { resortId, traveler, fromDate,payment ,toDate } = req.body;
//           const traveller = await UserModel.findOne({ email: traveler.email });
//           const resortt = await ResortModel.findOne({ _id: resortId });

//           // Check if there is an existing booking for the same resort, traveler, and date range
//           const existingBooking = await BookingModel.findOne({
//             resortId: resortt,
//             traveler: traveller,

//           });

//           if (existingBooking) {
//             return res.status(400).json({ error: "Resort already booked for the selected dates" });
//           }

//           const formatDate = (dateString) => {
//             const date = new Date(dateString);
//             const day = date.getDate();
//             const month = date.getMonth() + 1; // Months are zero-based
//             const year = date.getFullYear();
//             return `${day}/${month}/${year}`;
//           };

//           const newBooking = new BookingModel({
//             resortId: resortt,
//             traveler: traveller,
//             fromDate: formatDate(fromDate),
//             toDate: formatDate(toDate),
//             Booked_at: new Date(),
//             'payment.payment_method':payment

//             // Add other properties from req.body as needed
//           });

//           const savedBooking = await newBooking.save();
//           res.send("payment successfully your resort is booked")
//           // console.log(savedBooking, "saved in database/..");
//           // res.json(savedBooking);

//    }

//   } catch (error) {
//     console.log(error,"error...")
//     return res.status(400).json({error})

//   }
// }
// module.exports.resort_book = async (req, res) => {
//   console.log(req.body, "rrrrrrr");

//   try {
//     const { resortId, traveler, fromDate, toDate, payment, token } = req.body;
//     const traveller = await UserModel.findOne({ email: traveler.email });
//     const resortt = await ResortModel.findOne({ _id: resortId });

//     // Check if there is an existing booking for the same resort, traveler, and date range
//     const existingBooking = await BookingModel.findOne({
//       resortId: resortt,
//       traveler: traveller,
//     });

//     if (existingBooking) {
//       return res.status(400).json({ error: "Resort already booked for the selected dates" });
//     }

//     if (payment === "cod") {
//       // Handle Cash on Delivery payment
//       const formatDate = (dateString) => {
//         const date = new Date(dateString);
//         const day = date.getDate();
//         const month = date.getMonth() + 1; // Months are zero-based
//         const year = date.getFullYear();
//         return `${day}/${month}/${year}`;
//       };

//       const newBooking = new BookingModel({
//         resortId: resortt,
//         traveler: traveller,
//         fromDate: formatDate(fromDate),
//         toDate: formatDate(toDate),
//         Booked_at: new Date(),
//         payment: {
//           payment_method: payment,
//         },
//         // Add other properties from req.body as needed
//       });

//       const savedBooking = await newBooking.save();
//       res.send("Payment successful. Your resort is booked.");
//     } else if (payment === "online") {
//       // Handle Online Payment using Stripe
//       const customer = await stripe.customers.create({
//         email: token.email,
//         source: token.id,
//       });

//       const paymentIntent = await stripe.paymentIntents.create(
//         {
//           amount: resortt.price * 100,
//           customer: customer.id,
//           currency: "inr",
//           receipt_email: token.email,
//         },
//         {
//           idempotencyKey: uuidv4(),
//         }
//       );

//       console.log(paymentIntent, "Stripe payment intent");

//       if (paymentIntent) {
//         const formatDate = (dateString) => {
//           const date = new Date(dateString);
//           const day = date.getDate();
//           const month = date.getMonth() + 1; // Months are zero-based
//           const year = date.getFullYear();
//           return `${day}/${month}/${year}`;
//         };

//         const newBooking = new BookingModel({
//           resortId: resortt,
//           traveler: traveller,
//           fromDate: formatDate(fromDate),
//           toDate: formatDate(toDate),
//           Booked_at: new Date(),
//           payment: {
//             payment_method: payment,
//             payment_intent: paymentIntent.id,
//           },
//           // Add other properties from req.body as needed
//         });

//         const savedBooking = await newBooking.save();
//         res.send("Payment successful. Your resort is booked.");
//       }
//     } else {
//       return res.status(400).json({ error: "Invalid payment method" });
//     }
//   } catch (error) {
//     console.log(error, "error...");
//     return res.status(400).json({ error });
//   }
// };

module.exports.resort_book = async (req, res) => {
  try {
    // console.log(req.body,"ooooo")
    console.log(req.userId,"userId")
    const { resortId, traveler, fromDate, toDate, payment } = req.body;
    console.log(traveler,"popopop")
    const traveller = await UserModel.findOne({ email: traveler.email });
    console.log(traveller,"travller Id")

    const resortt = await ResortModel.findOne({ _id: resortId });
    // console.log(resortt,"resort Id")
    // console.log(fromDate, typeof fromDate, "from date....");
    // console.log(resortt,"resort data...")
    const existingBooking = await BookingModel.findOne({
      resortId: resortt,
      traveler: req.userId,
      fromDate,toDate
    });

    if (existingBooking) {
      return res
        .status(400)
        .json({ error: "Resort already booked for the selected dates" });
    }

    if (payment === "cod") {
      const formatDate = (dateString) => {
        const date = new Date(dateString);
        const day = date.getDate();
        const month = date.getMonth() + 1; // Months are zero-based
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
      };

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

      const newBooking = new BookingModel({
        resortId: resortt,
        traveler: traveller,
        fromDate: formatDate(fromDate),
        toDate: formatDate(toDate),
        Booked_at: new Date(),
        "payment.payment_method": payment,
        "payment.payment_amount": resortt.price*dayCount,
      });
      // console.log(newBooking,"from date and to date....")
      const savedBooking = await newBooking.save();
      res.json({ savedBooking, success: true });
    } else {
      try {
        const formatDate = (dateString) => {
        const date = new Date(dateString);
        const day = date.getDate();
        const month = date.getMonth() + 1; // Months are zero-based
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
      };      
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
        const instance =new Razorpay({
          key_id,
          key_secret,
        });
        const options = {
          amount: resortt.price*dayCount*100,
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
    } = req.body;
    const sign = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSign = crypto
      .createHmac("sha256", key_secret)
      .update(sign.toString())
      .digest("hex");
    if (razorpay_signature === expectedSign) {
      const user = req.userId;
      const bookedresort = resortdat;
      const price = resortdat.price;
  
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
     
      const newBooking = new BookingModel({
        resortId: bookedresort,
        traveler: user,
        fromDate: formatDate(checkInDate),
        toDate: formatDate(checkOutDate),
        Booked_at: new Date(),
        "payment.payment_method": paymentt,
        "payment.payment_amount": price*dayCount,
        "payment.payment_status": "completed",
        "payment.payment_id": razorpay_payment_id,
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

    console.log(bookedresort, "ppppp");
    console.log(bookedresort[0]._id, "p");
    res.status(200).json({ result: bookedresort });
  } catch (error) {}
};
module.exports.CancelBooking = async (req, res, next) => {
  try {
    const BookId = req.params.id;
    const BookedData = await BookingModel.findById(BookId);

    if (BookedData) {
      const updatedBooking = await BookingModel.findByIdAndUpdate(
        BookId,
        { $set: { status: "cancelled" } },
        { new: true }
      );
      console.log(updatedBooking, "status updated");

      if (updatedBooking) {
        // Additional logic or actions after successful cancellation
        res.json({
          message: "Booking cancelled successfully",
          data: updatedBooking,
        });
      } else {
        res.status(404).json({ message: "Booking not found" });
      }
    } else {
      res.status(400).json({
        message: "Cancellation is not available for this payment method",
      });
    }
  } catch (error) {
    console.log(error, "error consoling....");
    res.status(500).json({ message: "Internal Server Error" });
  }
};
