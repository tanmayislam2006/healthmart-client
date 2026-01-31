import { adminService } from "@/service/admin.service";
import { CategoriesTable } from "./categories-table";

export default async function CategoriesPage() {
  const { data } = await adminService.getCategory();
  return (
    <CategoriesTable
      data={data.data}
      onUpdate={adminService.updateCategory}
    />
  );
}
