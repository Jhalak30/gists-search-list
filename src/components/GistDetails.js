import React from "react";

function GistDetails({ details, loading }) {
  if (loading) {
    return <h1 className="loader">Loading...</h1>;
  }

  const filterLastThreeForks = () => {
    let forks = details.forks;
    const forksLength = forks.length;
    if (forks.length > 3) {
      return forks.slice(forksLength - 3, forksLength);
    }
    return forks;
  };

  return (
    <div className="gist-details-container">
      <div className="details-row">
        <label className="label">Files:</label>
        <ul>
          {details.files
            ? Object.keys(details.files).map((fileName, idx) => {
                return (
                  <li key={idx} className="value">
                    {details.files[fileName].filename}
                  </li>
                );
              })
            : null}
        </ul>
      </div>
      <div className="details-row">
        <label className="label">Forks: </label>
        <ul>
          {details.forks
            ? filterLastThreeForks(details.forks).map((fork, idx) => {
                return (
                  <li key={idx} className="value">
                    {fork.user.login}/
                    <img
                      className="avatar"
                      src={fork.user.avatar_url}
                      alt="imageAvatar"
                    ></img>
                  </li>
                );
              })
            : null}
        </ul>
      </div>
    </div>
  );
}

export default GistDetails;
