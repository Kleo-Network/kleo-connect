import React from 'react'
import { ReactComponent as LinkedIn } from '../../../assets/images/linkedinFilled.svg'

interface Experience {
  icon: string
  designation: string
  placeOfWork: string
}

interface LinkedInCardProps {
  userImage: string
  bio: string
  experiences: Experience[]
}

const LinkedInCard: React.FC<LinkedInCardProps> = ({
  userImage,
  bio,
  experiences
}) => {
  return (
    <div className="relative max-w-lg rounded-lg overflow-hidden bg-white p-6">
      <div className="absolute top-0 right-0 p-4">
        <LinkedIn className="text-gray-800 w-8 h-8" />
      </div>
      <div className="flex flex-row gap-2 items-center justify-start">
        <h2 className="text-lg font-bold">/vaibhavgeek</h2>
      </div>
      <div>
        <h4 className="text-md text-gray-500 font-semibold mb-4">Background</h4>
        <div className="grid grid-cols-2 gap-4">
          {experiences.map((exp, index) => (
            <div key={index} className="flex items-center space-x-2">
              <img className="w-10 h-10" src={exp.icon} alt="Experience icon" />
              <div>
                <p className="text-md font-semibold">{exp.designation}</p>
                <p className="text-sm text-gray-600">{exp.placeOfWork}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default LinkedInCard
