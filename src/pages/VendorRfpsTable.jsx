import Layout from "../components/layout/Layout";
import { useGetVendorRfpsQuery } from "../features/rfps/rfpApi";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useState } from "react";
import React from "react";

export default function VendorRfps() {
  const user = useSelector((state) => state.auth.user);
  const { data: rfps = [], isLoading, error } = useGetVendorRfpsQuery(undefined, {
    refetchOnMountOrArgChange: true,
    skip: !user,
  });
  const [selectedRfp, setSelectedRfp] = useState(null);

  const handleRowClick = (rfp) => {
    setSelectedRfp(selectedRfp === rfp._id ? null : rfp._id);
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
        {/* Header */}
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
            {/* Table Header */}
            <div className="p-4 border-b border-gray-100 bg-gradient-to-r from-gray-50 to-gray-100">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-800">RFP List</h3>
                <span className="text-sm text-gray-600">{rfps.length} RFP{rfps.length !== 1 ? 's' : ''}</span>
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
                      Date
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Budget
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {rfps.map((rfp) => (
                    <React.Fragment key={rfp._id}>
                      <tr 
                        className="hover:bg-gray-50 cursor-pointer transition-colors"
                        onClick={() => handleRowClick(rfp)}
                      >
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="w-8 h-8 bg-gradient-to-br from-purple-600 to-pink-600 rounded-lg flex items-center justify-center mr-3">
                              <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                              </svg>
                            </div>
                            <span className="text-sm font-medium text-gray-900">{rfp.title}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 border border-blue-200">
                            {rfp.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                          {new Date(rfp.createdAt).toLocaleDateString('en-US', { 
                            month: 'short', 
                            day: 'numeric', 
                            year: 'numeric' 
                          })}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {rfp.structured?.budget ? (
                            <span className="font-medium">${rfp.structured.budget.toLocaleString()}</span>
                          ) : (
                            <span className="text-gray-400">N/A</span>
                          )}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleRowClick(rfp);
                            }}
                            className="text-blue-600 hover:text-blue-900 font-medium"
                          >
                            {selectedRfp === rfp._id ? 'Hide Details' : 'View Details'}
                          </button>
                        </td>
                      </tr>
                      
                      {/* Inline Details Row */}
                      {selectedRfp === rfp._id && (
                        <tr>
                          <td colSpan="5" className="px-0 py-0 bg-gray-50">
                            <div className="p-6 border-l-4 border-blue-500">
                              {/* Details Header */}
                              <div className="mb-4">
                                <h3 className="text-xl font-bold text-gray-900 mb-2">{rfp.title}</h3>
                                <div className="flex items-center space-x-4">
                                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 border border-blue-200">
                                    {rfp.status}
                                  </span>
                                  <span className="text-sm text-gray-600">
                                    Posted: {new Date(rfp.createdAt).toLocaleDateString('en-US', { 
                                      month: 'long', 
                                      day: 'numeric', 
                                      year: 'numeric' 
                                    })}
                                  </span>
                                </div>
                              </div>

                              {/* Description */}
                              <div className="mb-6">
                                <h4 className="text-lg font-semibold text-gray-900 mb-3">Description</h4>
                                <p className="text-gray-700 leading-relaxed">{rfp.description}</p>
                              </div>

                              {/* Key Metrics */}
                              {rfp.structured && (
                                <div className="mb-6">
                                  <h4 className="text-lg font-semibold text-gray-900 mb-3">Key Requirements</h4>
                                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                                    <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-4 rounded-lg border border-blue-200">
                                      <div className="flex items-center mb-2">
                                        <svg className="w-5 h-5 text-blue-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                                        </svg>
                                        <span className="text-sm font-medium text-blue-800">Budget</span>
                                      </div>
                                      <p className="text-xl font-bold text-blue-900">
                                        ${rfp.structured.budget?.toLocaleString() || 'N/A'}
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
                                        {rfp.structured.deliveryDays || 'N/A'} days
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
                                        {rfp.structured.paymentTerms || 'N/A'}
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
                                        {rfp.structured.warranty || 'N/A'}
                                      </p>
                                    </div>
                                  </div>
                                </div>
                              )}

                              {/* Required Items */}
                              {rfp.structured?.items && rfp.structured.items.length > 0 && (
                                <div className="mb-6">
                                  <h4 className="text-lg font-semibold text-gray-900 mb-3">Required Items</h4>
                                  <div className="bg-gray-50 rounded-lg p-4">
                                    <div className="space-y-3">
                                      {rfp.structured.items.map((item, index) => (
                                        <div key={index} className="flex justify-between items-center bg-white p-3 rounded-lg border border-gray-200">
                                          <div className="flex-1">
                                            <h5 className="font-medium text-gray-900">{item.name}</h5>
                                            <p className="text-sm text-gray-600 mt-1">{item.specs}</p>
                                          </div>
                                          <div className="ml-4 text-right">
                                            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800 border border-blue-200">
                                              Quantity: {item.qty}
                                            </span>
                                          </div>
                                        </div>
                                      ))}
                                    </div>
                                  </div>
                                </div>
                              )}

                              {/* Action Button */}
                              <div className="flex justify-end">
                                <Link
                                  to={`/rfp/${rfp._id}/submit-proposal`}
                                  className="px-6 py-2 text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 rounded-lg transition-all duration-200 font-medium"
                                >
                                  Submit Proposal
                                </Link>
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
