import Layout from "../components/layout/Layout";
import { useState, useMemo, useRef } from "react";
import { useGetBuyerProposalsQuery } from "../features/proposals/proposalApi";
import { Link } from "react-router-dom";
import React from "react";

export default function BuyerProposals() {
  const { data: proposals = [], isLoading, error } = useGetBuyerProposalsQuery();
  const [selectedRfp, setSelectedRfp] = useState(null);
  const proposalCardsRef = useRef(null);

  // Group proposals by RFP
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

  const rfpList = Object.values(proposalsByRfp);

  const handleViewProposals = (rfpId) => {
    const newSelectedRfp = selectedRfp === rfpId ? null : rfpId;
    setSelectedRfp(newSelectedRfp);
    
    // Scroll to proposal cards after a short delay to allow DOM update
    if (newSelectedRfp) {
      setTimeout(() => {
        proposalCardsRef.current?.scrollIntoView({ 
          behavior: 'smooth', 
          block: 'start' 
        });
      }, 100);
    }
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
            Received Proposals
          </h1>
          <p className="text-gray-600 mt-2">Review and manage proposals submitted by vendors</p>
        </div>

        {rfpList.length === 0 ? (
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
          <div className="space-y-6">
            {/* RFP List */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
              <div className="p-4 border-b border-gray-100 bg-gradient-to-r from-gray-50 to-gray-100">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-gray-800">RFP List</h3>
                  <span className="text-sm text-gray-600">{rfpList.length} RFP{rfpList.length !== 1 ? 's' : ''} with Proposals</span>
                </div>
              </div>
              
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
                        Proposals
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {rfpList.map(({ rfp, proposals: rfpProposals }) => (
                      <tr key={rfp._id} className="hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="w-8 h-8 bg-gradient-to-br from-purple-600 to-pink-600 rounded-lg flex items-center justify-center mr-3">
                              <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                              </svg>
                            </div>
                            <span className="text-sm font-medium text-gray-900">
                              {rfp.title || "Unknown RFP"}
                            </span>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 border border-blue-200">
                            Active
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                          {new Date(rfp.createdAt).toLocaleDateString('en-US', { 
                            month: 'short', 
                            day: 'numeric', 
                            year: 'numeric' 
                          })}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="w-6 h-6 bg-gradient-to-br from-green-600 to-emerald-600 rounded-lg flex items-center justify-center mr-2">
                              <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                              </svg>
                            </div>
                            <span className="text-sm font-medium text-gray-900">
                              {rfpProposals.length} Proposal{rfpProposals.length !== 1 ? 's' : ''}
                            </span>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                          <button
                            onClick={() => handleViewProposals(rfp._id)}
                            className="text-blue-600 hover:text-blue-900 font-medium"
                          >
                            {selectedRfp === rfp._id ? 'Hide Proposals' : 'View Proposals'}
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Proposal Cards for Selected RFP */}
            {selectedRfp && (
              <div ref={proposalCardsRef} className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
                <div className="p-4 border-b border-gray-100 bg-gradient-to-r from-blue-50 to-indigo-100">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center mr-3">
                        <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                        </svg>
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-800">
                          {rfpList.find(r => r.rfp._id === selectedRfp)?.rfp.title || "Unknown RFP"}
                        </h3>
                        <p className="text-sm text-gray-600">Submitted Proposals</p>
                      </div>
                    </div>
                    <button
                      onClick={() => setSelectedRfp(null)}
                      className="text-gray-400 hover:text-gray-600"
                    >
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                </div>

                <div className="p-6">
                  <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                    {rfpList.find(r => r.rfp._id === selectedRfp)?.proposals.map((proposal) => (
                      <div key={proposal._id} className="bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition-all duration-200">
                        {/* Card Header */}
                        <div className="p-4 border-b border-gray-100">
                          <div className="flex items-center justify-between mb-3">
                            <div className="flex items-center">
                              <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center mr-3">
                                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                                </svg>
                              </div>
                              <div>
                                <h4 className="text-sm font-semibold text-gray-900">
                                  {proposal.vendor?.name || 'Unknown Vendor'}
                                </h4>
                                <p className="text-xs text-gray-600">{proposal.vendorEmail}</p>
                              </div>
                            </div>
                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                              proposal.status === "Accepted" 
                                ? "bg-green-100 text-green-800 border border-green-200"
                                : proposal.status === "Rejected"
                                ? "bg-red-100 text-red-800 border border-red-200"
                                : "bg-blue-100 text-blue-800 border border-blue-200"
                            }`}>
                              {proposal.status || "Submitted"}
                            </span>
                          </div>
                          
                          {/* Price Badge */}
                          <div className="flex items-center justify-center">
                            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-bold bg-green-100 text-green-800 border border-green-200">
                              ${proposal.parsed?.totalPrice?.toLocaleString() || 'N/A'}
                            </span>
                          </div>
                        </div>

                        {/* Card Content */}
                        <div className="p-4">
                          {/* Key Metrics */}
                          <div className="grid grid-cols-2 gap-3 mb-4">
                            <div className="bg-blue-50 p-3 rounded-lg border border-blue-100">
                              <p className="text-xs text-blue-600 font-medium mb-1">Delivery</p>
                              <p className="text-sm font-bold text-blue-800">
                                {proposal.parsed?.deliveryDays || 'N/A'} days
                              </p>
                            </div>
                            <div className="bg-purple-50 p-3 rounded-lg border border-purple-100">
                              <p className="text-xs text-purple-600 font-medium mb-1">Score</p>
                              <div className="flex items-center">
                                <svg className="w-3 h-3 text-yellow-500 mr-1" fill="currentColor" viewBox="0 0 24 24">
                                  <path d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"/>
                                </svg>
                                <span className="text-sm font-bold text-purple-800">{proposal.score || 0}/100</span>
                              </div>
                            </div>
                          </div>

                          {/* Line Items Preview */}
                          {proposal.parsed?.lineItems && proposal.parsed.lineItems.length > 0 && (
                            <div className="mb-4">
                              <p className="text-xs font-medium text-gray-500 mb-2">Items ({proposal.parsed.lineItems.length})</p>
                              <div className="space-y-2">
                                {proposal.parsed.lineItems.slice(0, 2).map((item, index) => (
                                  <div key={index} className="flex justify-between items-center bg-gray-50 p-2 rounded text-xs">
                                    <span className="font-medium text-gray-700 truncate">{item.name}</span>
                                    <span className="font-bold text-gray-900">{item.quantity}x @${item.unitPrice}</span>
                                  </div>
                                ))}
                                {proposal.parsed.lineItems.length > 2 && (
                                  <p className="text-xs text-gray-500 text-center">+{proposal.parsed.lineItems.length - 2} more items</p>
                                )}
                              </div>
                            </div>
                          )}

                          {/* AI Summary Preview */}
                          {proposal.aiSummary && (
                            <div className="mb-4">
                              <p className="text-xs font-medium text-gray-500 mb-2">AI Summary</p>
                              <p className="text-xs text-gray-700 bg-blue-50 p-2 rounded-lg border border-blue-100 line-clamp-3">
                                {proposal.aiSummary}
                              </p>
                            </div>
                          )}

                          {/* Footer */}
                          <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                            <div className="flex items-center text-xs text-gray-500">
                              <svg className="w-3 h-3 mr-1 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                              </svg>
                              {new Date(proposal.createdAt).toLocaleDateString()}
                            </div>
                            <div className="flex space-x-2">
                              <button className="px-3 py-1 text-xs bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors font-medium">
                                View Details
                              </button>
                              <button className="px-3 py-1 text-xs bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-lg hover:from-green-700 hover:to-emerald-700 transition-all duration-200 font-medium">
                                Accept
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* RFP Level Actions */}
                  {rfpList.find(r => r.rfp._id === selectedRfp)?.proposals.length > 1 && (
                    <div className="mt-6 pt-4 border-t border-gray-200">
                      <div className="flex justify-center">
                        <Link
                          to={`/compare/${selectedRfp}`}
                          className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl hover:from-purple-700 hover:to-pink-700 transition-all duration-200 font-medium"
                        >
                          Compare All Proposals
                        </Link>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </Layout>
  );
}
