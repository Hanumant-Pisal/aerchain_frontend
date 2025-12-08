import { useParams } from "react-router-dom";
import Layout from "../components/layout/Layout";
import { useState } from "react";
import { showSuccess, showError, showLoading, dismissToast } from "../utils/toast";

export default function SubmitProposal() {
  const { rfpId } = useParams();
  const [formData, setFormData] = useState({
    totalPrice: "",
    deliveryDays: "",
    paymentTerms: "",
    warranty: "",
    items: [],
    additionalNotes: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleItemChange = (index, field, value) => {
    const newItems = [...formData.items];
    newItems[index] = { ...newItems[index], [field]: value };
    setFormData({ ...formData, items: newItems });
  };

  const addItem = () => {
    setFormData({
      ...formData,
      items: [...formData.items, { name: "", qty: "", unitPrice: "", specs: "" }]
    });
  };

  const removeItem = (index) => {
    const newItems = formData.items.filter((_, i) => i !== index);
    setFormData({ ...formData, items: newItems });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const toastId = showLoading("Submitting proposal...");

    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`/api/proposals/submit`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({
          rfpId,
          proposal: formData
        })
      });

      if (response.ok) {
        dismissToast(toastId);
        showSuccess("Proposal submitted successfully!");
        setFormData({
          totalPrice: "",
          deliveryDays: "",
          paymentTerms: "",
          warranty: "",
          items: [],
          additionalNotes: ""
        });
      } else {
        const error = await response.json();
        dismissToast(toastId);
        showError(`Failed to submit proposal: ${error.message}`);
      }
    } catch (error) {
      dismissToast(toastId);
      showError(`Error: ${error.message}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Layout>
      <div className="p-6 max-w-7xl mx-auto">
        <div className="mb-6">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-900 to-pink-700 bg-clip-text text-transparent mb-2">
            Submit Proposal
          </h1>
          <p className="text-gray-600">Create and submit your proposal for this RFP</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="p-6 border-b border-gray-100 bg-gradient-to-r from-gray-50 to-gray-100">
              <div className="flex items-center mb-6">
                <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-pink-600 rounded-lg flex items-center justify-center mr-3">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <div>
                  <h2 className="text-lg font-bold text-gray-800">Proposal Details & Items</h2>
                  <p className="text-xs text-gray-600">Complete your proposal information</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">
                    Total Price *
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">$</span>
                    <input
                      type="number"
                      value={formData.totalPrice}
                      onChange={(e) => setFormData({...formData, totalPrice: e.target.value})}
                      className="border border-gray-300 pl-8 pr-3 py-2 w-full rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                      placeholder="100,000"
                      required
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">
                    Delivery Days *
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      value={formData.deliveryDays}
                      onChange={(e) => setFormData({...formData, deliveryDays: e.target.value})}
                      className="border border-gray-300 pr-12 pl-3 py-2 w-full rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                      placeholder="30"
                      required
                    />
                    <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 text-sm">days</span>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">
                    Payment Terms *
                  </label>
                  <select
                    value={formData.paymentTerms}
                    onChange={(e) => setFormData({...formData, paymentTerms: e.target.value})}
                    className="border border-gray-300 px-3 py-2 w-full rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                    required
                  >
                    <option value="">Select payment terms</option>
                    <option value="net 15">Net 15</option>
                    <option value="net 30">Net 30</option>
                    <option value="net 45">Net 45</option>
                    <option value="net 60">Net 60</option>
                    <option value="50% upfront">50% Upfront</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">
                    Warranty Period *
                  </label>
                  <select
                    value={formData.warranty}
                    onChange={(e) => setFormData({...formData, warranty: e.target.value})}
                    className="border border-gray-300 px-3 py-2 w-full rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                    required
                  >
                    <option value="">Select warranty period</option>
                    <option value="6 months">6 months</option>
                    <option value="1 year">1 year</option>
                    <option value="2 years">2 years</option>
                    <option value="3 years">3 years</option>
                    <option value="5 years">5 years</option>
                  </select>
                </div>
              </div>

              <div className="border-t border-gray-200 pt-6">
                <div className="flex items-center mb-4">
                  <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center mr-3">
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                    </svg>
                  </div>
                  <h3 className="text-base font-bold text-gray-800">Items & Pricing</h3>
                </div>

                {formData.items.length === 0 ? (
                  <div className="text-center py-8 bg-gray-50 rounded-lg">
                    <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3">
                      <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                      </svg>
                    </div>
                    <h3 className="text-sm font-semibold text-gray-800 mb-1">No Items Added</h3>
                    <p className="text-xs text-gray-600">Use the button below to add items to your proposal</p>
                  </div>
                ) : (
                  <div className="space-y-3 max-h-80 overflow-y-auto pr-2 mb-4">
                    {formData.items.map((item, index) => (
                      <div key={index} className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                        <div className="flex items-center justify-between mb-3">
                          <h4 className="font-semibold text-gray-800 text-sm">Item {index + 1}</h4>
                          <button
                            type="button"
                            onClick={() => removeItem(index)}
                            className="px-3 py-1 bg-red-600 text-white rounded text-sm font-medium hover:bg-red-700 transition-colors flex items-center space-x-1"
                          >
                            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                            <span>Remove</span>
                          </button>
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                          <div>
                            <label className="block text-xs font-medium text-gray-700 mb-1">Item Name</label>
                            <input
                              type="text"
                              placeholder="Item name"
                              value={item.name}
                              onChange={(e) => handleItemChange(index, 'name', e.target.value)}
                              className="border border-gray-300 px-2 py-1.5 w-full rounded text-sm focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                            />
                          </div>
                          <div>
                            <label className="block text-xs font-medium text-gray-700 mb-1">Quantity</label>
                            <input
                              type="number"
                              placeholder="Qty"
                              value={item.qty}
                              onChange={(e) => handleItemChange(index, 'qty', e.target.value)}
                              className="border border-gray-300 px-2 py-1.5 w-full rounded text-sm focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                            />
                          </div>
                          <div>
                            <label className="block text-xs font-medium text-gray-700 mb-1">Unit Price</label>
                            <div className="relative">
                              <span className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-500 text-xs">$</span>
                              <input
                                type="number"
                                placeholder="0.00"
                                value={item.unitPrice}
                                onChange={(e) => handleItemChange(index, 'unitPrice', e.target.value)}
                                className="border border-gray-300 pl-5 pr-2 py-1.5 w-full rounded text-sm focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                              />
                            </div>
                          </div>
                          <div>
                            <label className="block text-xs font-medium text-gray-700 mb-1">Specifications</label>
                            <input
                              type="text"
                              placeholder="Technical specs"
                              value={item.specs}
                              onChange={(e) => handleItemChange(index, 'specs', e.target.value)}
                              className="border border-gray-300 px-2 py-1.5 w-full rounded text-sm focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                <div className="flex justify-center pt-4 border-t border-gray-200">
                  <button
                    type="button"
                    onClick={addItem}
                    className="px-6 py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-lg font-medium hover:from-green-700 hover:to-emerald-700 transition-all duration-200 flex items-center space-x-2 shadow-md hover:shadow-lg"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                    <span>Add Item</span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-amber-600 to-orange-600 rounded-lg flex items-center justify-center mr-3">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
              </div>
              <div>
                <h2 className="text-lg font-bold text-gray-800">Additional Notes</h2>
                <p className="text-xs text-gray-600">Extra details about your proposal</p>
              </div>
            </div>
            <textarea
              value={formData.additionalNotes}
              onChange={(e) => setFormData({...formData, additionalNotes: e.target.value})}
              className="border border-gray-300 px-3 py-2 w-full rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 resize-none"
              rows={4}
              placeholder="Any additional information, terms, or special conditions that would be relevant to your proposal..."
            />
          </div>

          <div className="flex justify-center pt-4">
            <button
              type="submit"
              disabled={isSubmitting}
              className={`px-8 py-3 rounded-xl font-bold transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-[1.02] ${
                isSubmitting
                  ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                  : "bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:from-purple-700 hover:to-pink-700"
              }`}
            >
              {isSubmitting ? (
                <span className="flex items-center space-x-2">
                  <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  <span>Submitting...</span>
                </span>
              ) : (
                <span className="flex items-center space-x-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                  </svg>
                  <span>Submit Proposal</span>
                </span>
              )}
            </button>
          </div>
        </form>
      </div>
    </Layout>
  );
}
