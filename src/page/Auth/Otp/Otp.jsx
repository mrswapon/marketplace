import logo from "/logo/logo.png";
import {  useNavigate, useParams } from "react-router-dom";
import OTPInput from "react-otp-input";
import { useState } from "react";
import CustomButton from "../../../utils/CustomButton";
import {
  useForgotPasswordMutation,
  useVerifyEmailMutation,
} from "../../../redux/features/auth/authApi";
import { toast } from "sonner";

const Otp = () => {
  const [otp, setOtp] = useState("");
  const { email } = useParams();
  const navigate = useNavigate();
  const [forgotPassword] = useForgotPasswordMutation();
  const [verifyOtp, { isLoading }] = useVerifyEmailMutation();

  const handleOtpChange = (otpValue) => {
    setOtp(otpValue);
  };

  const handleMatchOtp = async () => {
    try {
      const res = await verifyOtp({ email, oneTimeCode: otp });
      if (res.error) toast.error(res?.error?.data?.message);
      if (res.data) {
        toast.success(res?.data?.message);
        navigate(`/auth/new-password/${email}`);
      }
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  const handleResendPassword = async () => {
    try {
      const res = await forgotPassword({ email });
      if (res.error) toast.error(res?.error?.data?.message);
      if (res.data) toast.success(res.data.message);
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="w-full min-h-screen flex items-center justify-center bg-[linear-gradient(180deg,_#DEFFF5_-61.52%,_#FFFFFF_100%)] px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-sm p-5 flex flex-col items-center">

        {/* Logo */}
        <img src={logo} alt="SellX" className="w-[80px] h-[80px] mb-1" />
       

        {/* Heading */}
        <h1 className="text-xl font-bold text-gray-900 mb-2">Check your email</h1>
        <p className="text-sm text-gray-500 text-center mb-8 leading-relaxed">
          We sent a reset link to {email}<br />
          enter 5 digit code that mentioned in the email
        </p>

        {/* OTP Input */}
        <OTPInput
          value={otp}
          onChange={handleOtpChange}
          numInputs={5}
          renderInput={(props) => <input {...props} />}
          containerStyle={{ display: "flex", gap: "10px", marginBottom: "32px" }}
          inputStyle={{
            width: "52px",
            height: "52px",
            fontSize: "20px",
            fontWeight: "600",
            color: "#111",
            textAlign: "center",
            border: "1.5px solid #e0e0e0",
            borderRadius: "10px",
            backgroundColor: "#f7f7f7",
            outline: "none",
          }}
        />

        {/* Verify Button */}
        <div onClick={handleMatchOtp} className="w-full mb-4">
          <CustomButton loading={isLoading} border className="w-full">
            Verify Code
          </CustomButton>
        </div>

        {/* Resend */}
        <p className="text-sm text-gray-500">
          You have not received the email?{" "}
          <button
            onClick={handleResendPassword}
            className="text-[#1a5c40] font-semibold hover:underline"
          >
            Resend
          </button>
        </p>
      </div>
    </div>
  );
};

export default Otp;