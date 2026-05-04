import type { InferSchemaType } from "mongoose";
import { QueryFilter, UpdateQuery } from "mongoose";
import admin from "../models/admin";

type AdminDocument = InferSchemaType<typeof admin.schema>;

class AdminRepository {
  private readonly model = admin;

  create = (data: Partial<AdminDocument>) => this.model.create(data);

  findOne = (filter: QueryFilter<AdminDocument>) => this.model.findOne(filter);

  findMany = (filter: QueryFilter<AdminDocument>) => this.model.find(filter);

  findById = (id: string) => this.model.findById(id);

  update = (
    filter: QueryFilter<AdminDocument>,
    data: UpdateQuery<AdminDocument>,
  ) => this.model.findOneAndUpdate(filter, data, { new: true });

  delete = (filter: QueryFilter<AdminDocument>) =>
    this.model.findOneAndDelete(filter);

  count = (filter: QueryFilter<AdminDocument>) =>
    this.model.countDocuments(filter);
}

export default AdminRepository;
