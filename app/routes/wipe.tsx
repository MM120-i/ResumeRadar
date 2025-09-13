import { useState } from "react";
import { useNavigate } from "react-router";
import { usePuterStore } from "~/lib/puter";

const WipeApp = () => {
  const { kv } = usePuterStore();
  const navigate = useNavigate();
  const [isWiping, setIsWiping] = useState(false);
  const [status, setStatus] = useState("");

  const handleWipe = async () => {
    setIsWiping(true);
    setStatus("");

    try {
      await kv.flush();
      setStatus("All data wiped successfully");
      setTimeout(() => {
        navigate("/");
      }, 1500);
    } catch (error) {
      setStatus("Failed to wipe data. Please try again.");
    }

    setIsWiping(false);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 bg-[url('/images/bg-main.svg')] bg-cover">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-md w-full text-center">
        <h1 className="text-2xl font-bold text-red-600 mb-4">Wipe All Data</h1>
        <p className="mb-6 text-gray-700">
          <strong>Warning:</strong> This will permanently delete all your
          resumes and feedback. This action cannot be undone.
        </p>

        <div className="flex justify-center gap-4 mt-6">
          <button
            className="bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-6 rounded transition disabled:opacity-50"
            onClick={handleWipe}
            disabled={isWiping}
          >
            {isWiping ? "Wiping..." : "Confirm Wipe"}
          </button>
          {status && <div className="mt-4 text-sm text-gray-800">{status}</div>}
          <button
            className="mt-6 text-blue-600 hover:underline"
            onClick={() => navigate("/")}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default WipeApp;
