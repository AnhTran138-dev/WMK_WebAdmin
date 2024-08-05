import React from "react";
import { FaArrowUp, FaArrowDown } from "react-icons/fa"; // Hoặc thư viện bạn sử dụng

const ChangeDisplay: React.FC<{
  previousWeekTotal: number;
  percentChange: number;
}> = ({ previousWeekTotal, percentChange }) => {
  const isPositive = percentChange > 0;
  const textColor = isPositive ? "text-green-600" : "text-red-600";
  const icon = isPositive ? (
    <FaArrowUp className={`inline-block mr-1 ${textColor}`} />
  ) : (
    <FaArrowDown className={`inline-block mr-1 ${textColor}`} />
  );

  return (
    <p className={`flex items-center ${textColor}`}>
      <strong className="mr-1">Change:</strong>
      {previousWeekTotal === 0 ? (
        "N/A"
      ) : (
        <>
          {icon}
          {percentChange.toFixed(2)}%
        </>
      )}
    </p>
  );
};

export default ChangeDisplay;
