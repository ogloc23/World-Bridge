import mongoose from "mongoose";

const TrackingHistorySchema = new mongoose.Schema(
  {
    shipmentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Shipment",
      required: true,
    },

    location: {
      type: String,
      required: true,
    },

    status: {
      type: String,
      required: true,
    },

    description: {
      type: String,
    },

    date: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

export default mongoose.model("TrackingHistory", TrackingHistorySchema);