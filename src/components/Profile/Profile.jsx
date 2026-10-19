import "./Profile.css";

function Profile({ profileData, error, loading }) {
  return (
    <div className="profile">
      {loading ? (
        <p>🔄 Buscando perfil...</p>
      ) : error ? (
        <p className="error">{error}</p>
      ) : profileData ? (
        <>
          <img src={profileData.avatar_url} alt={profileData.name} />

          <h2>{profileData.name}</h2>

          <p className="login">@{profileData.login}</p>

          {profileData.location ? (
            <p className="location">📍 {profileData.location}</p>
          ) : null}

          {profileData.bio ? <p className="bio">{profileData.bio}</p> : null}

          <div className="stats">
            <div>
              <strong>{profileData.followers}</strong>
              <span>Seguidores</span>
            </div>

            <div>
              <strong>{profileData.following}</strong>
              <span>Seguindo</span>
            </div>
          </div>

          <p className="repositories">
            📦 {profileData.public_repos} Repositórios
          </p>
        </>
      ) : (
        <p>Pesquise um usuário do GitHub para começar.</p>
      )}
    </div>
  );
}

export default Profile;
