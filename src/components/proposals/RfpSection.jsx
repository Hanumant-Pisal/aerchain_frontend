import React, { memo } from 'react';
import { Link } from 'react-router-dom';
import ProposalCard from './ProposalCard';
import { formatDate } from '../../utils/helpers';

const RfpSection = memo(({ rfp, proposals, selectedProposalId, onProposalToggle }) => {

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
      <div className="p-6 border-b border-gray-100 bg-gradient-to-r from-gray-50 to-gray-100">
        <div className="flex justify-between items-start">
          <div className="flex-1">
            <div className="flex items-center mb-2">
              <div className="w-8 h-8 bg-gradient-to-br from-purple-600 to-pink-600 rounded-lg flex items-center justify-center mr-3">
                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-800">{rfp.title}</h3>
            </div>
            <div className="flex items-center text-sm text-gray-600 ml-11">
              <svg className="w-4 h-4 mr-1 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Created: {formatDate(rfp.createdAt)}
              {rfp.structured?.budget && (
                <>
                  <span className="mx-2">•</span>
                  <svg className="w-4 h-4 mr-1 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                  </svg>
                  Budget: ${rfp.structured.budget.toLocaleString()}
                </>
              )}
            </div>
          </div>
          <div className="ml-4">
            <span className="inline-flex items-center px-4 py-2 text-sm font-semibold rounded-full bg-blue-100 text-blue-800 border border-blue-200">
              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
              </svg>
              {proposals.length} Proposal{proposals.length !== 1 ? 's' : ''}
            </span>
          </div>
        </div>
      </div>

      <div className="p-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {proposals.map((proposal) => (
            <ProposalCard
              key={proposal._id}
              proposal={proposal}
              isSelected={selectedProposalId === proposal._id}
              onToggle={onProposalToggle}
            />
          ))}
        </div>

        
        <div className="mt-6 pt-4 border-t border-gray-200">
          <div className="flex justify-end space-x-3">
            {proposals.length > 1 && (
              <Link
                to={`/compare/${rfp._id}`}
                className="px-6 py-3 text-sm bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl hover:from-purple-700 hover:to-pink-700 transition-all duration-200 font-medium"
              >
                Compare All Proposals
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
});

RfpSection.displayName = 'RfpSection';

export default RfpSection;
