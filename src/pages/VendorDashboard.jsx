import Layout from "../components/layout/Layout";
import { useGetVendorRfpsQuery } from "../features/rfps/rfpApi";
import { useGetVendorProposalsQuery } from "../features/proposals/proposalApi";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

export default function VendorDashboard() {
  const user = useSelector((state) => state.auth.user);
  const { data: rfps = [], isLoading: rfpsLoading } = useGetVendorRfpsQuery(undefined, {
    // Force refetch when user changes
    refetchOnMountOrArgChange: true,
    skip: !user,
  });
  const { data: proposals = [], isLoading: proposalsLoading } = useGetVendorProposalsQuery(undefined, {
    // Force refetch when user changes
    refetchOnMountOrArgChange: true,
    skip: !user,
  });

  // Calculate stats
  const receivedRfps = rfps.length;
  const submittedProposals = proposals.length;
  const awardedContracts = proposals.filter(p => p.status === 'Accepted').length;

  if (rfpsLoading || proposalsLoading) {
    return (
      <Layout>
        <div className="p-6">
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
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-900 to-pink-700 bg-clip-text text-transparent">
            Vendor Dashboard
          </h1>
          <p className="text-gray-600 mt-2">Manage your RFPs and track proposal status</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-4 rounded-xl border border-blue-200 hover:shadow-lg transition-shadow duration-300">
            <div className="flex items-center justify-between mb-2">
              <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
              <span className="text-blue-600 text-xs font-medium">New</span>
            </div>
            <h2 className="text-sm font-semibold text-gray-800 mb-1">Received RFPs</h2>
            <p className="text-2xl font-bold text-blue-600">{receivedRfps}</p>
            <p className="text-xs text-gray-600 mt-1">New proposals requested</p>
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
            <h2 className="text-sm font-semibold text-gray-800 mb-1">Submitted Proposals</h2>
            <p className="text-2xl font-bold text-green-600">{submittedProposals}</p>
            <p className="text-xs text-gray-600 mt-1">Awaiting response</p>
          </div>

          <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-4 rounded-xl border border-purple-200 hover:shadow-lg transition-shadow duration-300">
            <div className="flex items-center justify-between mb-2">
              <div className="w-8 h-8 bg-purple-500 rounded-lg flex items-center justify-center">
                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <span className="text-purple-600 text-xs font-medium">Success</span>
            </div>
            <h2 className="text-sm font-semibold text-gray-800 mb-1">Awarded Contracts</h2>
            <p className="text-2xl font-bold text-purple-600">{awardedContracts}</p>
            <p className="text-xs text-gray-600 mt-1">Successful bids</p>
          </div>
        </div>

        {/* Recent RFPs */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-gray-800">Recent RFPs</h2>
            <Link to="/rfps" className="text-purple-600 hover:text-purple-700 text-sm font-medium">View All</Link>
          </div>
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200">
            {rfps.length === 0 ? (
              <div className="p-8 text-center">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">No RFPs Received</h3>
                <p className="text-gray-600 mb-4">You'll receive RFPs when buyers invite you to bid</p>
                <Link to="/rfps" className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-2 rounded-xl font-medium hover:from-purple-700 hover:to-pink-700 transition-all duration-200 shadow-sm hover:shadow-md">
                  Browse All RFPs
                </Link>
              </div>
            ) : (
              <div className="divide-y divide-gray-100">
                {rfps.slice(0, 5).map((rfp) => (
                  <div key={rfp._id} className="p-4 hover:bg-gray-50 transition-colors">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-800">{rfp.title}</h3>
                        <div className="flex items-center space-x-4 mt-1 text-sm text-gray-600">
                          <span>Budget: ${rfp.structured?.budget?.toLocaleString() || 'N/A'}</span>
                          <span>•</span>
                          <span>Received: {new Date(rfp.createdAt).toLocaleDateString()}</span>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                          {rfp.status}
                        </span>
                        <Link to={`/rfps/${rfp._id}`} className="text-purple-600 hover:text-purple-700 text-sm font-medium">
                          View
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
}
