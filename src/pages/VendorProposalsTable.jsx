import Layout from "../components/layout/Layout";
import { useState } from "react";
import { useGetVendorProposalsQuery } from "../features/proposals/proposalApi";
import { useSelector } from "react-redux";
import React from "react";

export default function VendorProposals() {
  const user = useSelector((state) => state.auth.user);
  const { data: proposals = [], isLoading, error } = useGetVendorProposalsQuery(undefined, {
    refetchOnMountOrArgChange: true,
    skip: !user,
  });
  const [selectedProposal, setSelectedProposal] = useState(null);

  const handleRowClick = (proposal) => {
    setSelectedProposal(selectedProposal === proposal._id ? null : proposal._id);
  };

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
        {/* Header */}
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
            {/* Table Header */}
            <div className="p-4 border-b border-gray-100 bg-gradient-to-r from-gray-50 to-gray-100">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-800">Proposal List</h3>
                <span className="text-sm text-gray-600">{proposals.length} Proposal{proposals.length !== 1 ? 's' : ''}</span>
              </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      RFP Title
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Submitted Date
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Total Price
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Score
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {proposals.map((proposal) => (
                    <React.Fragment key={proposal._id}>
                      <tr 
                        className="hover:bg-gray-50 cursor-pointer transition-colors"
                        onClick={() => handleRowClick(proposal)}
                      >
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="w-8 h-8 bg-gradient-to-br from-green-600 to-emerald-600 rounded-lg flex items-center justify-center mr-3">
                              <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                              </svg>
                            </div>
                            <span className="text-sm font-medium text-gray-900">
                              {proposal.rfp?.title || "Unknown RFP"}
                            </span>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            proposal.status === "Accepted" 
                              ? "bg-green-100 text-green-800 border border-green-200"
                              : proposal.status === "Rejected"
                              ? "bg-red-100 text-red-800 border border-red-200"
                              : "bg-blue-100 text-blue-800 border border-blue-200"
                          }`}>
                            {proposal.status || "Submitted"}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                          {new Date(proposal.createdAt).toLocaleDateString('en-US', { 
                            month: 'short', 
                            day: 'numeric', 
                            year: 'numeric' 
                          })}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {proposal.parsed?.totalPrice ? (
                            <span className="font-medium">${proposal.parsed.totalPrice.toLocaleString()}</span>
                          ) : (
                            <span className="text-gray-400">N/A</span>
                          )}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                          {proposal.score ? (
                            <div className="flex items-center">
                              <svg className="w-4 h-4 text-yellow-500 mr-1" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"/>
                              </svg>
                              <span className="font-medium text-gray-900">{proposal.score}/100</span>
                            </div>
                          ) : (
                            <span className="text-gray-400">N/A</span>
                          )}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleRowClick(proposal);
                            }}
                            className="text-blue-600 hover:text-blue-900 font-medium"
                          >
                            {selectedProposal === proposal._id ? 'Hide Details' : 'View Details'}
                          </button>
                        </td>
                      </tr>
                      
                      {/* Inline Details Row */}
                      {selectedProposal === proposal._id && (
                        <tr>
                          <td colSpan="6" className="px-0 py-0 bg-gray-50">
                            <div className="p-6 border-l-4 border-green-500">
                              {/* Details Header */}
                              <div className="mb-4">
                                <h3 className="text-xl font-bold text-gray-900 mb-2">
                                  {proposal.rfp?.title || "Unknown RFP"}
                                </h3>
                                <div className="flex items-center space-x-4">
                                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                    proposal.status === "Accepted" 
                                      ? "bg-green-100 text-green-800 border border-green-200"
                                      : proposal.status === "Rejected"
                                      ? "bg-red-100 text-red-800 border border-red-200"
                                      : "bg-blue-100 text-blue-800 border border-blue-200"
                                  }`}>
                                    {proposal.status || "Submitted"}
                                  </span>
                                  <span className="text-sm text-gray-600">
                                    Submitted: {new Date(proposal.createdAt).toLocaleDateString('en-US', { 
                                      month: 'long', 
                                      day: 'numeric', 
                                      year: 'numeric' 
                                    })}
                                  </span>
                                </div>
                              </div>

                              {/* Key Metrics */}
                              <div className="mb-6">
                                <h4 className="text-lg font-semibold text-gray-900 mb-3">Proposal Details</h4>
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                                  <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-4 rounded-lg border border-blue-200">
                                    <div className="flex items-center mb-2">
                                      <svg className="w-5 h-5 text-blue-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                                      </svg>
                                      <span className="text-sm font-medium text-blue-800">Total Price</span>
                                    </div>
                                    <p className="text-xl font-bold text-blue-900">
                                      ${proposal.parsed?.totalPrice?.toLocaleString() || 'N/A'}
                                    </p>
                                  </div>
                                  
                                  <div className="bg-gradient-to-br from-green-50 to-green-100 p-4 rounded-lg border border-green-200">
                                    <div className="flex items-center mb-2">
                                      <svg className="w-5 h-5 text-green-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                      </svg>
                                      <span className="text-sm font-medium text-green-800">Delivery</span>
                                    </div>
                                    <p className="text-xl font-bold text-green-900">
                                      {proposal.parsed?.deliveryDays || 'N/A'} days
                                    </p>
                                  </div>
                                  
                                  <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-4 rounded-lg border border-purple-200">
                                    <div className="flex items-center mb-2">
                                      <svg className="w-5 h-5 text-purple-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                                      </svg>
                                      <span className="text-sm font-medium text-purple-800">Payment</span>
                                    </div>
                                    <p className="text-lg font-bold text-purple-900 truncate">
                                      {proposal.parsed?.paymentTerms || 'N/A'}
                                    </p>
                                  </div>
                                  
                                  <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 p-4 rounded-lg border border-yellow-200">
                                    <div className="flex items-center mb-2">
                                      <svg className="w-5 h-5 text-yellow-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                      </svg>
                                      <span className="text-sm font-medium text-yellow-800">Warranty</span>
                                    </div>
                                    <p className="text-lg font-bold text-yellow-900 truncate">
                                      {proposal.parsed?.warranty || 'N/A'}
                                    </p>
                                  </div>
                                </div>
                              </div>

                              {/* Score and Completeness */}
                              <div className="flex items-center space-x-4 mb-6">
                                <div className="bg-gray-50 px-4 py-3 rounded-lg border border-gray-200">
                                  <div className="flex items-center">
                                    <svg className="w-5 h-5 text-yellow-500 mr-2" fill="currentColor" viewBox="0 0 24 24">
                                      <path d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"/>
                                    </svg>
                                    <span className="text-sm font-medium text-gray-600">Score: </span>
                                    <span className="text-lg font-bold text-gray-800">{proposal.score || 0}/100</span>
                                  </div>
                                </div>
                                <div className="bg-gray-50 px-4 py-3 rounded-lg border border-gray-200">
                                  <span className="text-sm font-medium text-gray-600">Completeness: </span>
                                  <span className="text-lg font-bold text-gray-800">{proposal.completeness || 0}%</span>
                                </div>
                              </div>

                              {/* Line Items */}
                              {proposal.parsed?.lineItems && proposal.parsed.lineItems.length > 0 && (
                                <div className="mb-6">
                                  <h4 className="text-lg font-semibold text-gray-900 mb-3">Proposed Items</h4>
                                  <div className="bg-gray-50 rounded-lg p-4">
                                    <div className="space-y-3">
                                      {proposal.parsed.lineItems.map((item, index) => (
                                        <div key={index} className="flex justify-between items-center bg-white p-3 rounded-lg border border-gray-200">
                                          <div className="flex-1">
                                            <h5 className="font-medium text-gray-900">{item.name}</h5>
                                            <p className="text-sm text-gray-600 mt-1">{item.specs}</p>
                                          </div>
                                          <div className="ml-4 text-right">
                                            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800 border border-blue-200">
                                              {item.quantity}x @ ${item.unitPrice}
                                            </span>
                                          </div>
                                        </div>
                                      ))}
                                    </div>
                                  </div>
                                </div>
                              )}

                              {/* Additional Notes */}
                              {proposal.aiSummary && (
                                <div className="mb-6">
                                  <h4 className="text-lg font-semibold text-gray-900 mb-3">AI Summary</h4>
                                  <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                                    <p className="text-gray-700 leading-relaxed">{proposal.aiSummary}</p>
                                  </div>
                                </div>
                              )}

                              {/* Contact and Submission Details */}
                              <div className="mb-6">
                                <h4 className="text-lg font-semibold text-gray-900 mb-3">Submission Details</h4>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                  <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                                    <h5 className="text-sm font-medium text-gray-700 mb-2">Contact Information</h5>
                                    <p className="text-sm text-gray-600">
                                      <span className="font-medium">Email:</span> {proposal.vendorEmail}
                                    </p>
                                  </div>
                                  <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                                    <h5 className="text-sm font-medium text-gray-700 mb-2">Timestamps</h5>
                                    <p className="text-sm text-gray-600">
                                      <span className="font-medium">Created:</span> {new Date(proposal.createdAt).toLocaleString()}
                                    </p>
                                    <p className="text-sm text-gray-600">
                                      <span className="font-medium">Updated:</span> {new Date(proposal.updatedAt).toLocaleString()}
                                    </p>
                                  </div>
                                </div>
                              </div>

                              {/* Attachments */}
                              {proposal.attachments && proposal.attachments.length > 0 && (
                                <div className="mb-6">
                                  <h4 className="text-lg font-semibold text-gray-900 mb-3">Attachments</h4>
                                  <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                                    <div className="space-y-2">
                                      {proposal.attachments.map((attachment, index) => (
                                        <div key={index} className="flex items-center text-sm text-gray-700">
                                          <svg className="w-4 h-4 text-gray-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
                                          </svg>
                                          {attachment}
                                        </div>
                                      ))}
                                    </div>
                                  </div>
                                </div>
                              )}

                              {/* Action Button */}
                              <div className="flex justify-end">
                                <button className="px-6 py-2 text-gray-700 bg-gray-200 hover:bg-gray-300 rounded-lg transition-colors font-medium">
                                  Edit Proposal
                                </button>
                              </div>
                            </div>
                          </td>
                        </tr>
                      )}
                    </React.Fragment>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
}
