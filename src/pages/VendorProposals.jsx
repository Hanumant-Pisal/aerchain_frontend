import Layout from "../components/layout/Layout";
import { useState } from "react";
import { useGetVendorProposalsQuery } from "../features/proposals/proposalApi";
import { useSelector } from "react-redux";

export default function VendorProposals() {
  const user = useSelector((state) => state.auth.user);
  const { data: proposals = [], isLoading, error } = useGetVendorProposalsQuery(undefined, {
    // Force refetch when user changes
    refetchOnMountOrArgChange: true,
    skip: !user,
  });
  const [selectedProposal, setSelectedProposal] = useState(null);

  if (isLoading) {
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

  if (error) {
    return (
      <Layout>
        <div className="p-6">
          <div className="bg-red-50 border border-red-200 rounded-2xl p-8 text-center">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-red-800 mb-2">Error Loading Proposals</h3>
            <p className="text-red-600">{error.message}</p>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="p-6">
        {/* Modern Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-900 to-pink-700 bg-clip-text text-transparent">
            My Proposals
          </h1>
          <p className="text-gray-600 mt-2">Track and manage your submitted proposals</p>
        </div>
        
        {proposals.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 text-center">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">No Proposals Submitted Yet</h3>
            <p className="text-gray-600">Submit proposals to RFPs to see them here</p>
          </div>
        ) : (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
            {/* List Header */}
            <div className="p-4 border-b border-gray-100 bg-gradient-to-r from-gray-50 to-gray-100">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-800">Proposal List</h3>
                <span className="text-sm text-gray-600">{proposals.length} Proposal{proposals.length !== 1 ? 's' : ''}</span>
              </div>
            </div>

            {/* Proposal List */}
            <div className="divide-y divide-gray-100">
              {proposals.map((proposal) => (
                <div key={proposal._id} className="hover:bg-gray-50 transition-colors">
                  {/* List Item - Always Visible */}
                  <div 
                    className="p-4 cursor-pointer"
                    onClick={() => setSelectedProposal(selectedProposal === proposal._id ? null : proposal._id)}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center flex-1 min-w-0">
                        {/* Proposal Icon */}
                        <div className="w-10 h-10 bg-gradient-to-br from-green-600 to-emerald-600 rounded-lg flex items-center justify-center mr-3 flex-shrink-0">
                          <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                        </div>
                        
                        {/* Proposal Info */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center mb-1">
                            <h4 className="text-base font-semibold text-gray-800 truncate">
                              {proposal.rfp?.title || "Unknown RFP"}
                            </h4>
                            <span className={`ml-2 inline-flex items-center px-2 py-1 text-xs font-semibold rounded-full ${
                              proposal.status === "Accepted" 
                                ? "bg-green-100 text-green-800 border border-green-200"
                                : proposal.status === "Rejected"
                                ? "bg-red-100 text-red-800 border border-red-200"
                                : "bg-blue-100 text-blue-800 border border-blue-200"
                            }`}>
                              {proposal.status || "Submitted"}
                            </span>
                          </div>
                          <div className="flex items-center text-sm text-gray-600">
                            <svg className="w-3 h-3 mr-1 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            Submitted: {new Date(proposal.createdAt).toLocaleDateString()}
                            {proposal.parsed?.totalPrice && (
                              <>
                                <span className="mx-2">•</span>
                                <svg className="w-3 h-3 mr-1 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                                </svg>
                                ${proposal.parsed.totalPrice.toLocaleString()}
                              </>
                            )}
                            {proposal.score && (
                              <>
                                <span className="mx-2">•</span>
                                <svg className="w-3 h-3 mr-1 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                                </svg>
                                Score: {proposal.score}/100
                              </>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Expand/Collapse Icon */}
                      <div className="ml-3 flex-shrink-0">
                        <svg 
                          className={`w-5 h-5 text-gray-400 transition-transform duration-200 ${
                            selectedProposal === proposal._id ? 'rotate-180' : ''
                          }`} 
                          fill="none" 
                          stroke="currentColor" 
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </div>
                    </div>
                  </div>

                  {/* Expanded Details */}
                  {selectedProposal === proposal._id && (
                    <div className="px-4 pb-4 border-t border-gray-100">
                      <div className="pt-4">
                        {/* Key Metrics */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
                          <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-3 rounded-lg border border-blue-200">
                            <p className="text-xs text-blue-600 font-medium">Total Price</p>
                            <p className="text-sm font-bold text-blue-800">
                              ${proposal.parsed?.totalPrice?.toLocaleString() || 'N/A'}
                            </p>
                          </div>
                          <div className="bg-gradient-to-br from-green-50 to-green-100 p-3 rounded-lg border border-green-200">
                            <p className="text-xs text-green-600 font-medium">Delivery</p>
                            <p className="text-sm font-bold text-green-800">
                              {proposal.parsed?.deliveryDays || 'N/A'} days
                            </p>
                          </div>
                          <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-3 rounded-lg border border-purple-200">
                            <p className="text-xs text-purple-600 font-medium">Payment</p>
                            <p className="text-sm font-bold text-purple-800">
                              {proposal.parsed?.paymentTerms || 'N/A'}
                            </p>
                          </div>
                          <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 p-3 rounded-lg border border-yellow-200">
                            <p className="text-xs text-yellow-600 font-medium">Warranty</p>
                            <p className="text-sm font-bold text-yellow-800">
                              {proposal.parsed?.warranty || 'N/A'}
                            </p>
                          </div>
                        </div>

                        {/* Score and Completeness */}
                        <div className="flex items-center space-x-4 mb-4">
                          <div className="bg-gray-50 px-3 py-2 rounded-lg">
                            <span className="text-xs text-gray-600">Score: </span>
                            <span className="text-sm font-bold text-gray-800">{proposal.score || 0}/100</span>
                          </div>
                          <div className="bg-gray-50 px-3 py-2 rounded-lg">
                            <span className="text-xs text-gray-600">Completeness: </span>
                            <span className="text-sm font-bold text-gray-800">{proposal.completeness || 0}%</span>
                          </div>
                        </div>

                        {/* Line Items */}
                        {proposal.parsed?.lineItems && proposal.parsed.lineItems.length > 0 && (
                          <div className="mb-4">
                            <h5 className="text-sm font-semibold text-gray-700 mb-2">Proposed Items</h5>
                            <div className="space-y-2">
                              {proposal.parsed.lineItems.map((item, index) => (
                                <div key={index} className="flex justify-between items-center bg-gray-50 p-2 rounded">
                                  <div className="flex-1">
                                    <span className="text-sm text-gray-700">{item.name}</span>
                                    <span className="text-xs text-gray-500 ml-2">({item.specs})</span>
                                  </div>
                                  <div className="text-right">
                                    <span className="text-sm font-medium text-gray-900">{item.quantity}x</span>
                                    <span className="text-xs text-gray-500 ml-2">@${item.unitPrice}</span>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Additional Notes */}
                        {proposal.aiSummary && (
                          <div className="mb-4">
                            <h5 className="text-sm font-semibold text-gray-700 mb-2">Additional Notes</h5>
                            <div className="bg-gray-50 rounded-lg p-3 border border-gray-200">
                              <p className="text-sm text-gray-700">{proposal.aiSummary}</p>
                            </div>
                          </div>
                        )}

                        {/* Contact and Submission Details */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                          <div>
                            <h5 className="text-sm font-semibold text-gray-700 mb-2">Contact Information</h5>
                            <div className="bg-gray-50 rounded-lg p-3 border border-gray-200">
                              <p className="text-sm text-gray-700">
                                <span className="font-medium">Email:</span> {proposal.vendorEmail}
                              </p>
                            </div>
                          </div>
                          <div>
                            <h5 className="text-sm font-semibold text-gray-700 mb-2">Submission Details</h5>
                            <div className="bg-gray-50 rounded-lg p-3 border border-gray-200">
                              <p className="text-sm text-gray-700">
                                <span className="font-medium">Created:</span> {new Date(proposal.createdAt).toLocaleString()}
                              </p>
                              <p className="text-sm text-gray-700">
                                <span className="font-medium">Updated:</span> {new Date(proposal.updatedAt).toLocaleString()}
                              </p>
                            </div>
                          </div>
                        </div>

                        {/* Attachments */}
                        {proposal.attachments && proposal.attachments.length > 0 && (
                          <div className="mb-4">
                            <h5 className="text-sm font-semibold text-gray-700 mb-2">Attachments</h5>
                            <div className="bg-gray-50 rounded-lg p-3 border border-gray-200">
                              <div className="space-y-1">
                                {proposal.attachments.map((attachment, index) => (
                                  <div key={index} className="text-sm text-gray-700">
                                    • {attachment}
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>
                        )}

                        {/* Action Buttons */}
                        <div className="flex justify-end space-x-2">
                          <button className="px-4 py-2 text-sm border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors font-medium">
                            Edit Proposal
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
}
