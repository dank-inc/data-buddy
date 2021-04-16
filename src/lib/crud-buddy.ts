import { DataBuddy, IDataBuddy } from ".";

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

type Params<T extends string, K extends RecordBase> = {
  resources: T[];
  data: Record<T, IDataBuddy<K>>;
};

export class CrudBuddy<T extends string, K extends RecordBase> {
  resources: T[];
  data: Record<T, IDataBuddy<K>>;

  constructor({ resources, data }: Params<T, K>) {
    this.resources = resources;
    this.data = data;
  }

  get = (resource: T) => {
    return this.data[resource].get();
  };

  getOne = (resource: T, id: ID) => {
    return this.data[resource].getOne(id);
  };

  create = (resource: T, body: Omit<K, "id">) => {
    return this.data[resource].create(body);
  };

  update = (resource: T, id: ID, body: Partial<K>) => {
    return this.data[resource].update(id, body);
  };

  delete = (resource: T, id: ID) => {
    return this.data[resource].delete(id);
  };
}

const api = new CrudBuddy({
  resources: ["users", "transactions"],
  data: {
    users: new DataBuddy<User>([]),
    transactions: new DataBuddy<Transaction>([]),
  },
});

const users = api.get("users");
const transactions = api.get("transactions");
