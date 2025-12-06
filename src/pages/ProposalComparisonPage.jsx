import Layout from "../components/layout/Layout";
import { useParams } from "react-router-dom";
import { useGetRfpQuery } from "../features/rfps/rfpApi";
import { useCompareRfpProposalsQuery } from "../features/proposals/proposalApi";

export default function ProposalComparisonPage() {
  const { id } = useParams();
  
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
      <div className="p-6">
        {/* Modern Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-900 to-pink-700 bg-clip-text text-transparent">
                Proposal Comparison
              </h1>
              <p className="text-gray-600 mt-2">
                Analyzing {comparison.comparison.totalProposals} proposals for {comparison.rfp.title}
              </p>
            </div>
            <div className="flex items-center space-x-3">
              <div className="bg-gradient-to-br from-purple-50 to-purple-100 px-4 py-2 rounded-xl border border-purple-200">
                <p className="text-xs text-purple-600 font-medium">Budget</p>
                <p className="text-sm font-bold text-purple-800">
                  ${comparison.rfp.budget?.toLocaleString() || 'N/A'}
                </p>
              </div>
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 px-4 py-2 rounded-xl border border-blue-200">
                <p className="text-xs text-blue-600 font-medium">Delivery</p>
                <p className="text-sm font-bold text-blue-800">
                  {comparison.rfp.deliveryDays || 'N/A'} days
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* AI Recommendation - Modern Card */}
        <div className="bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 rounded-2xl shadow-sm border border-blue-200 p-6 mb-8">
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
                    {comparison.comparison.aiRecommendation?.chosenVendor || "No specific recommendation"}
                  </p>
                </div>
                <p className="text-gray-700 mb-3">{comparison.comparison.aiRecommendation?.reason || "No reasoning provided"}</p>
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

        {/* Key Factors - Modern Cards */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 mb-8">
          <h3 className="text-xl font-bold text-gray-800 mb-6">Key Comparison Factors</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {comparison.comparison.keyFactors && typeof comparison.comparison.keyFactors === 'object' ? (
              Object.keys(comparison.comparison.keyFactors[0] || {}).map((factor, index) => (
                <div key={index} className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-4 text-center border border-gray-200">
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-pink-600 rounded-xl flex items-center justify-center mx-auto mb-3">
                    <span className="text-white font-bold">{index + 1}</span>
                  </div>
                  <p className="text-sm font-semibold text-gray-800 capitalize">{factor}</p>
                </div>
              ))
            ) : (
              <div className="col-span-4 text-center text-gray-500">
                No key factors available
              </div>
            )}
          </div>
        </div>

        {/* Modern Comparison Cards */}
        <div className="mb-8">
          <h3 className="text-xl font-bold text-gray-800 mb-6">Vendor Proposals</h3>
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {comparison.comparison.vendors.map((vendor) => (
              <div key={vendor.vendor._id} className={`rounded-2xl shadow-sm border-2 overflow-hidden transition-all duration-200 ${
                vendor.rank === 1 
                  ? "border-green-400 bg-gradient-to-br from-green-50 to-emerald-50" 
                  : "border-gray-200 bg-white hover:border-purple-300"
              }`}>
                {/* Card Header */}
                <div className={`p-4 ${
                  vendor.rank === 1 
                    ? "bg-gradient-to-r from-green-600 to-emerald-600" 
                    : "bg-gradient-to-r from-gray-600 to-gray-700"
                }`}>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center mr-3 ${
                        vendor.rank === 1 ? "bg-white" : "bg-gray-200"
                      }`}>
                        <span className={`font-bold text-sm ${
                          vendor.rank === 1 ? "text-green-600" : "text-gray-600"
                        }`}>#{vendor.rank}</span>
                      </div>
                      <div>
                        <h4 className="text-white font-semibold">{vendor.vendor.name}</h4>
                        <p className="text-white/80 text-sm">{vendor.vendor.email}</p>
                      </div>
                    </div>
                    {vendor.rank === 1 && (
                      <div className="bg-white/20 px-2 py-1 rounded-lg">
                        <span className="text-white text-xs font-medium">RECOMMENDED</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Card Content */}
                <div className="p-4">
                  {/* Price */}
                  <div className="mb-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-gray-600">Total Price</span>
                      <span className={`text-lg font-bold ${
                        vendor.totalPrice <= (comparison.rfp.budget || Infinity) ? "text-green-600" : "text-red-600"
                      }`}>
                        ${vendor.totalPrice.toLocaleString()}
                      </span>
                    </div>
                    {comparison.rfp.budget && (
                      <div className={`text-xs px-2 py-1 rounded-lg inline-block ${
                        vendor.totalPrice <= comparison.rfp.budget 
                          ? "bg-green-100 text-green-700" 
                          : "bg-red-100 text-red-700"
                      }`}>
                        {vendor.totalPrice <= comparison.rfp.budget ? "Under budget" : "Over budget"}
                      </div>
                    )}
                  </div>

                  {/* Key Metrics */}
                  <div className="grid grid-cols-2 gap-3 mb-4">
                    <div className="bg-gray-50 rounded-lg p-3">
                      <p className="text-xs text-gray-600 mb-1">Delivery</p>
                      <p className="text-sm font-semibold text-gray-800">{vendor.deliveryDays} days</p>
                      {comparison.rfp.deliveryDays && (
                        <p className={`text-xs mt-1 ${
                          vendor.deliveryDays <= comparison.rfp.deliveryDays 
                            ? "text-green-600" 
                            : "text-red-600"
                        }`}>
                          {vendor.deliveryDays <= comparison.rfp.deliveryDays ? "On time" : "Late"}
                        </p>
                      )}
                    </div>
                    <div className="bg-gray-50 rounded-lg p-3">
                      <p className="text-xs text-gray-600 mb-1">Score</p>
                      <p className="text-sm font-semibold text-gray-800">{vendor.calculatedScore}/100</p>
                      <div className="w-full bg-gray-200 rounded-full h-1.5 mt-1">
                        <div 
                          className="bg-gradient-to-r from-purple-600 to-pink-600 h-1.5 rounded-full" 
                          style={{ width: `${vendor.calculatedScore}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>

                  {/* Payment & Warranty */}
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center text-sm">
                      <svg className="w-4 h-4 mr-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                      </svg>
                      <span className="text-gray-700">{vendor.paymentTerms}</span>
                    </div>
                    <div className="flex items-center text-sm">
                      <svg className="w-4 h-4 mr-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                      </svg>
                      <span className="text-gray-700">{vendor.warranty}</span>
                    </div>
                  </div>

                  {/* Score Breakdown */}
                  <div className="bg-gray-50 rounded-lg p-3 mb-4">
                    <p className="text-xs text-gray-600 mb-2">Score Breakdown</p>
                    <div className="space-y-1">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Price:</span>
                        <span className="font-medium text-gray-800">{vendor.priceScore}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Delivery:</span>
                        <span className="font-medium text-gray-800">{vendor.deliveryScore}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Completeness:</span>
                        <span className="font-medium text-gray-800">{vendor.completenessScore}</span>
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex space-x-2">
                    <button className="flex-1 px-3 py-2 text-sm border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors font-medium">
                      View Details
                    </button>
                    {vendor.rank === 1 && (
                      <button className="flex-1 px-3 py-2 text-sm bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-lg hover:from-green-700 hover:to-emerald-700 transition-all duration-200 font-medium">
                        Select
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Risk Analysis - Modern */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 mb-8">
          <h3 className="text-xl font-bold text-gray-800 mb-6">Risk Analysis</h3>
          {comparison.comparison.riskAnalysis && typeof comparison.comparison.riskAnalysis === 'object' ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {Object.entries(comparison.comparison.riskAnalysis).map(([vendor, risk]) => (
                <div key={vendor} className="bg-gradient-to-br from-yellow-50 to-orange-50 rounded-xl p-4 border border-yellow-200">
                  <div className="flex items-center mb-3">
                    <div className="w-8 h-8 bg-yellow-100 rounded-lg flex items-center justify-center mr-3">
                      <svg className="w-4 h-4 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                      </svg>
                    </div>
                    <h4 className="font-semibold text-gray-800">{vendor}</h4>
                  </div>
                  {typeof risk === 'object' ? (
                    <div className="space-y-2">
                      {Object.entries(risk).map(([riskType, riskValue]) => (
                        <div key={riskType} className="bg-white rounded-lg p-2 border border-yellow-100">
                          <p className="text-sm font-medium text-gray-700 capitalize">
                            {riskType.replace(/([A-Z])/g, ' $1').trim()}
                          </p>
                          <p className="text-xs text-gray-600">{riskValue}</p>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-gray-700 text-sm bg-white rounded-lg p-2 border border-yellow-100">{risk}</p>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-gradient-to-br from-yellow-50 to-orange-50 rounded-xl p-4 border border-yellow-200">
              <p className="text-gray-700">{comparison.comparison.riskAnalysis || "No risk analysis available"}</p>
            </div>
          )}
        </div>

        {/* AI Summary - Modern */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 mb-8">
          <h3 className="text-xl font-bold text-gray-800 mb-6">AI Summary</h3>
          {comparison.comparison.aiSummary && typeof comparison.comparison.aiSummary === 'object' ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {Object.entries(comparison.comparison.aiSummary).map(([vendor, summary]) => (
                <div key={vendor} className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-4 border border-gray-200">
                  <h4 className="font-semibold text-gray-800 mb-3">{vendor}</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Price:</span>
                      <span className="font-medium text-gray-800">${summary.totalPrice?.toLocaleString() || 'N/A'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Delivery:</span>
                      <span className="font-medium text-gray-800">{summary.deliveryDays || 'N/A'} days</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Warranty:</span>
                      <span className="font-medium text-gray-800">{summary.warranty || 'N/A'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Payment:</span>
                      <span className="font-medium text-gray-800">{summary.paymentTerms || 'N/A'}</span>
                    </div>
                    <div className="mt-3 pt-3 border-t border-gray-200">
                      <p className="text-gray-600 text-xs mb-1">Summary:</p>
                      <p className="text-gray-700 text-sm">{summary.summary || 'No summary available'}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-4 border border-gray-200">
              <p className="text-gray-700 whitespace-pre-wrap">{comparison.comparison.aiSummary || "No AI summary available"}</p>
            </div>
          )}
        </div>

        {/* Modern Action Buttons */}
        <div className="flex justify-end space-x-4">
          <button className="px-6 py-3 border border-gray-300 rounded-xl text-gray-700 hover:bg-gray-50 transition-colors font-medium">
            Export Comparison
          </button>
          <button className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl hover:from-purple-700 hover:to-pink-700 transition-all duration-200 font-medium">
            Contact Top Vendor
          </button>
        </div>
      </div>
    </Layout>
  );
}
