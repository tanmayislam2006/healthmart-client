import { userService } from "@/service/user.service";

export default async function ProfilePage() {
  const { data: session, error } = await userService.getSessionUser();

  if (error || !session || !session.user) {
    return <div>Error loading profile</div>;
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">My Profile</h2>
      <div className="bg-white p-6 rounded-lg shadow border max-w-xl">
         <div className="space-y-4">
            <div>
               <p className="text-sm text-gray-500">Name</p>
               <p className="font-semibold text-lg">{session.user.name}</p>
            </div>
            <div>
               <p className="text-sm text-gray-500">Email</p>
               <p className="font-semibold text-lg">{session.user.email}</p>
            </div>
             <div>
               <p className="text-sm text-gray-500">Role</p>
               <p className="font-semibold text-lg">{session.user.role}</p>
            </div>
         </div>
      </div>
    </div>
  );
}
