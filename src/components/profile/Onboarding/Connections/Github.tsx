import React, { useState } from 'react'
import axios from 'axios'

interface CommitData {
  date: string
  count: number
}

const GitHubSignIn: React.FC = () => {
  const [commitData, setCommitData] = useState<CommitData[]>([])

  const handleSignIn = () => {
    const clientId = 'Iv1.666e3e81aed871f5'
    const redirectUri = 'http://localhost:5173/signup/4'
    const scope = 'repo'

    const authUrl = `https://github.com/login/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scope}`

    window.location.href = authUrl
  }

  const fetchCommitGraph = async (code: string) => {
    try {
      const response = await axios.post(
        'https://github.com/login/oauth/access_token',
        {
          client_id: 'Iv1.666e3e81aed871f5',
          client_secret: '4018f82d785e2eb17e3272fce8fefc97b17d104c',
          code: code
        }
      )
      console.log('response from github, post auth', response.data)
      const accessToken = new URLSearchParams(response.data).get('access_token')
      console.log('accessToken', accessToken)

      if (accessToken) {
        const today = new Date()
        const lastMonth = new Date()
        lastMonth.setMonth(today.getMonth() - 1)

        const graphResponse = await axios.get(
          'https://api.github.com/graphql',
          {
            headers: {
              Authorization: `Bearer ${accessToken}`
            },
            data: {
              query: `
              query {
                viewer {
                  contributionsCollection(from: "${lastMonth.toISOString()}", to: "${today.toISOString()}") {
                    contributionCalendar {
                      weeks {
                        contributionDays {
                          date
                          contributionCount
                        }
                      }
                    }
                  }
                }
              }
            `
            }
          }
        )

        const commitData =
          graphResponse.data.data.viewer.contributionsCollection.contributionCalendar.weeks.flatMap(
            (week: any) => week.contributionDays
          )

        setCommitData(commitData)
      } else {
        console.error('Failed to obtain access token')
      }
    } catch (error) {
      console.error('Error fetching commit graph:', error)
    }
  }

  // Check if the current URL contains the authorization code
  const urlParams = new URLSearchParams(window.location.search)
  const code = urlParams.get('code')

  if (code) {
    fetchCommitGraph(code)
  }

  return (
    <div>
      <button
        onClick={handleSignIn}
        className="bg-gray-800 hover:bg-gray-900 text-white font-bold py-2 px-4 rounded"
      >
        Sign in with GitHub
      </button>
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
