import { useGetVendorsQuery } from "../features/vendors/vendorApi";
import Layout from "../components/layout/Layout";

export default function VendorList() {
  const { data } = useGetVendorsQuery();

  return (
    <Layout>
      <div className="p-4">
        <h1 className="text-2xl font-bold mb-4">Vendors</h1>
        <ul className="space-y-2">
          {data?.map((v) => (
            <li className="border p-2 rounded" key={v._id}>{v.name} - {v.email}</li>
          ))}
        </ul>
      </div>
    </Layout>
  );
}
