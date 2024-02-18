// TelehealthDashboard.tsx
import { ReactComponent as Arrow } from '../../../assets/images/arrow2.svg'
import React from 'react'
import { ReactComponent as Like } from '../../../assets/images/like.svg'
import { ReactComponent as Comment } from '../../../assets/images/comment.svg'
import { ReactComponent as Digg } from '../../../assets/images/digg.svg'

// Dummy image URLs
const user1 =
  'https://cdn.midjourney.com/bb411caf-06cd-4343-93e1-dfa1e1945a30/0_3.webp'

const user2 =
  'https://cdn.midjourney.com/263dc1aa-f036-4adb-889b-0a2d014ab5dc/0_1.webp'
const dummyImage2 = 'https://via.placeholder.com/150'

const cardsConst = [
  {
    image: '',
    username: '',
    type: '',
    metadata: '',
    date: '',
    like: '',
    comment: '',
    digg: '',
    bgColor: ''
  }
]

const Cards: React.FC = () => {
  return (
    <div className="bg-gray-100 p-8">
      <div className="grid grid-cols-4 gap-4">
        <div className="bg-white rounded-lg shadow-lg p-3 px-5 bg-violet-50 flex flex-col justify-between min-h-[desiredMinHeight]">
          <div className="flex items-center mt-3">
            <img
              src={user1}
              alt="Sarah Murray"
              className="w-10 h-10 rounded-full mr-3"
            />
            <div>
              <h2 className="text-lg font-semibold text-violet-800">
                @ayeayecapt3n
              </h2>
              <p className="text-sm text-gray-500">740 $KLEO</p>
            </div>
          </div>
          <div className="flex-1 flex flex-col justify-center flex-1">
            <blockquote className="text-gray-600 text-lg mt-4">
              Delved into blockchain information on BRINC's website.
            </blockquote>
          </div>
          <div>
            <div className="flex justify-between items-center mt-4">
              <span className="text-sm text-gray-500">
                Posted on 11 Feb 2024
              </span>
            </div>
            <div className="flex justify-between items-center mt-4 pt-4 border-t">
              <div className="flex space-x-3">
                <button
                  aria-label="Like"
                  className="flex items-center space-x-1"
                >
                  <Like className="w-6 h-6 text-gray-600" />
                  <span>23</span>
                </button>
                <button
                  aria-label="Comment"
                  className="flex items-center space-x-1"
                >
                  <Comment className="w-6 h-6 text-gray-600" />
                  <span>20</span>
                </button>
                <button
                  aria-label="Dig"
                  className="flex items-center space-x-1"
                >
                  <Digg className="w-6 h-6 text-gray-600" />
                  <span>12</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-3 px-5 bg-violet-50 flex flex-col justify-between min-h-[desiredMinHeight]">
          <div className="flex items-center mt-3">
            <img
              src={user2}
              alt="Sarah Murray"
              className="w-10 h-10 rounded-full mr-3"
            />
            <div>
              <h2 className="text-lg font-semibold text-violet-800">
                @ayeayecapt3n
              </h2>
              <p className="text-sm text-gray-500">740 $KLEO</p>
            </div>
          </div>
          <div className="flex flex-col items-center gap-2 self-stretch mt-4 font-medium flex-1">
            <div className="flex self-stretch items-center justify-center rounded-full px-3 py-2 bg-blue-500 text-white">
              Watched Comedy Shorts
            </div>
            <div className="flex flex-row items-center self-stretch gap-1">
              <div className="rounded-full px-2 py-2 border bg-gray-400 border-gray-400">
                <Arrow className="w-5 h-5 fill-gray-800 stroke-gray-800" />
              </div>
              <div className="flex flex-1 justify-center rounded-full px-3 py-2 bg-yellow-400 text-black">
                Seinfeld Clips
              </div>
            </div>
            <div className="flex flex-row items-center self-stretch gap-1">
              <div className="flex flex-1 justify-center text-center rounded-full px-3 py-2 border bg-red-500 text-white border-gray-600">
                Youtube
              </div>
              <div className="rounded-full px-3 py-2 bg-purple-200 text-xl text-white">
                🎥
              </div>
            </div>
          </div>

          <div>
            <div className="flex justify-between items-center mt-4">
              <span className="text-sm text-gray-500">
                Posted on 11 Feb 2024
              </span>
            </div>
            <div className="flex justify-between items-center mt-4 pt-4 border-t">
              <div className="flex space-x-3">
                <button
                  aria-label="Like"
                  className="flex items-center space-x-1"
                >
                  <Like className="w-6 h-6 text-gray-600" />
                  <span>11</span>
                </button>
                <button
                  aria-label="Comment"
                  className="flex items-center space-x-1"
                >
                  <Comment className="w-6 h-6 text-gray-600" />
                  <span>2</span>
                </button>
                <button
                  aria-label="Dig"
                  className="flex items-center space-x-1"
                >
                  <Digg className="w-6 h-6 text-gray-600" />
                  <span>15</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-3 px-5 bg-violet-50 flex flex-col justify-between min-h-[desiredMinHeight]">
          <div className="flex items-center mt-3">
            <img
              src={user2}
              alt="Sarah Murray"
              className="w-10 h-10 rounded-full mr-3"
            />
            <div>
              <h2 className="text-lg font-semibold text-violet-800">
                @ayeayecapt3n
              </h2>
              <p className="text-sm text-gray-500">740 $KLEO</p>
            </div>
          </div>
          <div className="flex flex-col items-center gap-2 self-stretch mt-4 font-medium flex-1">
            <div className="relative w-full max-h-[150px] overflow-hidden rounded-lg">
              <img
                src="https://cdn.midjourney.com/69755520-2575-4766-b8de-96a7ff3fa115/0_2.webp"
                alt="Researched Fiction Books"
                className="w-full h-full object-cover" // This will cover the area of the div, maintaining aspect ratio
              />
              <div className="absolute bottom-0 w-full p-2 bg-black bg-opacity-50 text-white text-center">
                Researched fiction books on Goodreads
              </div>
            </div>
          </div>

          <div>
            <div className="flex justify-between items-center mt-4">
              <span className="text-sm text-gray-500">
                Posted on 11 Feb 2024
              </span>
            </div>
            <div className="flex justify-between items-center mt-4 pt-4 border-t">
              <div className="flex space-x-3">
                <button
                  aria-label="Like"
                  className="flex items-center space-x-1"
                >
                  <Like className="w-6 h-6 text-gray-600" />
                  <span>2</span>
                </button>
                <button
                  aria-label="Comment"
                  className="flex items-center space-x-1"
                >
                  <Comment className="w-6 h-6 text-gray-600" />
                  <span>3</span>
                </button>
                <button
                  aria-label="Dig"
                  className="flex items-center space-x-1"
                >
                  <Digg className="w-6 h-6 text-gray-600" />
                  <span>6</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-3 px-5 bg-violet-50 flex flex-col justify-between min-h-[desiredMinHeight]">
          <div className="flex items-center mt-3">
            <img
              src={user1}
              alt="Sarah Murray"
              className="w-10 h-10 rounded-full mr-3"
            />
            <div>
              <h2 className="text-lg font-semibold text-violet-800">
                @ayeayecapt3n
              </h2>
              <p className="text-sm text-gray-500">740 $KLEO</p>
            </div>
          </div>
          <div className="flex flex-col items-center gap-2 self-stretch mt-4 font-medium flex-1">
            <span className="text-sm text-gray-600">
              Visits to huggingface.co increased by
            </span>
            <span className="text-6xl font-bold text-gray-800">18%</span>
          </div>

          <div>
            <div className="flex justify-between items-center mt-4">
              <span className="text-sm text-gray-500">
                Posted on 11 Feb 2024
              </span>
            </div>
            <div className="flex justify-between items-center mt-4 pt-4 border-t">
              <div className="flex space-x-3">
                <button
                  aria-label="Like"
                  className="flex items-center space-x-1"
                >
                  <Like className="w-6 h-6 text-gray-600" />
                  <span>55</span>
                </button>
                <button
                  aria-label="Comment"
                  className="flex items-center space-x-1"
                >
                  <Comment className="w-6 h-6 text-gray-600" />
                  <span>11</span>
                </button>
                <button
                  aria-label="Dig"
                  className="flex items-center space-x-1"
                >
                  <Digg className="w-6 h-6 text-gray-600" />
                  <span>65</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-3 px-5 bg-violet-50 flex flex-col justify-between min-h-[desiredMinHeight]">
          <div className="flex items-center mt-3">
            <img
              src={user2}
              alt="Sarah Murray"
              className="w-10 h-10 rounded-full mr-3"
            />
            <div>
              <h2 className="text-lg font-semibold text-violet-800">
                @ayeayecapt3n
              </h2>
              <p className="text-sm text-gray-500">740 $KLEO</p>
            </div>
          </div>
          <div className="flex flex-col items-center gap-2 self-stretch mt-4 font-medium flex-1">
            <div className="relative w-full max-h-[150px] overflow-hidden rounded-lg">
              <img
                src="https://cdn.midjourney.com/127360da-1741-4c50-a5bc-32ac0ff4a78a/0_3.webp"
                alt="Researched Fiction Books"
                className="w-full h-full object-cover" // This will cover the area of the div, maintaining aspect ratio
              />
              <div className="absolute bottom-0 w-full p-2 bg-black bg-opacity-50 text-white text-center">
                Googled about cybercrime cases in India
              </div>
            </div>
          </div>

          <div>
            <div className="flex justify-between items-center mt-4">
              <span className="text-sm text-gray-500">
                Posted on 11 Feb 2024
              </span>
            </div>
            <div className="flex justify-between items-center mt-4 pt-4 border-t">
              <div className="flex space-x-3">
                <button
                  aria-label="Like"
                  className="flex items-center space-x-1"
                >
                  <Like className="w-6 h-6 text-gray-600" />
                  <span>33</span>
                </button>
                <button
                  aria-label="Comment"
                  className="flex items-center space-x-1"
                >
                  <Comment className="w-6 h-6 text-gray-600" />
                  <span>11</span>
                </button>
                <button
                  aria-label="Dig"
                  className="flex items-center space-x-1"
                >
                  <Digg className="w-6 h-6 text-gray-600" />
                  <span>23</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-3 px-5 bg-violet-50 flex flex-col justify-between min-h-[desiredMinHeight]">
          <div className="flex items-center mt-3">
            <img
              src={user1}
              alt="Sarah Murray"
              className="w-10 h-10 rounded-full mr-3"
            />
            <div>
              <h2 className="text-lg font-semibold text-violet-800">
                @ayeayecapt3n
              </h2>
              <p className="text-sm text-gray-500">740 $KLEO</p>
            </div>
          </div>
          <div className="flex-1 flex flex-col justify-center flex-1">
            <blockquote className="text-gray-600 text-lg mt-4">
              Managed visa applications on VFS Global's website.
            </blockquote>
          </div>
          <div>
            <div className="flex justify-between items-center mt-4">
              <span className="text-sm text-gray-500">
                Posted on 11 Feb 2024
              </span>
            </div>
            <div className="flex justify-between items-center mt-4 pt-4 border-t">
              <div className="flex space-x-3">
                <button
                  aria-label="Like"
                  className="flex items-center space-x-1"
                >
                  <Like className="w-6 h-6 text-gray-600" />
                  <span>23</span>
                </button>
                <button
                  aria-label="Comment"
                  className="flex items-center space-x-1"
                >
                  <Comment className="w-6 h-6 text-gray-600" />
                  <span>20</span>
                </button>
                <button
                  aria-label="Dig"
                  className="flex items-center space-x-1"
                >
                  <Digg className="w-6 h-6 text-gray-600" />
                  <span>12</span>
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-lg p-3 px-5 bg-violet-50 flex flex-col justify-between min-h-[desiredMinHeight]">
          <div className="flex items-center mt-3">
            <img
              src={user2}
              alt="Sarah Murray"
              className="w-10 h-10 rounded-full mr-3"
            />
            <div>
              <h2 className="text-lg font-semibold text-violet-800">
                @ayeayecapt3n
              </h2>
              <p className="text-sm text-gray-500">740 $KLEO</p>
            </div>
          </div>
          <div className="flex flex-col items-center gap-2 self-stretch mt-4 font-medium flex-1">
            <div className="flex self-stretch items-center justify-center rounded-full px-3 py-2 bg-blue-500 text-white">
              Watched
            </div>
            <div className="flex flex-row items-center self-stretch gap-1">
              <div className="rounded-full px-2 py-2 border bg-gray-400 border-gray-400">
                <Arrow className="w-5 h-5 fill-gray-800 stroke-gray-800" />
              </div>
              <div className="flex flex-1 justify-center rounded-full px-3 py-2 bg-yellow-400 text-black">
                Scam Exposure
              </div>
            </div>
            <div className="flex flex-row items-center self-stretch gap-1">
              <div className="flex flex-1 justify-center text-center rounded-full px-3 py-2 border bg-red-500 text-white border-gray-600">
                on Youtube
              </div>
              <div className="rounded-full px-3 py-2 bg-purple-200 text-xl text-white">
                🎥
              </div>
            </div>
          </div>

          <div>
            <div className="flex justify-between items-center mt-4">
              <span className="text-sm text-gray-500">
                Posted on 11 Feb 2024
              </span>
            </div>
            <div className="flex justify-between items-center mt-4 pt-4 border-t">
              <div className="flex space-x-3">
                <button
                  aria-label="Like"
                  className="flex items-center space-x-1"
                >
                  <Like className="w-6 h-6 text-gray-600" />
                  <span>1</span>
                </button>
                <button
                  aria-label="Comment"
                  className="flex items-center space-x-1"
                >
                  <Comment className="w-6 h-6 text-gray-600" />
                  <span>0</span>
                </button>
                <button
                  aria-label="Dig"
                  className="flex items-center space-x-1"
                >
                  <Digg className="w-6 h-6 text-gray-600" />
                  <span>2</span>
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-lg p-3 px-5 bg-violet-50 flex flex-col justify-between min-h-[desiredMinHeight]">
          <div className="flex items-center mt-3">
            <img
              src={user1}
              alt="Sarah Murray"
              className="w-10 h-10 rounded-full mr-3"
            />
            <div>
              <h2 className="text-lg font-semibold text-violet-800">
                @ayeayecapt3n
              </h2>
              <p className="text-sm text-gray-500">740 $KLEO</p>
            </div>
          </div>
          <div className="flex-1 flex flex-col justify-center flex-1">
            <blockquote className="text-gray-600 text-lg mt-4">
              Sought information on Beautiful Soup for domain titles
            </blockquote>
          </div>
          <div>
            <div className="flex justify-between items-center mt-4">
              <span className="text-sm text-gray-500">
                Posted on 11 Feb 2024
              </span>
            </div>
            <div className="flex justify-between items-center mt-4 pt-4 border-t">
              <div className="flex space-x-3">
                <button
                  aria-label="Like"
                  className="flex items-center space-x-1"
                >
                  <Like className="w-6 h-6 text-gray-600" />
                  <span>15</span>
                </button>
                <button
                  aria-label="Comment"
                  className="flex items-center space-x-1"
                >
                  <Comment className="w-6 h-6 text-gray-600" />
                  <span>6</span>
                </button>
                <button
                  aria-label="Dig"
                  className="flex items-center space-x-1"
                >
                  <Digg className="w-6 h-6 text-gray-600" />
                  <span>17</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Cards
