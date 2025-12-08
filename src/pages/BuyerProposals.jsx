import Layout from "../components/layout/Layout";
import { useState, useMemo, useCallback } from "react";
import { useGetBuyerProposalsQuery } from "../features/proposals/proposalApi";
import RfpSection from "../components/proposals/RfpSection";
import React from "react";

export default function BuyerProposals() {
  const { data: proposals = [], isLoading, error } = useGetBuyerProposalsQuery();
  const [selectedProposal, setSelectedProposal] = useState(null);

  const proposalsByRfp = useMemo(() => {
    return proposals.reduce((acc, proposal) => {
      const rfpId = proposal.rfp?._id;
      if (!acc[rfpId]) {
        acc[rfpId] = {
          rfp: proposal.rfp,
          proposals: []
        };
      }
      acc[rfpId].proposals.push(proposal);
      return acc;
    }, {});
  }, [proposals]);

  const rfpList = useMemo(() => Object.values(proposalsByRfp), [proposalsByRfp]);

  const handleSelectProposal = useCallback((proposal) => {
    setSelectedProposal(proposal);
  }, []);

  const handleCloseModal = useCallback(() => {
    setSelectedProposal(null);
  }, []);

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
            <h3 className="text-lg font-semibold text-red-800 mb-2">Error Loading Proposals</h3>
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
            Received Proposals
          </h1>
          <p className="text-gray-600 mt-2">Review and manage proposals submitted by vendors</p>
        </div>

        {Object.keys(proposalsByRfp).length === 0 ? (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 text-center">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">No Proposals Received</h3>
            <p className="text-gray-600 mb-4">Proposals from vendors will appear here once submitted</p>
            <button className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-2 rounded-xl font-medium hover:from-purple-700 hover:to-pink-700 transition-all duration-200">
              Send RFP
            </button>
          </div>
        ) : (
          <div className="space-y-8">
            {rfpList.map(({ rfp, proposals: rfpProposals }) => (
              <RfpSection
                key={rfp._id}
                rfp={rfp}
                proposals={rfpProposals}
                selectedProposalId={selectedProposal}
                onProposalToggle={(proposalId) => setSelectedProposal(
                  selectedProposal === proposalId ? null : proposalId
                )}
              />
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
}
