import { useState } from "react";
import { ConfigProvider, Table } from "antd";
import moment from "moment";
import { FiFilter,  } from "react-icons/fi";
import EarningsStatus from "./EarningsStatus";

const allTransactionsData = [
  {
    id: 1,
    firstName: "Marcus",
    lastName: "Chen",
    email: "marcus@example.com",
    image: { url: "https://randomuser.me/api/portraits/men/32.jpg" },
    paymentType: "Boost",
    amount: 249.00,
    date: "2023-10-24",
    status: "Approved",
  },
  {
    id: 2,
    firstName: "Elena",
    lastName: "Rodriguez",
    email: "elena.r@agency.com",
    image: { url: "https://randomuser.me/api/portraits/women/44.jpg" },
    paymentType: "Story",
    amount: 1200.00,
    date: "2023-10-23",
    status: "Pending",
  },
  {
    id: 3,
    firstName: "Julian",
    lastName: "Voss",
    email: "voss@techlabs.io",
    image: { url: "https://randomuser.me/api/portraits/men/12.jpg" },
    paymentType: "Listing",
    amount: 50.00,
    date: "2023-10-23",
    status: "Approved",
  },
  {
    id: 4,
    firstName: "Sarah",
    lastName: "Jenkins",
    email: "sarah.j@design.com",
    image: { url: "https://randomuser.me/api/portraits/women/1.jpg" },
    paymentType: "Boost",
    amount: 249.00,
    date: "2023-10-22",
    status: "Rejected",
  },
  {
    id: 5,
    firstName: "David",
    lastName: "Miller",
    email: "miller.d@corpsol.com",
    image: { url: "https://randomuser.me/api/portraits/men/55.jpg" },
    paymentType: "Story",
    amount: 850.00,
    date: "2023-10-22",
    status: "Approved",
  },
];

const paymentTypeBadge = {
  Boost:   "bg-blue-50 text-blue-500",
  Story:   "bg-orange-50 text-orange-500",
  Listing: "bg-green-50 text-green-600",
};

const statusStyle = {
  Approved: "text-green-600",
  Pending:  "text-amber-500",
  Rejected: "text-red-500",
};

const Earnings = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  console.log(dropdownOpen);
  const dataSource = allTransactionsData.map((u, index) => ({
    ...u,
    key: u.id,
    si: index + 1,
    imageUrl: u.image?.url,
  }));

  const columns = [
    {
      title: (
        <span className="text-[11px] font-semibold tracking-widest uppercase text-gray-400">
          User
        </span>
      ),
      dataIndex: "firstName",
      key: "user",
      render: (_, record) => (
        <div className="flex items-center gap-3">
          <img
            src={record.imageUrl}
            alt={record.firstName}
            className="w-9 h-9 rounded-full object-cover flex-shrink-0"
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
          Payment Type
        </span>
      ),
      dataIndex: "paymentType",
      key: "paymentType",
      render: (val) => (
        <span
          className={`px-3 py-1 rounded-md text-xs font-medium ${paymentTypeBadge[val]}`}
        >
          {val}
        </span>
      ),
    },
    {
      title: (
        <span className="text-[11px] font-semibold tracking-widest uppercase text-gray-400">
          Amount
        </span>
      ),
      dataIndex: "amount",
      key: "amount",
      sorter: (a, b) => a.amount - b.amount,
      render: (val) => (
        <span className="text-sm font-semibold text-gray-800">
          ${val.toFixed(2)}
        </span>
      ),
    },
    {
      title: (
        <span className="text-[11px] font-semibold tracking-widest uppercase text-gray-400">
          Date
        </span>
      ),
      dataIndex: "date",
      key: "date",
      render: (val) => (
        <span className="text-sm text-gray-500">
          {moment(val).format("MMM DD, YYYY")}
        </span>
      ),
    },
    {
      title: (
        <span className="text-[11px] font-semibold tracking-widest uppercase text-gray-400">
          Status
        </span>
      ),
      dataIndex: "status",
      key: "status",
      render: (val) => (
        <span className={`text-sm font-semibold ${statusStyle[val]}`}>
          {val}
        </span>
      ),
    },
    {
      title: (
        <span className="text-[11px] font-semibold tracking-widest uppercase text-gray-400">
          Action
        </span>
      ),
      key: "action",
      render: () => (
        <button className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition-colors text-lg leading-none font-bold">
          ⋮
        </button>
      ),
    },
  ];

  return (
    <section className="space-y-5">
      <EarningsStatus />

      <div className="bg-white rounded-2xl p-5 shadow-sm">
        {/* Header Row */}
        <div className="flex justify-between items-start mb-4">
          <div>
            <h2 className="text-base font-bold text-gray-900">Recent Transactions</h2>
            <p className="text-xs text-gray-400 mt-0.5">Real-time update of all platform payments.</p>
          </div>

          {/* Filter Button */}
          <div className="relative">
            <button
              onClick={() => setDropdownOpen((prev) => !prev)}
              className="flex items-center gap-1.5 px-3 py-2 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors"
            >
              <FiFilter size={14} className="text-gray-500" />
              <span className="text-sm text-gray-600 font-medium">Filter</span>
            </button>
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
            pagination={{
              pageSize: 5,
              position: ["bottomRight"],
            }}
            scroll={{ x: "max-content" }}
            responsive={true}
          />
        </ConfigProvider>
      </div>
    </section>
  );
};

export default Earnings;