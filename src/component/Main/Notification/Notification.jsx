import { Pagination } from "antd";
import { useEffect, useState } from "react";
import { IoMdNotificationsOutline } from "react-icons/io";
import { IoChevronBack } from "react-icons/io5";
import { Link } from "react-router-dom";

import {
  useGetNotificationsQuery,
  useReadNotificationsMutation,
} from "../../../redux/features/profile/profileApi";

const Notification = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [filter, setFilter] = useState("");

  const limit = 20;

  // GET notifications
  const { data, isLoading } = useGetNotificationsQuery(
    {
      page: currentPage,
      limit,
      isRead: filter || undefined,
    },
    {
      refetchOnMountOrArgChange: true,
    }
  );

  // PATCH read notification
  const [readNotifications] = useReadNotificationsMutation();

  const notifications = data?.data || [];
  const total = data?.meta?.total || 0;

  // mark as read
  const handleRead = async (id) => {
    try {
      await readNotifications(id).unwrap();
    } catch (error) {
      console.log(error);
    }
  };

  // reset page when filter changes
  useEffect(() => {
    setCurrentPage(1);
  }, [filter]);

  const filters = [
    { label: "Unread", value: "false" },
    { label: "Read", value: "true" },
  ];

  return (
    <div className="p-4">

      {/* Header */}
      <div className="flex justify-between items-center my-4">
        <h1 className="text-2xl flex items-center gap-2">
          <Link to="/">
            <IoChevronBack className="text-2xl" />
          </Link>
          Notifications
        </h1>

        {/* Filter buttons */}
        <div className="flex gap-2">
          {filters.map((f) => (
            <button
              key={f.label}
              onClick={() => setFilter(f.value)}
              className={`px-3 py-1 border rounded transition ${
                filter === f.value
                  ? "bg-black text-white"
                  : "bg-white text-black"
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      {/* List */}
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <div className="space-y-3">
          {notifications.length === 0 ? (
            <p className="text-gray-500">No notifications found</p>
          ) : (
            notifications.map((item) => (
              <div
                key={item._id}
                onClick={() => handleRead(item._id)}
                className={`border rounded-md p-4 flex items-center gap-3 cursor-pointer transition ${
                  item.isRead ? "opacity-60" : "bg-blue-50"
                }`}
              >
                {/* Icon */}
                <div className="relative text-[#0F3D2E] border border-[#0F3D2E] rounded-full p-2">
                  {!item.isRead && (
                    <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
                  )}
                  <IoMdNotificationsOutline size={28} />
                </div>

                {/* Content */}
                <div className="flex-1">
                  <p className="font-semibold">{item.message}</p>
                  <p className="text-gray-500 text-sm">{item.time}</p>
                </div>

                {/* Button */}
                {!item.isRead && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleRead(item._id);
                    }}
                    className="text-blue-500 text-sm"
                  >
                    Mark as read
                  </button>
                )}
              </div>
            ))
          )}
        </div>
      )}

      {/* Pagination */}
      <div className="mt-4 flex justify-center">
        <Pagination
          current={currentPage}
          total={total}
          pageSize={limit}
          onChange={(page) => setCurrentPage(page)}
        />
      </div>
    </div>
  );
};

export default Notification;