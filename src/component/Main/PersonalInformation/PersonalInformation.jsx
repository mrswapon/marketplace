import { IoChevronBack } from "react-icons/io5";
import { Link } from "react-router-dom";
import { imageBaseUrl } from "../../../config/imageBaseUrl";
import { useSelector } from "react-redux";
import { Form } from "antd";
import { useEffect } from "react";
import CustomInput from "../../../utils/CustomInput";
import profile from "/logo/profile.jpg";
const PersonalInformation = () => {
  const { user } = useSelector((state) => state.auth);
  const [form] = Form.useForm();

  useEffect(() => {
    if (user) {
      form.setFieldsValue({
        fullName: user.fullName,
        email: user.email,
        phone: user.phone,
      });
    }
  }, [user, form]);

  return (
    <div className="w-full  bg-gray-50 py-6">

      {/* Header */}
      <div className="flex items-center gap-2 mb-6">
        <Link to="/">
          <IoChevronBack className="text-2xl" />
        </Link>
        <h1 className="text-2xl font-semibold">Personal Information</h1>
      </div>

      {/* Main Card */}
      <div className="bg-white rounded-xl shadow-sm p-6 flex gap-10">

        {/* LEFT SIDE */}
        <div className="w-[260px] flex flex-col items-center text-center">
          <img
            src={user?.image?.url ? `${imageBaseUrl}${user.image.url}` : profile}
            alt="profile"
            className="w-40 h-40 rounded-2xl object-cover"
          />

          <h2 className="mt-3 font-semibold text-lg">
            {user?.fullName || "User Name"}
          </h2>

          <p className="text-gray-500 text-sm uppercase">
            {user?.role}
          </p>
        </div>

        {/* RIGHT SIDE */}
        <div className="flex-1">

          <Form
            form={form}
            layout="vertical"
            className="space-y-4"
          >
            {/* Full Name */}
            <Form.Item label="Full Name" name="fullName">
              <CustomInput
                disabled
                className="bg-[#f1f3f2]"
              />
            </Form.Item>

            {/* Email */}
            <Form.Item label="Email Address" name="email">
              <CustomInput
                disabled
                className="bg-[#f1f3f2]"
              />
            </Form.Item>

            {/* Phone */}
            <Form.Item label="Phone Number" name="phone">
              <CustomInput
                disabled
                className="bg-[#f1f3f2]"
              />
            </Form.Item>

            {/* Buttons */}
            <div className="flex justify-end gap-4 pt-4">

              <button className="px-6 py-2 rounded-lg bg-[#E8F3EF] text-[#0f3d2e] font-medium">
                Change Password
              </button>

              <Link to="/edit-personal-info">
                <button className="px-6 py-2 rounded-lg bg-[#0f3d2e] text-white font-medium">
                  Edit Profile
                </button>
              </Link>

            </div>
          </Form>

        </div>
      </div>
    </div>
  );
};

export default PersonalInformation;