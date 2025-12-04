import Layout from "../components/layout/Layout";
import { useGetRfpsQuery } from "../features/rfps/rfpApi";
import { useGetVendorsQuery } from "../features/vendors/vendorApi";
import { useState } from "react";

export default function SendRfp() {
  const { data: rfps = [], isLoading: rfpsLoading, refetch: refetchRfps } = useGetRfpsQuery();
  const { data: vendors = [], isLoading: vendorsLoading } = useGetVendorsQuery();
  const [selectedRfp, setSelectedRfp] = useState("");
  const [selectedVendors, setSelectedVendors] = useState([]);
  const [isSending, setIsSending] = useState(false);
  const [message, setMessage] = useState("");

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
        <div className="p-4">
          <h1 className="text-2xl font-bold mb-4">Send RFP</h1>
          <div className="text-center py-8">Loading...</div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="p-4">
        <h1 className="text-2xl font-bold mb-6">Send RFP to Vendors</h1>
        
        {message && (
          <div className={`mb-4 p-4 rounded-md ${
            message.includes("successfully") 
              ? "bg-green-100 text-green-800" 
              : "bg-red-100 text-red-800"
          }`}>
            {message}
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* RFP Selection */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-semibold mb-4">Select RFP</h2>
            {rfps.length === 0 ? (
              <p className="text-gray-500">No RFPs available. Create an RFP first.</p>
            ) : (
              <div className="space-y-3">
                {rfps.map((rfp) => (
                  <div 
                    key={rfp._id}
                    className={`border rounded-lg p-4 cursor-pointer transition-colors ${
                      selectedRfp === rfp._id 
                        ? "border-blue-500 bg-blue-50" 
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                    onClick={() => setSelectedRfp(rfp._id)}
                  >
                    <div className="font-medium text-gray-900">{rfp.title}</div>
                    <div className="text-sm text-gray-500 mt-1">
                      Budget: ${rfp.structured?.budget || 'N/A'} | 
                      Delivery: {rfp.structured?.deliveryDays || 'N/A'} days
                    </div>
                    <div className="text-xs text-gray-400 mt-2">
                      Created: {new Date(rfp.createdAt).toLocaleDateString()}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Vendor Selection */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-semibold mb-4">Select Vendors</h2>
            {vendors.length === 0 ? (
              <p className="text-gray-500">No vendors available. Contact admin to add vendors.</p>
            ) : (
              <div className="space-y-3">
                {vendors.map((vendor) => (
                  <div 
                    key={vendor._id}
                    className={`border rounded-lg p-4 cursor-pointer transition-colors ${
                      selectedVendors.includes(vendor._id) 
                        ? "border-blue-500 bg-blue-50" 
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                    onClick={() => handleVendorToggle(vendor._id)}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-medium text-gray-900">{vendor.name}</div>
                        <div className="text-sm text-gray-500">{vendor.email}</div>
                        {vendor.contact && (
                          <div className="text-xs text-gray-400">{vendor.contact}</div>
                        )}
                      </div>
                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          checked={selectedVendors.includes(vendor._id)}
                          onChange={() => {}}
                          className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                        />
                      </div>
                    </div>
                    {vendor.tags && vendor.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1 mt-2">
                        {vendor.tags.map((tag, index) => (
                          <span
                            key={index}
                            className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800"
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
        </div>

        {/* Send Button */}
        <div className="mt-6 flex justify-center">
          <button
            onClick={handleSendRfp}
            disabled={isSending || !selectedRfp || selectedVendors.length === 0}
            className={`px-6 py-3 rounded-md font-medium transition-colors ${
              isSending || !selectedRfp || selectedVendors.length === 0
                ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                : "bg-blue-600 text-white hover:bg-blue-700"
            }`}
          >
            {isSending ? "Sending..." : `Send RFP to ${selectedVendors.length} vendor(s)`}
          </button>
        </div>
      </div>
    </Layout>
  );
}
