import mongoose from "mongoose";

const ShipmentSchema = new mongoose.Schema(
  {
    trackingId: {
      type: String,
      required: true,
      unique: true,
    },

    senderName: {
      type: String,
      required: true,
    },

    receiverName: {
      type: String,
      required: true,
    },

    originPort: {
      type: String,
      required: true,
    },

    destination: {
      type: String,
      required: true,
    },

    currentLocation: {
      type: String,
      required: true,
    },

    status: {
      type: String,
      enum: [
        "PENDING",
        "IN_TRANSIT",
        "ON_HOLD",
        "OUT_FOR_DELIVERY",
        "DELIVERED",
        "CANCELLED",
      ],
      default: "PENDING",
    },

    weight: {
      type: Number,
      default: 0,
    },

    carrier: {
      type: String,
    },

    shipmentDate: {
      type: Date,
      required: true,
    },

    deliveryDate: {
      type: Date,
    },

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Admin",
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Shipment", ShipmentSchema);