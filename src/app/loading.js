import { LoaderCircle } from "lucide-react";

export default function Loading() {
  return (
    <div className="fixed inset-0 z-[999] flex items-center justify-center bg-white/80 backdrop-blur-sm">
      <div className="flex flex-col items-center gap-4">
        <LoaderCircle size={48} className="animate-spin text-primary" />
        <p className="text-sm font-semibold text-gray-500 animate-pulse">Loading...</p>
      </div>
    </div>
  );
}
