const searchGithub = async () => {
  try {
    console.log("🔑 GitHub Token:", import.meta.env.VITE_GITHUB_TOKEN); // Debugging

    const response = await fetch(
      `https://api.github.com/users?per_page=10`,
      {
        headers: {
          Authorization: `Bearer ${import.meta.env.VITE_GITHUB_TOKEN}`,
          "Accept": "application/vnd.github+json",
        },
      }
    );

    console.log("🚀 API Response Status:", response.status); // Log API response

    if (!response.ok) {
      throw new Error(`🚨 Error ${response.status}: Unable to fetch candidates.`);
    }

    const data = await response.json();
    console.log("✅ GitHub API Users Response:", data);
    return data;
  } catch (err) {
    console.error("🚨 Error fetching GitHub users:", err);
    return [];
  }
};

// Fetch a specific GitHub user by username
const searchGithubUser = async (username: string) => {
  try {
    console.log(`🔍 Fetching user: ${username}`);

    const response = await fetch(
      `https://api.github.com/users/${username}`,
      {
        headers: {
          Authorization: `Bearer ${import.meta.env.VITE_GITHUB_TOKEN}`,
          "Accept": "application/vnd.github+json",
        },
      }
    );

    console.log("🚀 API Response Status:", response.status);

    if (!response.ok) {
      throw new Error(`🚨 Error ${response.status}: Unable to fetch user.`);
    }

    const data = await response.json();
    console.log("✅ GitHub User Response:", data);
    return data;
  } catch (err) {
    console.error("🚨 Error fetching GitHub user:", err);
    return {};
  }
};

// ✅ Export both functions so they can be used in other files
export { searchGithub, searchGithubUser };
