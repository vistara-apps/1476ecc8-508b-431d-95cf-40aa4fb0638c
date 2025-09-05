export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center space-y-4">
        <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto animate-pulse">
          <div className="w-8 h-8 border-2 border-white border-t-transparent rounded-full animate-spin" />
        </div>
        <div className="space-y-2">
          <div className="h-6 bg-white bg-opacity-20 rounded w-32 mx-auto animate-pulse" />
          <div className="h-4 bg-white bg-opacity-10 rounded w-48 mx-auto animate-pulse" />
        </div>
      </div>
    </div>
  );
}
