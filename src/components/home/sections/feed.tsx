// TelehealthDashboard.tsx
import React from 'react'
import { ReactComponent as Like } from '../../../assets/images/like.svg'
import { ReactComponent as Comment } from '../../../assets/images/comment.svg'
import { ReactComponent as Digg } from '../../../assets/images/digg.svg'

// Dummy image URLs
const dummyImage1 = 'https://via.placeholder.com/150'
const dummyImage2 = 'https://via.placeholder.com/150'

const TelehealthDashboard: React.FC = () => {
  return (
    <div className="bg-gray-100 p-8">
      <div className="grid grid-cols-5 gap-4">
        {/* Card 1: The best telehealth resources 2023 */}
        <div className="bg-white rounded-lg shadow-lg p-4 flex flex-col items-center">
          <h2 className="text-lg font-semibold text-gray-700 mb-3">
            The best telehealth resources 2023
          </h2>
          <img
            src={dummyImage1}
            alt="Stack of books"
            className="w-32 h-32 object-cover mb-3"
          />
          {/* Other content */}
        </div>

        {/* Card 2: Testimonial */}
        <div className="bg-white rounded-lg shadow-lg p-4">
          <div className="flex items-center mt-4">
            <img
              src={dummyImage2}
              alt="Sarah Murray"
              className="w-10 h-10 rounded-full mr-3"
            />
            <div>
              <p className="text-sm font-semibold text-gray-800">
                @ayeayecapt3n
              </p>
              <p className="text-sm text-gray-500">Healthcare Professional</p>
            </div>
          </div>
          <blockquote className="italic text-gray-600 mt-4">
            "Doxy.me helped me seamlessly pivot my practice to the virtual space
            and has completely shifted my practice for the long term."
          </blockquote>
        </div>
        {/* Card 2: Testimonial */}
        <div className="bg-white rounded-lg shadow-lg p-4">
          <div className="flex items-center mt-4">
            <img
              src={dummyImage2}
              alt="Sarah Murray"
              className="w-10 h-10 rounded-full mr-3"
            />
            <div>
              <p className="text-sm font-semibold text-gray-800">
                @ayeayecapt3n
              </p>
              <span className="bg-green-200 text-green-700 py-1 px-2 rounded-full text-xs">
                Information Technology
              </span>
            </div>
          </div>
          <blockquote className="italic text-gray-600 mt-4">
            Delved into blockchain information on BRINC's website.
          </blockquote>
             <div className="flex justify-between items-center mt-4">
                <span className="text-sm text-gray-500">Posted on 11 Feb 2024</span>
            </div>
          <div className="flex justify-between items-center mt-4 pt-4 border-t">
            <div className="flex space-x-3">
              <button aria-label="Like" className="flex items-center space-x-1">
                <Like className="w-6 h-6 text-gray-600" />
                <span>23</span>
              </button>
              <button
                aria-label="Comment"
                className="flex items-center space-x-1"
              >
                <Comment className="w-6 h-6 text-gray-600" />
                <span>Comment</span>
              </button>
              <button aria-label="Dig" className="flex items-center space-x-1">
                <Digg className="w-6 h-6 text-gray-600" />
                <span>Dig</span>
              </button>
            </div>
          </div>
        </div>

        {/* Card 2: Testimonial */}
        <div className="bg-white rounded-lg shadow-lg p-4">
          <div className="flex items-center mt-4">
            <img
              src={dummyImage2}
              alt="Sarah Murray"
              className="w-10 h-10 rounded-full mr-3"
            />
            <div>
              <p className="text-sm font-semibold text-gray-800">
                @ayeayecapt3n
              </p>
              <span className="bg-green-200 text-green-700 py-1 px-2 rounded-full text-xs">
                Business
              </span>
            </div>
          </div>
          <blockquote className="italic text-gray-600 mt-4">
            Researched GST implications for software freelancers.
          </blockquote>
        </div>

        {/* Card 3: Expert Insight */}
        <div className="bg-white rounded-lg shadow-lg p-4">
          <div className="flex items-center mb-3">
            <h2 className="text-lg font-semibold text-gray-700 mr-2">
              Dr. Anna Karen
            </h2>
            <span className="bg-green-200 text-green-700 py-1 px-2 rounded-full text-xs">
              Family Therapist
            </span>
          </div>
          <p className="text-gray-600">
            Patient retention this year has been up by
          </p>
          <p className="text-3xl font-semibold text-gray-800">23%</p>
        </div>

        <div className="col-span-3 md:col-span-1 bg-teal-50 rounded-lg shadow-lg p-4 flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-teal-900">
              Telemedicine Redefined
            </h2>
            <span className="bg-orange-200 text-orange-800 py-1 px-3 rounded-full text-xs font-semibold">
              New
            </span>
          </div>
          <div className="my-4">
            <p className="text-teal-700">
              Simply redefining telemedicine one session at a time.
            </p>
          </div>
          <div className="flex items-center justify-end">
            <img
              src={dummyImage2}
              alt="Video call illustration"
              className="w-16 h-16 object-cover"
            />
          </div>
        </div>
        {/* Other cards can be added similarly */}
      </div>
    </div>
  )
}

export default TelehealthDashboard
