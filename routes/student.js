import express from "express";
const router = express.Router();
import studentModel from "../models/student.js";

router.get("/", async (req, res) => {
  try {
    const data = await studentModel.aggregate([
      {
        $match: {
          isDeleted: false,
        },
      },
      {
        $sort: {
          name: 1,
        },
      },
      {
        $lookup: {
          localField: "classId",
          from: "classes",
          foreignField: "_id",
          as: "class",
          pipeline: [
            {
              $lookup: {
                localField: "_id",
                from: "courses",
                foreignField: "classId",
                as: "course",
              },
            },
          ],
        },
      },
      {
        $project: {
          isDeleted: 0,
          __v: 0,
          classId: 0,
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
    const data = await studentModel.findById(req.params.id);
    res.json(data);
  } catch ({ message }) {
    res.json({ message });
  }
});

router.post("/", async (req, res) => {
  try {
    const data = await studentModel.create(req.body);
    res.status(200).json({ message: "Added successfully", data });
  } catch ({ message }) {
    res.json({ message });
  }
});

router.patch("/:id", async (req, res) => {
  try {
    const data = await studentModel.findByIdAndUpdate(req.params.id, req.body);
    res.status(200).json({ message: "Record updated successfully", data });
  } catch ({ message }) {
    res.json({ message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const data = await studentModel.findByIdAndUpdate(req.params.id, {
      isDeleted: true,
    });
    res.status(200).json({ message: "Record Deleted Successfully", data });
  } catch ({ message }) {
    res.json({ message });
  }
});

// router.delete("/", async (req, res) => {
//   try {
//     const data = await studentModel.deleteMany();
//     res.status(200).json(data);
//   } catch ({ message }) {
//     res.json({ message });
//   }
// });

export default router;
