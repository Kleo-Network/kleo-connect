import React from 'react'
import KleoMate from '../../../assets/dashboard/KleoMate.jsx'

interface SnapShotCardprops {
  title: string
  description: string
  buttonColor: string
  backgroundColor: string
  textColor: string
  iconColor: string
  iconBgColor: string
  link: string
}

const Card = ({
  title,
  description,
  buttonColor,
  backgroundColor,
  textColor,
  iconColor,
  iconBgColor,
  link
}: SnapShotCardprops) => {
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
      <a
        href={link}
        target="_blank"
        className="py-2 px-[14px] w-fit rounded-lg font-semibold hover:bg-opacity-90 text-xs"
        style={{
          backgroundColor: buttonColor,
          color: backgroundColor === '#293056' ? '#6941C6' : 'white'
        }}
      >
        View Proposal
      </a>
    </div>
  )
}

const Snapshot = () => {
  const cardsData = [
    {
      title: '400 KLEO XP Points',
      description:
        'Kleo rewards early users with 400 XP points for joining before October 31st.',
      buttonColor: '#FFFFFF',
      backgroundColor: '#293056',
      textColor: 'white',
      iconColor: 'white',
      iconBgColor: '#475467',
      link: 'https://snapshot.org/#/kleo-network.eth/proposal/0x5a0dc6208832a804d14e30b409458460f99fd41381231d4e9ec35d6f11444808'
    },
    {
      title: 'Removal of PII',
      description:
        "This proposal seeks authorization for Kleo Network's founder to access and remove PII from 580 users' data using Azure OAI APIs in a TEE environment",
      buttonColor: '#7F56D9',
      backgroundColor: '#F9FAFB',
      textColor: '#000',
      iconColor: '#363F72',
      iconBgColor: '#F9FAFB',
      link: 'https://snapshot.org/#/kleo-network.eth/proposal/0xfb2d8b419e81f4bb6af50d9960313366180c33c94d7b787ce7537ad40fda3d98'
    },
    {
      title: 'Kleo x POL Meme Contest',
      description:
        'Kleo launches meme contest with 1,000 POL prize pool for data ownership awareness.',
      buttonColor: '#FFFFFF',
      backgroundColor: '#293056',
      textColor: 'white',
      iconColor: 'white',
      iconBgColor: '#475467',
      link: 'https://snapshot.org/#/kleo-network.eth/proposal/0xd22dd94e31d7f101d1b04ef403f806f73139f06defc4b3343fa97d013990a533'
    }
  ]

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
  )
}

export default Snapshot
