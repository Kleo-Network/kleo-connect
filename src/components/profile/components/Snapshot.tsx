import React from "react";
import KleoMate from "../../../assets/dashboard/KleoMate.jsx";

interface SnapShotCardprops {
  title: string;
  description: string;
  buttonColor: string;
  backgroundColor: string;
  textColor: string;
  iconColor: string;
  iconBgColor: string;
}

const Card = ({ title, description, buttonColor, backgroundColor, textColor, iconColor, iconBgColor }: SnapShotCardprops) => {
  return (
    <div
      className="p-5 rounded-lg flex flex-col justify-between gap-2 h-full"
      style={{ backgroundColor: backgroundColor, color: textColor }}
    >
      <div
        className="flex items-center justify-center h-10 w-10 rounded"
        style={{ backgroundColor: iconBgColor }}
      >
        <KleoMate color={iconColor} />
      </div>
      <p className="text-base font-semibold">{title}</p>
      <p className="text-xs md:text-sm font-normal">{description}</p>
      <button
        className="py-2 px-[14px] w-fit rounded-lg font-semibold hover:bg-opacity-90 text-xs"
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
    <div className="bg-white p-5 rounded-xl mx-auto h-full flex flex-col gap-2">
      <p className="text-2xl font-semibold">Snapshot</p>
      <p className="text-gray-500 text-sm">
        Vote and be eligible to earn more KLEO XP!
      </p>
      <div className="grid grid-cols-3 gap-4 mt-1 flex-grow">
        {cardsData.map((card, index) => (
          <Card key={index} {...card} />
        ))}
      </div>
    </div>
  );
};

export default Snapshot;
