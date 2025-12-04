import Layout from "../components/layout/Layout";

export default function BuyerDashboard() {
  return (
    <Layout>
      <div className="p-4">
        <h1 className="text-2xl font-bold mb-4">Buyer Dashboard</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-lg font-semibold mb-2">My RFPs</h2>
            <p className="text-3xl font-bold text-blue-600">0</p>
            <p className="text-sm text-gray-600 mt-1">Active procurement requests</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-lg font-semibold mb-2">Pending Proposals</h2>
            <p className="text-3xl font-bold text-green-600">0</p>
            <p className="text-sm text-gray-600 mt-1">Awaiting review</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-lg font-semibold mb-2">Active Vendors</h2>
            <p className="text-3xl font-bold text-purple-600">0</p>
            <p className="text-sm text-gray-600 mt-1">Available for bidding</p>
          </div>
        </div>

        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-4">Recent RFPs</h2>
          <div className="bg-white rounded-lg shadow">
            <div className="p-6 text-center text-gray-500">
              <p>No RFPs created yet</p>
              <p className="text-sm mt-2">Create your first RFP to start the procurement process</p>
            </div>
          </div>
        </div>

        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-white p-6 rounded-lg shadow border-2 border-dashed border-gray-300">
              <h3 className="font-semibold mb-2">Create New RFP</h3>
              <p className="text-sm text-gray-600 mb-4">Start a new procurement request</p>
              <button className="bg-green-600 text-white px-4 py-2 rounded text-sm">Create RFP</button>
            </div>
            <div className="bg-white p-6 rounded-lg shadow border-2 border-dashed border-gray-300">
              <h3 className="font-semibold mb-2">Manage Vendors</h3>
              <p className="text-sm text-gray-600 mb-4">Add and manage vendor contacts</p>
              <button className="bg-blue-600 text-white px-4 py-2 rounded text-sm">Manage Vendors</button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
