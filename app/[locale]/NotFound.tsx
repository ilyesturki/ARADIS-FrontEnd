export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gray-100 px-6 text-center">
      <h1 className="text-5xl font-bold text-gray-800">404</h1>
      <p className="mt-4 text-xl font-semibold">Page Not Found</p>
      <p className="mt-2 text-gray-600">
        Sorry, we couldn’t find the page you’re looking for.
      </p>
      <a
        href="/dashboard"
        className="mt-6 inline-block rounded-lg bg-gray-800 px-6 py-2 text-white hover:bg-gray-900 transition"
      >
        Go to Dashboard
      </a>
    </main>
  );
}
