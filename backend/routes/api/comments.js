/**
 * @module routes/api/comments
 * @description Express router for handling comment-related API endpoints.
 *
 * Endpoints:
 * - GET    /                       - Get all comments
 * - GET    /:id                    - Get a single comment by ID
 * - POST   /                       - Create a new comment
 * - PUT    /:id                    - Update a comment by ID
 * - DELETE /:id                    - Delete a comment by ID
 * - GET    /post/:postId           - Get comments by post ID
 * - GET    /user/:userId           - Get comments by user ID
 * - GET    /post/:postId/user/:userId
 *                                  - Get comments by post ID and user ID
 * - GET    /post/:postId/user/:userId/page/:page
 *                                  - Get comments by post ID and user ID with pagination
 * - GET    /post/:postId/user/:userId/sort/:sort
 *                                  - Get comments by post ID and user ID with sorting
 * - GET    /post/:postId/user/:userId/filter/:filter
 *                                  - Get comments by post ID and user ID with filtering
 * - GET    /post/:postId/user/:userId/filter/:filter/sort/:sort
 *                                  - Get comments by post ID and user ID with filtering and sorting
 * - GET    /post/:postId/user/:userId/filter/:filter/sort/:sort/page/:page
 *                                  - Get comments by post ID and user ID with filtering, sorting, and pagination
 * - GET    /post/:postId/user/:userId/filter/:filter/sort/:sort/page/:page/limit/:limit
 *                                  - Get comments by post ID and user ID with filtering, sorting, pagination, and limiting
 * - GET    /post/:postId/user/:userId/filter/:filter/sort/:sort/page/:page/limit/:limit/projection/:projection
 *                                  - Get comments by post ID and user ID with filtering, sorting, pagination, limiting, and projection
 * - GET    /post/:postId/user/:userId/filter/:filter/sort/:sort/page/:page/limit/:limit/projection/:projection/aggregation/:aggregation
 *                                  - Get comments by post ID and user ID with filtering, sorting, pagination, limiting, projection, and aggregation
 * - GET    /post/:postId/user/:userId/filter/:filter/sort/:sort/page/:page/limit/:limit/projection/:projection/aggregation/:aggregation/customFields/:customFields
 *                                  - Get comments by post ID and user ID with filtering, sorting, pagination, limiting, projection, aggregation, and custom fields
 *
 * Each endpoint returns JSON responses and handles errors with appropriate HTTP status codes.
 */
const router = require("express").Router();
const mongoose = require("mongoose");
const Comment = mongoose.model("Comment");

module.exports = router;
//Hey GitHub Copilot, please help me with the code below
// Get all comments
router.get("/", async (req, res) => {
  try {
    const comments = await Comment.find();
    res.status(200).json(comments);
  } catch (error) {
    res.status(500).json({ message: "Error fetching comments" });
  }
});
// Get a single comment by ID
router.get("/:id", async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.id);
    if (!comment) {
      return res.status(404).json({ message: "Comment not found" });
    }
    res.status(200).json(comment);
  } catch (error) {
    res.status(500).json({ message: "Error fetching comment" });
  }
});
// Create a new comment
router.post("/", async (req, res) => {
  const { text, postId } = req.body;
  if (!text || !postId) {
    return res.status(400).json({ message: "Text and postId are required" });
  }
  try {
    const newComment = new Comment({ text, postId });
    await newComment.save();
    res.status(201).json(newComment);
  } catch (error) {
    res.status(500).json({ message: "Error creating comment" });
  }
});
// Update a comment by ID
router.put("/:id", async (req, res) => {
  const { text } = req.body;
  if (!text) {
    return res.status(400).json({ message: "Text is required" });
  }
  try {
    const updatedComment = await Comment.findByIdAndUpdate(
      req.params.id,
      { text },
      { new: true }
    );
    if (!updatedComment) {
      return res.status(404).json({ message: "Comment not found" });
    }
    res.status(200).json(updatedComment);
  } catch (error) {
    res.status(500).json({ message: "Error updating comment" });
  }
});
// Delete a comment by ID
router.delete("/:id", async (req, res) => {
  try {
    const deletedComment = await Comment.findByIdAndDelete(req.params.id);
    if (!deletedComment) {
      return res.status(404).json({ message: "Comment not found" });
    }
    res.status(200).json({ message: "Comment deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting comment" });
  }
});
// Get comments by post ID      
router.get("/post/:postId", async (req, res) => {
  try {
    const comments = await Comment.find({ postId: req.params.postId });
    res.status(200).json(comments);
  } catch (error) {
    res.status(500).json({ message: "Error fetching comments" });
  }
});
// Get comments by user ID
router.get("/user/:userId", async (req, res) => {
  try {
    const comments = await Comment.find({ userId: req.params.userId });
    res.status(200).json(comments);
  } catch (error) {
    res.status(500).json({ message: "Error fetching comments" });
  }
});
// Get comments by post ID and user ID
router.get("/post/:postId/user/:userId", async (req, res) => {
  try {
    const comments = await Comment.find({
      postId: req.params.postId,
      userId: req.params.userId,
    });
    res.status(200).json(comments);
  } catch (error) {
    res.status(500).json({ message: "Error fetching comments" });
  }
});
// Get comments by post ID and user ID with pagination
router.get(
  "/post/:postId/user/:userId/page/:page",
  async (req, res) => {
    const { postId, userId, page } = req.params;
    const limit = 10; // Number of comments per page
    const skip = (page - 1) * limit;

    try {
      const comments = await Comment.find({
        postId,
        userId,
      })
        .skip(skip)
        .limit(limit);
      res.status(200).json(comments);
    } catch (error) {
      res.status(500).json({ message: "Error fetching comments" });
    }
  }
);
// Get comments by post ID and user ID with sorting
router.get(
  "/post/:postId/user/:userId/sort/:sort",
  async (req, res) => {
    const { postId, userId, sort } = req.params;

    try {
      const comments = await Comment.find({
        postId,
        userId,
      }).sort({ createdAt: sort === "asc" ? 1 : -1 });
      res.status(200).json(comments);
    } catch (error) {
      res.status(500).json({ message: "Error fetching comments" });
    }
  }
);
// Get comments by post ID and user ID with filtering   
router.get(
  "/post/:postId/user/:userId/filter/:filter",
  async (req, res) => {
    const { postId, userId, filter } = req.params;

    try {
      const comments = await Comment.find({
        postId,
        userId,
        text: { $regex: filter, $options: "i" },
      });
      res.status(200).json(comments);
    } catch (error) {
      res.status(500).json({ message: "Error fetching comments" });
    }
  }
);
// Get comments by post ID and user ID with filtering and sorting
router.get(
  "/post/:postId/user/:userId/filter/:filter/sort/:sort",
  async (req, res) => {
    const { postId, userId, filter, sort } = req.params;

    try {
      const comments = await Comment.find({
        postId,
        userId,
        text: { $regex: filter, $options: "i" },
      }).sort({ createdAt: sort === "asc" ? 1 : -1 });
      res.status(200).json(comments);
    } catch (error) {
      res.status(500).json({ message: "Error fetching comments" });
    }
  }
);
// Get comments by post ID and user ID with filtering, sorting, and pagination
router.get(
  "/post/:postId/user/:userId/filter/:filter/sort/:sort/page/:page",
  async (req, res) => {
    const { postId, userId, filter, sort, page } = req.params;
    const limit = 10; // Number of comments per page
    const skip = (page - 1) * limit;

    try {
      const comments = await Comment.find({
        postId,
        userId,
        text: { $regex: filter, $options: "i" },
      })
        .skip(skip)
        .limit(limit)
        .sort({ createdAt: sort === "asc" ? 1 : -1 });
      res.status(200).json(comments);
    } catch (error) {
      res.status(500).json({ message: "Error fetching comments" });
    }
  }
);
// Get comments by post ID and user ID with filtering, sorting, pagination, and limiting
router.get(
  "/post/:postId/user/:userId/filter/:filter/sort/:sort/page/:page/limit/:limit",
  async (req, res) => {
    const { postId, userId, filter, sort, page, limit } = req.params;
    const skip = (page - 1) * limit;

    try {
      const comments = await Comment.find({
        postId,
        userId,
        text: { $regex: filter, $options: "i" },
      })
        .skip(skip)
        .limit(limit)
        .sort({ createdAt: sort === "asc" ? 1 : -1 });
      res.status(200).json(comments);
    } catch (error) {
      res.status(500).json({ message: "Error fetching comments" });
    }
  }
);
// Get comments by post ID and user ID with filtering, sorting, pagination, limiting, and projection
router.get(
  "/post/:postId/user/:userId/filter/:filter/sort/:sort/page/:page/limit/:limit/projection/:projection",
  async (req, res) => {
    const { postId, userId, filter, sort, page, limit, projection } = req.params;
    const skip = (page - 1) * limit;

    try {
      const comments = await Comment.find({
        postId,
        userId,
        text: { $regex: filter, $options: "i" },
      })
        .skip(skip)
        .limit(limit)
        .sort({ createdAt: sort === "asc" ? 1 : -1 })
        .select(projection);
      res.status(200).json(comments);
    } catch (error) {
      res.status(500).json({ message: "Error fetching comments" });
    }
  }
);
// Get comments by post ID and user ID with filtering, sorting, pagination, limiting, projection, and aggregation
router.get(
  "/post/:postId/user/:userId/filter/:filter/sort/:sort/page/:page/limit/:limit/projection/:projection/aggregation/:aggregation",
  async (req, res) => {
    const { postId, userId, filter, sort, page, limit, projection, aggregation } = req.params;
    const skip = (page - 1) * limit;

    try {
      const comments = await Comment.aggregate([
        {
          $match: {
            postId,
            userId,
            text: { $regex: filter, $options: "i" },
          },
        },
        {
          $sort: { createdAt: sort === "asc" ? 1 : -1 },
        },
        {
          $skip: skip,
        },
        {
          $limit: parseInt(limit),
        },
        {
          $project: projection.split(",").reduce((acc, field) => {
            acc[field] = 1;
            return acc;
          }, {}),
        },
      ]);
      res.status(200).json(comments);
    } catch (error) {
      res.status(500).json({ message: "Error fetching comments" });
    }
  }
);
// Get comments by post ID and user ID with filtering, sorting, pagination, limiting, projection, aggregation, and custom fields    
router.get(
  "/post/:postId/user/:userId/filter/:filter/sort/:sort/page/:page/limit/:limit/projection/:projection/aggregation/:aggregation/customFields/:customFields",
  async (req, res) => {
    const { postId, userId, filter, sort, page, limit, projection, aggregation, customFields } = req.params;
    const skip = (page - 1) * limit;

    try {
      const comments = await Comment.aggregate([
        {
          $match: {
            postId,
            userId,
            text: { $regex: filter, $options: "i" },
          },
        },
        {
          $sort: { createdAt: sort === "asc" ? 1 : -1 },
        },
        {
          $skip: skip,
        },
        {
          $limit: parseInt(limit),
        },
        {
          $project: projection.split(",").reduce((acc, field) => {
            acc[field] = 1;
            return acc;
          }, {}),
        },
        {
          $addFields: customFields.split(",").reduce((acc, field) => {
            acc[field] = `$${field}`;
            return acc;
          }, {}),
        },
      ]);
      res.status(200).json(comments);
    } catch (error) {
      res.status(500).json({ message: "Error fetching comments" });
    }
  }
);