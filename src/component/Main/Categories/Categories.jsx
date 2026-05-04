/* eslint-disable react/prop-types */
import { useState } from "react";
import { Table, ConfigProvider, Modal, Upload } from "antd";
import { FiEdit2, FiTrash2, FiX } from "react-icons/fi";
import { FaStar, FaCar, FaHome, FaAnchor, FaBriefcase } from "react-icons/fa";
import { TiArrowSortedUp, TiArrowSortedDown } from "react-icons/ti";
import CategoriesStatus from "./CategoriesStatus";
import { RiCloudLine } from "react-icons/ri";

const { Dragger } = Upload;

const dataSource = [
  { key: "1", icon: <FaStar className="text-yellow-500" />, name: "SellX", sub: "Automobiles & Vehicles", listings: "12,482", pending: "240 pending review", trend: "+12.5%", trendUp: true },
  { key: "2", icon: <FaCar className="text-gray-500" />, name: "Cars", sub: "Automobiles & Vehicles", listings: "12,482", pending: "240 pending review", trend: "+12.5%", trendUp: true },
  { key: "3", icon: <FaHome className="text-gray-500" />, name: "Properties", sub: "Real Estate & Rentals", listings: "8,910", pending: "116 pending review", trend: "+4.2%", trendUp: true },
  { key: "4", icon: <FaAnchor className="text-gray-500" />, name: "Boats", sub: "Boats and riding kit", listings: "25,601", pending: "892 pending review", trend: "-1.8%", trendUp: false },
  { key: "5", icon: <FaBriefcase className="text-gray-500" />, name: "Jobs", sub: "Careers & Opportunities", listings: "5,230", pending: "45 pending review", trend: "+22.4%", trendUp: true },
];

const CategoriesTable = () => {
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState(null);
  console.log(selectedRecord);
  const [categoryName, setCategoryName] = useState("");

  // ── Add Modal handlers ──
  const handleAddOpen = () => {
    setCategoryName("");
    setAddModalOpen(true);
  };
  const handleAddClose = () => {
    setAddModalOpen(false);
    setCategoryName("");
  };

  // ── Edit Modal handlers ──
  const handleEditClick = (record) => {
    setSelectedRecord(record);
    setCategoryName(record.name);
    setEditModalOpen(true);
  };
  const handleEditClose = () => {
    setEditModalOpen(false);
    setSelectedRecord(null);
    setCategoryName("");
  };
  const handleSave = () => {
    // save logic here
    handleEditClose();
  };

  // ── Shared Modal Content ──
  const ModalBody = ({ onClose, onSave }) => (
    <>
      {/* Category Name */}
      <div className="mt-5 mb-5">
        <label className="block text-sm font-medium text-gray-700 mb-1.5">
          Category Name
        </label>
        <input
          type="text"
          placeholder="Enter category name"
          value={categoryName}
          onChange={(e) => setCategoryName(e.target.value)}
          className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-900 bg-gray-50 placeholder-gray-400 outline-none focus:border-[#1a4731] focus:bg-white transition"
        />
      </div>

      {/* Category Icon Upload */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-1.5">
          Category Icon
        </label>
        <Dragger
          accept="image/png,image/jpg,image/jpeg"
          multiple={false}
          showUploadList={false}
          beforeUpload={() => false}
          style={{
            background: "#fff",
            border: "1.5px dashed #e5e7eb",
            borderRadius: 12,
          }}
        >
          <div className="flex flex-col items-center py-4">
            <div className="mb-2">
              <RiCloudLine className="text-[#0F3D2E]" size={34} />
            </div>
            <p className="text-sm font-medium text-gray-700">Choose a file</p>
            <p className="text-xs text-gray-400 mt-1">PNG, JPG & JPEG formats, up to 50MB</p>
            <button
              type="button"
              onClick={(e) => e.stopPropagation()}
              className="mt-3 border border-gray-200 rounded-lg px-5 py-1.5 text-sm text-gray-600 bg-white hover:bg-gray-50 transition"
            >
              Browse File
            </button>
          </div>
        </Dragger>
      </div>

      {/* Footer */}
      <div className="flex gap-3">
        <button
          onClick={onClose}
          className="flex-1 py-2.5 rounded-xl border border-gray-200 bg-gray-50 text-sm font-medium text-gray-600 hover:bg-gray-100 transition"
        >
          Cancel
        </button>
        <button
          onClick={onSave}
          className="flex-[2] py-2.5 rounded-xl bg-[#1a4731] text-sm font-semibold text-white hover:bg-[#153a27] transition"
        >
          Save Category
        </button>
      </div>
    </>
  );

  const modalTheme = {
    components: {
      Modal: { borderRadiusLG: 16 },
    },
  };

  const columns = [
    {
      title: "CATEGORY NAME",
      render: (_, record) => (
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gray-100 flex items-center justify-center text-lg">
            {record.icon}
          </div>
          <div>
            <div className="font-semibold text-gray-900 text-sm">{record.name}</div>
            <div className="text-xs text-gray-400">{record.sub}</div>
          </div>
        </div>
      ),
    },
    {
      title: "ACTIVE LISTINGS",
      render: (_, record) => (
        <div>
          <div className="font-bold text-gray-900 text-sm">{record.listings}</div>
          <div className="text-xs text-gray-400">{record.pending}</div>
        </div>
      ),
    },
    {
      title: "TREND (30D)",
      render: (_, record) => (
        <span className={`flex items-center gap-1 text-sm font-semibold ${record.trendUp ? "text-emerald-500" : "text-red-500"}`}>
          {record.trendUp ? <TiArrowSortedUp size={18} /> : <TiArrowSortedDown size={18} />}
          {record.trend}
        </span>
      ),
    },
    {
      title: "Pending Listing",
      render: () => (
        <button className="border border-gray-200 rounded-full px-4 py-1 text-sm text-gray-600 hover:bg-gray-50 transition">
          View
        </button>
      ),
    },
    {
      title: "ACTIONS",
      render: (_, record) => (
        <div className="flex gap-5">
          {/* ✅ Edit icon → opens Edit Modal */}
          <button
            onClick={() => handleEditClick(record)}
            className="p-1.5 rounded-lg text-gray-400 hover:bg-gray-100 hover:text-gray-600 transition"
          >
            <FiEdit2 size={15} />
          </button>
          <button className="p-1.5 rounded-lg text-gray-400 hover:bg-gray-100 hover:text-red-500 transition">
            <FiTrash2 size={15} />
          </button>
        </div>
      ),
    },
  ];

  return (
    <>
      <ConfigProvider theme={modalTheme}>
        {/* ── Add Modal ── */}
        <Modal
          open={addModalOpen}
          onCancel={handleAddClose}
          footer={null}
          closeIcon={<FiX size={18} className="text-gray-400 hover:text-gray-600" />}
          title={<span className="text-lg font-bold text-gray-900">Add Categories</span>}
          width={480}
          centered
        >
          <ModalBody onClose={handleAddClose} onSave={handleAddClose} />
        </Modal>

        {/* ── Edit Modal ── */}
        <Modal
          open={editModalOpen}
          onCancel={handleEditClose}
          footer={null}
          closeIcon={<FiX size={18} className="text-gray-400 hover:text-gray-600" />}
          title={<span className="text-lg font-bold text-gray-900">Edit Category</span>}
          width={480}
          centered
        >
          <ModalBody onClose={handleEditClose} onSave={handleSave} />
        </Modal>
      </ConfigProvider>

      {/* ── Table Section ── */}
      <section>
        <CategoriesStatus onAddCategory={handleAddOpen} />
        <div className="bg-white rounded-2xl p-3 shadow-sm">
          <div className="flex items-center justify-between mb-5 px-3">
            <h2 className="text-lg xl:text-xl font-bold text-gray-900 ">Categories</h2>
            <button
              onClick={handleAddOpen}
              className="bg-[#0F3D2E] text-white font-bold py-2 px-4 rounded-md transition"
            >
              Add Category
            </button>
          </div>
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
      </section>
    </>
  );
};

export default CategoriesTable;