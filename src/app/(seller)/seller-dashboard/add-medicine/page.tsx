import AddMedicineForm from "./form";

export default function AddMedicinePage() {
  return (
    <div className="max-w-xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">Add New Medicine</h2>
      <div className="bg-white p-6 rounded-lg shadow border">
         <AddMedicineForm />
      </div>
    </div>
  );
}
