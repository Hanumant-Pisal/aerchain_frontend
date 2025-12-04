import Layout from "../components/layout/Layout";
import { useParams } from "react-router-dom";
import { useGetRfpQuery } from "../features/rfps/rfpApi";
import { useCompareRfpProposalsQuery } from "../features/proposals/proposalApi";

export default function ProposalComparisonPage() {
  const { id } = useParams(); // Changed from rfpId to id to match route
  
  // Debug log to check if id is being captured
  console.log("ProposalComparisonPage - id from useParams:", id);
  
  // Validate id before making API calls
  if (!id || id === "undefined") {
    return (
      <Layout>
        <div className="p-4">
          <h1 className="text-2xl font-bold mb-4">Proposal Comparison</h1>
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <p className="text-red-700">Error: RFP ID is missing or invalid</p>
            <p className="text-red-600 text-sm mt-1">Please access this page from the proposals list.</p>
          </div>
        </div>
      </Layout>
    );
  }
  
  const { data: rfp, isLoading: rfpLoading } = useGetRfpQuery(id);
  const { data: comparison, isLoading: comparisonLoading, error } = useCompareRfpProposalsQuery(id);

  if (rfpLoading || comparisonLoading) {
    return (
      <Layout>
        <div className="p-4">
          <h1 className="text-2xl font-bold mb-4">Proposal Comparison</h1>
          <div className="text-center py-8">Analyzing proposals...</div>
        </div>
      </Layout>
    );
  }

  if (error) {
    return (
      <Layout>
        <div className="p-4">
          <h1 className="text-2xl font-bold mb-4">Proposal Comparison</h1>
          <div className="text-center py-8 text-red-600">
            Error loading comparison: {error.message}
          </div>
        </div>
      </Layout>
    );
  }

  if (!comparison || comparison.comparison.totalProposals === 0) {
    return (
      <Layout>
        <div className="p-4">
          <h1 className="text-2xl font-bold mb-4">Proposal Comparison</h1>
          <div className="bg-white rounded-lg shadow p-8 text-center">
            <p className="text-gray-500">No proposals received yet</p>
            <p className="text-sm text-gray-400 mt-2">Proposals from vendors will appear here for comparison</p>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="p-4">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Proposal Comparison</h1>
          <p className="text-gray-600 mt-1">Analyzing {comparison.comparison.totalProposals} proposals for {comparison.rfp.title}</p>
        </div>

        {/* AI Recommendation */}
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg shadow p-6 mb-6">
          <div className="flex items-start">
            <div className="flex-shrink-0">
              <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                <span className="text-white text-sm font-bold">AI</span>
              </div>
            </div>
            <div className="ml-4 flex-1">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">AI Recommendation</h3>
              <div className="bg-white rounded-lg p-4 border border-blue-200">
                <p className="text-gray-700 font-medium mb-2">
                  Recommended: {comparison.comparison.aiRecommendation?.chosenVendor || "No specific recommendation"}
                </p>
                <p className="text-gray-700 mb-2">{comparison.comparison.aiRecommendation?.reason || "No reasoning provided"}</p>
                {comparison.comparison.aiRecommendation?.concerns && (
                  <p className="text-yellow-700 text-sm">
                    <strong>Concerns:</strong> {comparison.comparison.aiRecommendation.concerns}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Key Factors */}
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Key Comparison Factors</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {comparison.comparison.keyFactors && typeof comparison.comparison.keyFactors === 'object' ? (
              Object.keys(comparison.comparison.keyFactors[0] || {}).map((factor, index) => (
                <div key={index} className="bg-gray-50 rounded-lg p-3 text-center">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-2">
                    <span className="text-blue-600 font-semibold">{index + 1}</span>
                  </div>
                  <p className="text-sm font-medium text-gray-900 capitalize">{factor}</p>
                </div>
              ))
            ) : (
              <div className="col-span-4 text-center text-gray-500">
                No key factors available
              </div>
            )}
          </div>
        </div>

        {/* Comparison Table */}
        <div className="bg-white rounded-lg shadow overflow-hidden mb-6">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">Detailed Comparison</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rank</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Vendor</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total Price</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Delivery</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Payment Terms</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Warranty</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Score</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {comparison.comparison.vendors.map((vendor) => (
                  <tr key={vendor.vendor._id} className={vendor.rank === 1 ? "bg-green-50" : ""}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        vendor.rank === 1 
                          ? "bg-green-100 text-green-800" 
                          : vendor.rank === 2 
                          ? "bg-blue-100 text-blue-800"
                          : vendor.rank === 3
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-gray-100 text-gray-800"
                      }`}>
                        #{vendor.rank}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-gray-900">{vendor.vendor.name}</div>
                        <div className="text-sm text-gray-500">{vendor.vendor.email}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">${vendor.totalPrice.toLocaleString()}</div>
                      {comparison.rfp.budget && (
                        <div className="text-xs text-gray-500">
                          {vendor.totalPrice <= comparison.rfp.budget ? "Under budget" : "Over budget"}
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{vendor.deliveryDays} days</div>
                      {comparison.rfp.deliveryDays && (
                        <div className="text-xs text-gray-500">
                          {vendor.deliveryDays <= comparison.rfp.deliveryDays ? "On time" : "Late"}
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {vendor.paymentTerms}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {vendor.warranty}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="text-sm font-medium text-gray-900">{vendor.calculatedScore}/100</div>
                        <div className="ml-2 w-16 bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-blue-600 h-2 rounded-full" 
                            style={{ width: `${vendor.calculatedScore}%` }}
                          ></div>
                        </div>
                      </div>
                      <div className="text-xs text-gray-500 mt-1">
                        Price: {vendor.priceScore} | Delivery: {vendor.deliveryScore} | Complete: {vendor.completenessScore}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button className="text-blue-600 hover:text-blue-900 mr-3">View Details</button>
                      {vendor.rank === 1 && (
                        <button className="text-green-600 hover:text-green-900">Select</button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Risk Analysis */}
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Risk Analysis</h3>
          {comparison.comparison.riskAnalysis && typeof comparison.comparison.riskAnalysis === 'object' ? (
            <div className="space-y-3">
              {Object.entries(comparison.comparison.riskAnalysis).map(([vendor, risk]) => (
                <div key={vendor} className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
                  <p className="font-medium text-gray-900 mb-1">{vendor}:</p>
                  {typeof risk === 'object' ? (
                    <div className="text-sm text-gray-700 space-y-1">
                      {Object.entries(risk).map(([riskType, riskValue]) => (
                        <p key={riskType} className="text-sm">
                          <strong className="capitalize">{riskType.replace(/([A-Z])/g, ' $1').trim()}:</strong> {riskValue}
                        </p>
                      ))}
                    </div>
                  ) : (
                    <p className="text-gray-700 text-sm">{risk}</p>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <p className="text-gray-700">{comparison.comparison.riskAnalysis || "No risk analysis available"}</p>
            </div>
          )}
        </div>

        {/* AI Summary */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">AI Summary</h3>
          {comparison.comparison.aiSummary && typeof comparison.comparison.aiSummary === 'object' ? (
            <div className="space-y-4">
              {Object.entries(comparison.comparison.aiSummary).map(([vendor, summary]) => (
                <div key={vendor} className="bg-gray-50 rounded-lg p-4">
                  <h4 className="font-medium text-gray-900 mb-2">{vendor}</h4>
                  <div className="text-sm text-gray-700 space-y-1">
                    <p><strong>Price:</strong> ${summary.totalPrice?.toLocaleString() || 'N/A'}</p>
                    <p><strong>Delivery:</strong> {summary.deliveryDays || 'N/A'} days</p>
                    <p><strong>Warranty:</strong> {summary.warranty || 'N/A'}</p>
                    <p><strong>Payment:</strong> {summary.paymentTerms || 'N/A'}</p>
                    <p><strong>Summary:</strong> {summary.summary || 'No summary available'}</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="prose max-w-none">
              <p className="text-gray-700 whitespace-pre-wrap">{comparison.comparison.aiSummary || "No AI summary available"}</p>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="mt-6 flex justify-end space-x-4">
          <button className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50">
            Export Comparison
          </button>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
            Contact Top Vendor
          </button>
        </div>
      </div>
    </Layout>
  );
}
