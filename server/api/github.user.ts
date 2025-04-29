// server/api/github.user.ts
export default defineEventHandler(async (event) => {
    const githubUsername = 'miinnee' // Remplacez par votre pseudo
    
    try {
      const response = await fetch(`https://api.github.com/users/${githubUsername}`)
      
      if (!response.ok) {
        throw new Error(`GitHub API error: ${response.statusText}`)
      }
      
      const userData = await response.json()
      return userData
    } catch (error) {
      console.error('Failed to fetch GitHub data:', error)
      return { error: 'Failed to fetch GitHub data' }
    }
  })