import { useState, useEffect, useContext } from 'react'
import { useAuthContext } from '../../common/contexts/UserContext'
import { useTransition, animated } from 'react-spring'
import { ReactComponent as Tick } from '../../../assets/images/check.svg'
import { ReactComponent as Cross } from '../../../assets/images/cross.svg'
import CountdownTimer from './countdown'

export interface Card {
  id: number
  user: string
  content: string
  contentImage: string
  date: string
  imageUrl: string
  direction: string
  links: Link[]
}

export interface Link {
  domain: string
  icon: string
  link: string
  title: string
}

export default function PinnedWebsites() {
  const context = useAuthContext()

  const initialCards: Card[] = [
    {
      id: 740,
      user: 'Nick Stark',
      content: "Delved into blockchain information on BRINC's website.",
      contentImage: '',
      date: '11 Feb 2024',
      imageUrl:
        'https://cdn.midjourney.com/bb411caf-06cd-4343-93e1-dfa1e1945a30/0_3.webp',
      direction: '',
      links: [
        {
          domain: 'www.brinc.io',
          icon: '',
          link: '',
          title: 'Brinc Accelerator - Accelerating Future'
        }
      ]
    },
    {
      id: 120,
      user: 'Nick Stark',
      content: 'Watched Comedy Shorts on Youtube, Seinfeld on Netflix',
      date: '11 Feb 2024',
      imageUrl:
        'https://cdn.midjourney.com/bb411caf-06cd-4343-93e1-dfa1e1945a30/0_3.webp',
      contentImage: '',
      direction: '',
      links: [
        {
          domain: 'www.youtube.com',
          icon: '',
          link: '',
          title: 'Kenny Sebastian Crowd Work Part -1'
        },
        {
          domain: 'www.netflix.com',
          icon: '',
          link: '',
          title: 'Watch Seinfeld'
        }
      ]
    },
    {
      id: 40,
      user: 'Nick Stark',
      content: "Researched Books like 'Game Of Thrones' on Goodreads",
      contentImage: '',
      date: '11 Feb 2024',
      imageUrl:
        'https://cdn.midjourney.com/bb411caf-06cd-4343-93e1-dfa1e1945a30/0_3.webp',
      direction: '',
      links: [
        {
          domain: 'www.goodreads.com',
          icon: '',
          link: '',
          title: 'Game of Thrones Series'
        },
        {
          domain: 'www.amazon.com',
          icon: '',
          link: '',
          title: 'Buy Game of Thrones Books'
        },
        {
          domain: 'www.barnesandnoble.com',
          icon: '',
          link: '',
          title: 'Game of Thrones Collection'
        }
      ]
    },
    {
      id: 10,
      user: 'Nick Stark',
      content:
        'Visits to huggingface.co increased by 18% as compared to last week!',
      date: '11 Feb 2024',
      imageUrl:
        'https://cdn.midjourney.com/bb411caf-06cd-4343-93e1-dfa1e1945a30/0_3.webp',
      contentImage: '',
      direction: '',
      links: [
        {
          domain: 'www.huggingface.co',
          icon: '',
          link: '',
          title: 'Hugging Face – The AI community building the future.'
        },
        {
          domain: 'github.com',
          icon: '',
          link: '',
          title: 'Hugging Face on GitHub'
        }
      ]
    },
    {
      id: 3,
      user: 'Nick Stark',
      content: 'Googled about cybercrime cases and IPC 420 of Penal Code',
      contentImage: '',
      date: '11 Feb 2024',
      imageUrl:
        'https://cdn.midjourney.com/bb411caf-06cd-4343-93e1-dfa1e1945a30/0_3.webp',
      direction: '',
      links: [
        {
          domain: 'www.cybercrime.gov',
          icon: '',
          link: '',
          title: 'Cybercrime Cases and Legal Advice'
        },
        {
          domain: 'indiankanoon.org',
          icon: '',
          link: '',
          title: 'IPC Section 420 - Cheating and Dishonestly'
        },
        {
          domain: 'www.legalserviceindia.com',
          icon: '',
          link: '',
          title: 'Understanding IPC 420 with Cases'
        }
      ]
    },
    {
      id: 4,
      user: '@ayeayecapt3n',
      content:
        'Managed VISA Application on VFS Global Website, for United States of America',
      date: '11 Feb 2024',
      imageUrl:
        'https://cdn.midjourney.com/bb411caf-06cd-4343-93e1-dfa1e1945a30/0_3.webp',
      contentImage: '',
      direction: '',
      links: [
        {
          domain: 'www.vfsglobal.com',
          icon: '',
          link: '',
          title: 'VFS Global - USA Visa Application'
        },
        {
          domain: 'travel.state.gov',
          icon: '',
          link: '',
          title: 'U.S. Visas - State Department'
        },
        {
          domain: 'www.uscis.gov',
          icon: '',
          link: '',
          title: 'United States Citizenship and Immigration Services'
        }
      ]
    }
  ]

  const [cards, setCards] = useState<Card[]>(initialCards)
  const [activeCard, setActiveCard] = useState<Card>(initialCards[0])
  const [userId, setUserId] = useState<any>()

  const transitions = useTransition(activeCard, {
    keys: (card) => card.id,
    from: {
      opacity: 0,
      transform:
        activeCard.direction == 'publish'
          ? ' translateX(800px)'
          : ' translateX(-800px)'
    },
    enter: { opacity: 1, transform: 'scale(1) translateX(0)' },
    config: { tension: 250, friction: 20 }
  })

  const removeCard = (id: number, direction: string) => {
    setCards((cards) => cards.filter((card) => card.id !== id))
    const active = cards.filter((card) => card.id !== id)[0]
    active.direction = direction
    setActiveCard(active)
  }
  useEffect(() => {
    const user = context!.user.userId
    setUserId(user)
  }, [userId])

  const user1 =
    'https://cdn.midjourney.com/bb411caf-06cd-4343-93e1-dfa1e1945a30/0_3.webp'

  return (
    <div className="flex flex-col flex-1 self-stretch rounded-lg border border-gray-200">
      <header className="flex flex-row gap-2 justify-between items-center px-6 py-5 font-medium border-b border-gray-200">
        <div className="flex w-full justify-between items-center gap-2">
          <div>
            <h3 className="text-xl text-gray-900 flex-grow-0">
              Publish Activity for 19th December
            </h3>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm px-2 py-2 text-blue-700 bg-blue-100 rounded-sm cursor-pointer hover:bg-blue-200">
              19th December
            </span>

            {/* Date Pill */}
            <span className="text-sm p-2 text-gray-700 bg-gray-100 rounded-sm cursor-pointer hover:bg-gray-200">
              18th December
            </span>
            <span className="text-sm p-2 text-gray-700 bg-gray-100 rounded-sm cursor-pointer hover:bg-gray-200 ml-2">
              17th December
            </span>
            <span className="text-sm p-2 text-gray-700 bg-gray-100 rounded-sm cursor-pointer hover:bg-gray-200 ml-2">
              16th December
            </span>
          </div>
        </div>
      </header>
      <div className="flex flex-col md:flex-row justify-between items-center p-6 bg-gray-300">
        <div className="flex flex-col md:flex-row justify-center items-stretch p-6 gap-4 mx-auto">
          {cards.length > 0 ? (
            <>
              <div className="flex-grow">
                {transitions((styles, item) => (
                  <animated.div
                    key={item.id}
                    style={{
                      ...styles,
                      willChange: 'transform, opacity'
                    }}
                  >
                    <div className="bg-white rounded-lg shadow-lg p-3 px-5 bg-violet-50 flex flex-col justify-between min-h-[desiredMinHeight]">
                      <div className="flex items-center mt-3">
                        <img
                          src={item.imageUrl}
                          alt="Sarah Murray"
                          className="w-10 h-10 rounded-full mr-3"
                        />
                        <div>
                          <h2 className="text-lg font-semibold text-violet-800">
                            {item.user}
                          </h2>
                          <p className="text-sm text-gray-500">
                            {item.id} KLEO
                          </p>
                        </div>
                      </div>
                      <div className="flex-1 flex flex-col justify-center flex-1">
                        <blockquote className="text-gray-600 text-lg mt-4 pb-3">
                          {item.content}
                        </blockquote>

                        <div className="flex flex-row flex-wrap gap-2 self-stretch items-center justify-start max-h-40">
                          {item.links.map((link) => (
                            <>
                              <button
                                className="flex items-center  gap-2 rounded-lg border border-gray-200 px-2 py-1"
                                style={{
                                  backgroundColor: '#fff'
                                }}
                              >
                                <img
                                  className="w-4 h-4 flex-none"
                                  src={`https://www.google.com/s2/favicons?domain=${link.domain}`}
                                />

                                <h3 className="text-sm font-medium text-gray-700">
                                  {link.title}
                                </h3>
                              </button>
                            </>
                          ))}
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between border-t py-2 items-center mt-4">
                          <span className="text-sm text-gray-500">
                            {item.date}
                          </span>
                        </div>
                      </div>
                    </div>
                  </animated.div>
                ))}
              </div>
              <div className="flex-grow">
                <button
                  onClick={() => removeCard(activeCard.id, 'publish')}
                  className="flex justify-center items-center mb-2 px-3 py-2 rounded-2xl bg-green-700 text-green-800 font-medium rounded hover:bg-green-800 w-full h-1/2"
                >
                  <Tick className="w-8 stroke-white fill-white" />
                </button>
                <button
                  onClick={() => removeCard(activeCard.id, 'discard')}
                  className="flex justify-center items-center px-10 py-4 bg-red-500 text-white text-md font-medium rounded-2xl hover:bg-red-800 w-full h-1/2"
                >
                  <Cross className="w-8 stroke-white fill-white" />
                </button>
              </div>
            </>
          ) : (
            <div className="flex-grow">
              <div className="bg-white rounded-lg shadow-lg p-3 px-5 bg-violet-50 flex flex-col justify-between min-h-[desiredMinHeight]">
                <CountdownTimer endDate="2024-02-16T00:00:00Z" />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
