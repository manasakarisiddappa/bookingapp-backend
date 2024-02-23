const Hotel = require("../model/hotel.model");

const singlehotelHandler = async (req, res, next) => {
  try {
    const { id } = req.params;
    const hotel = await Hotel.findById(id);
    res.json(hotel);
    next();
  } catch (err) {
    res.status(404).json({ message: "No hotel found" });
  }
};

module.exports = singlehotelHandler;
