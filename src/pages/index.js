import { useEffect, useState } from "react";
import Layout from "@/components/layout";
import Table from "@/components/table";
import { fetchUsers } from "@/utils/api";

export default function Home() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const columns = [
    // {
    //   header: "ID",
    //   accessorKey: "id",
    // },
    {
      header: "Name",
      accessorKey: "name",
    },
    {
      header: "Email",
      accessorKey: "email",
    },
    {
      header: "Phone",
      accessorKey: "phone",
    },
    {
      header: "Website",
      accessorKey: "website",
    },
    {
      header: "Company Name",
      accessorKey: "company.name",
    },
    {
      header: "Company CatchPhrase",
      accessorKey: "company.catchPhrase",
    },
    {
      header: "Company BS",
      accessorKey: "company.bs",
    },
    {
      header: "Address Street",
      accessorKey: "address.street",
    },
    {
      header: "Address Suite",
      accessorKey: "address.suite",
    },
    {
      header: "Address City",
      accessorKey: "address.city",
    },
    {
      header: "Address Zipcode",
      accessorKey: "address.zipcode",
    },
    {
      header: "Address Geo Lat",
      accessorKey: "address.geo.lat",
    },
    {
      header: "Address Geo Lng",
      accessorKey: "address.geo.lng",
    },
  ];

  useEffect(() => {
    const getUsers = async () => {
      try {
        const users = await fetchUsers();
        setData(users);
        setLoading(false);
      } catch (error) {
        setError("Failed to fetch data");
        setLoading(false);
      }
    };

    getUsers();
  }, []);

  //console.log("data", data);

  if (loading) {
    return (
      <Layout>
        <h1>Loading...</h1>
      </Layout>
    );
  }

  if (error) {
    return (
      <Layout>
        <h1>{error}</h1>
      </Layout>
    );
  }

  return (
    <Layout>
      <h1 className="text-2xl font-semibold mb-4">User Information</h1>
      <Table columns={columns} data={data} />{" "}
    </Layout>
  );
}
