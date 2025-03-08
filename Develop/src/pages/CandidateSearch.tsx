import { useState, useEffect } from "react";
import { searchGithub, searchGithubUser } from "../api/API";
import { Candidate } from "../interfaces/Candidate.interface";

const CandidateSearch = () => {
  // State variables
  const [candidate, setCandidate] = useState<Candidate | null>(null);
  const [savedCandidates, setSavedCandidates] = useState<Candidate[]>(() => {
    return JSON.parse(localStorage.getItem("savedCandidates") || "[]");
  });
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch a new candidate when component loads
  useEffect(() => {
    getNextCandidate();
  }, []);

  // Function to fetch the next candidate
  const getNextCandidate = async () => {
    setLoading(true);
    setError(null);

    try {
      const users = await searchGithub();
      console.log("🔍 GitHub API Users Response:", users);

      if (!users || users.length === 0) {
        setCandidate(null);
        setError("No more candidates available.");
        return;
      }

      // Fetch user details
      const userDetails = await searchGithubUser(users[0].login);
      console.log("🔍 Fetched User Details:", userDetails);

      if (!userDetails || !userDetails.login) {
        setError("Failed to load candidate details.");
        setCandidate(null);
        return;
      }

      // Ensure required fields exist before setting candidate
      setCandidate({
        id: userDetails.id,
        login: userDetails.login,
        avatar_url: userDetails.avatar_url || "",
        location: userDetails.location || "Unknown",
        company: userDetails.company || "Not provided",
        html_url: userDetails.html_url || "",
        email: userDetails.email || "Not available",
        bio: userDetails.bio || "No bio available",
      });
    } catch (err) {
      console.error("🚨 Error fetching candidate:", err);
      setError("An error occurred while fetching candidates.");
    } finally {
      setLoading(false);
    }
  };

  // Function to save candidate
  const saveCandidate = () => {
    if (candidate) {
      const updatedCandidates = [...savedCandidates, candidate];
      setSavedCandidates(updatedCandidates);
      localStorage.setItem("savedCandidates", JSON.stringify(updatedCandidates));
    }
    getNextCandidate();
  };

  return (
    <div>
      <h1>Candidate Search</h1>

      {loading && <p>Loading candidate...</p>}

      {error && !loading && <p>{error}</p>}

      {candidate && !loading && (
        <div>
          <img src={candidate.avatar_url} alt="avatar" width={100} />
          <h2>{candidate.login}</h2>
          <p>Location: {candidate.location}</p>
          <p>Company: {candidate.company}</p>
          <p>Email: {candidate.email}</p>
          <p>Bio: {candidate.bio}</p>
          <a href={candidate.html_url} target="_blank" rel="noopener noreferrer">
            View Profile
          </a>
          <br />
          <button onClick={saveCandidate}>✔ Accept</button>
          <button onClick={getNextCandidate}>❌ Reject</button>
        </div>
      )}
    </div>
  );
};

export default CandidateSearch;
