import { useParams } from "react-router-dom";
import Layout from "../components/layout/Layout";
import { useState } from "react";

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
  const [message, setMessage] = useState("");

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
    setMessage("");

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
        setMessage("Proposal submitted successfully!");
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
        setMessage(`Failed to submit proposal: ${error.message}`);
      }
    } catch (error) {
      setMessage(`Error: ${error.message}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Layout>
      <div className="p-4 max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">Submit Proposal</h1>
        
        {message && (
          <div className={`mb-4 p-4 rounded-md ${
            message.includes("successfully") 
              ? "bg-green-100 text-green-800" 
              : "bg-red-100 text-red-800"
          }`}>
            {message}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Information */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-semibold mb-4">Proposal Details</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Total Price *
                </label>
                <input
                  type="number"
                  value={formData.totalPrice}
                  onChange={(e) => setFormData({...formData, totalPrice: e.target.value})}
                  className="border border-gray-300 p-2 w-full rounded-md focus:ring-blue-500 focus:border-blue-500"
                  placeholder="100000"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Delivery Days *
                </label>
                <input
                  type="number"
                  value={formData.deliveryDays}
                  onChange={(e) => setFormData({...formData, deliveryDays: e.target.value})}
                  className="border border-gray-300 p-2 w-full rounded-md focus:ring-blue-500 focus:border-blue-500"
                  placeholder="30"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Payment Terms *
                </label>
                <select
                  value={formData.paymentTerms}
                  onChange={(e) => setFormData({...formData, paymentTerms: e.target.value})}
                  className="border border-gray-300 p-2 w-full rounded-md focus:ring-blue-500 focus:border-blue-500"
                  required
                >
                  <option value="">Select terms</option>
                  <option value="net 15">Net 15</option>
                  <option value="net 30">Net 30</option>
                  <option value="net 45">Net 45</option>
                  <option value="net 60">Net 60</option>
                  <option value="50% upfront">50% Upfront</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Warranty Period *
                </label>
                <select
                  value={formData.warranty}
                  onChange={(e) => setFormData({...formData, warranty: e.target.value})}
                  className="border border-gray-300 p-2 w-full rounded-md focus:ring-blue-500 focus:border-blue-500"
                  required
                >
                  <option value="">Select warranty</option>
                  <option value="6 months">6 months</option>
                  <option value="1 year">1 year</option>
                  <option value="2 years">2 years</option>
                  <option value="3 years">3 years</option>
                  <option value="5 years">5 years</option>
                </select>
              </div>
            </div>
          </div>

          {/* Items */}
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">Items & Pricing</h2>
              <button
                type="button"
                onClick={addItem}
                className="px-4 py-2 text-sm bg-green-600 text-white rounded-md hover:bg-green-700"
              >
                Add Item
              </button>
            </div>
            
            {formData.items.length === 0 ? (
              <p className="text-gray-500 text-center py-4">No items added. Click "Add Item" to get started.</p>
            ) : (
              <div className="space-y-3">
                {formData.items.map((item, index) => (
                  <div key={index} className="border border-gray-200 rounded-lg p-4">
                    <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
                      <input
                        type="text"
                        placeholder="Item name"
                        value={item.name}
                        onChange={(e) => handleItemChange(index, 'name', e.target.value)}
                        className="border border-gray-300 p-2 rounded-md focus:ring-blue-500 focus:border-blue-500"
                      />
                      <input
                        type="number"
                        placeholder="Qty"
                        value={item.qty}
                        onChange={(e) => handleItemChange(index, 'qty', e.target.value)}
                        className="border border-gray-300 p-2 rounded-md focus:ring-blue-500 focus:border-blue-500"
                      />
                      <input
                        type="number"
                        placeholder="Unit price"
                        value={item.unitPrice}
                        onChange={(e) => handleItemChange(index, 'unitPrice', e.target.value)}
                        className="border border-gray-300 p-2 rounded-md focus:ring-blue-500 focus:border-blue-500"
                      />
                      <input
                        type="text"
                        placeholder="Specs"
                        value={item.specs}
                        onChange={(e) => handleItemChange(index, 'specs', e.target.value)}
                        className="border border-gray-300 p-2 rounded-md focus:ring-blue-500 focus:border-blue-500"
                      />
                      <button
                        type="button"
                        onClick={() => removeItem(index)}
                        className="px-3 py-2 text-sm bg-red-600 text-white rounded-md hover:bg-red-700"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Additional Notes */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-semibold mb-4">Additional Information</h2>
            <textarea
              value={formData.additionalNotes}
              onChange={(e) => setFormData({...formData, additionalNotes: e.target.value})}
              className="border border-gray-300 p-2 w-full rounded-md focus:ring-blue-500 focus:border-blue-500"
              rows={4}
              placeholder="Any additional information about your proposal..."
            />
          </div>

          {/* Submit Button */}
          <div className="flex justify-center">
            <button
              type="submit"
              disabled={isSubmitting}
              className={`px-8 py-3 rounded-md font-medium transition-colors ${
                isSubmitting
                  ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                  : "bg-blue-600 text-white hover:bg-blue-700"
              }`}
            >
              {isSubmitting ? "Submitting..." : "Submit Proposal"}
            </button>
          </div>
        </form>
      </div>
    </Layout>
  );
}
