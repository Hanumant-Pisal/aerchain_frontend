import React, { memo } from 'react';
import { Link } from 'react-router-dom';
import { formatDate } from '../../utils/helpers';

const ProposalCard = memo(({ proposal, isSelected, onToggle }) => {

  return (
    <div className="border border-gray-200 rounded-xl p-4 hover:border-purple-300 transition-all duration-200">
      <div className="flex justify-between items-start mb-3">
        <div className="flex-1">
          <div className="flex items-center mb-1">
            <div className="w-6 h-6 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center mr-2">
              <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.0 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <div>
              <h4 className="text-sm font-semibold text-gray-800">
                {proposal.vendor?.name || 'Unknown Vendor'}
              </h4>
              <p className="text-xs text-gray-600">{proposal.vendorEmail}</p>
            </div>
          </div>
        </div>
        <div className="text-right ml-3">
          <div className="inline-flex items-center px-3 py-1 text-sm font-bold rounded-full bg-green-100 text-green-800 border border-green-200">
            ${proposal.parsed?.totalPrice?.toLocaleString() || 'N/A'}
          </div>
        </div>
      </div>

      
      <div className="grid grid-cols-3 gap-2 mb-3">
        <div className="bg-blue-50 p-2 rounded-lg border border-blue-100">
          <p className="text-xs text-blue-600 font-medium">Price</p>
          <p className="text-xs font-bold text-blue-800">
            ${proposal.parsed?.totalPrice?.toLocaleString() || 'N/A'}
          </p>
        </div>
        <div className="bg-green-50 p-2 rounded-lg border border-green-100">
          <p className="text-xs text-green-600 font-medium">Delivery</p>
          <p className="text-xs font-bold text-green-800">
            {proposal.parsed?.deliveryDays || 'N/A'}d
          </p>
        </div>
        <div className="bg-purple-50 p-2 rounded-lg border border-purple-100">
          <p className="text-xs text-purple-600 font-medium">Score</p>
          <p className="text-xs font-bold text-purple-800">
            {proposal.score || 0}/100
          </p>
        </div>
      </div>

     
      {proposal.parsed?.lineItems && proposal.parsed.lineItems.length > 0 && (
        <div className="mb-3">
          <div className="space-y-1">
            {proposal.parsed.lineItems.slice(0, 2).map((item, index) => (
              <div key={index} className="flex justify-between items-center bg-gray-50 p-2 rounded text-xs">
                <span className="font-medium text-gray-700 truncate">{item.name}</span>
                <div className="text-right flex-shrink-0">
                  <span className="font-bold text-gray-900">{item.quantity}x</span>
                  <span className="text-gray-500 ml-1">
                    @${item.unitPrice}
                  </span>
                </div>
              </div>
            ))}
            {proposal.parsed.lineItems.length > 2 && (
              <p className="text-xs text-gray-500 text-center">+{proposal.parsed.lineItems.length - 2} more items</p>
            )}
          </div>
        </div>
      )}

     
      {proposal.aiSummary && (
        <div className="mb-3">
          <p className="text-xs text-gray-700 bg-blue-50 p-2 rounded-lg border border-blue-100 line-clamp-2">
            {proposal.aiSummary}
          </p>
        </div>
      )}

     
      <div className="flex justify-between items-center">
        <div className="flex items-center text-xs text-gray-500">
          <svg className="w-3 h-3 mr-1 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          {formatDate(proposal.createdAt)}
        </div>
        <div className="flex space-x-2">
          <button
            onClick={() => onToggle(proposal._id)}
            className="px-3 py-1 text-xs border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors font-medium"
          >
            {isSelected ? "Hide" : "Details"}
          </button>
        </div>
      </div>

     
      {isSelected && (
        <div className="mt-3 pt-3 border-t border-gray-200">
          <div className="grid grid-cols-2 gap-4 text-xs">
            <div>
              <p className="font-semibold text-gray-500 mb-1">Payment</p>
              <p className="text-gray-700">{proposal.parsed?.paymentTerms || 'N/A'}</p>
            </div>
            <div>
              <p className="font-semibold text-gray-500 mb-1">Warranty</p>
              <p className="text-gray-700">{proposal.parsed?.warranty || 'N/A'}</p>
            </div>
            <div>
              <p className="font-semibold text-gray-500 mb-1">Completeness</p>
              <p className="text-gray-700">{proposal.completeness || 0}%</p>
            </div>
            <div>
              <p className="font-semibold text-gray-500 mb-1">Updated</p>
              <p className="text-gray-700">{formatDate(proposal.updatedAt)}</p>
            </div>
          </div>

          {proposal.attachments && proposal.attachments.length > 0 && (
            <div className="mt-3">
              <p className="font-semibold text-gray-500 mb-1">Attachments</p>
              <div className="space-y-1">
                {proposal.attachments.map((attachment, index) => (
                  <div key={index} className="text-xs text-gray-700 flex items-center">
                    <svg className="w-3 h-3 mr-1 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
                    </svg>
                    {attachment}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
});

ProposalCard.displayName = 'ProposalCard';

export default ProposalCard;
