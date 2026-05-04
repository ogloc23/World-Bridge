import { QueryFilter, InferSchemaType } from "mongoose";
import TrackingHistory from "../models/trackingHistory";

type TrackingDocument = InferSchemaType<typeof TrackingHistory.schema>;

class TrackingRepository {
  private readonly model = TrackingHistory;

  create = (data: Partial<TrackingDocument>) => this.model.create(data);

  findMany = (filter: QueryFilter<TrackingDocument>) =>
    this.model.find(filter).sort({ date: 1 });
}

export default TrackingRepository;
