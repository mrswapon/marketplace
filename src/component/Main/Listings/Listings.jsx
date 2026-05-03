import ListingsStats from "./listingsStatas";
import { useState } from "react";
import { Table, ConfigProvider, Tag } from "antd";
import { IoEyeSharp } from "react-icons/io5";
import { MdOutlineInfo } from "react-icons/md";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";

/* -------------------------------
   RANDOM IMAGE FUNCTION
--------------------------------*/
const getRandomImage = (seed) => {
  return `https://picsum.photos/seed/${seed}/50/50`;
};

/* -------------------------------
   DATA SOURCE
--------------------------------*/
const dataSource = [
  {
    key: "1",
    image: getRandomImage("headphone"),
    title: "Pro Audio Headphones X1",
    category: "Electronics",
    seller: "TechGuru_99",
    price: 299,
    status: "Pending",
  },
  {
    key: "2",
    image: getRandomImage("watch"),
    title: "Minimalist White Watch",
    category: "Accessories",
    seller: "SarahDesign",
    price: 145,
    status: "Rejected",
  },
  {
    key: "3",
    image: getRandomImage("shoes"),
    title: "Urban Classic Sneakers",
    category: "Footwear",
    seller: "Marcus_V",
    price: 89,
    status: "Pending",
  },
  {
    key: "4",
    image: getRandomImage("sports"),
    title: "Ultra-Light Sprint Shoes",
    category: "Sportswear",
    seller: "James_Store",
    price: 120,
    status: "Approved",
  },
  {
    key: "5",
    image: getRandomImage("sport"),
    title: "Ultra-Light Shoes",
    category: "Sportswear",
    seller: "James_Store",
    price: 130,
    status: "RecentlySold",
  },
    {
    key: "6",
    image: getRandomImage("headphone"),
    title: "Pro Audio Headphones X1",
    category: "Electronics",
    seller: "TechGuru_99",
    price: 299,
    status: "Pending",
  },
];

const Listings = () => {
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [filter, setFilter] = useState("All");

  console.log(selectedRecord);

  /* -------------------------------
     FILTER LOGIC
  --------------------------------*/
  const filteredData = dataSource.filter((item) => {
    if (filter === "All") return true;

    if (filter === "Pending Review")
      return item.status === "Pending";

    if (filter === "Active Listings")
      return item.status === "Approved";

    if (filter === "Rejected")
      return item.status === "Rejected";

    if (filter === "Recently Sold")
      return item.status === "RecentlySold";

    return true;
  });

  /* -------------------------------
     TABLE COLUMNS
  --------------------------------*/
  const columns = [
    {
      title: "Image",
      render: (_, record) => (
        <img
          src={record.image}
          alt={record.title}
          className="w-10 h-10 rounded-lg object-cover"
        />
      ),
    },
    {
      title: "Listing Title",
      render: (_, record) => (
        <span className="font-medium text-gray-800">
          {record.title}
        </span>
      ),
    },
    {
      title: "Category",
      dataIndex: "category",
    },
    {
      title: "Seller",
      dataIndex: "seller",
    },
    {
      title: "Price",
      dataIndex: "price",
      render: (price) => (
        <span className="font-semibold text-gray-800">
          ${price}
        </span>
      ),
    },
    {
      title: "Status",
      dataIndex: "status",
      render: (status) => (
        <Tag
          color={
            status === "Approved"
              ? "green"
              : status === "Pending"
              ? "orange"
              : status === "RecentlySold"
              ? "blue"
              : "red"
          }
        >
          {status}
        </Tag>
      ),
    },
    {
      title: "Action",
      render: (_, record) => {
        const status = record.status;

        return (
          <div className="flex items-center gap-3 text-lg">

            {/* Approved */}
            {status === "Approved" && (
              <IoEyeSharp
                onClick={() => setSelectedRecord(record)}
                className="text-[#FF8133] cursor-pointer hover:scale-110 transition"
              />
            )}

            {/* Pending */}
            {status === "Pending" && (
              <>
                <FaCheckCircle className="text-green-500 cursor-pointer hover:scale-110 transition" />
                <FaTimesCircle className="text-red-500 cursor-pointer hover:scale-110 transition" />
              </>
            )}

            {/* Rejected */}
            {status === "Rejected" && (
              <MdOutlineInfo
                onClick={() => setSelectedRecord(record)}
                className="text-blue-500 cursor-pointer hover:scale-110 transition"
              />
            )}

            {/* Recently Sold */}
            {status === "RecentlySold" && (
              <>
                <IoEyeSharp
                  onClick={() => setSelectedRecord(record)}
                  className="text-[#0F3D2E] cursor-pointer hover:scale-110 transition"
                />
                <MdOutlineInfo
                  onClick={() => setSelectedRecord(record)}
                  className="text-purple-500 cursor-pointer hover:scale-110 transition"
                />
              </>
            )}

          </div>
        );
      },
    },
  ];

  /* -------------------------------
     FILTER TABS
  --------------------------------*/
  const tabs = [
    "All",
    "Pending Review",
    "Active Listings",
    "Rejected",
    "Recently Sold",
  ];

  return (
    <div>
      <ListingsStats />

      <div className="bg-white p-4 shadow rounded-xl">

        {/* FILTER TABS */}
        <div className="flex flex-wrap gap-4 mb-5 ">
          {tabs.map((item) => (
            <button
              key={item}
              onClick={() => setFilter(item)}
              className={`px-2 py-1 text-sm md:text-base font-medium transition-all duration-200
                ${
                  filter === item
                    ? "border-b-2 border-[#0F3D2E] text-[#0F3D2E]"
                    : "text-gray-500"
                }
              `}
            >
              {item}
            </button>
          ))}
        </div>

        {/* TABLE */}
        <ConfigProvider
          theme={{
            components: {
              Table: {
                headerBg: "#FFFFFF",
                headerColor: "#6B7280",
                borderRadiusLG: 10,
              },
            },
          }}
        >
          <Table
            dataSource={filteredData}
            columns={columns}
            pagination={{
              pageSize: 10,
              position: ["bottomRight"],
              showQuickJumper: true,
            }}
            scroll={{ x: "max-content" }}
          />
        </ConfigProvider>
      </div>
    </div>
  );
};

export default Listings;