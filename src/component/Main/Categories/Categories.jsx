/* eslint-disable react/prop-types */
import { useState } from "react";
import { Table, ConfigProvider, Modal, Upload } from "antd";
import { FiEdit2, FiTrash2, FiX } from "react-icons/fi";
import CategoriesStatus from "./CategoriesStatus";
import { RiCloudLine } from "react-icons/ri";
import { toast } from "sonner";
import { useDeleteCategoryMutation, useGetCategoriesQuery } from "../../../redux/features/categories/categories";
import { imageBaseUrl } from "../../../config/imageBaseUrl";

const { Dragger } = Upload;

const CategoriesTable = () => {
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [categoryName, setCategoryName] = useState("");

  const { data, refetch } = useGetCategoriesQuery();
  const [DeleteCategory] = useDeleteCategoryMutation();

  // ── Map API data to table rows ──
  const dataSource = (data || []).map((item) => ({
    key: item.id,
    thumbnail: item.thumbnail,
    name: item.title,
    sub: item.description,
    listings: item.total_listings?.toLocaleString() ?? "0",
    pending: `${item.total_listings - item.active_listings} pending review`,
    active_listings: item.active_listings,
    isActive: item.isActive,
  }));

  // ── Delete handler ──
  const handleDelete = async (id) => {
    try {
     const res = await DeleteCategory(id).unwrap();
     console.log(res)
     if(res?.success === true){
      refetch()
       toast.success("Category deleted successfully");
     }
    } catch (error) {
      toast.error(`${error?.message || error?.data?.message || "something problems"}`);
      console.error("Failed to delete category:", error);
    }
  };

  // ── Add Modal handlers ──
  const handleAddOpen = () => { setCategoryName(""); setAddModalOpen(true); };
  const handleAddClose = () => { setAddModalOpen(false); setCategoryName(""); };

  // ── Edit Modal handlers ──
  const handleEditClick = (record) => { setCategoryName(record.name); setEditModalOpen(true); };
  const handleEditClose = () => { setEditModalOpen(false); setCategoryName(""); };
  const handleSave = () => handleEditClose();

  // ── Shared Modal Content ──
  const ModalBody = ({ onClose, onSave }) => (
    <>
      <div className="mt-5 mb-5">
        <label className="block text-sm font-medium text-gray-700 mb-1.5">Category Name</label>
        <input
          type="text"
          placeholder="Enter category name"
          value={categoryName}
          onChange={(e) => setCategoryName(e.target.value)}
          className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-900 bg-gray-50 placeholder-gray-400 outline-none focus:border-[#1a4731] focus:bg-white transition"
        />
      </div>
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-1.5">Category Icon</label>
        <Dragger
          accept="image/png,image/jpg,image/jpeg"
          multiple={false}
          showUploadList={false}
          beforeUpload={() => false}
          style={{ background: "#fff", border: "1.5px dashed #e5e7eb", borderRadius: 12 }}
        >
          <div className="flex flex-col items-center py-4">
            <RiCloudLine className="text-[#0F3D2E] mb-2" size={34} />
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
      <div className="flex gap-3">
        <button onClick={onClose} className="flex-1 py-2.5 rounded-xl border border-gray-200 bg-gray-50 text-sm font-medium text-gray-600 hover:bg-gray-100 transition">
          Cancel
        </button>
        <button onClick={onSave} className="flex-[2] py-2.5 rounded-xl bg-[#1a4731] text-sm font-semibold text-white hover:bg-[#153a27] transition">
          Save Category
        </button>
      </div>
    </>
  );

  const columns = [
    {
      title: "CATEGORY NAME",
      render: (_, record) => (
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gray-100 flex items-center justify-center overflow-hidden">
            <img
              src={record.thumbnail ? `${imageBaseUrl}${record?.thumbnail}` : "category"}
              alt={record.name}
              crossOrigin="anonymous"
              className="w-full h-full object-cover"
              onError={(e) => { e.target.style.display = "none"; }}
            />
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
      title: "STATUS",
      render: (_, record) => (
        <span className={`px-2 py-1 rounded-full text-xs font-semibold ${record.isActive ? "bg-emerald-100 text-emerald-600" : "bg-gray-100 text-gray-500"}`}>
          {record.isActive ? "Active" : "Inactive"}
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
          <button
            onClick={() => handleEditClick(record)}
            className="p-1.5 rounded-lg text-gray-400 hover:bg-gray-100 hover:text-gray-600 transition"
          >
            <FiEdit2 size={15} />
          </button>
          <button
            onClick={() => handleDelete(record.key)}
            className="p-1.5 rounded-lg text-gray-400 hover:bg-gray-100 hover:text-red-500 transition"
          >
            <FiTrash2 size={15} />
          </button>
        </div>
      ),
    },
  ];

  return (
    <>
      <ConfigProvider theme={{ components: { Modal: { borderRadiusLG: 16 } } }}>
        <Modal open={addModalOpen} onCancel={handleAddClose} footer={null} closeIcon={<FiX size={18} className="text-gray-400 hover:text-gray-600" />} title={<span className="text-lg font-bold text-gray-900">Add Categories</span>} width={480} centered>
          <ModalBody onClose={handleAddClose} onSave={handleAddClose} />
        </Modal>
        <Modal open={editModalOpen} onCancel={handleEditClose} footer={null} closeIcon={<FiX size={18} className="text-gray-400 hover:text-gray-600" />} title={<span className="text-lg font-bold text-gray-900">Edit Category</span>} width={480} centered>
          <ModalBody onClose={handleEditClose} onSave={handleSave} />
        </Modal>
      </ConfigProvider>

      <section>
        <CategoriesStatus onAddCategory={handleAddOpen} />
        <div className="bg-white rounded-2xl p-3 shadow-sm">
          <div className="flex items-center justify-between mb-5 px-3">
            <h2 className="text-lg xl:text-xl font-bold text-gray-900">Categories</h2>
            <button onClick={handleAddOpen} className="bg-[#0F3D2E] text-white font-bold py-2 px-4 rounded-md transition">
              Add Category
            </button>
          </div>
          <ConfigProvider theme={{ components: { Table: { headerBg: "#FFFFFF", headerColor: "#9ca3af", borderRadiusLG: 12, fontSize: 12 } } }}>
            <Table
              dataSource={dataSource}
              columns={columns}
              pagination={{ pageSize: 10, position: ["bottomRight"] }}
              scroll={{ x: "max-content" }}
            />
          </ConfigProvider>
        </div>
      </section>
    </>
  );
};

export default CategoriesTable;