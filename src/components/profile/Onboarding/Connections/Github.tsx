import React, { useEffect, useState } from 'react'
import axios from 'axios'
import config from '../../../common/config'
import useFetch from '../../../common/hooks/useFetch'
import {
  GitCard,
  StaticCard as StaticCardType
} from '../../../common/interface'

interface GithubProps {
  cards?: StaticCardType[] // Replace 'any' with the actual type of createdStaticCards
}

const GitHubSignIn: React.FC<GithubProps> = ({ cards }) => {
  const [isGitHubConnected, setIsGitHubConnected] = useState(false)
  const { fetchData: createGitHubCard } = useFetch<any>()
  const CREATE_GITHUB_CARD = 'static-card/github/{slug}'
  const slug = localStorage.getItem('slug') || ''
  const [username, setUsername] = useState('')

  useEffect(() => {
    const getCardinCards = (cardType: string) => {
      if (cards?.find((card) => card.cardType == cardType)) {
        const card = cards?.find((card) => card.cardType == cardType)
        if (card) setUsername((card.metadata as GitCard).username)
        return true
      }
      return false
    }
    getCardinCards('GitCard')
  }, [])

  const handleSignIn = () => {
    console.log(config.github.clientId)
    const clientId = config.github.clientId
    const redirectUri = 'http://localhost:5173/signup/4'
    const scope = 'repo'

    const authUrl = `https://github.com/login/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scope}`

    window.location.href = authUrl
  }

  function makeGitHubCardUrl(): string {
    return CREATE_GITHUB_CARD.replace('{slug}', slug)
  }

  useEffect(() => {
    const handleGitHubCardCreation = async (code: string) => {
      createGitHubCard(makeGitHubCardUrl(), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ code: code }),
        onSuccessfulFetch: () => {
          setIsGitHubConnected(true)
          setUsername(slug)
        }
      })
    }

    // Check if the current URL contains the authorization code
    const urlParams = new URLSearchParams(window.location.search)
    const code = urlParams.get('code')

    // Execute handleGitHubCardCreation only if code exists and it's not already handled
    if (code && username === '') {
      handleGitHubCardCreation(code)
    }
  }, [])

  return (
    <div className="flex">
      <div className="w-1/2 pt-2 pl-1 pr-3">
        <div className="flex flex-col items-start justify-center">
          <div className="flex mb-20 flex-col items-start justify-center">
            <span className="text-gray-900 text-base font-sm">Github Card</span>
            <span className="text-gray-400 text-sm font-regular">
              We use your{' '}
              <u className="text-gray-800 bold">
                {' '}
                contributions graph in last 3 months{' '}
              </u>{' '}
              and showcase it on your profile!
            </span>
          </div>
        </div>
      </div>
      <div className="w-1/2 mt-7">
        {isGitHubConnected || username ? (
          <div>
            <h2 className="text-green-800">Connected @{username} GitHub.</h2>
          </div>
        ) : (
          <button
            onClick={handleSignIn}
            className="bg-gray-800 hover:bg-gray-900 text-white font-bold py-2 px-4 rounded"
          >
            Sign in with GitHub
          </button>
        )}
      </div>
    </div>
  )
}

export default GitHubSignIn
