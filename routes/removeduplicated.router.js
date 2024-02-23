// Route to remove duplicates
const express = require("express");
const User = require("../model/user.model");
const router = express.Router();

router.route("/removeduplicates").get(async (req, res, next) => {
  try {
    // Query to find duplicates based on email field
    const duplicates = await User.aggregate([
      {
        $group: {
          _id: { email: "$email" },
          count: { $sum: 1 },
          ids: { $push: "$_id" },
        },
      },
      { $match: { count: { $gt: 1 } } },
    ]);

    // Iterate over duplicates and remove them
    const removedDuplicates = await Promise.all(
      duplicates.map(async (duplicate) => {
        // Keep one instance and remove others
        const [keep, ...remove] = duplicate.ids;
        await User.deleteMany({ _id: { $in: remove } });
        return keep;
      })
    );

    res.json({ removedDuplicates });
  } catch (error) {
    console.error("Error removing duplicates:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
