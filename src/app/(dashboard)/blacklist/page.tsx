import {
  getBlacklistData,
  defaultBlacklistRequest,
} from "@/lib/services/blacklist";

export default async function BlackListPage() {
  try {
    // Fetch blacklist data using our API client
    const blacklistData = await getBlacklistData(defaultBlacklistRequest);

    return (
      <div className="container mx-auto p-6">
        <h1 className="text-3xl font-bold mb-6">Blacklist Management</h1>

        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Blacklist Data</h2>
          <div className="bg-gray-50 p-4 rounded">
            <pre className="text-sm overflow-auto">
              {JSON.stringify(blacklistData, null, 2)}
            </pre>
          </div>
        </div>
      </div>
    );
  } catch (error) {
    console.error("Error fetching blacklist data:", error);

    return (
      <div className="container mx-auto p-6">
        <h1 className="text-3xl font-bold mb-6">Blacklist Management</h1>

        <div className="bg-red-50 border border-red-200 rounded-lg p-6">
          <h2 className="text-xl font-semibold text-red-800 mb-2">
            Error Loading Data
          </h2>
          <p className="text-red-600">
            {error instanceof Error
              ? error.message
              : "An unexpected error occurred"}
          </p>
        </div>
      </div>
    );
  }
}
