import React from "react";
import KleoMate from "../../../assets/dashboard/KleoMate.jsx";

const Card = ({ title, description, buttonColor, backgroundColor, textColor, iconColor, iconBgColor }) => {
  return (
    <div
      className="p-5 rounded-lg"
      style={{ backgroundColor: backgroundColor, color: textColor }}
    >
      <div
        className="flex items-center justify-center h-10 w-10 rounded"
        style={{ backgroundColor: iconBgColor }}
      >
        <KleoMate color={iconColor} />
      </div>
      <div className="flex items-center mb-2 mt-2">
        <h4 className="text-lg font-semibold">{title}</h4>
      </div>
      <p className="text-sm font-normal mb-4">{description}</p>
      <button
        className="py-2 px-4 rounded-lg font-semibold hover:bg-opacity-90"
        style={{ backgroundColor: buttonColor, color: backgroundColor === '#293056' ? '#6941C6' : 'white' }}
      >
        View Proposal
      </button>
    </div>
  );
};

const Snapshot = () => {
  const cardsData = [
    {
      title: "Kleo Mate",
      description:
        "a social networking dating website wants to request your data..",
      buttonColor: "#FFFFFF",
      backgroundColor: "#293056",
      textColor: "white",
      iconColor: "white",
      iconBgColor: "#475467"
    },
    {
      title: "Defi Creator",
      description:
        "a decentralised finance is requesting your data to share top investment ...",
      buttonColor: "#7F56D9",
      backgroundColor: "#F9FAFB",
      textColor: "#000",
      iconColor: "#363F72",
      iconBgColor: "#F9FAFB"
    },
    {
      title: "Decentralised Youtube",
      description:
        "seeking user data for personalised recommendation engine...",
      buttonColor: "#7F56D9",
      backgroundColor: "#F9FAFB",
      textColor: "#000",
      iconColor: "#363F72",
      iconBgColor: "#F9FAFB"
    },
  ];

  return (
    <div className="bg-white p-6 rounded-xl mx-auto">
      <h3 className="text-2xl font-semibold mb-2">Snapshot</h3>
      <p className="text-gray-500 mb-6">
        Vote and be eligible to earn more KLEO XP!
      </p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {cardsData.map((card, index) => (
          <Card key={index} {...card} />
        ))}
      </div>
    </div>
  );
};

export default Snapshot;
