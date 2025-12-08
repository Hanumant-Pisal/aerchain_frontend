import Layout from "../components/layout/Layout";
import { useParams } from "react-router-dom";
import { useGetRfpQuery } from "../features/rfps/rfpApi";
import { useCompareRfpProposalsQuery } from "../features/proposals/proposalApi";

export default function ProposalComparisonPage() {
  const { id } = useParams();
  
  // Helper function to map "Vendor 1", "Vendor 2" etc. to actual vendor names
  const getVendorNameFromReference = (vendorReference, vendors) => {
    if (!vendorReference || !vendors) return vendorReference;
    
    // Extract the number from "Vendor 1", "Vendor 2", etc.
    const match = vendorReference.match(/Vendor (\d+)/);
    if (match && match[1]) {
      const vendorRank = parseInt(match[1]); // This is the rank (1, 2, etc.)
      // Find vendor by rank instead of array index
      const vendor = vendors.find(v => v.rank === vendorRank);
      if (vendor && vendor.vendor) {
        return vendor.vendor.name;
      }
    }
    
    return vendorReference;
  };
  
  if (!id || id === "undefined") {
    return (
      <Layout>
        <div className="p-6">
          <div className="bg-red-50 border border-red-200 rounded-2xl p-8 text-center">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-red-800 mb-2">Invalid RFP ID</h3>
            <p className="text-red-600">Please access this page from the proposals list.</p>
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
            <h3 className="text-lg font-semibold text-red-800 mb-2">Error Loading Comparison</h3>
            <p className="text-red-600">{error.message}</p>
          </div>
        </div>
      </Layout>
    );
  }

  if (!comparison || comparison.comparison.totalProposals === 0) {
    return (
      <Layout>
        <div className="p-6">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 text-center">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">No Proposals to Compare</h3>
            <p className="text-gray-600">Proposals from vendors will appear here for comparison</p>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="p-4 max-w-7xl mx-auto">
        {/* Modern Header */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-900 to-pink-700 bg-clip-text text-transparent">
                Proposal Comparison
              </h1>
              <p className="text-gray-600 mt-1">
                Analyzing {comparison.comparison.totalProposals} proposals for {comparison.rfp.title}
              </p>
            </div>
            <div className="flex items-center space-x-2">
              <div className="bg-gradient-to-br from-purple-50 to-purple-100 px-3 py-2 rounded-lg border border-purple-200">
                <p className="text-xs text-purple-600 font-medium">Budget</p>
                <p className="text-sm font-bold text-purple-800">
                  ${comparison.rfp.budget?.toLocaleString() || 'N/A'}
                </p>
              </div>
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 px-3 py-2 rounded-lg border border-blue-200">
                <p className="text-xs text-blue-600 font-medium">Delivery</p>
                <p className="text-sm font-bold text-blue-800">
                  {comparison.rfp.deliveryDays || 'N/A'} days
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* AI Recommendation - Full Width */}
          <div className="lg:col-span-3">
            {/* AI Recommendation - Compact */}
            <div className="bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 rounded-xl shadow-sm border border-blue-200 p-6">
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                    </svg>
                  </div>
                </div>
                <div className="ml-4 flex-1">
                  <h3 className="text-xl font-bold text-gray-800 mb-3">AI Recommendation</h3>
                  <div className="bg-white rounded-xl p-4 border border-blue-100">
                    <div className="flex items-center mb-3">
                      <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center mr-3">
                        <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                        </svg>
                      </div>
                      <p className="text-lg font-semibold text-gray-800">
                        {getVendorNameFromReference(comparison.comparison.aiRecommendation?.chosenVendor, comparison.comparison.vendors) || "No recommendation"}
                      </p>
                    </div>
                    <p className="text-sm text-gray-700 mb-3">{comparison.comparison.aiRecommendation?.reason || "No reasoning provided"}</p>
                    {comparison.comparison.aiRecommendation?.concerns && (
                      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
                        <p className="text-yellow-800 text-sm font-medium">
                          <svg className="w-4 h-4 inline mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                          </svg>
                          Concerns: {comparison.comparison.aiRecommendation.concerns}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Key Factors Section */}
          <div className="lg:col-span-3">

            {/* Key Factors - Compact */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
              <div className="flex items-center mb-4">
                <div className="w-8 h-8 bg-gradient-to-br from-purple-600 to-pink-600 rounded-lg flex items-center justify-center mr-3">
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
                <h3 className="text-lg font-bold text-gray-800">Key Factors</h3>
              </div>
              <div className="space-y-3">
                {comparison.comparison.keyFactors && typeof comparison.comparison.keyFactors === 'object' ? (
                  Object.keys(comparison.comparison.keyFactors[0] || {}).map((factor, index) => (
                    <div key={index} className="bg-gray-50 rounded-lg p-3 border border-gray-100">
                      <div className="flex items-center mb-3">
                        <div className="w-6 h-6 bg-gradient-to-br from-purple-600 to-pink-600 rounded flex items-center justify-center mr-2">
                          <span className="text-white font-bold text-xs">{index + 1}</span>
                        </div>
                        <h4 className="text-sm font-semibold text-gray-800 capitalize">{factor}</h4>
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        {Object.entries(comparison.comparison.keyFactors[0][factor] || {}).map(([vendorRef, value]) => (
                          <div key={vendorRef} className="bg-white rounded-lg p-3 border border-gray-200 shadow-sm">
                            <p className="text-xs text-gray-600 mb-1">
                              {getVendorNameFromReference(vendorRef, comparison.comparison.vendors)}
                            </p>
                            <p className="text-sm font-semibold text-gray-800">
                              {factor === 'price' ? `$${(value/1000).toFixed(0)}k` : 
                               factor === 'delivery' ? `${value}d` : 
                               String(value)}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center text-gray-500 text-sm py-4">
                    No key factors available
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Bottom Section - Risk Analysis & AI Summary */}
          <div className="lg:col-span-3 grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Risk Analysis */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
              <div className="flex items-center mb-4">
                <div className="w-8 h-8 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-lg flex items-center justify-center mr-3">
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                </div>
                <h3 className="text-lg font-bold text-gray-800">Risk Analysis</h3>
              </div>
              {comparison.comparison.riskAnalysis && typeof comparison.comparison.riskAnalysis === 'object' ? (
                <div className="space-y-3">
                  {Object.entries(comparison.comparison.riskAnalysis).map(([vendor, risk]) => (
                    <div key={`${vendor}-risk`} className="bg-gradient-to-br from-yellow-50 to-orange-50 rounded-lg p-3 border border-yellow-200">
                      <div className="flex items-center mb-2">
                        <div className="w-6 h-6 bg-yellow-100 rounded-lg flex items-center justify-center mr-2">
                          <svg className="w-3 h-3 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                          </svg>
                        </div>
                        <h4 className="font-semibold text-gray-800 text-sm">{getVendorNameFromReference(vendor, comparison.comparison.vendors)}</h4>
                      </div>
                      <div className="text-xs space-y-1">
                        {typeof risk === 'object' ? (
                          Object.entries(risk).map(([riskType, riskValue]) => (
                            <div key={riskType} className="flex justify-between">
                              <span className="text-gray-600 capitalize">{riskType.replace(/([A-Z])/g, ' $1').trim()}:</span>
                              <span className="font-medium text-gray-800">{riskValue}</span>
                            </div>
                          ))
                        ) : (
                          <span className="text-gray-800">{risk}</span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center text-gray-500 text-sm">No risk analysis available</div>
              )}
            </div>

            {/* AI Summary */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
              <div className="flex items-center mb-4">
                <div className="w-8 h-8 bg-gradient-to-br from-gray-600 to-gray-800 rounded-lg flex items-center justify-center mr-3">
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                </div>
                <h3 className="text-lg font-bold text-gray-800">AI Summary</h3>
              </div>
              {comparison.comparison.aiSummary && typeof comparison.comparison.aiSummary === 'object' ? (
                <div className="space-y-3">
                  {Object.entries(comparison.comparison.aiSummary).map(([vendor, summary]) => (
                    <div key={`${vendor}-summary`} className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg p-3 border border-gray-200">
                      <h4 className="font-semibold text-gray-800 text-sm mb-2">{getVendorNameFromReference(vendor, comparison.comparison.vendors)}</h4>
                      <div className="grid grid-cols-2 gap-2 text-xs mb-2">
                        <div className="flex justify-between">
                          <span className="text-gray-600">Price:</span>
                          <span className="font-medium text-gray-800">${(summary.totalPrice/1000).toFixed(0)}k</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Delivery:</span>
                          <span className="font-medium text-gray-800">{summary.deliveryDays}d</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Warranty:</span>
                          <span className="font-medium text-gray-800">{summary.warranty}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Terms:</span>
                          <span className="font-medium text-gray-800">{summary.paymentTerms}</span>
                        </div>
                      </div>
                      <p className="text-xs text-gray-700 italic">{summary.summary}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center text-gray-500 text-sm">No AI summary available</div>
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
