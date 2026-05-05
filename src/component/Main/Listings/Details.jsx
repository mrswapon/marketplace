import { useState } from "react";
import { Mail, Phone, Calendar, ShieldCheck } from "lucide-react";
const Details = () => {
    const IMAGES = [
  "https://images.unsplash.com/photo-1614164185128-e4ec99c436d7?w=700&q=85",
  "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=700&q=85",
  "https://images.unsplash.com/photo-1587836374828-4dbafa94cf0e?w=700&q=85",
  "https://images.unsplash.com/photo-1548169874-53e85f753f1e?w=700&q=85",
  "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=700&q=85",
  "https://images.unsplash.com/photo-1614164185128-e4ec99c436d7?w=700&q=85",
];
  const [active, setActive] = useState(0);
  return (
    <section className="py-4 mt-2 md:mt-5">
    <div className="w-full md:flex justify-between">
  
  {/* LEFT: Image area */}
  <div className="flex flex-col gap-3 w-full  md:w-[50%]">
    
    {/* Main image */}
    <div className="rounded-lg overflow-hidden bg-gray-800 h-[300px]">
      <img
        src={IMAGES[active]}
        alt="watch"
        className="w-full h-full object-cover"
      />
    </div>

    {/* Thumbnails */}
    <div className="flex gap-3 overflow-hidden">
      {IMAGES.map((src, i) => (
        <button
          key={i}
          onClick={() => setActive(i)}
          className={`w-[148px] h-[110px] rounded-lg overflow-hidden shrink-0 border-2 transition 
            ${i === active ? "border-gray-900 opacity-100" : "border-transparent opacity-80"}
          `}
        >
          <img
            src={src}
            alt=""
            className="w-full h-full object-cover block"
          />
        </button>
      ))}
    </div>
  </div>

  {/* RIGHT: Seller panel */}
  <div className="  w-full md:w-[30%]">
    <div className="shadow rounded-md  p-7 md:px-7">
    {/* Avatar + Name + Trust */}
    <div className="flex items-start gap-3 mb-6">
      
      {/* Avatar */}
      <div className="w-[46px] h-[46px] rounded-full bg-gray-200 border border-gray-300 flex items-center justify-center shrink-0">
        <span className="text-[11px] text-gray-600 font-semibold">TH</span>
      </div>

      {/* Name */}
      <div className="flex-1">
        <div className="font-bold text-base text-gray-900 leading-tight">
          TechHaven Pro
        </div>

        <div className="inline-flex items-center bg-blue-50 rounded px-2 py-[2px] mt-1">
          <span className="text-[11px] font-semibold text-blue-600 tracking-wide">
            PROFESSIONAL STORE
          </span>
        </div>
      </div>

      {/* Trust */}
      <div className="text-right shrink-0">
        <div className="text-[11px] text-gray-400 mb-1">Trust Score</div>
        <div className="flex items-center gap-1 justify-end">
          <ShieldCheck className="w-4 h-4 text-green-500 stroke-[2.5]" />
          <span className="font-bold text-[17px] text-green-600">98%</span>
        </div>
      </div>
    </div>

    {/* Contact rows */}
    <div className="flex flex-col gap-5 mb-auto">
      {[
        { Icon: Mail, text: "m.chen@luxuryswiss.ch" },
        { Icon: Phone, text: "+41 44 211 44 00" },
        { Icon: Calendar, text: "Member since Oct 2019" },
      ].map(({ Icon, text }, i) => (
        <div key={i} className="flex items-center gap-3">
          <Icon className="w-4 h-4 text-gray-500 stroke-[1.8]" />
          <span className="text-sm text-gray-700">{text}</span>
        </div>
      ))}
    </div>

    {/* Buttons */}
    <div className="flex gap-3 mt-8">
      <button className="flex-1 py-[11px] rounded-lg border border-gray-300 bg-white text-gray-700 text-sm font-semibold hover:bg-gray-50 transition">
        Cancel
      </button>

      <button className="flex-1 py-[11px] rounded-lg bg-[#1a3a2a] text-white text-sm font-semibold hover:opacity-90 transition">
        Approve Listing
      </button>
    </div>
    </div>
  </div>
</div>
 <br />

    {/*  bottom section  */}
    <div className="w-full md:w-[50%]  p-5 bg-white shadow rounded-lg text-gray-900 text-sm font-sans">
      {/* Header */}
      <div className="mb-2">
        <div className="float-right flex items-center gap-1 text-orange-500 text-xs font-semibold tracking-wide">
          <span className="w-2 h-2 rounded-full bg-orange-500 inline-block" />
          PENDING REVIEW
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-1 clear-both">Rolex Submariner 2022</h2>
        <div className="text-xl font-bold text-blue-600 mb-1">$14,500.00</div>
        <div className="text-gray-500 text-xs flex items-center gap-1">
          ⊙ Zurich, Switzerland
        </div>
      </div>

      {/* Meta Grid */}
      <div className="grid grid-cols-4 border-t border-b border-gray-200 py-3 my-4">
        {[
          { label: "CATEGORY", value: "Luxury", sub: "Watches" },
          { label: "CONDITION", value: "Mint", sub: "(Unworn)" },
          { label: "SHIPPING", value: "Insured", sub: "Global" },
          { label: "LISTED", value: "2h ago", sub: "" },
        ].map(({ label, value, sub }) => (
          <div key={label}>
            <div className="text-xs text-gray-400 uppercase tracking-wider mb-1">{label}</div>
            <div className="text-sm font-semibold text-gray-900">{value}</div>
            {sub && <div className="text-xs text-gray-500">{sub}</div>}
          </div>
        ))}
      </div>

      {/* Description */}
      <div className="text-sm font-bold mb-2">Description</div>
      <p className="text-xs text-gray-600 leading-relaxed">
        For sale is a pristine, 2022 Rolex Submariner Date (Ref: 126610LN). This timepiece was
        purchased from an authorized dealer and has never been worn. It comes with the full set
        including the original green box, outer white box, green and white hangtags, and the
        international warranty card valid until 2027. The 41 mm Oystersteel case is perfectly
        proportioned and houses the caliber 3235 movement with a 70-hour power reserve.
      </p>
      <button className="text-blue-600 text-xs mt-2 bg-transparent border-none cursor-pointer p-0">
        Expand Description ▾
      </button>

      <hr className="border-t border-gray-200 my-5" />

      {/* Specifications */}
      <div className="text-sm font-bold mb-2">Specifications</div>
      <div className="bg-[#F1F3F2] rounded-lg p-3">
        <table className="w-full border-collapse ">
        <tbody>
          {[
            ["Brand", "Rolex", "Model", "Submariner Date"],
            ["Material", "Oystersteel", "Year", "2022"],
            ["Reference", "126610LN", "Movement", "Automatic 3235"],
          ].map((row, i) => (
            <tr key={i} className="border-t border-b border-gray-200">
              <td className="py-3 px-2 text-xs text-gray-400 w-[30%]">{row[0]}</td>
              <td className="py-3 px-2 text-xs font-semibold text-gray-900 w-[20%]">{row[1]}</td>
              <td className="py-3 px-2 text-xs text-gray-400 w-[25%]">{row[2]}</td>
              <td className="py-3 px-2 text-xs font-semibold text-gray-900 w-[25%]">{row[3]}</td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>
    </div>
    </section>
  );
};

export default Details;