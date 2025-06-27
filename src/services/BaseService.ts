import api from "./api";

export class BaseService<T, C = Partial<T>> {
  constructor(private endpoint: string) {}

  getAll = async (): Promise<T[]> => {
    const res = await api.get<T[]>(this.endpoint);
    return res.data;
  };

  getById = async (id: string | number): Promise<T> => {
    const res = await api.get<T>(`${this.endpoint}/${id}`);
    return res.data;
  };

  create = async (data: C): Promise<T> => {
    const res = await api.post<T>(this.endpoint, data);
    return res.data;
  };

  update = async (id: string | number, data: Partial<T>): Promise<T> => {
    const res = await api.put<T>(`${this.endpoint}/${id}`, data);
    return res.data;
  };

  delete = async (id: string | number): Promise<void> => {
    await api.delete(`${this.endpoint}/${id}`);
  };
}
