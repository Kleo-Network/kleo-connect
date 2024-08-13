import ProfileV3 from '../ProfileV3/index'
import useFetch from '../common/hooks/useFetch'
import {
  UserDataProps,
  fullUserData,
  PendingCard,
  PublishedCard,
  CardTypeToRender
} from '../common/interface'
import { useState, useEffect, useContext } from 'react'
import Modal from '../common/Modal'
import { NavbarEvents } from '../constants/Events'
import { EventContext } from '../common/contexts/EventContext'
import Settings from '../profile/Settings'
import { useParams, useNavigate } from 'react-router-dom'
import { ReactComponent as Cat } from '../../assets/images/astronautCat.svg'
import { ReactComponent as Plus } from '../../assets/images/plus.svg'
import { replaceSlugInURL, updateCardTypeToRenderInAllCards } from '../utils/utils'
import { BannerComponent } from './BannerComponent'
import { Feeds } from '../profile/Feed/Feed'

// TODO: Remove this Dummy Cards when we get actual cards.
const DummyYTCards: PublishedCard[] = [
  // 4 Links
  {
    "cardType": "DataCard",
    "category": "Media & Communication",
    "content": "Watched Daily Dose of Internet videos.",
    "date": "07 Aug 2024",
    "id": "66b6c16e60f6a6a41aaf74b5",
    "metadata": {
      "activity": "researched",
      "description": "Watched Daily Dose of Internet videos.",
      "tags": [
        "technology",
        "support"
      ],
      "titles": [
        "Never Prank Your Barber",
        "How Does This Keep Happening",
        "This Delivery Guy is Built Different",
        "Criminal Pulls Off a Big Brain Move"
      ]
    },
    "minted": false,
    "tags": [
      "technology",
      "support"
    ],
    "urls": [
      {
        "id": "66b3e42df7ec5d4fd769f6fe",
        "title": "Never Prank Your Barber",
        "url": "https://www.youtube.com/watch?v=uDcb12CqoR4"
      },
      {
        "id": "66b3e47ef7ec5d4fd769f9af",
        "title": "How Does This Keep Happening",
        "url": "https://www.youtube.com/watch?v=W3xkS9lgYcw"
      },
      {
        "id": "66b3e47ef7ec5d4fd769f9ag",
        "title": "This Delivery Guy is Built Different",
        "url": "https://www.youtube.com/watch?v=GDRyigWvUFg"
      },
      {
        "id": "66b3e47ef7ec5d4fd769f9ah",
        "title": "Criminal Pulls Off a Big Brain Move",
        "url": "https://www.youtube.com/watch?v=99GVtAcV70c"
      },
    ]
  },
  // 3 Links
  {
    "cardType": "DataCard",
    "category": "Media & Communication",
    "content": "Watched Daily Dose of Internet videos.",
    "date": "06 Aug 2024",
    "id": "66b6c16e60f6a6a41aaf74b6",
    "metadata": {
      "activity": "watched",
      "description": "Watched Daily Dose of Internet videos.",
      "tags": [
        "technology",
        "support"
      ],
      "titles": [
        "Never Prank Your Barber",
        "How Does This Keep Happening",
        "This Delivery Guy is Built Different"
      ]
    },
    "minted": false,
    "tags": [
      "technology",
      "support"
    ],
    "urls": [
      {
        "id": "66b3e42df7ec5d4fd769f6fe",
        "title": "Never Prank Your Barber",
        "url": "https://www.youtube.com/watch?v=W3xkS9lgYcw"
      },
      {
        "id": "66b3e47ef7ec5d4fd769f9af",
        "title": "How Does This Keep Happening",
        "url": "https://www.youtube.com/watch?v=uDcb12CqoR4"
      },
      {
        "id": "66b3e47ef7ec5d4fd769f9ag",
        "title": "This Delivery Guy is Built Different",
        "url": "https://www.youtube.com/watch?v=GDRyigWvUFg"
      },
    ]
  },
  // 2 Links
  {
    "cardType": "DataCard",
    "category": "Media & Communication",
    "content": "Watched Daily Dose of Internet videos.",
    "date": "05 Aug 2024",
    "id": "66b6c16e60f6a6a41aaf74b7",
    "metadata": {
      "activity": "watched",
      "description": "Watched Daily Dose of Internet videos.",
      "tags": [
        "technology",
        "support"
      ],
      "titles": [
        "Never Prank Your Barber",
        "How Does This Keep Happening"
      ]
    },
    "minted": false,
    "tags": [
      "technology",
      "support"
    ],
    "urls": [
      {
        "id": "66b3e42df7ec5d4fd769f6fe",
        "title": "Never Prank Your Barber",
        "url": "https://www.youtube.com/watch?v=GDRyigWvUFg"
      },
      {
        "id": "66b3e47ef7ec5d4fd769f9af",
        "title": "How Does This Keep Happening",
        "url": "https://www.youtube.com/watch?v=W3xkS9lgYcw"
      }
    ]
  },
  // 1 Links
  {
    "cardType": "DataCard",
    "category": "Media & Communication",
    "content": "Watched Daily Dose of Internet videos.",
    "date": "02 Aug 2024",
    "id": "66b6c16e60f6a6a41aaf74b8",
    "metadata": {
      "activity": "watched",
      "description": "Watched Daily Dose of Internet videos.",
      "tags": [
        "technology",
        "support"
      ],
      "titles": [
        "Never Prank Your Barber"
      ]
    },
    "minted": false,
    "tags": [
      "technology",
      "support"
    ],
    "urls": [
      {
        "id": "66b3e42df7ec5d4fd769f6fe",
        "title": "Never Prank Your Barber",
        "url": "https://www.youtube.com/watch?v=99GVtAcV70c"
      },
    ]
  }
]
const DummyImageCards: PublishedCard[] = [
  {
    "cardType": "ImageCard",
    "stockImage": "https://s3-alpha-sig.figma.com/img/6254/b4dc/06fd0000548177cb2e134eae14c08b46?Expires=1724630400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=Rl7gXTLt8zE-fJqqQU8Y2VjT9XIQCFMjGiu2vutJiNKuJACcgOk-YVqutLDfc1rXcvIYb0DCvbiYYTKijcXNcdlJ--poaa7IsB~1fIUrS9TKabsKiAfXxz9vJrhX-He6aRcT19-PpQEBOujPPQHzojHVUi19oILtpfE2Vtns66LzWhoScYgIeEqIL1ooZCIL-pJm9L43redAHnMewkvKswH5ZK5SwYjqXbyZ-xy2Su8LmgRfyQ4pX6ub0dAtdQfdYZZxl3m-50U-J~kongZSfZwzx0rosskiqXKD9p2lJwGcWkhaXSqxdf~tmEMg9JvPoT6PZ0-70toUWtzWc9JwZw__",
    "category": "Media & Communication",
    "content": "PrinceTesting researched methods to bulk export iCloud Notes, likely due to a need for data backup or migration.",
    "date": "08 Aug 2024",
    "id": "abcdefghijklm",
    "metadata": {
      "activity": "researched",
      "description": "PrinceTesting researched methods to bulk export iCloud Notes, likely due to a need for data backup or migration.",
      "tags": [
        "technology",
        "support"
      ],
      "titles": [
        "How to Bulk Export all of your iCloud Notes from Apple : r/applehelp",
        "Notes “App” just Randomly Deleted Everything without a trace. How??? : r/applehelp"
      ]
    },
    "minted": false,
    "tags": [
      "technology",
      "support"
    ],
    "urls": [
      {
        "id": "66b3e42df7ec5d4fd769f6fd",
        "title": "Notes “App” just Randomly Deleted Everything without a trace. How??? : r/applehelp",
        "url": "https://www.reddit.com/r/applehelp/comments/17b1xu4/notes_app_just_randomly_deleted_everything/"
      },
      {
        "id": "66b3e47ef7ec5d4fd769f9a1",
        "title": "How to Bulk Export all of your iCloud Notes from Apple : r/applehelp",
        "url": "https://www.reddit.com/r/applehelp/comments/wdtw2f/how_to_bulk_export_all_of_your_icloud_notes_from/"
      }
    ]
  },
  {
    "cardType": "ImageCard",
    "stockImage": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSTa0UC7N0Wewy6S024ujjHi8p_RY1VYFXhbw&s",
    "category": "Media & Communication",
    "content": "Watched Game Of Thrones Season 6 Episode 5-9.",
    "date": "05 Aug 2024",
    "id": "abcdefghijklmnop",
    "metadata": {
      "activity": "researched",
      "description": "PrinceTesting researched methods to bulk export iCloud Notes, likely due to a need for data backup or migration.",
      "tags": [
        "technology",
        "support"
      ],
      "titles": [
        "How to Bulk Export all of your iCloud Notes from Apple : r/applehelp",
        "Notes “App” just Randomly Deleted Everything without a trace. How??? : r/applehelp"
      ]
    },
    "minted": false,
    "tags": [
      "technology",
      "support"
    ],
    "urls": [
      {
        "id": "66b3e42df7ec5d4fd769f6fd",
        "title": "Notes “App” just Randomly Deleted Everything without a trace. How??? : r/applehelp",
        "url": "https://www.reddit.com/r/applehelp/comments/17b1xu4/notes_app_just_randomly_deleted_everything/"
      },
      {
        "id": "66b3e47ef7ec5d4fd769f9a1",
        "title": "How to Bulk Export all of your iCloud Notes from Apple : r/applehelp",
        "url": "https://www.reddit.com/r/applehelp/comments/wdtw2f/how_to_bulk_export_all_of_your_icloud_notes_from/"
      }
    ]
  }
]

// Fetching User Full Data. [Static Cards, Published Cards, User]
const GET_FULL_DATA = 'user/{slug}/published-cards/info'
// Fetching Pending Cards.
const GET_PENDING_CARDS = 'cards/pending/{slug}'

export default function ProfileV2({ user, setUser }: UserDataProps) {
  const { event, updateEvent } = useContext(EventContext)
  const [userFullData, setUserFullData] = useState<fullUserData | null>(null)
  const [isPublic, setIsPublic] = useState<boolean>(true)
  const [showBanner, setShowBanner] = useState<boolean>(true)
  const [pendingCards, setPendingCards] = useState<PendingCard[]>()
  const { slug } = useParams()
  const navigate = useNavigate()

  // Check if the current slug matches the one in localStorage, and set the isPublic flag accordingly.
  useEffect(() => {
    const storedSlug = localStorage.getItem('slug');
    setIsPublic(storedSlug !== slug);
  }, []);

  // Fetch Pending Cards.
  const { fetchData: fetchPendingCardData } = useFetch<PendingCard[]>()
  useEffect(() => {
    const fetchData = async () => {
      try {
        fetchPendingCardData(replaceSlugInURL(GET_PENDING_CARDS, slug), {
          onSuccessfulFetch(data) {
            if (data) {
              console.log('pending Cards', data, '\n-------------');
              setPendingCards(data)
            }
          }
        })
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    }
    fetchData()
  }, []);

  // Fetch Full user Data. [Static Cards, Published Cards, User]
  const { fetchData: fetchFullUserData } = useFetch<fullUserData>()
  useEffect(() => {
    try {
      fetchFullUserData(replaceSlugInURL(GET_FULL_DATA, slug), {
        onSuccessfulFetch(data) {
          if (data) {
            console.log('User full Data : ', data, '\n-------------');
            setUserFullData(data);
            // TODO: Remove this DummyCards Once we get actual ones.
            // data.published_cards.push(...DummyYTCards);
            data.published_cards.push(...DummyImageCards);
            data.published_cards = updateCardTypeToRenderInAllCards(data.published_cards) as PublishedCard[];
            // If isNotPublic then set the user's Data.
            if (!isPublic) {
              setUser(data.user)
            }
          }
        }
      })
    } catch (error) {
      console.error('Error fetching data:', error)
    }
  }, []);

  // Click Handlers.
  const handlePublishCardCreation = () => navigate('/cards');

  return (
    <div className="flex flex-col h-full bg-gray-50">
      {/* Banner Section */}
      {!pendingCards?.length && !isPublic && showBanner && (
        <BannerComponent
          setShowBanner={setShowBanner}
          user={user}
        />
      )}

      {/* Profile Section */}
      <div className="flex flex-col w-full mt-[50px] items-center mx-auto">
        <div className="w-[75%] gap-6 h-80 flex flex-col md:flex-row justify-center">
          {userFullData?.user && userFullData?.static_cards && (
            <ProfileV3
              data={userFullData.static_cards}
              user={userFullData.user}
            />
          )}
        </div>
      </div>

      {/* Published Cards Section */}
      <div className="flex w-full items-center mx-auto justify-center mt-5 bg-gray-50">
        <div className="w-[75%] grid">
          {/* if user has published Cards then show Feeds */}
          {userFullData?.published_cards && userFullData?.published_cards?.length > 0 ? (
            <Feeds
              data={userFullData.published_cards}
              user={userFullData.user}
            />
          ) : (
            // If user don't have any published cards then show CTA for publish Card.
            userFullData?.user && (
              <div className="relative h-full bg-gray-50 flex flex-col items-center">
                <span className="w-full text-[32px] font-semibold text-gray-700">
                  My Cards
                </span>
                <div className="flex flex-col w-[352px] rounded-xl items-center my-20">
                  {isPublic ? (
                    <>
                      <Cat className="h-[250px] w-[250px] mb-4" />
                      <div className="text-[24px] font-semibold text-gray-800 mb-2">
                        Wow so empty!
                      </div>
                      <div className="text-[14px] font-semibold text-gray-500 text-center">
                        Looks like {slug} has not published any cards yet, Check back soon!
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="text-[24px] font-semibold text-gray-800 mb-2">
                        Wow so empty!
                      </div>
                      <div className="text-[14px] font-semibold text-gray-500 text-center mb-4">
                        Publish your activities on the internet and show them your true personality!
                      </div>
                      <button
                        className="bg-primary text-white px-2 py-[10px] rounded-lg shadow flex items-center justify-center"
                        onClick={handlePublishCardCreation}
                      >
                        <Plus className="stroke-white w-5 h-5 mr-2" />
                        <span>Publish Now</span>
                      </button>
                    </>
                  )}
                </div>
              </div>
            )
          )}
        </div>
      </div>

      {/* Settings Modal */}
      <Modal
        isOpen={event === NavbarEvents.SETTINGS}
        onClose={() => updateEvent(null)}
      >
        <div className="container">
          <Settings user={user} />
        </div>
      </Modal>
    </div>
  );
};
