import Link from "next/link";

export default function Medicine() {
  return (
    <div className="min-h-min flex justify-center items-center">
      <div className="">
        <p> Can not find Any Medicine </p>
        <Link href='/medicines' className="px-4 py-2 rounded bg-primary">Go Back</Link>
      </div>
    </div>
  );
}
