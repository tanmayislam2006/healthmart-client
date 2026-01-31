export enum CategoryStatus {
  ACTIVE = "ACTIVE",
  DISABLED = "DISABLED",
}
export type Category = {
  id: string;
  name: string;
  description?: string | null;
  status: CategoryStatus;
};
