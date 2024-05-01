import React, { useEffect, useState } from 'react'
import { StaticCard } from '../../../common/interface'
import useFetch from '../../../common/hooks/useFetch'
interface TextComponentProps {
  about: string
  setAbout: (value: string) => void
}
const TextComponent: React.FC<TextComponentProps> = ({ about, setAbout }) => {
  const [isDataFetched, setIsDataFetched] = useState(false)
  const [isStaticCardUpdating, setIsStaticCardUpdating] = useState(false)
  const GET_STATIC_CARDS = 'cards/static/{slug}'
  const { error: _errorstatic, fetchData: fetchStaticCards } = useFetch()

  useEffect(() => {
    const staticCardFlag = sessionStorage.getItem('isStaticCardUpdating')
    if (staticCardFlag) {
      setIsStaticCardUpdating(JSON.parse(staticCardFlag))
    }
  }, [])

  function makeUserUpdationUrl(slug_string: string): string {
    const slug = localStorage.getItem('slug') || ''
    return slug_string.replace('{slug}', slug)
  }

  useEffect(() => {
    if (isStaticCardUpdating && !isDataFetched) {
      fetchStaticCards(makeUserUpdationUrl(GET_STATIC_CARDS), {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        },
        onSuccessfulFetch: (data) => {
          const textCard = (data as StaticCard[])?.find(
            (card) => card.cardType === 'TextCard'
          )
          if (textCard) {
            setAbout(textCard.metadata.text)
          }
          setIsDataFetched(true)
        }
      })
    }
  }, [isStaticCardUpdating])

  return (
    <div className="flex">
      <div className="w-1/2 pt-2 pl-1 pr-3">
        <div className="flex flex-col items-start justify-center">
          <div className="flex mb-20 flex-col items-start justify-center">
            <span className="text-gray-900 text-base font-sm">Text Card</span>
            <span className="text-gray-400 text-sm font-regular">
              This lives right next to your profile picture, tell your story,
              maybe where you work, what you are passionate about...
              <u className="text-gray-800 bold">just talk to us!</u>
            </span>
          </div>
        </div>
      </div>
      <div className="w-1/2 mt-7">
        <textarea
          id="textArea"
          className="w-full border border-gray-300 p-2"
          rows={4}
          value={about}
          onChange={(e) => setAbout(e.target.value)}
        ></textarea>
      </div>
    </div>
  )
}

export default TextComponent
