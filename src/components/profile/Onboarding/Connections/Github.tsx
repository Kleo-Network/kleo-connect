import React, { useEffect, useState } from 'react'
import axios from 'axios'
import config from '../../../common/config'
import useFetch from '../../../common/hooks/useFetch'

interface CommitData {
  date: string
  count: number
}

const GitHubSignIn: React.FC = () => {
  const [commitData, setCommitData] = useState<CommitData[]>([])
  const [isGitHubConnected, setIsGitHubConnected] = useState(false)
  const { fetchData: createGitHubCard } = useFetch<any>()
  const CREATE_GITHUB_CARD = 'static-card/github/{slug}'
  const slug = sessionStorage.getItem('slug') || ''

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
        body: JSON.stringify({
          code: code
        }),
        onSuccessfulFetch: () => {
          setIsGitHubConnected(true)
        }
      })
    }

    // Check if the current URL contains the authorization code
    const urlParams = new URLSearchParams(window.location.search)
    const code = urlParams.get('code')

    // Execute handleGitHubCardCreation only if code exists and it's not already handled
    if (code && !isGitHubConnected) {
      handleGitHubCardCreation(code)
    }
  }, [])

  return (
    <div>
      {isGitHubConnected ? (
        <div>
          <h2>Welcome, {slug} for Github!</h2>
        </div>
      ) : (
        <button
          onClick={handleSignIn}
          className="bg-gray-800 hover:bg-gray-900 text-white font-bold py-2 px-4 rounded"
        >
          Sign in with GitHub
        </button>
      )}
      {commitData.length > 0 && (
        <div className="mt-4">
          <h2 className="text-xl font-bold">Commit Graph (Last Month)</h2>
          <ul>
            {commitData.map((data, index) => (
              <li key={index} className="py-1">
                {data.date}: {data.count} commits
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}

export default GitHubSignIn
