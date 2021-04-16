import { DataBuddy, DataRecord } from ".";

type ID = string | number;

type RecordBase = {
  id: ID;
};

type User = RecordBase & {
  name: string;
};

type Transaction = RecordBase & {
  userId: ID;
  amount: number;
};

type DataMap<T, R extends DataRecord> = Record<keyof T, DataBuddy<R>>;

export class CrudBuddy<T, R extends DataRecord> {
  data: DataMap<T, R>;

  constructor(data: DataMap<T, R>) {
    this.data = data;
  }

  get = (resource: keyof T) => {
    return this.data[resource].get();
  };

  getOne = (resource: keyof T, id: ID) => {
    return this.data[resource].getOne(id);
  };

  create = (resource: keyof T, body: Omit<R, "id">) => {
    return this.data[resource].create(body);
  };

  update = (resource: keyof T, id: ID, body: Partial<R>) => {
    return this.data[resource].update(id, body);
  };

  delete = (resource: keyof T, id: ID) => {
    return this.data[resource].delete(id);
  };
}

const api = new CrudBuddy({
  users: new DataBuddy<User>([]),
  transactions: new DataBuddy<Transaction>([]),
});

const users = api.get("users");
const transactions = api.get("transactions");
