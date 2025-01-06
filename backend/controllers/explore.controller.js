export const explorePopularRepos = async(req,res) => {
    try {
        const { language } = req.params
        const repoRes = await fetch(`https://api.github.com/search/repositories?q=language:${language}&sort=stars&order=desc&per_page=20`,
            {
                headers: {
                    authorization: `token ${process.env.GITHUB_API_KEY}`
                }
            }
        )
        const repos = await repoRes.json()

        return res
        .status(200)
        .json({
            repos: repos.items
        })
    } catch (error) {
        return res
        .status(500)
        .json({error: error.message})
    }
}