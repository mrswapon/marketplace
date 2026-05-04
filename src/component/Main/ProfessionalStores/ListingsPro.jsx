import { ConfigProvider, Table } from "antd";
import { Link, useParams } from "react-router-dom";
import { Check, X, Eye } from "lucide-react";

const dataSource = [
  {
    key: "1",
    image: "🎧",
    imgBg: "bg-gray-800",
    title: "Pro Audio Headphones X1",
    id: "SLX-7829-01",
    category: "Electronics",
    seller: "TechHaven Pro",
    price: "$299.00",
    status: "Pending",
  },
  {
    key: "2",
    image: "⌚",
    imgBg: "bg-gray-100",
    title: "Minimalist White Watch",
    id: "SLX-2241-99",
    category: "Accessories",
    seller: "TechHaven Pro",
    price: "$145.00",
    status: "Pending",
  },
  {
    key: "3",
    image: "👟",
    imgBg: "bg-gray-200",
    title: "Urban Classic Sneakers",
    id: "SLX-5510-32",
    category: "Footwear",
    seller: "TechHaven Pro",
    price: "$89.00",
    status: "Pending",
  },
  {
    key: "4",
    image: "👟",
    imgBg: "bg-red-100",
    title: "Ultra-Light Sprint Shoes",
    id: "SLX-0091-11",
    category: "Sportswear",
    seller: "TechHaven Pro",
    price: "$120.00",
    status: "Approved",
  },
];



const ListingsPro = () => {
  const {id} = useParams();
  const columns = [
  {
    title: "IMAGE",
    dataIndex: "image",
    key: "image",
    render: (_, record) => (
      <div
        className={`w-12 h-12 rounded-xl ${record.imgBg} flex items-center justify-center text-2xl`}
      >
        {record.image}
      </div>
    ),
  },
  {
    title: "LISTING TITLE",
    dataIndex: "title",
    key: "title",
    render: (_, record) => (
      <div>
        <p className="font-semibold text-gray-900 text-sm">{record.title}</p>
        <p className="text-gray-400 text-xs mt-0.5">ID: {record.id}</p>
      </div>
    ),
  },
  {
    title: "CATEGORY",
    dataIndex: "category",
    key: "category",
    render: (val) => <span className="text-gray-600 text-sm">{val}</span>,
  },
  {
    title: "SELLER",
    dataIndex: "seller",
    key: "seller",
    render: (val) => (
      <div className="flex items-center gap-2 text-gray-700 text-sm">
        <span className="text-blue-500 text-base">⊕</span>
        {val}
      </div>
    ),
  },
  {
    title: "PRICE",
    dataIndex: "price",
    key: "price",
    render: (val) => (
      <span className="font-semibold text-gray-900 text-sm">{val}</span>
    ),
  },
  {
    title: "STATUS",
    dataIndex: "status",
    key: "status",
    render: (val) => {
      const isPending = val === "Pending";
      return (
        <span
          className={`flex items-center gap-1.5 text-xs font-medium ${
            isPending ? "text-amber-500" : "text-green-600"
          }`}
        >
          <span
            className={`w-2 h-2 rounded-full inline-block ${
              isPending ? "bg-amber-400" : "bg-green-500"
            }`}
          />
          {val}
        </span>
      );
    },
  },
  {
    title: "ACTIONS",
    key: "actions",
    render: (_, record) => (
      <div className="flex items-center gap-3">
        {record.status === "Pending" && (
          <>
            <button className="text-green-500 hover:text-green-600 transition-colors">
              <Check size={16} strokeWidth={2.5} />
            </button>
            <button className="text-red-400 hover:text-red-500 transition-colors">
              <X size={16} strokeWidth={2.5} />
            </button>
          </>
        )}
        <Link to={`/professional-stores/${id}/listing/${record.id}/`} className="text-gray-400 hover:text-gray-600 transition-colors">
          <Eye size={16} />
        </Link>
      </div>
    ),
  },
];
  return (
    <div className="w-full">
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
  );
};

export default ListingsPro;