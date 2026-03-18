export default function Footer() {
  return (
    <footer className="mt-12 border-t border-gray-200 pt-8 pb-12">
      <h3 className="font-[family-name:var(--font-heading)] font-semibold text-gray-900 mb-4 text-center">
        Formulas Used
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-2 max-w-2xl mx-auto text-sm text-gray-500">
        <p><span className="font-medium text-gray-700">Break-Even CPC</span> = AOV &times; Margin &times; CVR</p>
        <p><span className="font-medium text-gray-700">Break-Even ROAS</span> = 1 &divide; Margin</p>
        <p><span className="font-medium text-gray-700">Current ROAS</span> = (AOV &times; CVR) &divide; CPC</p>
        <p><span className="font-medium text-gray-700">Clicks</span> = Budget &divide; CPC</p>
        <p><span className="font-medium text-gray-700">Impressions</span> = Clicks &divide; CTR</p>
        <p><span className="font-medium text-gray-700">Conversions</span> = Clicks &times; CVR</p>
        <p><span className="font-medium text-gray-700">Revenue</span> = Conversions &times; AOV</p>
        <p><span className="font-medium text-gray-700">Net Profit</span> = (Revenue &times; Margin) &minus; Budget</p>
        <p><span className="font-medium text-gray-700">Blended ROAS</span> = Total Revenue &divide; Total Spend</p>
      </div>
      <p className="text-center text-sm text-gray-400 mt-8">
        COMM 464 Group Project — Break-Even Analysis by Ryan
      </p>
    </footer>
  );
}
