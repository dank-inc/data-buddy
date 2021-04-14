type DataRecord = {
  id: string;
};

export type DataBuddyParams<T extends DataRecord> = T[];

export class DataBuddy<T extends DataRecord> {
  data: T[];

  constructor(records: T[]) {
    this.data = records;
  }

  get = (): T[] => {
    return this.data;
  };

  getOne = (id: string): T | null => {
    return this.data.find((record) => record.id === id) || null;
  };

  update = (id: string, params: Partial<T>): T | false => {
    const index = this.data.findIndex((record) => record.id === id);
    if (!index) return false;

    const record = this.data[index];
    this.data[index] = { ...record, ...params };
    return this.data[index];
  };

  delete = (id: string): boolean => {
    const index = this.data.findIndex((record) => record.id === id);
    if (!index) return false;
    this.data.splice(index, 1);
    return true;
  };
}
