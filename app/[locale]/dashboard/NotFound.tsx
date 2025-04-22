import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gray-100 px-6 text-center">
      <h1 className="text-5xl font-bold text-gray-800">404</h1>
      <p className="mt-4 text-xl font-semibold">Page Not Found</p>
      <p className="mt-2 text-gray-600">
        Sorry, we couldn’t find the page you’re looking for.
      </p>
    </main>
  );
}
