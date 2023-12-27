import { useState, KeyboardEvent } from 'react'
import { ReactComponent as Cross } from '../../assets/images/cross.svg'

export interface Tag {
  id: number
  name: string
}

interface TagsProps {
  tags: Tag[]
  setTags: React.Dispatch<React.SetStateAction<Tag[]>>
  placeholder?: string
  hideInput?: boolean
}

const Tags: React.FC<TagsProps> = ({
  tags,
  setTags,
  placeholder,
  hideInput = false
}) => {
  const [inputValue, setInputValue] = useState('')

  const handleInputKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && inputValue.trim() !== '') {
      setTags([...tags, { id: tags.length + 1, name: inputValue.trim() }])
      setInputValue('')
    }
  }

  const handleTagRemove = (tagId: number) => {
    const updatedTags = tags.filter((tag) => tag.id !== tagId)
    setTags(updatedTags)
  }

  return (
    <div className="flex flex-col items-start">
      <div className="flex flex-row items-center flex-wrap">
        {tags.map((tag) => (
          <div
            key={tag.id}
            className="flex flex-row items-center border border-gray-300 rounded-md px-3 py-1 my-1 text-sm font-medium text-gray-700 mr-2"
          >
            {tag.name}
            <button onClick={() => handleTagRemove(tag.id)} className="ml-1">
              <Cross className="w-4 h-4" />
            </button>
          </div>
        ))}
        {!hideInput && (
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleInputKeyDown}
            placeholder={placeholder || 'Add tags...'}
            className="border-none outline-none focus:outline-none focus:ring-0 rounded px-3 py-1"
          />
        )}
      </div>
    </div>
  )
}

export default Tags
