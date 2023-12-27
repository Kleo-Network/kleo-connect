import { ChangeEvent, useState } from 'react'
import Tags, { Tag } from '../../common/Tags'
import { Categories } from './Categories'

export default function Privacy() {
  const [keywords, setKeywords] = useState<Tag[]>([])
  const [domains, setDomains] = useState<Tag[]>([])

  const handleSelectChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const selectedTag = e.target.value
    if (selectedTag) {
      setKeywords([...keywords, { id: keywords.length + 1, name: selectedTag }])
    }
  }

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
            Filter Keywords
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
              className="border border-gray-300 rounded-md"
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
          <button className="px-4 py-3 bg-primary rounded-lg shadow border justify-center items-center gap-2 flex">
            <span className="text-white text-sm font-medium">Save</span>
          </button>
        </div>
      </div>
    </div>
  )
}
