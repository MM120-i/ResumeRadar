import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { usePuterStore } from "~/lib/puter";

const WipeApp = () => {
  const { auth, isLoading, error, fs, kv } = usePuterStore();
  const navigate = useNavigate();
  const [isWiping, setIsWiping] = useState(false);
  const [status, setStatus] = useState("");
  const [files, setFiles] = useState<FSItem[]>([]);

  const loadFiles = async () => {
    const files = (await fs.readDir("./")) as FSItem[];
    setFiles(files);
  };

  useEffect(() => {
    loadFiles();
  }, []);

  useEffect(() => {
    if (!isLoading && !auth.isAuthenticated) {
      navigate("/auth?next=/wipe");
    }
  }, [isLoading]);

  const handleDelete = async () => {
    setIsWiping(true);
    setStatus("");

    try {
      files.forEach(async (file) => {
        await fs.delete(file.path);
      });

      await kv.flush();
      setStatus("All data wiped successfully");
      loadFiles();

      setTimeout(() => {
        navigate("/");
      }, 1500);
    } catch (error) {
      setStatus("Failed to wipe data. Please try again.");
    }
  };

  if (isLoading) {
    return <div>Loading ...</div>;
  } else if (error) {
    return <div>Error {error}</div>;
  }

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
            onClick={handleDelete}
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
