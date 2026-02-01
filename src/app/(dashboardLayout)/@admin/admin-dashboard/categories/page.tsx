import { adminService } from "@/service/admin.service";

import { AddCategoryButton } from "@/components/modules/admin/add-category-button";
import { CategoriesTable } from "@/components/modules/admin/categories-table";

export const dynamic = "force-dynamic";

export default async function CategoriesPage() {
  const { data } = await adminService.getCategory();

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Categories</h1>

        <AddCategoryButton onCreate={adminService.createCategory} />
      </div>

      <CategoriesTable
        data={data.data}
        onUpdate={adminService.updateCategory}
      />
    </div>
  );
}
