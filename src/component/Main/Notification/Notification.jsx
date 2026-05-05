import { Pagination } from "antd";
import { useState } from "react";
import { IoMdNotificationsOutline } from "react-icons/io";
import { IoChevronBack } from "react-icons/io5";
import { Link } from "react-router-dom";

const Notification = () => {
  const [currentPage, setCurrentPage] = useState(1);

  // Sample data
  const notifications = [
    { id: 1, message: "You have a new order delivery for Luke.", time: "2 Min Ago" },
    { id: 2, message: "You have shipment 5 days for Luke.", time: "2 Min Ago" },
    { id: 3, message: "You have a new message from Luke.", time: "2 Min Ago" },
    { id: 4, message: "You have a new message from Luke.", time: "2 Min Ago" },
    { id: 5, message: "You have a new message from Luke.", time: "2 Min Ago" },
    { id: 6, message: "You have a new message from Luke.", time: "2 Min Ago" },
    { id: 7, message: "You have shipment 5 days for Luke.", time: "2 Min Ago" },
    { id: 8, message: "You have a new order delivery for Luke.", time: "2 Min Ago" },
    { id: 9, message: "Your package has been dispatched to Luke.", time: "3 Min Ago" },
    { id: 10, message: "Your shipment is delayed for Luke.", time: "5 Min Ago" },
    { id: 11, message: "You have a new order delivery for Sarah.", time: "7 Min Ago" },
    { id: 12, message: "Your shipment is ready for pickup.", time: "10 Min Ago" },
    { id: 13, message: "You have a new message from Sarah.", time: "12 Min Ago" },
    { id: 14, message: "You have an update on your order for John.", time: "15 Min Ago" },
    { id: 15, message: "You have a new message from Emily.", time: "20 Min Ago" },
  ];

  const pageSize = 25

  // Pagination Logic
  const paginatedNotifications = notifications.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const onPageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl flex items-center mb-4"><Link to='/'><IoChevronBack className="text-2xl" /> </Link>Notification</h1>

      <div className="space-y-4">
        {paginatedNotifications.map((item) => (
          <div key={item.id} className="border border-[#0F3D2E] rounded-md p-4 flex items-center space-x-4">
            <div className="text-[#0F3D2E] border border-[#0F3D2E] rounded-full p-2">
              <span className="text-[#0F3D2E] bg-[#0F3D2E] p-1.5 rounded-full absolute ml-4"></span>
              <IoMdNotificationsOutline size={30} className="relative" />
            </div>
            <div>
              <p className="font-semibold">{item.message}</p>
              <p className="text-gray-500">{item.time}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Centering the Pagination */}
      <div className="mt-4 flex justify-center">
        <Pagination
          current={currentPage}
          total={notifications.length}
          pageSize={pageSize}
          onChange={onPageChange}
        />
      </div>
    </div>
  );
};

export default Notification;
