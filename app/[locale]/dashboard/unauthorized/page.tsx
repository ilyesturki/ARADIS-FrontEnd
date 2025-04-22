export default function UnauthorizedPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gray-50 px-6 text-center">
      <h1 className="text-5xl font-bold text-redAccent-900">403</h1>
      <p className="mt-4 text-xl font-semibold text-gray-800">Access Denied</p>
      <p className="mt-2 text-gray-600">
        You do not have permission to access this page.
      </p>
    </main>
  );
}
