import Layout from "../components/layout/Layout";
import { useState, useMemo, useCallback } from "react";
import { useGetBuyerProposalsQuery } from "../features/proposals/proposalApi";
import { Link } from "react-router-dom";
import React from "react";

export default function BuyerProposals() {
  const { data: proposals = [], isLoading, error } = useGetBuyerProposalsQuery();
  const [selectedProposal, setSelectedProposal] = useState(null);

  const proposalsByRfp = useMemo(() => {
    return proposals.reduce((acc, proposal) => {
      const rfpId = proposal.rfp?._id;
      if (!acc[rfpId]) {
        acc[rfpId] = {
          rfp: proposal.rfp,
          proposals: []
        };
      }
      acc[rfpId].proposals.push(proposal);
      return acc;
    }, {});
  }, [proposals]);

  const handleSelectProposal = useCallback((proposal) => {
    setSelectedProposal(proposal);
  }, []);

  const handleCloseModal = useCallback(() => {
    setSelectedProposal(null);
  }, []);

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
        <div className="mb-8">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-900 to-pink-700 bg-clip-text text-transparent">
            Received Proposals
          </h1>
          <p className="text-gray-600 mt-2">Review and manage proposals submitted by vendors</p>
        </div>

        {Object.keys(proposalsByRfp).length === 0 ? (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 text-center">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">No Proposals Received</h3>
            <p className="text-gray-600 mb-4">Proposals from vendors will appear here once submitted</p>
            <button className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-2 rounded-xl font-medium hover:from-purple-700 hover:to-pink-700 transition-all duration-200">
              Send RFP
            </button>
          </div>
        ) : (
          <div className="space-y-8">
            {Object.values(proposalsByRfp).map(({ rfp, proposals: rfpProposals }) => (
              <div key={rfp._id} className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
                <div className="p-6 border-b border-gray-100 bg-gradient-to-r from-gray-50 to-gray-100">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <div className="flex items-center mb-2">
                        <div className="w-8 h-8 bg-gradient-to-br from-purple-600 to-pink-600 rounded-lg flex items-center justify-center mr-3">
                          <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                          </svg>
                        </div>
                        <h3 className="text-xl font-bold text-gray-800">{rfp.title}</h3>
                      </div>
                      <div className="flex items-center text-sm text-gray-600 ml-11">
                        <svg className="w-4 h-4 mr-1 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        Created: {new Date(rfp.createdAt).toLocaleDateString()}
                        {rfp.structured?.budget && (
                          <>
                            <span className="mx-2">•</span>
                            <svg className="w-4 h-4 mr-1 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                            </svg>
                            Budget: ${rfp.structured.budget.toLocaleString()}
                          </>
                        )}
                      </div>
                    </div>
                    <div className="ml-4">
                      <span className="inline-flex items-center px-4 py-2 text-sm font-semibold rounded-full bg-blue-100 text-blue-800 border border-blue-200">
                        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                        </svg>
                        {rfpProposals.length} Proposal{rfpProposals.length !== 1 ? 's' : ''}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="p-6">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    {rfpProposals.map((proposal) => (
                      <div key={proposal._id} className="border border-gray-200 rounded-xl p-4 hover:border-purple-300 transition-all duration-200">
                        <div className="flex justify-between items-start mb-3">
                          <div className="flex-1">
                            <div className="flex items-center mb-1">
                              <div className="w-6 h-6 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center mr-2">
                                <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                                </svg>
                              </div>
                              <div>
                                <h4 className="text-sm font-semibold text-gray-800">
                                  {proposal.vendor?.name || 'Unknown Vendor'}
                                </h4>
                                <p className="text-xs text-gray-600">{proposal.vendorEmail}</p>
                              </div>
                            </div>
                          </div>
                          <div className="text-right ml-3">
                            <div className="inline-flex items-center px-3 py-1 text-sm font-bold rounded-full bg-green-100 text-green-800 border border-green-200">
                              ${proposal.parsed?.totalPrice?.toLocaleString() || 'N/A'}
                            </div>
                          </div>
                        </div>

                        {/* Compact Summary */}
                        <div className="grid grid-cols-3 gap-2 mb-3">
                          <div className="bg-blue-50 p-2 rounded-lg border border-blue-100">
                            <p className="text-xs text-blue-600 font-medium">Price</p>
                            <p className="text-xs font-bold text-blue-800">
                              ${proposal.parsed?.totalPrice?.toLocaleString() || 'N/A'}
                            </p>
                          </div>
                          <div className="bg-green-50 p-2 rounded-lg border border-green-100">
                            <p className="text-xs text-green-600 font-medium">Delivery</p>
                            <p className="text-xs font-bold text-green-800">
                              {proposal.parsed?.deliveryDays || 'N/A'}d
                            </p>
                          </div>
                          <div className="bg-purple-50 p-2 rounded-lg border border-purple-100">
                            <p className="text-xs text-purple-600 font-medium">Score</p>
                            <p className="text-xs font-bold text-purple-800">
                              {proposal.score || 0}/100
                            </p>
                          </div>
                        </div>

                        {/* Line Items - Compact */}
                        {proposal.parsed?.lineItems && proposal.parsed.lineItems.length > 0 && (
                          <div className="mb-3">
                            <div className="space-y-1">
                              {proposal.parsed.lineItems.slice(0, 2).map((item, index) => (
                                <div key={index} className="flex justify-between items-center bg-gray-50 p-2 rounded text-xs">
                                  <span className="font-medium text-gray-700 truncate">{item.name}</span>
                                  <div className="text-right flex-shrink-0">
                                    <span className="font-bold text-gray-900">{item.quantity}x</span>
                                    <span className="text-gray-500 ml-1">
                                      @${item.unitPrice}
                                    </span>
                                  </div>
                                </div>
                              ))}
                              {proposal.parsed.lineItems.length > 2 && (
                                <p className="text-xs text-gray-500 text-center">+{proposal.parsed.lineItems.length - 2} more items</p>
                              )}
                            </div>
                          </div>
                        )}

                        {/* Notes - Compact */}
                        {proposal.aiSummary && (
                          <div className="mb-3">
                            <p className="text-xs text-gray-700 bg-blue-50 p-2 rounded-lg border border-blue-100 line-clamp-2">
                              {proposal.aiSummary}
                            </p>
                          </div>
                        )}

                        {/* Compact Actions */}
                        <div className="flex justify-between items-center">
                          <div className="flex items-center text-xs text-gray-500">
                            <svg className="w-3 h-3 mr-1 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            {new Date(proposal.createdAt).toLocaleDateString()}
                          </div>
                          <div className="flex space-x-2">
                            <button
                              onClick={() => setSelectedProposal(
                                selectedProposal === proposal._id ? null : proposal._id
                              )}
                              className="px-3 py-1 text-xs border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors font-medium"
                            >
                              {selectedProposal === proposal._id ? "Hide" : "Details"}
                            </button>
                           
                          </div>
                        </div>

                        {/* Expanded Details - More Compact */}
                        {selectedProposal === proposal._id && (
                          <div className="mt-3 pt-3 border-t border-gray-200">
                            <div className="grid grid-cols-2 gap-4 text-xs">
                              <div>
                                <p className="font-semibold text-gray-500 mb-1">Payment</p>
                                <p className="text-gray-700">{proposal.parsed?.paymentTerms || 'N/A'}</p>
                              </div>
                              <div>
                                <p className="font-semibold text-gray-500 mb-1">Warranty</p>
                                <p className="text-gray-700">{proposal.parsed?.warranty || 'N/A'}</p>
                              </div>
                              <div>
                                <p className="font-semibold text-gray-500 mb-1">Completeness</p>
                                <p className="text-gray-700">{proposal.completeness || 0}%</p>
                              </div>
                              <div>
                                <p className="font-semibold text-gray-500 mb-1">Updated</p>
                                <p className="text-gray-700">{new Date(proposal.updatedAt).toLocaleDateString()}</p>
                              </div>
                            </div>

                            {proposal.attachments && proposal.attachments.length > 0 && (
                              <div className="mt-3">
                                <p className="font-semibold text-gray-500 mb-1">Attachments</p>
                                <div className="space-y-1">
                                  {proposal.attachments.map((attachment, index) => (
                                    <div key={index} className="text-xs text-gray-700 flex items-center">
                                      <svg className="w-3 h-3 mr-1 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
                                      </svg>
                                      {attachment}
                                    </div>
                                  ))}
                                </div>
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>

                  {/* RFP Level Actions */}
                  <div className="mt-6 pt-4 border-t border-gray-200">
                    <div className="flex justify-end space-x-3">
                      {rfpProposals.length > 1 && (
                        <Link
                          to={`/compare/${rfp._id}`}
                          className="px-6 py-3 text-sm bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl hover:from-purple-700 hover:to-pink-700 transition-all duration-200 font-medium"
                        >
                          Compare All Proposals
                        </Link>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
}
