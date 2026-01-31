import Link from "next/link";

export default function NotFoundPage() {
  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="flex flex-col gap-6 items-center">
        <h1 className="text-xl font-bold text-center">Page Not Found</h1>
        <Link href="/" className="text-white bg-primary px-4 py-2 rounded-md w-max">Go Home</Link>
      </div>
    </div>
  );
}
