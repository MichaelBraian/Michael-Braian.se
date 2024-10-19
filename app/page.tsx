export default function Home() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">Welcome to AI Chat Dashboard</h1>
        <p className="mb-4">If you can see this message, the app is working correctly.</p>
        <a href="/login" className="text-blue-500 hover:underline">Go to Login</a>
      </div>
    </div>
  );
}