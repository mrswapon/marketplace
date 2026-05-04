import { useState } from "react";
import { ConfigProvider, Modal, Table } from "antd";
import moment from "moment";
import { FiFilter, FiChevronDown } from "react-icons/fi";
import { HiOutlineUserGroup } from "react-icons/hi";
import { FaStar } from "react-icons/fa";
import UserStats from "./UserStats";

const allUsersData = [
  {
    id: 1,
    accountID: 2010,
    firstName: "Sarah",
    lastName: "Jenkins",
    email: "sarah.j@outlook.com",
    address_line1: "123 Main St, Springfield",
    image: { url: "https://randomuser.me/api/portraits/women/1.jpg" },
    phone: "123-456-7890",
    createdAt: "2024-01-01T10:00:00",
    listings: 124,
    rating: 4.9,
    reviews: 482,
    status: "Active",
    block: false,
    dob: "1995-06-15",
    gender: "Female",
    bio: "I am a UI/UX Designer.",
    connections: 100,
  },
  {
    id: 2,
    accountID: 2011,
    firstName: "Jane",
    lastName: "Smith",
    email: "janesmith@example.com",
    address_line1: "456 Elm St, Springfield",
    image: { url: "https://randomuser.me/api/portraits/women/2.jpg" },
    phone: "987-654-3210",
    createdAt: "2024-02-01T14:30:00",
    listings: 98,
    rating: 4.7,
    reviews: 310,
    status: "Active",
    block: true,
    dob: "1990-03-22",
    gender: "Female",
    bio: "Product Manager",
    connections: 250,
  },
  {
    id: 3,
    accountID: 2012,
    firstName: "Alice",
    lastName: "Johnson",
    email: "alicejohnson@example.com",
    address_line1: "789 Oak St, Springfield",
    image: { url: "https://randomuser.me/api/portraits/women/3.jpg" },
    phone: "555-123-4567",
    createdAt: "2024-03-15T09:00:00",
    listings: 200,
    rating: 4.8,
    reviews: 580,
    status: "Active",
    block: false,
    dob: "1988-11-05",
    gender: "Female",
    bio: "Software Engineer",
    connections: 180,
  },
  {
    id: 4,
    accountID: 2013,
    firstName: "Bob",
    lastName: "Williams",
    email: "bobwilliams@example.com",
    address_line1: "101 Pine St, Springfield",
    image: { url: "https://randomuser.me/api/portraits/men/2.jpg" },
    phone: "555-987-6543",
    createdAt: "2024-04-10T16:45:00",
    listings: 57,
    rating: 4.3,
    reviews: 120,
    status: "Only Registered",
    block: true,
    dob: "1992-07-18",
    gender: "Male",
    bio: "Entrepreneur",
    connections: 75,
  },
  {
    id: 5,
    accountID: 2014,
    firstName: "Charlie",
    lastName: "Brown",
    email: "charliebrown@example.com",
    address_line1: "202 Maple St, Springfield",
    image: { url: "https://randomuser.me/api/portraits/men/3.jpg" },
    phone: "555-654-3210",
    createdAt: "2024-05-05T12:00:00",
    listings: 312,
    rating: 4.6,
    reviews: 740,
    status: "Active",
    block: false,
    dob: "1985-01-30",
    gender: "Male",
    bio: "Digital Marketer",
    connections: 430,
  },
  {
    id: 6,
    accountID: 2015,
    firstName: "Diana",
    lastName: "Prince",
    email: "diana@example.com",
    address_line1: "303 Cedar St, Shelbyville",
    image: { url: "https://randomuser.me/api/portraits/women/4.jpg" },
    phone: "444-111-2222",
    createdAt: "2024-06-20T08:00:00",
    listings: 88,
    rating: 4.5,
    reviews: 220,
    status: "Active",
    block: true,
    dob: "1993-09-10",
    gender: "Female",
    bio: "Graphic Designer",
    connections: 320,
  },
];

const FILTER_TABS = ["All Users", "Active Users", "Blocked Users"];

const Users = () => {
  const [activeFilter, setActiveFilter] = useState("All Users");
  const [users, setUsers] = useState(allUsersData);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleView = (record) => {
    setSelectedUser(record);
    setIsModalOpen(true);
  };

  const handleToggleBlock = (record) => {
    setUsers((prev) =>
      prev.map((u) => (u.id === record.id ? { ...u, block: !u.block } : u))
    );
  };

  const filteredData = users.filter((u) => {
    if (activeFilter === "Active Users") return !u.block;
    if (activeFilter === "Blocked Users") return u.block;
    return true;
  });

  const dataSource = filteredData.map((u, index) => ({
    ...u,
    si: index + 1,
    key: u.id,
    imageUrl: u.image?.url,
  }));

  const columns = [
    {
      title: (
        <span className="text-[11px] font-semibold tracking-widest uppercase text-gray-400">
          User Profile
        </span>
      ),
      dataIndex: "firstName",
      key: "profile",
      render: (_, record) => (
        <div className="flex items-center gap-3">
          <img
            src={record.imageUrl}
            alt={record.firstName}
            className="w-10 h-10 rounded-full object-cover flex-shrink-0"
          />
          <div>
            <p className="text-sm font-semibold text-gray-800 leading-tight">
              {record.firstName} {record.lastName}
            </p>
            <p className="text-xs text-gray-400 mt-0.5">{record.email}</p>
          </div>
        </div>
      ),
    },
    {
      title: (
        <span className="text-[11px] font-semibold tracking-widest uppercase text-gray-400">
          Listings
        </span>
      ),
      dataIndex: "listings",
      key: "listings",
      sorter: (a, b) => a.listings - b.listings,
      render: (val) => (
        <div>
          <p className="text-sm font-semibold text-gray-800">{val}</p>
          <p className="text-xs text-gray-400">Total Items</p>
        </div>
      ),
    },
    {
      title: (
        <span className="text-[11px] font-semibold tracking-widest uppercase text-gray-400">
          Rating
        </span>
      ),
      dataIndex: "rating",
      key: "rating",
      sorter: (a, b) => a.rating - b.rating,
      render: (val, record) => (
        <div className="flex items-center gap-1.5">
          <FaStar className="text-amber-400" size={14} />
          <span className="text-sm font-semibold text-gray-800">{val}</span>
          <span className="text-xs text-gray-400">({record.reviews})</span>
        </div>
      ),
    },
    {
      title: (
        <span className="text-[11px] font-semibold tracking-widest uppercase text-gray-400">
          Details
        </span>
      ),
      key: "details",
      render: (_, record) => (
        <button
          onClick={() => handleView(record)}
          className="px-4 py-1.5 rounded-lg border border-gray-200 text-sm text-gray-600 hover:bg-gray-50 hover:border-gray-300 transition-all duration-150 font-medium"
        >
          View
        </button>
      ),
    },
    {
      title: (
        <span className="text-[11px] font-semibold tracking-widest uppercase text-gray-400">
          Actions
        </span>
      ),
      key: "action",
      render: (_, record) => (
        <button
          onClick={() => handleToggleBlock(record)}
          title={record.block ? "Unblock User" : "Block User"}
          className="p-1.5 rounded-lg hover:bg-red-50 transition-colors duration-150 group"
        >
          {record.block ? (
            <HiOutlineUserGroup
              size={20}
              className="text-gray-400 group-hover:text-green-500 transition-colors"
            />
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-red-400 group-hover:text-red-600 transition-colors"
            >
              <circle cx="12" cy="8" r="4" />
              <path d="M20 21a8 8 0 1 0-16 0" />
              <line x1="2" y1="2" x2="22" y2="22" />
            </svg>
          )}
        </button>
      ),
    },
  ];

  return (
    <section className="space-y-5">
      <UserStats />

      <div className="bg-[#FFFFFF] rounded-2xl p-5 shadow-sm">
        {/* Header Row */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-bold text-gray-900">All Users</h2>

          {/* Filter Dropdown */}
          <div className="relative">
            <button
              onClick={() => setDropdownOpen((prev) => !prev)}
              className="flex items-center gap-1.5 px-3 py-2 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors"
            >
              <FiFilter size={15} className="text-gray-500" />
              <span className="text-sm text-gray-600 font-medium">
                {activeFilter}
              </span>
              <FiChevronDown
                size={14}
                className={`text-gray-400 transition-transform duration-200 ${
                  dropdownOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            {dropdownOpen && (
              <div className="absolute right-0 mt-1 w-44 bg-white border border-gray-100 rounded-xl shadow-lg z-50 overflow-hidden">
                {FILTER_TABS.map((tab) => (
                  <button
                    key={tab}
                    onClick={() => {
                      setActiveFilter(tab);
                      setDropdownOpen(false);
                    }}
                    className={`w-full text-left px-4 py-2.5 text-sm transition-colors ${
                      activeFilter === tab
                        ? "bg-[#0F3D2E] text-white font-medium"
                        : "text-gray-600 hover:bg-gray-50"
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Table */}
        <ConfigProvider
          theme={{
            components: {
              Table: {
                headerBg: "#FFFFFF",
                headerColor: "#9ca3af",
                borderRadiusLG: 12,
                fontSize: 12,
              },
            },
          }}
        >
          <Table
            dataSource={dataSource}
            columns={columns}
            pagination={{ pageSize: 5, position: ["bottomRight"] }}
            scroll={{ x: "max-content" }}
            responsive={true}
          />
        </ConfigProvider>
      </div>

      {/* View Modal */}
      <Modal
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        footer={null}
        centered
        width={460}
        styles={{
          content: { borderRadius: 16, padding: 0, overflow: "hidden" },
        }}
      >
        {selectedUser && (
          <div className="bg-white">
            {/* Header */}
            <div className="bg-gray-50 px-6 pt-6 pb-5 border-b border-gray-100">
              <div className="flex items-center gap-4">
                <img
                  src={selectedUser.imageUrl}
                  alt="Profile"
                  className="w-16 h-16 rounded-full object-cover ring-2 ring-white shadow"
                />
                <div>
                  <h2 className="text-lg font-semibold text-gray-900">
                    {selectedUser.firstName} {selectedUser.lastName}
                  </h2>
                  <p className="text-sm text-gray-500 mt-0.5">
                    {selectedUser.bio}
                  </p>
                  <p className="text-xs text-gray-400 mt-1">
                    {selectedUser.connections} connections
                  </p>
                </div>
              </div>
            </div>

            {/* Details */}
            <div className="px-6 py-4 space-y-0 divide-y divide-gray-50">
              {[
                { label: "Account ID", value: `#${selectedUser.accountID}` },
                { label: "First Name", value: selectedUser.firstName },
                { label: "Last Name", value: selectedUser.lastName },
                { label: "Email", value: selectedUser.email },
                { label: "Phone", value: selectedUser.phone },
                {
                  label: "Date of Birth",
                  value: moment(selectedUser.dob).format("DD MMM YYYY"),
                },
                { label: "Gender", value: selectedUser.gender },
                {
                  label: "Joining Date",
                  value: moment(selectedUser.createdAt).format("DD MMM YYYY"),
                },
                {
                  label: "Status",
                  value: (
                    <span
                      className={`text-xs font-medium px-2.5 py-1 rounded-full ${
                        selectedUser.block
                          ? "bg-red-50 text-red-600"
                          : "bg-green-50 text-green-700"
                      }`}
                    >
                      {selectedUser.block ? "Blocked" : "Active"}
                    </span>
                  ),
                },
              ].map(({ label, value }) => (
                <div
                  key={label}
                  className="flex items-center justify-between py-3"
                >
                  <p className="text-sm text-gray-400">{label}</p>
                  <p className="text-sm font-medium text-gray-800">{value}</p>
                </div>
              ))}
            </div>

            {/* Footer Actions */}
            <div className="px-6 pb-6 pt-2 flex gap-3">
              <button
                onClick={() => setIsModalOpen(false)}
                className="flex-1 py-2.5 rounded-xl border border-gray-200 text-sm font-medium text-gray-600 hover:bg-gray-50 transition-colors"
              >
                Close
              </button>
              <button
                onClick={() => {
                  handleToggleBlock(selectedUser);
                  setSelectedUser((prev) => ({
                    ...prev,
                    block: !prev.block,
                  }));
                }}
                className={`flex-1 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                  selectedUser.block
                    ? "bg-green-600 text-white hover:bg-green-700"
                    : "bg-red-500 text-white hover:bg-red-600"
                }`}
              >
                {selectedUser.block ? "Unblock User" : "Block User"}
              </button>
            </div>
          </div>
        )}
      </Modal>
    </section>
  );
};

export default Users;