import { ChangeEvent, useEffect, useState } from 'react'
import Tags, { Tag } from '../../common/Tags'
import { Categories } from './Categories'
import useFetch from '../../common/hooks/useFetch'
import { Method } from 'axios'
import { UserResponse } from '../Onboarding/Authentication/interface'

export default function Privacy() {
  const [keywords, setKeywords] = useState<Tag[]>([])
  const [domains, setDomains] = useState<Tag[]>([])
  const PRIVACY_ENDPOINT = `user/set_privacy`
  const GET_USER_API = 'auth/get_user_privacy'
  const { fetchData } = useFetch()
  const userAddress = localStorage.getItem('userAddress')
  const { fetchData: fetchUserPrivacy } = useFetch<any>()

  const fetchUserFromDB = async (address: string): Promise<UserResponse> => {
    return new Promise<UserResponse>((resolve) => {
      fetchUserPrivacy(GET_USER_API, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          address
        }),
        onSuccessfulFetch(data) {
          return resolve(data)
        }
      })
    })
  }

  const handleSelectChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const selectedTag = e.target.value
    if (selectedTag) {
      setKeywords([...keywords, { id: keywords.length + 1, name: selectedTag }])
    }
  }

  const handleSave = () => {
    const payload = {
      user_id: userAddress,
      privacy: {
        categories: keywords.map((tag) => tag.name),
        domains: domains.map((domain) => domain.name)
      }
    }

    const requestOptions = {
      method: 'POST' as Method,
      body: JSON.stringify(payload),
      headers: { 'Content-Type': 'application/json' }
    }

    fetchData(PRIVACY_ENDPOINT, requestOptions)
  }

  const loadUserPrivacySettings = async () => {
    try {
      const response = await fetchUserFromDB(userAddress || '')
      if (response?.privacy) {
        setKeywords(
          response.privacy.categories.map(
            (category: string, index: number) => ({
              id: index,
              name: category
            })
          )
        )
        setDomains(
          response.privacy.domains.map((domain: string, index: number) => ({
            id: index,
            name: domain
          }))
        )
      }
    } catch (error) {
      console.error('Error fetching user privacy settings:', error)
    }
  }

  // Use useEffect to load the user's current privacy settings when the component mounts
  useEffect(() => {
    loadUserPrivacySettings()
  }, [])

  return (
    <div className=" gap-6 flex-col justify-start items-start flex">
      <div className="self-stretch flex-col justify-start items-start gap-6 flex">
        <div className="self-stretch flex-col justify-start items-start gap-5 flex">
          <div className="self-stretch justify-start items-start gap-4 flex">
            <div className="grow shrink basis-0 self-stretch flex-col justify-center items-start gap-1 flex">
              <div className="self-stretch text-gray-900 text-lg font-medium">
                Privacy
              </div>
              <div className="self-stretch text-gray-500 text-sm font-normal">
                Filter out specific keywords or domains that you prefer not to
                include in your browsing history summary
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="self-stretch flex-col justify-start items-start gap-1.5 flex">
        <div className="self-stretch grow shrink basis-0 flex-col justify-start items-start gap-1.5 flex">
          <div className="text-slate-700 text-sm font-medium">
            Filter Categories
          </div>
          <div className="self-stretch grow shrink basis-0 p-3 bg-white rounded-lg shadow border border-gray-300 flex-col justify-start items-start gap-2 flex">
            <Tags
              tags={keywords}
              setTags={setKeywords}
              placeholder="Add Keywords..."
              hideInput={true}
            />
            <select
              value=""
              onChange={handleSelectChange}
              //   multiple
              className="border border-gray-300 rounded-md text-sm"
            >
              <option value="" disabled>
                Select a category...
              </option>
              {Categories.map((option, index) => (
                <option
                  key={index}
                  value={option}
                  selected={keywords.includes({ id: index, name: option })}
                >
                  {option}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
      <div className="self-stretch flex-col h-40 justify-start items-start gap-1.5 flex">
        <div className="self-stretch grow shrink basis-0 flex-col justify-start items-start gap-1.5 flex">
          <div className="text-slate-700 text-sm font-medium">
            Filter Domains
          </div>
          <div className="self-stretch grow shrink basis-0 p-3 bg-white rounded-lg shadow border border-gray-300 flex-col justify-start items-start gap-2 flex">
            <div className="self-stretch justify-start items-start gap-2 flex">
              <Tags
                tags={domains}
                setTags={setDomains}
                placeholder="Add Domains..."
              />
            </div>
          </div>
        </div>
      </div>
      <div className="self-stretch justify-start items-center gap-5 flex">
        <div className="grow shrink basis-0 h-10 justify-start items-center gap-3 flex">
          <button
            onClick={handleSave}
            className="px-4 py-3 bg-primary rounded-lg shadow border justify-center items-center gap-2 flex"
          >
            <span className="text-white text-sm font-medium">Save</span>
          </button>
        </div>
      </div>
    </div>
  )
}
