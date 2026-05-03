import { useState } from "react";
import { ConfigProvider, Modal, Space, Table, Button } from "antd";
import { AiOutlineEye } from "react-icons/ai";
import { FiCheck, FiX } from "react-icons/fi";
import { IoInformationCircleOutline } from "react-icons/io5";

const RecentListings = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedListing, setSelectedListing] = useState(null);
  const [activeTab, setActiveTab] = useState("all");

  const showModal = (record) => {
    setSelectedListing(record);
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setSelectedListing(null);
  };

  const data = [
    {
      id: 1,
      name: "2023 Mercedes EQE",
      image: "https://images.unsplash.com/photo-1617654112368-307921291f42?w=80&q=80",
      category: "Cars",
      seller: "Euro Motors",
      price: "$72,000",
      status: "Approved",
    },
    {
      id: 2,
      name: "Downtown Loft",
      image: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=80&q=80",
      category: "Properties",
      seller: "Skyline Realty",
      price: "$450k",
      status: "Pending",
    },
    {
      id: 3,
      name: "MacBook Pro M3",
      image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=80&q=80",
      category: "Electronics",
      seller: "Tech Hub",
      price: "$2,499",
      status: "Approved",
    },
    {
      id: 4,
      name: "Rolex Datejust",
      image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=80&q=80",
      category: "Electronics",
      seller: "Watch World",
      price: "$12,400",
      status: "Rejected",
    },
  ];

  const statusBadge = (status) => {
    const styles = {
      Approved: { background: "#e6f9f0", color: "#22c55e" },
      Pending:  { background: "#fff7e6", color: "#f59e0b" },
      Rejected: { background: "#fee2e2", color: "#ef4444" },
    };
    return (
      <span
        style={{
          ...styles[status],
          padding: "3px 14px",
          borderRadius: 20,
          fontWeight: 600,
          fontSize: 12,
        }}
      >
        {status}
      </span>
    );
  };

  const renderActions = (record) => {
    if (record.status === "Pending") {
      return (
        <Space size="middle">
          <FiCheck
            style={{ fontSize: 18, cursor: "pointer", color: "#aaa" }}
            className="hover:text-green-500 transition-colors"
            title="Approve"
          />
          <FiX
            style={{ fontSize: 18, cursor: "pointer", color: "#aaa" }}
            className="hover:text-red-500 transition-colors"
            title="Reject"
          />
        </Space>
      );
    }
    if (record.status === "Rejected") {
      return (
        <IoInformationCircleOutline
          onClick={() => showModal(record)}
          style={{ fontSize: 20, cursor: "pointer", color: "#aaa" }}
          title="Info"
        />
      );
    }
    // Approved
    return (
      <AiOutlineEye
        onClick={() => showModal(record)}
        style={{ fontSize: 20, cursor: "pointer", color: "#aaa" }}
        title="View"
      />
    );
  };

  const columns = [
    {
      title: "NAME",
      dataIndex: "name",
      key: "name",
      render: (text, record) => (
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <img
            src={record.image}
            alt={text}
            style={{
              width: 35,
              height: 35,
              borderRadius: 8,
              objectFit: "cover",
            }}
          />
          <span>{text}</span>
        </div>
      ),
    },
    {
      title: "CATEGORY",
      dataIndex: "category",
      key: "category",
      render: (text) => <span>{text}</span>,
    },
    {
      title: "SELLER",
      dataIndex: "seller",
      key: "seller",
      render: (text) => <span>{text}</span>,
    },
    {
      title: "PRICE",
      dataIndex: "price",
      key: "price",
      render: (text) => (
        <span >{text}</span>
      ),
    },
    {
      title: "STATUS",
      dataIndex: "status",
      key: "status",
      render: (status) => statusBadge(status),
    },
    {
      title: "ACTIONS",
      key: "actions",
      render: (_, record) => renderActions(record),
    },
  ];

  const filteredData =
    activeTab === "pending"
      ? data.filter((d) => d.status === "Pending")
      : data;

  const dataSource = filteredData.map((item) => ({
    key: item.id,
    ...item,
  }));

  return (
    <div
      style={{
        background: "#fff",
        borderRadius: 12,
        padding: 24,
        boxShadow: "0 1px 8px rgba(0,0,0,0.07)",
      }}
    >
      {/* Header */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h2 style={{ fontSize: 18, fontWeight: 700, color: "#1a1a2e" }}>
          Recent Listings
        </h2>
        <Space>
          <Button
            onClick={() => setActiveTab("all")}
            style={{
              background: activeTab === "all" ? "#1a1a2e" : "transparent",
              color: activeTab === "all" ? "#fff" : "#888",
              border: "none",
              borderRadius: 6,
              fontWeight: 500,
            }}
          >
            All
          </Button>
          <Button
            onClick={() => setActiveTab("pending")}
            style={{
              background: activeTab === "pending" ? "#1a1a2e" : "transparent",
              color: activeTab === "pending" ? "#fff" : "#888",
              border: "none",
              borderRadius: 6,
              fontWeight: 500,
            }}
          >
            Pending
          </Button>
          {/* Filter icon */}
          <button
            style={{
              background: "none",
              border: "1px solid #e0e0e0",
              borderRadius: 6,
              padding: "5px 10px",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
            }}
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="4" y1="6" x2="20" y2="6" />
              <line x1="8" y1="12" x2="16" y2="12" />
              <line x1="11" y1="18" x2="13" y2="18" />
            </svg>
          </button>
        </Space>
      </div>

      <ConfigProvider
        theme={{
          components: {
            Table: {
              headerBg: "#ffffff",
              headerColor: "#9b9b9b",
              headerBorderRadius: 0,
            },
          },
        }}
      >
        <Table
          columns={columns}
          dataSource={dataSource}
          pagination={false}
          scroll={{ x: 500 }}
        />
      </ConfigProvider>

      {/* Detail Modal */}
      <Modal
        open={isModalVisible}
        onCancel={handleCancel}
        footer={null}
        centered
      >
        {selectedListing && (
          <div>
            <h2 style={{ textAlign: "center", fontSize: 20, fontWeight: 700, marginBottom: 16 }}>
              Listing Details
            </h2>
            {[
              ["Name", selectedListing.name],
              ["Category", selectedListing.category],
              ["Seller", selectedListing.seller],
              ["Price", selectedListing.price],
              ["Status", selectedListing.status],
            ].map(([label, value]) => (
              <div
                key={label}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  padding: "12px 0",
                  borderBottom: "1px solid #f0f0f0",
                }}
              >
                <span style={{ color: "#888" }}>{label} :</span>
                <span style={{ fontWeight: 500 }}>{value}</span>
              </div>
            ))}
          </div>
        )}
      </Modal>
    </div>
  );
};

export default RecentListings;