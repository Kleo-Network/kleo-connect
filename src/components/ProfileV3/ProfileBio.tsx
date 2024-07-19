import React, { useEffect, useState } from 'react'
import { ReactComponent as Mint } from '../../assets/images/Mint.svg'
import { ReactComponent as Pen } from '../../assets/images/Pen.svg'
import { ReactComponent as Save } from '../../assets/images/save.svg'
import { UserData } from '../constants/SignupData'
import useFetch from '../common/hooks/useFetch'

interface User {
  user: UserData
}

function formatDate(epochTimestamp: number) {
  const date = new Date(epochTimestamp * 1000) // Convert seconds to milliseconds

  // Get individual date components
  const hours = date.getHours() % 12 || 12 // Convert 24-hour format to 12-hour format
  const minutes = date.getMinutes().toString().padStart(2, '0')
  const seconds = date.getSeconds().toString().padStart(2, '0')
  const month = date.toLocaleString('en-US', { month: 'long' }) // Get full month name
  const day = date.getDate()
  const year = date.getFullYear()
  const ampm = date.getHours() >= 12 ? 'PM' : 'AM'

  // Construct the formatted string
  const formattedDate = `${month} ${day}, ${year}`

  return formattedDate
}

export default function ProfileBio({ user }: User) {
  const [isPublic, setIsPublic] = useState<boolean>(true)
  const [isEditing, setIsEditing] = useState(false)
  const [text, setText] = useState(user.about)
  const { fetchData: UpdateUserAbout } = useFetch<UserData>()
  const UPDATE_USER_ABOUT = 'user/update-about/{slug}'

  useEffect(() => {
    const slug_from_local_storage = localStorage.getItem('slug')
    if (user.slug == slug_from_local_storage) {
      setIsPublic(false)
    } else {
      setIsPublic(true)
    }
  }, [])

  const handleEditClick = () => {
    setIsEditing(true)
  }

  function makeUserUpdationUrl(slug_string: string): string {
    const slug = localStorage.getItem('slug') || ''
    return slug_string.replace('{slug}', slug)
  }

  const handleSaveClick = () => {
    UpdateUserAbout(makeUserUpdationUrl(UPDATE_USER_ABOUT), {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        about: text
      }),
      onSuccessfulFetch: () => {
        setIsEditing(false)
      }
    })
  }

  const handleChange = (e) => {
    setText(e.target.value)
  }

  return (
    <div className="flex flex-col h-full w-full self-stretch items-start justify-start rounded-[14px] p-[20px] bg-white">
      <div className="flex flex-row w-full items-start justify-start">
        <img
          src={user.pfp}
          className="w-16 h-16 rounded-full border-4 border-white"
        />
        <div className="flex flex-col ml-4">
          <h3 className="text-sm md:text-[18px] font-medium text-gray-900 mt-2">
            {user.slug}
          </h3>
          {user.profile_metadata.kleo_token && (
            <div className="flex flex-row bg-gray-100 py-[3px] pl-[3px] pr-[10px] rounded-2xl mt-2">
              <Mint className="h-4 w-4 rounded-full" />
              <div className="font-inter text-[10px] font-medium text-violet-700 text-center justify-center ml-[6px] h-full ">
                Minted {user.profile_metadata.kleo_token} times
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="flex flex-col w-full mt-4">
        <div className="flex flex-row w-full h-full">
          <div className="text-base font-inter font-semibold text-gray-700 mr-auto">
            {' '}
            About Me
          </div>
          {!isPublic && (
            <button
              onClick={isEditing ? handleSaveClick : handleEditClick}
              className="ml-2 pb-2"
            >
              {isEditing ? (
                <Save className="h-5 w-5 stroke-gray-500 items-start justify-start hover:stroke-violet-500" />
              ) : (
                <Pen className="h-5 w-5 stroke-gray-500 items-start justify-start" />
              )}
            </button>
          )}
        </div>
        <div className="flex w-full">
          <div className="flex w-full items-start justify-start">
            {isEditing && !isPublic ? (
              <textarea
                id="textArea"
                className="w-full border rounded-xl border-gray-300"
                rows={4}
                value={text}
                onChange={handleChange}
              ></textarea>
            ) : (
              <div className="flex-grow items-start justify-start">{text}</div>
            )}
          </div>
        </div>
      </div>
      <div className="max-w-sm text-center text-gray-400 mt-auto">
        last minted on {formatDate(user.last_attested)}
      </div>
    </div>
  )
}
