import Layout from "../components/layout/Layout";
import { useGetBuyersQuery, useGetSystemHealthQuery } from "../features/auth/authApi";
import { useGetVendorsQuery } from "../features/vendors/vendorApi";
import { useGetRfpsQuery } from "../features/rfps/rfpApi";
import { useGetBuyerProposalsQuery } from "../features/proposals/proposalApi";
import { Link } from "react-router-dom";

export default function AdminDashboard() {
  const { data: buyers = [], isLoading: buyersLoading } = useGetBuyersQuery();
  const { data: vendors = [], isLoading: vendorsLoading } = useGetVendorsQuery();
  const { data: rfps = [], isLoading: rfpsLoading } = useGetRfpsQuery();
  const { data: proposals = [], isLoading: proposalsLoading } = useGetBuyerProposalsQuery();
  const { data: systemHealth, isLoading: healthLoading } = useGetSystemHealthQuery();

  // Calculate statistics
  const totalUsers = buyers.length;
  const activeRfps = rfps.filter(rfp => rfp.status === "Sent").length;
  const totalVendors = vendors.length;
  const completedRfps = rfps.filter(rfp => rfp.status === "Awarded" || rfp.status === "Closed").length;

  // Get system status with fallbacks
  const getSystemStatus = () => {
    if (healthLoading || !systemHealth) {
      return {
        database: { status: 'Loading', color: 'gray' },
        email: { status: 'Loading', color: 'gray' },
        ai: { status: 'Loading', color: 'gray' },
        imap: { status: 'Loading', color: 'gray' }
      };
    }

    return {
      database: {
        status: systemHealth.database || 'Unknown',
        color: systemHealth.database === 'Connected' ? 'green' : 'red'
      },
      email: {
        status: systemHealth.email || 'Unknown',
        color: systemHealth.email === 'Active' ? 'green' : systemHealth.email === 'Error' ? 'red' : 'yellow'
      },
      ai: {
        status: systemHealth.ai || 'Unknown',
        color: systemHealth.ai === 'Available' ? 'green' : systemHealth.ai === 'Unavailable' ? 'red' : 'yellow'
      },
      imap: {
        status: systemHealth.imap || 'Unknown',
        color: systemHealth.imap === 'Active' ? 'green' : systemHealth.imap === 'Error' ? 'red' : 'yellow'
      }
    };
  };

  const systemStatus = getSystemStatus();

  if (buyersLoading || vendorsLoading || rfpsLoading || proposalsLoading) {
    return (
      <Layout>
        <div className="p-4">
          <div className="flex items-center justify-center py-16">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600"></div>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="p-6">
        <div className="mb-8">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-900 to-pink-700 bg-clip-text text-transparent">
            Admin Dashboard
          </h1>
          <p className="text-gray-600 mt-2">System overview and management</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-4 rounded-xl border border-blue-200 hover:shadow-lg transition-shadow duration-300">
            <div className="flex items-center justify-between mb-2">
              <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </div>
              <span className="text-blue-600 text-xs font-medium">Total</span>
            </div>
            <h2 className="text-sm font-semibold text-gray-800 mb-1">Total Users</h2>
            <p className="text-2xl font-bold text-blue-600">{totalUsers}</p>
            <p className="text-xs text-gray-600 mt-1">All registered users</p>
          </div>

          <div className="bg-gradient-to-br from-green-50 to-green-100 p-4 rounded-xl border border-green-200 hover:shadow-lg transition-shadow duration-300">
            <div className="flex items-center justify-between mb-2">
              <div className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center">
                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <span className="text-green-600 text-xs font-medium">Active</span>
            </div>
            <h2 className="text-sm font-semibold text-gray-800 mb-1">Active RFPs</h2>
            <p className="text-2xl font-bold text-green-600">{activeRfps}</p>
            <p className="text-xs text-gray-600 mt-1">Open for bidding</p>
          </div>

          <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-4 rounded-xl border border-purple-200 hover:shadow-lg transition-shadow duration-300">
            <div className="flex items-center justify-between mb-2">
              <div className="w-8 h-8 bg-purple-500 rounded-lg flex items-center justify-center">
                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              <span className="text-purple-600 text-xs font-medium">Total</span>
            </div>
            <h2 className="text-sm font-semibold text-gray-800 mb-1">Total Vendors</h2>
            <p className="text-2xl font-bold text-purple-600">{totalVendors}</p>
            <p className="text-xs text-gray-600 mt-1">Registered vendors</p>
          </div>

          <div className="bg-gradient-to-br from-orange-50 to-orange-100 p-4 rounded-xl border border-orange-200 hover:shadow-lg transition-shadow duration-300">
            <div className="flex items-center justify-between mb-2">
              <div className="w-8 h-8 bg-orange-500 rounded-lg flex items-center justify-center">
                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <span className="text-orange-600 text-xs font-medium">Completed</span>
            </div>
            <h2 className="text-sm font-semibold text-gray-800 mb-1">Completed RFPs</h2>
            <p className="text-2xl font-bold text-orange-600">{completedRfps}</p>
            <p className="text-xs text-gray-600 mt-1">Successfully awarded</p>
          </div>
        </div>

        <div className="mt-8">
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-900">System Overview</h2>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-sm text-gray-500">Live Monitoring</span>
              </div>
            </div>
            <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  <div className="group">
                    <div className="flex flex-col items-center text-center p-4 bg-white rounded-xl border border-gray-200 hover:border-blue-300 transition-all duration-300 hover:shadow-md">
                      <div className={`w-12 h-12 bg-${systemStatus.database.color}-100 rounded-xl flex items-center justify-center transition-colors duration-300 mb-3`}>
                        <svg className={`w-6 h-6 text-${systemStatus.database.color}-600`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4" />
                        </svg>
                      </div>
                      <div className="mb-3">
                        <p className="text-sm font-medium text-gray-900">Database</p>
                        <p className="text-xs text-gray-500">MongoDB Connection</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className={`w-2 h-2 bg-${systemStatus.database.color}-500 rounded-full animate-pulse`}></div>
                        <span className={`text-sm font-medium text-${systemStatus.database.color}-700`}>
                          {systemStatus.database.status}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="group">
                    <div className="flex flex-col items-center text-center p-4 bg-white rounded-xl border border-gray-200 hover:border-blue-300 transition-all duration-300 hover:shadow-md">
                      <div className={`w-12 h-12 bg-${systemStatus.email.color}-100 rounded-xl flex items-center justify-center transition-colors duration-300 mb-3`}>
                        <svg className={`w-6 h-6 text-${systemStatus.email.color}-600`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                      </div>
                      <div className="mb-3">
                        <p className="text-sm font-medium text-gray-900">Email Service</p>
                        <p className="text-xs text-gray-500">SMTP Gateway</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className={`w-2 h-2 bg-${systemStatus.email.color}-500 rounded-full animate-pulse`}></div>
                        <span className={`text-sm font-medium text-${systemStatus.email.color}-700`}>
                          {systemStatus.email.status}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="group">
                    <div className="flex flex-col items-center text-center p-4 bg-white rounded-xl border border-gray-200 hover:border-blue-300 transition-all duration-300 hover:shadow-md">
                      <div className={`w-12 h-12 bg-${systemStatus.ai.color}-100 rounded-xl flex items-center justify-center transition-colors duration-300 mb-3`}>
                        <svg className={`w-6 h-6 text-${systemStatus.ai.color}-600`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                      </div>
                      <div className="mb-3">
                        <p className="text-sm font-medium text-gray-900">AI Processing</p>
                        <p className="text-xs text-gray-500">OpenAI Service</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className={`w-2 h-2 bg-${systemStatus.ai.color}-500 rounded-full animate-pulse`}></div>
                        <span className={`text-sm font-medium text-${systemStatus.ai.color}-700`}>
                          {systemStatus.ai.status}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="group">
                    <div className="flex flex-col items-center text-center p-4 bg-white rounded-xl border border-gray-200 hover:border-blue-300 transition-all duration-300 hover:shadow-md">
                      <div className={`w-12 h-12 bg-${systemStatus.imap.color}-100 rounded-xl flex items-center justify-center transition-colors duration-300 mb-3`}>
                        <svg className={`w-6 h-6 text-${systemStatus.imap.color}-600`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                      </div>
                      <div className="mb-3">
                        <p className="text-sm font-medium text-gray-900">IMAP Monitor</p>
                        <p className="text-xs text-gray-500">Email Parser</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className={`w-2 h-2 bg-${systemStatus.imap.color}-500 rounded-full animate-pulse`}></div>
                        <span className={`text-sm font-medium text-${systemStatus.imap.color}-700`}>
                          {systemStatus.imap.status}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {systemHealth?.timestamp && (
                <div className="bg-gradient-to-r from-blue-50 to-purple-50 px-6 py-3 border-t border-gray-200">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span className="text-sm font-medium text-gray-700">Last Health Check</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <span className="text-sm text-gray-600">
                        {new Date(systemHealth.timestamp).toLocaleString()}
                      </span>
                      <button 
                        onClick={() => window.location.reload()}
                        className="px-3 py-1 text-xs font-medium text-blue-600 hover:text-blue-700 hover:bg-blue-100 rounded-lg transition-colors duration-200"
                      >
                        Refresh
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-4">Admin Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-300">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </div>
              <h3 className="font-semibold mb-2">User Management</h3>
              <p className="text-sm text-gray-600 mb-4">Manage user accounts and permissions</p>
              <Link 
                to="/buyers"
                className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors text-center inline-block"
              >
                Manage Users
              </Link>
            </div>
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-300">
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              <h3 className="font-semibold mb-2">Vendor Management</h3>
              <p className="text-sm text-gray-600 mb-4">Review and manage vendor registrations</p>
              <Link 
                to="/vendors"
                className="w-full bg-green-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-green-700 transition-colors text-center inline-block"
              >
                Manage Vendors
              </Link>
            </div>
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-300">
              <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <h3 className="font-semibold mb-2">RFP Management</h3>
              <p className="text-sm text-gray-600 mb-4">Create and manage RFPs</p>
              <Link 
                to="/rfps"
                className="w-full bg-purple-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-purple-700 transition-colors text-center inline-block"
              >
                Manage RFPs
              </Link>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
