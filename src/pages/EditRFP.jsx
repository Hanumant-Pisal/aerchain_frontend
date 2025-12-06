import { useGetRfpQuery, useUpdateRfpMutation } from "../features/rfps/rfpApi";
import Layout from "../components/layout/Layout";
import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

export default function EditRFP() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: rfp, isLoading, error } = useGetRfpQuery(id);
  const [updateRfp] = useUpdateRfpMutation();
  const [formData, setFormData] = useState({
    title: "",
    description: ""
  });

  useEffect(() => {
    if (rfp) {
      setFormData({
        title: rfp.title || "",
        description: rfp.description || ""
      });
    }
  }, [rfp]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateRfp({ id, ...formData });
      navigate("/rfps");
    } catch (error) {
      // Error is handled by the API toast notification
    }
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
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
            <h3 className="text-lg font-semibold text-red-800 mb-2">Error Loading RFP</h3>
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
            Edit RFP
          </h1>
          <p className="text-gray-600 mt-2">Update your Request for Proposal</p>
        </div>

        <div className="max-w-4xl">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">RFP Title</label>
                <input 
                  name="title" 
                  value={formData.title}
                  onChange={handleInputChange}
                  placeholder="Enter a clear, descriptive title for your RFP" 
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 bg-gray-50 hover:bg-white"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Requirements Description</label>
                <textarea 
                  name="description" 
                  value={formData.description}
                  onChange={handleInputChange}
                  placeholder="Describe your requirements, deliverables, timeline, and evaluation criteria in detail..." 
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 bg-gray-50 hover:bg-white resize-none"
                  rows="8"
                  required
                ></textarea>
              </div>

              <div className="flex items-center justify-between pt-4">
                <button
                  type="button"
                  onClick={() => navigate("/rfps")}
                  className="px-6 py-3 border border-gray-300 text-gray-700 rounded-xl font-medium hover:bg-gray-50 transition-all duration-200"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-3 rounded-xl font-semibold hover:from-purple-700 hover:to-pink-700 transition-all duration-200 shadow-sm hover:shadow-md"
                >
                  Update RFP
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
}
