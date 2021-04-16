import { uuidGen } from "./utils";

export type ID = string | number;

export type DataRecord = {
  id: ID;
};

export class DataBuddy<T extends DataRecord> {
  data: T[];

  constructor(records: T[]) {
    this.data = records;
  }

  get = (): T[] => {
    return this.data;
  };

  getOne = (id: ID): T | null => {
    return this.data.find((record) => record.id === id) || null;
  };

  create = (body: Omit<T, "id">): T => {
    const record: T = {
      ...body,
      id: uuidGen(),
    } as T;

    this.data.push(record);
    return record;
  };

  update = (id: ID, body: Partial<T>): T | false => {
    const index = this.data.findIndex((record) => record.id === id);
    if (!index) return false;

    const record = this.data[index];
    this.data[index] = { ...record, ...body };
    return this.data[index];
  };

  delete = (id: ID): boolean => {
    const index = this.data.findIndex((record) => record.id === id);
    if (!index) return false;
    this.data.splice(index, 1);
    return true;
  };
}
