import { Mail, Phone, MapPin } from "lucide-react";

const Overview = () => {
  return (
    <div className="w-full  space-y-4">
      {/* Row 1: Store Information + Trust Metrics */}
      <div className="md:grid grid-cols-2 gap-4">
        {/* Store Information */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 mb-2 md:mb-0">
          <h3 className="text-gray-900 font-semibold text-base mb-3">Store Information</h3>
          <p className="text-gray-400 text-xs mb-1">Description</p>
          <p className="text-gray-600 text-sm leading-relaxed mb-6">
            Premium electronics provider specializing in the latest smartphones,
            laptops, and custom PC builds. Serving the community since 2021.
          </p>
          <div className="flex items-center justify-between">
            <span className="text-gray-400 text-xs tracking-widest uppercase">Owner</span>
            <span className="text-gray-900 font-medium text-sm">Marcus Sterling</span>
          </div>
        </div>

        {/* Trust Metrics */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
          <h3 className="text-gray-900 font-semibold text-base mb-4">Trust Metrics</h3>
          <div className="grid grid-cols-2 gap-3">
            {/* Rating */}
            <div className="bg-gray-50 rounded-xl p-5 flex flex-col items-center justify-center">
              <p className="text-gray-900 font-bold text-2xl">
                4.8 <span className="text-green-700">★</span>
              </p>
              <p className="text-green-600 text-xs mt-1">120 Reviews</p>
            </div>
            {/* Response Rate */}
            <div className="bg-gray-50 rounded-xl p-5 flex flex-col items-center justify-center">
              <p className="text-gray-900 font-bold text-2xl">95%</p>
              <p className="text-gray-400 text-xs mt-1">Response Rate</p>
            </div>
          </div>
        </div>
      </div>

      {/* Row 2: Contact Info */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
        <h3 className="text-gray-900 font-semibold text-base mb-4">Contact Info</h3>
        <div className="space-y-3">
          <div className="flex items-center gap-3 text-gray-600 text-sm">
            <Mail className="w-4 h-4 text-gray-400 flex-shrink-0" />
            contact@techhavenpro.com
          </div>
          <div className="flex items-center gap-3 text-gray-600 text-sm">
            <Phone className="w-4 h-4 text-gray-400 flex-shrink-0" />
            +1 (555) 012-3456
          </div>
          <div className="flex items-center gap-3 text-gray-600 text-sm">
            <MapPin className="w-4 h-4 text-gray-400 flex-shrink-0" />
            742 Silicon Valley, CA 94025
          </div>
        </div>
      </div>

      {/* Block Store Button */}
      <div className="flex justify-end">
        <button className="bg-red-50 text-red-500 text-sm font-medium px-5 py-2.5 rounded-xl hover:bg-red-100 transition-colors">
          Block store
        </button>
      </div>

    </div>
  );
};

export default Overview;