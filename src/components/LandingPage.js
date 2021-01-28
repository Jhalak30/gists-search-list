import React, { useEffect, useState } from "react";
import axios from "axios";
import GistDetails from "./GistDetails";

function LandigPage() {
  const [username, setUserName] = useState("");
  const [gists, setGists] = useState([]);
  const [detailsLoading, setDetailsLoading] = useState(false);
  const [forks, setForksData] = useState([]);

  useEffect(() => {
    setGists([]);
    setForksData([]);
  }, [username]);

  const handleSubmit = (e) => {
    e.preventDefault();
    getGists();
  };

  const getGists = () => {
    axios({
      method: "GET",
      url: `https://api.github.com/users/${username}/gists`,
    }).then((res) => {
      setGists(res.data);
    });
  };

  const getGistDetails = (gistId) => {
    setDetailsLoading(true);
    axios({
      method: "GET",
      url: `https://api.github.com/gists/${gistId}`,
    }).then((res) => {
      setForksData(res.data);
      setDetailsLoading(false);
    });
  };

  const renderGist = (gist) => {
    if (gist.public) {
      return (
        <div
          className="row"
          key={gist.id}
          onClick={() => getGistDetails(gist.id)}
        >
          {Object.keys(gist.files).map((key, idx) => {
            return idx < 1 ? (
              <h2 className="gist-name" key={idx}>
                {gist.owner.login}/{key}
              </h2>
            ) : null;
          })}
        </div>
      );
    }
  };

  return (
    <div className="page">
      <div className="container">
        <div className="left-side-container">
          <form className="form">
            <input
              className="input"
              value={username}
              placeholder="Enter Github UserName"
              onChange={(e) => setUserName(e.target.value)}
            />
            <button className="button" onClick={handleSubmit}>
              Search
            </button>
          </form>
          <div className="results-container">{gists.map(renderGist)}</div>
        </div>

        <GistDetails details={forks} loading={detailsLoading} />
      </div>
    </div>
  );
}

export default LandigPage;
