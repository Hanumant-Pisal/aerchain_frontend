import Layout from "../components/layout/Layout";
import { useGetRfpsQuery } from "../features/rfps/rfpApi";
import { useGetVendorsQuery } from "../features/vendors/vendorApi";
import { useState } from "react";

export default function SendRfp() {
  const { data: rfpsResponse = { data: [] }, isLoading: rfpsLoading, refetch: refetchRfps } = useGetRfpsQuery();
  const rfps = rfpsResponse.data || [];
  const { data: vendors = [], isLoading: vendorsLoading } = useGetVendorsQuery();
  const [selectedRfp, setSelectedRfp] = useState("");
  const [selectedVendors, setSelectedVendors] = useState([]);
  const [isSending, setIsSending] = useState(false);
  const [message, setMessage] = useState("");
  const [showVendorModal, setShowVendorModal] = useState(false);

  const handleVendorToggle = (vendorId) => {
    setSelectedVendors(prev => 
      prev.includes(vendorId) 
        ? prev.filter(id => id !== vendorId)
        : [...prev, vendorId]
    );
  };

  const handleSendRfp = async () => {
    if (!selectedRfp || selectedVendors.length === 0) {
      alert("Please select an RFP and at least one vendor");
      return;
    }

    setIsSending(true);
    try {
      const token = localStorage.getItem("token");
      const response = await fetch("/api/rfps/send", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({
          rfpId: selectedRfp,
          vendorIds: selectedVendors
        })
      });

      if (response.ok) {
        setMessage("RFP sent successfully to selected vendors!");
        setSelectedRfp("");
        setSelectedVendors([]);
      } else {
        const error = await response.json();
        setMessage(`Failed to send RFP: ${error.message}`);
      }
    } catch (error) {
      setMessage(`Error: ${error.message}`);
    } finally {
      setIsSending(false);
    }
  };

  if (rfpsLoading || vendorsLoading) {
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
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-900 to-pink-700 bg-clip-text text-transparent">
              Send RFP to Vendors
            </h1>
            <p className="text-gray-600 mt-2">Select an RFP and choose vendors to send it to</p>
          </div>
          <div className="flex items-center space-x-3">
            <button
              onClick={() => setShowVendorModal(true)}
              className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-3 rounded-xl font-medium hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 shadow-sm hover:shadow-md"
            >
              Choose Vendors 
            </button>
            <button
              onClick={handleSendRfp}
              disabled={isSending || !selectedRfp || selectedVendors.length === 0}
              className={`px-6 py-3 rounded-xl font-semibold transition-all duration-200 ${
                isSending || !selectedRfp || selectedVendors.length === 0
                  ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                  : "bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:from-purple-700 hover:to-pink-700 shadow-sm hover:shadow-md"
              }`}
            >
              {isSending ? (
                <span className="flex items-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Sending...
                </span>
              ) : (
                `Send RFP to ${selectedVendors.length} vendor(s)`
              )}
            </button>
          </div>
        </div>
        
        {message && (
          <div className={`mb-6 p-4 rounded-xl border ${
            message.includes("successfully") 
              ? "bg-green-50 text-green-800 border-green-200" 
              : "bg-red-50 text-red-800 border-red-200"
          }`}>
            {message}
          </div>
        )}

        {/* RFP Selection Table */}
        <div className="mb-8">
         
          {rfps.length === 0 ? (
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 text-center">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">No RFPs Available</h3>
              <p className="text-gray-600 mb-4">Create an RFP first before sending to vendors</p>
              <button className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-2 rounded-xl font-medium hover:from-purple-700 hover:to-pink-700 transition-all duration-200">
                Create RFP
              </button>
            </div>
          ) : (
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
              {/* Table Header */}
              <div className="p-4 border-b border-gray-100 bg-gradient-to-r from-gray-50 to-gray-100">
                <div className="flex items-center justify-end">
                  
                   <span className="text-sm text-gray-600">{rfps.length} RFP{rfps.length !== 1 ? 's' : ''}</span>
                </div>
              </div>

              {/* Table */}
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b border-gray-200">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Select
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        RFP Title
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Budget
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Delivery
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Created Date
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {rfps.map((rfp) => (
                      <tr 
                        key={rfp._id}
                        className={`cursor-pointer transition-all duration-200 ${
                          selectedRfp === rfp._id 
                            ? "bg-gradient-to-r from-purple-50 to-pink-50" 
                            : "hover:bg-gray-50"
                        }`}
                        onClick={() => setSelectedRfp(rfp._id)}
                      >
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="w-5 h-5 border-2 rounded-full flex items-center justify-center">
                              {selectedRfp === rfp._id && (
                                <div className="w-3 h-3 bg-purple-600 rounded-full"></div>
                              )}
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center">
                            <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-pink-600 rounded-lg flex items-center justify-center mr-3 flex-shrink-0">
                              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                              </svg>
                            </div>
                            <div className="text-sm font-medium text-gray-900">
                              {rfp.title}
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center text-sm text-gray-600">
                            <svg className="w-4 h-4 mr-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                            </svg>
                            ${rfp.structured?.budget?.toLocaleString() || 'N/A'}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center text-sm text-gray-600">
                            <svg className="w-4 h-4 mr-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                            {rfp.structured?.deliveryDays || 'N/A'} days
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center text-sm text-gray-600">
                            <svg className="w-4 h-4 mr-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            {new Date(rfp.createdAt).toLocaleDateString()}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>

        </div>

      {/* Vendor Selection Modal */}
      {showVendorModal && (
        <div className="fixed inset-0 backdrop-blur-sm bg-white/30 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl shadow-xl max-w-4xl w-full max-h-[80vh] overflow-hidden">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-gray-800">Select Vendors</h2>
                <button
                  onClick={() => setShowVendorModal(false)}
                  className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center hover:bg-gray-200 transition-colors"
                >
                  <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>
            
            <div className="p-6 overflow-y-auto max-h-[60vh]">
              {vendors.length === 0 ? (
                <div className="text-center py-8">
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">No Vendors Available</h3>
                  <p className="text-gray-600">Contact admin to add vendors to the system</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {vendors.map((vendor) => (
                    <div 
                      key={vendor._id}
                      className={`border-2 rounded-xl p-4 cursor-pointer transition-all duration-200 ${
                        selectedVendors.includes(vendor._id) 
                          ? "border-purple-500 bg-gradient-to-br from-purple-50 to-pink-50" 
                          : "border-gray-200 hover:border-gray-300"
                      }`}
                      onClick={() => handleVendorToggle(vendor._id)}
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                          <h3 className="font-bold text-gray-800">{vendor.name}</h3>
                          <p className="text-sm text-gray-600">{vendor.email}</p>
                          {vendor.contact && (
                            <p className="text-xs text-gray-500 mt-1">{vendor.contact}</p>
                          )}
                        </div>
                        <div className="w-6 h-6 border-2 rounded flex items-center justify-center">
                          {selectedVendors.includes(vendor._id) && (
                            <div className="w-4 h-4 bg-purple-600 rounded-sm"></div>
                          )}
                        </div>
                      </div>
                      {vendor.tags && vendor.tags.length > 0 && (
                        <div className="flex flex-wrap gap-1">
                          {vendor.tags.map((tag, index) => (
                            <span
                              key={index}
                              className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-purple-100 text-purple-800"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
            
            <div className="p-6 border-t border-gray-200">
              <div className="flex items-center justify-between">
                <p className="text-sm text-gray-600">
                  <span className="font-semibold">{selectedVendors.length}</span> vendor(s) selected
                </p>
                <div className="flex space-x-3">
                  <button
                    onClick={() => setShowVendorModal(false)}
                    className="px-6 py-2 border border-gray-300 rounded-xl font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => setShowVendorModal(false)}
                    className="px-6 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl font-medium hover:from-purple-700 hover:to-pink-700 transition-all duration-200"
                  >
                    Confirm Selection
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
}
