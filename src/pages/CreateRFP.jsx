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
      <div className="p-4">
        <h1 className="text-2xl font-bold mb-4">Create RFP</h1>
        <form onSubmit={handleSubmit} className="space-y-3 max-w-2xl">
          <input name="title" placeholder="RFP Title" className="border p-2 w-full" />
          <textarea name="description" placeholder="Describe requirements..." className="border p-2 w-full" rows="6"></textarea>
          <button className="bg-green-600 text-white p-2 rounded">Generate RFP</button>
        </form>
      </div>
    </Layout>
  );
}
