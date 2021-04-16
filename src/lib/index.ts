import { uuidGen } from "./utils";

type UUID = string | number;

export type DataRecord = {
  id: UUID;
};

export type DataBuddyParams<T extends DataRecord> = T[];

export interface IDataBuddy<T extends DataRecord> {
  get: () => T[];
  getOne: (id: UUID) => T | null;
  create: (body: Omit<T, "id">) => T;
  update: (id: UUID, body: Partial<T>) => T | false;
  delete: (id: UUID) => boolean;
}

export class DataBuddy<T extends DataRecord> implements IDataBuddy<T> {
  data: T[];

  constructor(records: T[]) {
    this.data = records;
  }

  get = (): T[] => {
    return this.data;
  };

  getOne = (id: UUID): T | null => {
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

  update = (id: UUID, body: Partial<T>): T | false => {
    const index = this.data.findIndex((record) => record.id === id);
    if (!index) return false;

    const record = this.data[index];
    this.data[index] = { ...record, ...body };
    return this.data[index];
  };

  delete = (id: UUID): boolean => {
    const index = this.data.findIndex((record) => record.id === id);
    if (!index) return false;
    this.data.splice(index, 1);
    return true;
  };
}
