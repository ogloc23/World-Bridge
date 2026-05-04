import { QueryFilter, UpdateQuery, InferSchemaType } from "mongoose";
import Shipment from "../models/shipment";

type ShipmentDocument = InferSchemaType<typeof Shipment.schema>;

class ShipmentRepository {
  private readonly model = Shipment;

  create = (data: Partial<ShipmentDocument>) => this.model.create(data);

  findOne = (filter: QueryFilter<ShipmentDocument>) =>
    this.model.findOne(filter);

  findMany = (filter: QueryFilter<ShipmentDocument>) => this.model.find(filter);

  update = (
    filter: QueryFilter<ShipmentDocument>,
    data: UpdateQuery<ShipmentDocument>,
  ) => this.model.findOneAndUpdate(filter, data, { new: true });

  delete = (filter: QueryFilter<ShipmentDocument>) =>
    this.model.findOneAndDelete(filter);
}

export default ShipmentRepository;
