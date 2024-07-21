import express from "express";
const router = express.Router();
import teacherModel from "../models/teacher.js";

router.get("/", async (req, res) => {
  try {
    const data = await teacherModel.aggregate([
      {
        $match: {
          isDeleted: false,
        },
      },
      {
        $lookup: {
          localField: "_id",
          from: "courses",
          foreignField: "teacherId",
          as: "courses",
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
    const data = await teacherModel.findById(req.params.id);
    res.json(data);
  } catch ({ message }) {
    res.json({ message });
  }
});

router.post("/", async (req, res) => {
  try {
    const data = await teacherModel.create(req.body);
    res.status(200).json({ message: "Added successfully", data });
  } catch ({ message }) {
    res.json({ message });
  }
});

router.patch("/:id", async (req, res) => {
  try {
    const data = await teacherModel.findByIdAndUpdate(req.params.id, req.body);
    res.status(200).json({ message: "Record updated successfully", data });
  } catch ({ message }) {
    res.json({ message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const data = await teacherModel.findByIdAndUpdate(req.params.id, {
      isDeleted: true,
    });
    res.status(200).json({ message: "Record Deleted Successfully", data });
  } catch ({ message }) {
    res.json({ message });
  }
});

// router.delete("/", async (req, res) => {
//   try {
//     const data = await teacherModel.deleteMany();
//     res.status(200).json(data);
//   } catch ({ message }) {
//     res.json({ message });
//   }
// });

export default router;
