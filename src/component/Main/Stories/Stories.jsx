import { useState } from "react";
import PropTypes from "prop-types";
import { FiClock, FiCheck, FiX } from "react-icons/fi";
import { Pagination } from "antd";
import StoriesStatus from "./StoriesStatus";

// ─── JSON Data ───────────────────────────────────────────────
const storiesData = [
  {
    id: 1,
    badge: "NEW",
    badgeColor: "bg-purple-600",
    timeLeft: "24h Left",
    image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&q=80",
    avatar: "https://i.pravatar.cc/32?img=1",
    author: "Alex River",
    linkedProduct: "LINKED PRODUCT",
    product: "iPhone 13 Pro Max",
    status: "actions",
  },
  {
    id: 2,
    badge: null,
    timeLeft: "12h Left",
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&q=80",
    avatar: "https://i.pravatar.cc/32?img=5",
    author: "Elena Smith",
    linkedProduct: "LINKED PRODUCT",
    product: "Nike Air Max Pro",
    status: "actions",
  },
  {
    id: 3,
    badge: "EXPIRED",
    badgeColor: "bg-orange-400",
    timeLeft: null,
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&q=80",
    avatar: "https://i.pravatar.cc/32?img=8",
    author: "Marc J.",
    linkedProduct: "LINKED PRODUCT",
    product: "No links",
    status: "session_ended",
  },
  {
    id: 4,
    badge: null,
    timeLeft: "2h Left",
    image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=400&q=80",
    avatar: "https://i.pravatar.cc/32?img=9",
    author: "Sarah Lee",
    linkedProduct: "LINKED PRODUCT",
    product: "Retro Cam Pro",
    status: "actions",
  },
  {
    id: 5,
    badge: "NEW",
    badgeColor: "bg-purple-600",
    timeLeft: "24h Left",
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&q=80",
    avatar: "https://i.pravatar.cc/32?img=12",
    author: "Tom Wilson",
    linkedProduct: "LINKED PRODUCT",
    product: "Speed Runner X",
    status: "actions",
  },
    {
    id: 5,
    badge: "NEW",
    badgeColor: "bg-purple-600",
    timeLeft: "24h Left",
    image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&q=80",
    avatar: "https://i.pravatar.cc/32?img=12",
    author: "Tom Wilson",
    linkedProduct: "LINKED PRODUCT",
    product: "Speed Runner X",
    status: "actions",
  },
];

// ─── StoryCard ────────────────────────────────────────────────
const StoryCard = ({ story }) => (
  <div className="bg-white rounded-2xl overflow-hidden shadow-sm flex flex-col">
    <div className="relative h-52">
      <img
        src={story.image}
        alt={story.product}
        className="w-full h-64 object-cover"
      />
      {story.badge && (
        <span
          className={`absolute top-2 left-2 text-white text-xs font-bold px-2 py-0.5 rounded-full ${story.badgeColor}`}
        >
          {story.badge}
        </span>
      )}
      {story.timeLeft && (
        <span className="absolute top-2 right-2 bg-white bg-opacity-90 text-gray-600 text-xs font-medium px-2 py-0.5 rounded-full flex items-center gap-1">
          <FiClock size={11} />
          {story.timeLeft}
        </span>
      )}
    </div>

    <div className="p-3 flex flex-col gap-2 mt-12">
      <div className="flex items-center gap-2">
        <img
          src={story.avatar}
          alt={story.author}
          className="w-6 h-6 rounded-full object-cover"
        />
        <span className="text-sm font-medium text-gray-800">{story.author}</span>
      </div>
      <div>
        <p className="text-xs font-semibold text-blue-500 tracking-wide">
          {story.linkedProduct}
        </p>
        <p className="text-sm font-bold text-gray-900 mt-0.5">{story.product}</p>
      </div>
      {story.status === "actions" ? (
        <div className="flex items-center gap-2 mt-1">
          <button className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center hover:bg-green-50 transition-colors">
            <FiCheck size={16} className="text-green-500" />
          </button>
          <button className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center hover:bg-red-50 transition-colors">
            <FiX size={16} className="text-red-500" />
          </button>
        </div>
      ) : (
        <p className="text-xs text-gray-400 italic mt-1">Session ended</p>
      )}
    </div>
  </div>
);

StoryCard.propTypes = {
  story: PropTypes.shape({
    id: PropTypes.number.isRequired,
    badge: PropTypes.string,
    badgeColor: PropTypes.string,
    timeLeft: PropTypes.string,
    image: PropTypes.string.isRequired,
    avatar: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    linkedProduct: PropTypes.string.isRequired,
    product: PropTypes.string.isRequired,
    status: PropTypes.oneOf(["actions", "session_ended"]).isRequired,
  }).isRequired,
};

// ─── Stories ──────────────────────────────────────────────────
const Stories = () => {
  const [page, setPage] = useState(1);
  const pageSize = 10;
  const total = 100;

  const start = (page - 1) * pageSize + 1;
  const end = Math.min(page * pageSize, total);

  return (
    <div>
      <StoriesStatus />
      <br />
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
        {storiesData.map((story) => (
          <StoryCard key={story.id} story={story} />
        ))}
      </div>

      <div className="flex items-center justify-between mt-6 bg-[#FFFFFF] p-4 rounded-lg shadow-sm border border-gray-100">
        <span className="text-sm text-gray-500">
          Showing {start}–{end} of {total.toLocaleString()} stories
        </span>
        <Pagination
          current={page}
          total={total}
          pageSize={pageSize}
          onChange={(p) => setPage(p)}
            showSizeChanger={false}
        />
      </div>
    </div>
  );
};

export default Stories;