import Layout from "../components/layout/Layout";

export default function AdminDashboard() {
  return (
    <Layout>
      <div className="p-4">
        <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-lg font-semibold mb-2">Total Users</h2>
            <p className="text-3xl font-bold text-blue-600">0</p>
            <p className="text-sm text-gray-600 mt-1">All registered users</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-lg font-semibold mb-2">Active RFPs</h2>
            <p className="text-3xl font-bold text-green-600">0</p>
            <p className="text-sm text-gray-600 mt-1">Open for bidding</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-lg font-semibold mb-2">Total Vendors</h2>
            <p className="text-3xl font-bold text-purple-600">0</p>
            <p className="text-sm text-gray-600 mt-1">Registered vendors</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-lg font-semibold mb-2">Completed RFPs</h2>
            <p className="text-3xl font-bold text-orange-600">0</p>
            <p className="text-sm text-gray-600 mt-1">Successfully awarded</p>
          </div>
        </div>

        <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            <h2 className="text-xl font-semibold mb-4">Recent Activities</h2>
            <div className="bg-white rounded-lg shadow p-6">
              <div className="text-center text-gray-500">
                <p>No recent activities</p>
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-4">System Overview</h2>
            <div className="bg-white rounded-lg shadow p-6">
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Database Status</span>
                  <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-sm">Connected</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Email Service</span>
                  <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-sm">Active</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">AI Processing</span>
                  <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-sm">Available</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">IMAP Monitor</span>
                  <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded text-sm">Checking</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-4">Admin Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white p-6 rounded-lg shadow border-2 border-dashed border-gray-300">
              <h3 className="font-semibold mb-2">User Management</h3>
              <p className="text-sm text-gray-600 mb-4">Manage user accounts and permissions</p>
              <button className="bg-blue-600 text-white px-4 py-2 rounded text-sm">Manage Users</button>
            </div>
            <div className="bg-white p-6 rounded-lg shadow border-2 border-dashed border-gray-300">
              <h3 className="font-semibold mb-2">Vendor Approval</h3>
              <p className="text-sm text-gray-600 mb-4">Review and approve vendor registrations</p>
              <button className="bg-green-600 text-white px-4 py-2 rounded text-sm">Review Vendors</button>
            </div>
            <div className="bg-white p-6 rounded-lg shadow border-2 border-dashed border-gray-300">
              <h3 className="font-semibold mb-2">System Settings</h3>
              <p className="text-sm text-gray-600 mb-4">Configure system parameters</p>
              <button className="bg-purple-600 text-white px-4 py-2 rounded text-sm">Settings</button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
