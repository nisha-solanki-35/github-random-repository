const languageSelect = document.getElementById("language")
const refreshBtn = document.getElementById("refreshBtn")
const statusDiv = document.getElementById("status")
const retryBtn = document.getElementById("retryBtn")
const repoContainer = document.getElementById("repository")
const repoName = document.getElementById("repoName")
const repoDescription = document.getElementById("repoDescription")
const language = document.getElementById("languagetext")
const stars = document.getElementById("stars")
const forks = document.getElementById("forks")
const issues = document.getElementById("issues")

const GITHUB_API_URL = "https://api.github.com/search/repositories"

const fetchRandomRepository = async () => {
  const language = languageSelect.value

  if (!language) {
    statusDiv.textContent = "Please select a programming language."
    return
  }

  statusDiv.classList.remove("error")
  statusDiv.classList.remove("hidden")
  statusDiv.textContent = "Loading..."
  repoContainer.classList.add("hidden")
  try {
    const response = await fetch(`${GITHUB_API_URL}?q=language:${language}&sort=stars&order=desc&per_page=100`)
    if (!response.ok) {
      throw new Error("Failed to fetch repositories.")
    }
    const data = await response.json() 
    if (data.items.length === 0) {
      statusDiv.textContent = "No repositories found."
      return
    }
    const randomRepo = data.items[Math.floor(Math.random() * data.items.length)]
    displayRepository(randomRepo)
    statusDiv.classList.add("hidden")
  } catch (error) {
    retryBtn.classList.remove("hidden")
    statusDiv.classList.add("error")
    refreshBtn.classList.add("hidden")
    statusDiv.textContent = "Error fetching repositories"
  }
}

const displayRepository = (repo) => {
  repoName.textContent = repo.full_name
  repoDescription.textContent = repo.description || "No description available."
  language.textContent = repo.language
  stars.textContent = repo.stargazers_count
  forks.textContent = repo.forks_count
  issues.textContent = repo.open_issues_count
  repoContainer.classList.remove("hidden")
  refreshBtn.classList.remove("hidden")
}

languageSelect.addEventListener('change', fetchRandomRepository)
retryBtn.addEventListener("click", fetchRandomRepository)
refreshBtn.addEventListener("click", fetchRandomRepository)
