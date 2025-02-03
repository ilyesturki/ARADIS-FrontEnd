import DataTable from "@/components/Common/DataTable/DataTable";
import { columns } from "@/components/Common/DataTable/Columns/UsersColumn";
import { fetchUsers } from "@/utils/Api/userApi";

// const users: Users[] = [
//   {
//     id: "1",
//     image: "/images/user1.png",
//     name: "John Doe",
//     email: "john.doe@example.com",
//     phone: "+1-555-555-5555",
//     status: "active",
//   },
//   {
//     id: "2",
//     image: "/images/user2.png",
//     name: "Jane Smith",
//     email: "jane.smith@example.com",
//     phone: "+1-555-555-6666",
//     status: "inactive",
//   },
//   {
//     id: "3",
//     image: "/images/user3.png",
//     name: "Alice Johnson",
//     email: "alice.johnson@example.com",
//     phone: "+1-555-555-7777",
//     status: "active",
//   },
// ];

const UsersPanel = async () => {
  const users = await fetchUsers();

  return <DataTable columns={columns} data={users} />;
};

export default UsersPanel;
