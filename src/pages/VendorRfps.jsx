import Layout from "../components/layout/Layout";
import { useGetVendorRfpsQuery } from "../features/rfps/rfpApi";
import { Link } from "react-router-dom";
import { useState } from "react";

export default function VendorRfps() {
  const { data: rfps = [], isLoading, error } = useGetVendorRfpsQuery();
  const [selectedRfp, setSelectedRfp] = useState(null);

  if (isLoading) {
    return (
      <Layout>
        <div className="p-4">
          <h1 className="text-2xl font-bold mb-4">Received RFPs</h1>
          <div className="text-center py-8">Loading RFPs...</div>
        </div>
      </Layout>
    );
  }

  if (error) {
    return (
      <Layout>
        <div className="p-4">
          <h1 className="text-2xl font-bold mb-4">Received RFPs</h1>
          <div className="text-center py-8 text-red-600">
            Error loading RFPs: {error.message}
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="p-4">
        <h1 className="text-2xl font-bold mb-4">Received RFPs</h1>
        
        {rfps.length === 0 ? (
          <div className="bg-white rounded-lg shadow p-8 text-center">
            <p className="text-gray-500">No RFPs received yet</p>
            <p className="text-sm text-gray-400 mt-2">You will see RFPs here when buyers send them to you</p>
          </div>
        ) : (
          <div className="space-y-4">
            {rfps.map((rfp) => (
              <div key={rfp._id} className="bg-white rounded-lg shadow">
                <div className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">{rfp.title}</h3>
                      <p className="text-sm text-gray-500 mt-1">
                        Created: {new Date(rfp.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                    <span className="inline-flex px-3 py-1 text-sm font-semibold rounded-full bg-blue-100 text-blue-800">
                      {rfp.status}
                    </span>
                  </div>

                  <div className="mb-4">
                    <p className="text-gray-700 line-clamp-3">{rfp.description}</p>
                  </div>

                  {rfp.structured && (
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                      <div className="bg-gray-50 p-3 rounded">
                        <p className="text-xs text-gray-500">Budget</p>
                        <p className="text-sm font-medium">${rfp.structured.budget || 'N/A'}</p>
                      </div>
                      <div className="bg-gray-50 p-3 rounded">
                        <p className="text-xs text-gray-500">Delivery</p>
                        <p className="text-sm font-medium">{rfp.structured.deliveryDays || 'N/A'} days</p>
                      </div>
                      <div className="bg-gray-50 p-3 rounded">
                        <p className="text-xs text-gray-500">Payment</p>
                        <p className="text-sm font-medium">{rfp.structured.paymentTerms || 'N/A'}</p>
                      </div>
                      <div className="bg-gray-50 p-3 rounded">
                        <p className="text-xs text-gray-500">Warranty</p>
                        <p className="text-sm font-medium">{rfp.structured.warranty || 'N/A'}</p>
                      </div>
                    </div>
                  )}

                  {rfp.structured?.items && rfp.structured.items.length > 0 && (
                    <div className="mb-4">
                      <h4 className="text-sm font-medium text-gray-900 mb-2">Required Items:</h4>
                      <div className="space-y-2">
                        {rfp.structured.items.map((item, index) => (
                          <div key={index} className="flex justify-between items-center bg-gray-50 p-2 rounded">
                            <span className="text-sm text-gray-700">{item.name}</span>
                            <div className="text-right">
                              <span className="text-sm font-medium">{item.qty}x</span>
                              <span className="text-xs text-gray-500 ml-2">({item.specs})</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="flex justify-end space-x-2">
                    <button
                      onClick={() => setSelectedRfp(selectedRfp === rfp._id ? null : rfp._id)}
                      className="px-4 py-2 text-sm border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                    >
                      {selectedRfp === rfp._id ? "Hide Details" : "View Details"}
                    </button>
                    <Link
                      to={`/rfp/${rfp._id}/submit-proposal`}
                      className="px-4 py-2 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700"
                    >
                      Submit Proposal
                    </Link>
                  </div>

                  {selectedRfp === rfp._id && (
                    <div className="mt-4 pt-4 border-t border-gray-200">
                      <h4 className="text-sm font-medium text-gray-900 mb-2">Full Description:</h4>
                      <p className="text-sm text-gray-700 whitespace-pre-wrap">{rfp.description}</p>
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
