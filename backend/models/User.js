const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    first_name: {
      type: String,
      required: [true, "First name is required"],
      text: true,
    },
    last_name: {
      type: String,
      text: true,
    },
    username: {
      type: String,
      required: [true, "User name is required"],
      text: true,
      trim: true,
      unique: true,
    },
    email: {
      type: String,
      unique: true,
      required: [true, "Email is required"],
      text: true,
      trim: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    picture: {
      type: String,
      trim: true,
    },
    cover: {
      type: String,
      trim: true,
    },
    gender: {
      type: String,
      required: [true, "Gender is required"],
      trim: true,
      enum: ["Male", "Female", "Other"],
    },
    bYear: {
      type: Number,
      required: [true, "Year is required"],
      trim: true,
    },
    bMonth: {
      type: Number,
      required: [true, "Month is required"],
      trim: true,
    },
    bDay: {
      type: Number,
      required: [true, "Day is required"],
      trim: true,
    },
    verified: {
      type: Boolean,
      default: false,
    },
    friends: {
      type: Array,
      default: [],
    },
    followers: {
      type: Array,
      default: [],
    },
    following: {
      type: Array,
      default: [],
    },
    requests: {
      type: Array,
      default: [],
    },
    search: {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    },
    details: {
      bio: {
        type: String,
      },
      other_name: {
        type: String,
      },
      job: {
        type: String,
      },
      workplace: {
        type: String,
      },
      high_school: {
        type: String,
      },
      home_town: {
        type: String,
      },
      current_city: {
        type: String,
      },
      relationship: {
        type: String,
        enum: ["Single", "Married", "Divorce", "In a Relationship"],
      },
      instagram: {
        type: String,
      },
    },
    saved_posts: {
      post: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Post",
      },
      saveAt: {
        type: Date,
        default: new Date(),
      },
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
