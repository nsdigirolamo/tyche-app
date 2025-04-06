export interface IEntityRepository<T> {
  create(input: unknown): Promise<T>;
  read(identifier: unknown): Promise<T>;
  update(identifier: unknown, input: unknown): Promise<T>;
  delete(): Promise<void>;
}
