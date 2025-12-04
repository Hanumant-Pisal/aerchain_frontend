import Layout from "../components/layout/Layout";
import { useState } from "react";
import { useGetVendorProposalsQuery } from "../features/proposals/proposalApi";

export default function VendorProposals() {
  const { data: proposals = [], isLoading, error } = useGetVendorProposalsQuery();
  const [selectedProposal, setSelectedProposal] = useState(null);

  if (isLoading) {
    return (
      <Layout>
        <div className="p-4">
          <h1 className="text-2xl font-bold mb-4">My Proposals</h1>
          <div className="text-center py-8">Loading proposals...</div>
        </div>
      </Layout>
    );
  }

  if (error) {
    return (
      <Layout>
        <div className="p-4">
          <h1 className="text-2xl font-bold mb-4">My Proposals</h1>
          <div className="text-center py-8 text-red-600">
            Error loading proposals: {error.message}
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="p-4">
        <h1 className="text-2xl font-bold mb-6">My Proposals</h1>
        
        {proposals.length === 0 ? (
          <div className="bg-white rounded-lg shadow p-8 text-center">
            <p className="text-gray-500">No proposals submitted yet</p>
            <p className="text-sm text-gray-400 mt-2">Submit proposals to RFPs to see them here</p>
          </div>
        ) : (
          <div className="space-y-4">
            {proposals.map((proposal) => (
              <div key={proposal._id} className="bg-white rounded-lg shadow">
                <div className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">
                        {proposal.rfp?.title || "Unknown RFP"}
                      </h3>
                      <p className="text-sm text-gray-500 mt-1">
                        Submitted: {new Date(proposal.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="text-right">
                      <span className="inline-flex px-3 py-1 text-sm font-semibold rounded-full bg-green-100 text-green-800">
                        {proposal.status || "Submitted"}
                      </span>
                    </div>
                  </div>

                  {/* Proposal Summary */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                    <div className="bg-gray-50 p-3 rounded">
                      <p className="text-xs text-gray-500">Total Price</p>
                      <p className="text-sm font-medium">
                        ${proposal.parsed?.totalPrice?.toLocaleString() || 'N/A'}
                      </p>
                    </div>
                    <div className="bg-gray-50 p-3 rounded">
                      <p className="text-xs text-gray-500">Delivery</p>
                      <p className="text-sm font-medium">
                        {proposal.parsed?.deliveryDays || 'N/A'} days
                      </p>
                    </div>
                    <div className="bg-gray-50 p-3 rounded">
                      <p className="text-xs text-gray-500">Payment</p>
                      <p className="text-sm font-medium">
                        {proposal.parsed?.paymentTerms || 'N/A'}
                      </p>
                    </div>
                    <div className="bg-gray-50 p-3 rounded">
                      <p className="text-xs text-gray-500">Warranty</p>
                      <p className="text-sm font-medium">
                        {proposal.parsed?.warranty || 'N/A'}
                      </p>
                    </div>
                  </div>

                  {/* Line Items */}
                  {proposal.parsed?.lineItems && proposal.parsed.lineItems.length > 0 && (
                    <div className="mb-4">
                      <h4 className="text-sm font-medium text-gray-900 mb-2">Proposed Items:</h4>
                      <div className="space-y-2">
                        {proposal.parsed.lineItems.map((item, index) => (
                          <div key={index} className="flex justify-between items-center bg-gray-50 p-2 rounded">
                            <div className="flex-1">
                              <span className="text-sm text-gray-700">{item.name}</span>
                              <span className="text-xs text-gray-500 ml-2">({item.specs})</span>
                            </div>
                            <div className="text-right">
                              <span className="text-sm font-medium">{item.quantity}x</span>
                              <span className="text-xs text-gray-500 ml-2">
                                @${item.unitPrice}
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Additional Notes */}
                  {proposal.aiSummary && (
                    <div className="mb-4">
                      <h4 className="text-sm font-medium text-gray-900 mb-2">Additional Notes:</h4>
                      <p className="text-sm text-gray-700 bg-gray-50 p-3 rounded">
                        {proposal.aiSummary}
                      </p>
                    </div>
                  )}

                  {/* Score and Completeness */}
                  <div className="flex justify-between items-center mb-4">
                    <div className="flex space-x-4">
                      <div className="text-sm">
                        <span className="text-gray-500">Score: </span>
                        <span className="font-medium">{proposal.score || 0}/100</span>
                      </div>
                      <div className="text-sm">
                        <span className="text-gray-500">Completeness: </span>
                        <span className="font-medium">{proposal.completeness || 0}%</span>
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex justify-end space-x-2">
                    <button
                      onClick={() => setSelectedProposal(
                        selectedProposal === proposal._id ? null : proposal._id
                      )}
                      className="px-4 py-2 text-sm border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                    >
                      {selectedProposal === proposal._id ? "Hide Details" : "View Details"}
                    </button>
                    <button className="px-4 py-2 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700">
                      Edit Proposal
                    </button>
                  </div>

                  {/* Expanded Details */}
                  {selectedProposal === proposal._id && (
                    <div className="mt-4 pt-4 border-t border-gray-200">
                      <h4 className="text-sm font-medium text-gray-900 mb-3">Full Proposal Details:</h4>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <h5 className="text-xs font-medium text-gray-500 mb-2">Contact Information</h5>
                          <p className="text-sm text-gray-700">
                            Email: {proposal.vendorEmail}
                          </p>
                        </div>
                        <div>
                          <h5 className="text-xs font-medium text-gray-500 mb-2">Submission Details</h5>
                          <p className="text-sm text-gray-700">
                            Created: {new Date(proposal.createdAt).toLocaleString()}
                          </p>
                          <p className="text-sm text-gray-700">
                            Updated: {new Date(proposal.updatedAt).toLocaleString()}
                          </p>
                        </div>
                      </div>

                      {proposal.attachments && proposal.attachments.length > 0 && (
                        <div className="mt-4">
                          <h5 className="text-xs font-medium text-gray-500 mb-2">Attachments</h5>
                          <div className="space-y-1">
                            {proposal.attachments.map((attachment, index) => (
                              <div key={index} className="text-sm text-gray-700">
                                • {attachment}
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
}
