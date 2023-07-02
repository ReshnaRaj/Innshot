const AdventureModel = require("../Model/AdventureModel");
const ResortModel = require("../Model/ResorttModel");
const DestinationModel = require("../Model/DestinationModel");
const BookingModel = require("../Model/BookingModel");
const UserModel = require("../Model/UserModel");
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

// module.exports.resort_booking = async (req, res) => {
//   try {
//     console.log(req.body, "reuest data getting...");
//     const { name, email, phone } = req.body;
//     // await BookingsModel.create({"name": name,'email': email,'phone' : phone})
//   } catch (error) {}
// };
module.exports.resort_book = async (req, res) => {
  try {
    console.log(req.body,"request body consoling...")
    const { resortId, traveler, fromDate, toDate } = req.body;
    const traveller = await UserModel.findOne({ email: traveler.email });
    const resortt = await ResortModel.findOne({ _id: resortId });

    // Check if there is an existing booking for the same resort, traveler, and date range
    const existingBooking = await BookingModel.findOne({
      resortId: resortt,
      traveler: traveller,
      
    });

    if (existingBooking) {
      return res.status(400).json({ error: "Resort already booked for the selected dates" });
    }

    const formatDate = (dateString) => {
      const date = new Date(dateString);
      const day = date.getDate();
      const month = date.getMonth() + 1; // Months are zero-based
      const year = date.getFullYear();
      return `${day}/${month}/${year}`;
    };

    const newBooking = new BookingModel({
      resortId: resortt,
      traveler: traveller,
      fromDate: formatDate(fromDate),
      toDate: formatDate(toDate),
      Booked_at: new Date(),
    
      // Add other properties from req.body as needed
    });

    const savedBooking = await newBooking.save();
    console.log(savedBooking, "saved in database/..");
    res.json(savedBooking);
  } catch (error) {
    console.log(error, "error in saving...");
    res.status(500).json({ error: "Error in saving booking" });
  }
};


module.exports.getbookeddata=async(req,res)=>{
  try {
    // console.log("getting data....")
    const id=req.userId;
    // console.log(id,"id getting booked")
    let bookedresort=await BookingModel.find({traveler:id})
    .populate('resortId', 'resortname address price')
    .populate('traveler', 'name email phone');

    console.log(bookedresort,"ppppp")
    res.status(200).json({result:bookedresort})
  } catch (error) {
  }
}

