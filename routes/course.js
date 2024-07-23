import express from "express";
const router = express.Router();
import courseModel from "../models/course.js";

router.get("/", async (req, res) => {
  try {
    const data = await courseModel.aggregate([
      {
        $match: {
          isDeleted: false,
        },
      },
      {
        $lookup: {
          localField: "teacherId",
          from: "teachers",
          foreignField: "_id",
          as: "teacher",
        },
      },

      {
        $unwind: "$teacher",
      },

      {
        $lookup: {
          localField: "classId",
          from: "classes",
          foreignField: "_id",
          as: "class",
        },
      },

      {
        $unwind: "$class",
      },
    ]);
    res.json({ message: "Fetched successfully", data });
  } catch ({ message }) {
    res.json({ message });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const data = await courseModel.findById(req.params.id);
    res.json(data);
  } catch ({ message }) {
    res.json({ message });
  }
});

router.post("/", async (req, res) => {
  try {
    const data = await courseModel.create(req.body);
    res.status(200).json({ message: "Added successfully", data });
  } catch ({ message }) {
    res.json({ message });
  }
});

router.patch("/:id", async (req, res) => {
  try {
    const data = await courseModel.findByIdAndUpdate(req.params.id, req.body);
    res.status(200).json({ message: "Record updated successfully", data });
  } catch ({ message }) {
    res.json({ message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const data = await courseModel.findByIdAndUpdate(req.params.id, {
      isDeleted: true,
    });
    res.status(200).json({ message: "Record Deleted Successfully", data });
  } catch ({ message }) {
    res.json({ message });
  }
});

// router.delete("/", async (req, res) => {
//   try {
//     const data = await courseModel.deleteMany();
//     res.status(200).json(data);
//   } catch ({ message }) {
//     res.json({ message });
//   }
// });

export default router;
