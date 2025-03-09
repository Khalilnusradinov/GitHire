import { Candidate } from "../interfaces/Candidate.interface";

const SavedCandidates = () => {
  const savedCandidates: Candidate[] = JSON.parse(localStorage.getItem("savedCandidates") || "[]");

  return (
    <div>
      <h1>Potential Candidates</h1>
      {savedCandidates.length === 0 ? (
        <p>No candidates have been accepted.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Avatar</th>
              <th>Name</th>
              <th>Location</th>
              <th>Company</th>
            </tr>
          </thead>
          <tbody>
            {savedCandidates.map((candidate) => (
              <tr key={candidate.id}>
                <td><img src={candidate.avatar_url} alt="avatar" width={50} /></td>
                <td>{candidate.login}</td>
                <td>{candidate.location || "N/A"}</td>
                <td>{candidate.company || "N/A"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default SavedCandidates;
