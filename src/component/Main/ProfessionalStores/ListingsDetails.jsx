const ListingsDetails = () => {
  return (
    <div className="max-w-2xl  p-5 bg-white text-gray-900 text-sm font-sans">

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
      <table className="w-full border-collapse">
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
  );
};

export default ListingsDetails;