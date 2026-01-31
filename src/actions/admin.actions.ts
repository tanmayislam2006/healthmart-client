"use server";

import { adminService } from "@/service/admin.service";
import { revalidatePath } from "next/cache";

export async function getAllUsers() {
  return await adminService.getAllUser();
}

export async function updateUserStatus(userId: string, status: "ACTIVE" | "BANNED") {
  try {
    const result = await adminService.updateUserStatus(userId, status);
    revalidatePath("/admin-dashboard/users"); // This might need to be adjusted if the path is dynamic or parallel route
    return { success: true, data: result };
  } catch (error) {
    console.error("Failed to update user status:", error);
    return { success: false, error: "Failed to update user status" };
  }
}
