import { useParams } from "react-router-dom";
import { useCompareProposalsQuery } from "../features/proposals/proposalApi";

export default function ProposalComparison() {
  const { id } = useParams();
  const { data } = useCompareProposalsQuery(id);

  return (
    <div className="p-4">
      <h2 className="font-bold">Proposal Comparison</h2>
      <pre className="mt-4 bg-gray-100 p-4">{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
}
