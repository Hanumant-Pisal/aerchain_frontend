import { useCreateRfpMutation } from "../features/rfps/rfpApi";
import Layout from "../components/layout/Layout";

export default function CreateRFP() {
  const [createRfp] = useCreateRfpMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await createRfp({ title: e.target.title.value, description: e.target.description.value });
  };

  return (
    <Layout>
      <div className="p-6">
        <div className="mb-8">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-900 to-pink-700 bg-clip-text text-transparent">
            Create RFP
          </h1>
          <p className="text-gray-600 mt-2">Create a new Request for Proposal to send to vendors</p>
        </div>

        <div className="max-w-4xl">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">RFP Title</label>
                <input 
                  name="title" 
                  placeholder="Enter a clear, descriptive title for your RFP" 
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 bg-gray-50 hover:bg-white"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Requirements Description</label>
                <textarea 
                  name="description" 
                  placeholder="Describe your requirements, deliverables, timeline, and evaluation criteria in detail..." 
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 bg-gray-50 hover:bg-white resize-none"
                  rows="8"
                ></textarea>
              </div>

              <div className="flex items-center justify-between pt-4">
                <p className="text-sm text-gray-500">
                  <span className="font-medium">Tip:</span> Be specific about your requirements to get better proposals
                </p>
                <button 
                  type="submit"
                  className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-3 rounded-xl font-semibold hover:from-purple-700 hover:to-pink-700 transition-all duration-200 shadow-sm hover:shadow-md"
                >
                  Generate RFP
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
}
