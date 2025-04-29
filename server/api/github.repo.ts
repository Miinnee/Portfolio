// server/api/github.repo.ts
export default defineEventHandler(async (event) => {
  const githubUsername = 'miinnee'
  
  try {
    const response = await fetch(`https://api.github.com/users/${githubUsername}/repos`)
    
    if (!response.ok) throw new Error(`GitHub API error: ${response.statusText}`)
    
    return await response.json()
  } catch (error) {
    console.error('Failed to fetch GitHub repos:', error)
    return { error: 'Failed to fetch GitHub repos' }
  }
})