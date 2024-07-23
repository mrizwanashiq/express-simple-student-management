import express from "express";
const router = express.Router();
import classModel from "../models/class.js";

router.get("/", async (req, res) => {
  try {
    const data = await classModel.aggregate([
      {
        $match: {
          isDeleted: false,
        },
      },
      {
        $lookup: {
          localField: "incharge",
          from: "teachers",
          foreignField: "_id",
          as: "incharge",
        },
      },

      {
        $unwind: "$incharge",
      },

      {
        $lookup: {
          localField: "_id",
          from: "courses",
          foreignField: "classId",
          as: "course",
        },
      },
    ]);
    res.json({ message: "Fetched successfully", data });
  } catch ({ message }) {
    res.json({ message });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const data = await classModel.findById(req.params.id);
    res.json(data);
  } catch ({ message }) {
    res.json({ message });
  }
});

router.post("/", async (req, res) => {
  try {
    const data = await classModel.create(req.body);
    res.status(200).json({ message: "Added successfully", data });
  } catch ({ message }) {
    res.json({ message });
  }
});

router.patch("/:id", async (req, res) => {
  try {
    const data = await classModel.findByIdAndUpdate(req.params.id, req.body);
    res.status(200).json({ message: "Record updated successfully", data });
  } catch ({ message }) {
    res.json({ message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const data = await classModel.findByIdAndUpdate(req.params.id, {
      isDeleted: true,
    });
    res.status(200).json({ message: "Record Deleted Successfully", data });
  } catch ({ message }) {
    res.json({ message });
  }
});

// router.delete("/", async (req, res) => {
//   try {
//     const data = await classModel.deleteMany();
//     res.status(200).json(data);
//   } catch ({ message }) {
//     res.json({ message });
//   }
// });

export default router;
