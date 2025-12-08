import Layout from "../components/layout/Layout";
import { useGetVendorRfpsQuery } from "../features/rfps/rfpApi";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useState } from "react";

export default function VendorRfps() {
  const user = useSelector((state) => state.auth.user);
  const { data: rfps = [], isLoading, error } = useGetVendorRfpsQuery(undefined, {
    // Force refetch when user changes
    refetchOnMountOrArgChange: true,
    skip: !user,
  });
  const [selectedRfp, setSelectedRfp] = useState(null);

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
            <h3 className="text-lg font-semibold text-red-800 mb-2">Error Loading RFPs</h3>
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
            Received RFPs
          </h1>
          <p className="text-gray-600 mt-2">Review and respond to procurement requests from buyers</p>
        </div>

        {rfps.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 text-center">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">No RFPs Received Yet</h3>
            <p className="text-gray-600">You'll receive RFPs here when buyers invite you to bid</p>
          </div>
        ) : (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
            {/* List Header */}
            <div className="p-4 border-b border-gray-100 bg-gradient-to-r from-gray-50 to-gray-100">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-800">RFP List</h3>
                <span className="text-sm text-gray-600">{rfps.length} RFP{rfps.length !== 1 ? 's' : ''}</span>
              </div>
            </div>

            {/* RFP List */}
            <div className="divide-y divide-gray-100">
              {rfps.map((rfp) => (
                <div key={rfp._id} className="hover:bg-gray-50 transition-colors">
                  {/* List Item - Always Visible */}
                  <div 
                    className="p-4 cursor-pointer"
                    onClick={() => setSelectedRfp(selectedRfp === rfp._id ? null : rfp._id)}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center flex-1 min-w-0">
                        {/* RFP Icon */}
                        <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-pink-600 rounded-lg flex items-center justify-center mr-3 flex-shrink-0">
                          <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                          </svg>
                        </div>
                        
                        {/* RFP Info */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center mb-1">
                            <h4 className="text-base font-semibold text-gray-800 truncate">{rfp.title}</h4>
                            <span className="ml-2 inline-flex items-center px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800 border border-blue-200">
                              {rfp.status}
                            </span>
                          </div>
                          <div className="flex items-center text-sm text-gray-600">
                            <svg className="w-3 h-3 mr-1 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            {new Date(rfp.createdAt).toLocaleDateString()}
                            {rfp.structured?.budget && (
                              <>
                                <span className="mx-2">•</span>
                                <svg className="w-3 h-3 mr-1 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                                </svg>
                                ${rfp.structured.budget?.toLocaleString()}
                              </>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Expand/Collapse Icon */}
                      <div className="ml-3 flex-shrink-0">
                        <svg 
                          className={`w-5 h-5 text-gray-400 transition-transform duration-200 ${
                            selectedRfp === rfp._id ? 'rotate-180' : ''
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
                  {selectedRfp === rfp._id && (
                    <div className="px-4 pb-4 border-t border-gray-100">
                      <div className="pt-4">
                        {/* Description */}
                        <div className="mb-4">
                          <h5 className="text-sm font-semibold text-gray-700 mb-2">Description</h5>
                          <p className="text-sm text-gray-600">{rfp.description}</p>
                        </div>

                        {/* Key Metrics */}
                        {rfp.structured && (
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
                            <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-3 rounded-lg border border-blue-200">
                              <p className="text-xs text-blue-600 font-medium">Budget</p>
                              <p className="text-sm font-bold text-blue-800">
                                ${rfp.structured.budget?.toLocaleString() || 'N/A'}
                              </p>
                            </div>
                            <div className="bg-gradient-to-br from-green-50 to-green-100 p-3 rounded-lg border border-green-200">
                              <p className="text-xs text-green-600 font-medium">Delivery</p>
                              <p className="text-sm font-bold text-green-800">
                                {rfp.structured.deliveryDays || 'N/A'} days
                              </p>
                            </div>
                            <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-3 rounded-lg border border-purple-200">
                              <p className="text-xs text-purple-600 font-medium">Payment</p>
                              <p className="text-sm font-bold text-purple-800">
                                {rfp.structured.paymentTerms || 'N/A'}
                              </p>
                            </div>
                            <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 p-3 rounded-lg border border-yellow-200">
                              <p className="text-xs text-yellow-600 font-medium">Warranty</p>
                              <p className="text-sm font-bold text-yellow-800">
                                {rfp.structured.warranty || 'N/A'}
                              </p>
                            </div>
                          </div>
                        )}

                        {/* Required Items */}
                        {rfp.structured?.items && rfp.structured.items.length > 0 && (
                          <div className="mb-4">
                            <h5 className="text-sm font-semibold text-gray-700 mb-2">Required Items</h5>
                            <div className="space-y-2">
                              {rfp.structured.items.map((item, index) => (
                                <div key={index} className="flex justify-between items-center bg-gray-50 p-2 rounded">
                                  <span className="text-sm text-gray-700">{item.name}</span>
                                  <div className="text-right">
                                    <span className="text-sm font-medium text-gray-900">{item.qty}x</span>
                                    <span className="text-xs text-gray-500 ml-2">({item.specs})</span>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Action Button */}
                        <div className="flex justify-end">
                          <Link
                            to={`/rfp/${rfp._id}/submit-proposal`}
                            className="px-4 py-2 text-sm bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 font-medium"
                            onClick={(e) => e.stopPropagation()}
                          >
                            Submit Proposal
                          </Link>
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
