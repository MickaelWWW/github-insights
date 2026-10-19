import { useRef, useState } from "react";
import Header from "../../components/Header/Header";
import SearchBar from "../../components/SearchBar/SearchBar";
import Profile from "../../components/Profile/Profile";
import { getGitHubUser } from "../../services/githubApi";

function Home() {
  const [searchTerm, setSearchTerm] = useState("");
  const [profileData, setProfileData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const searchId = useRef(0);

  async function handleSearch() {
    setError(null);

    if (!searchTerm.trim()) {
      setError("Digite um usuário do GitHub.");
      return;
    }

    const username = searchTerm.trim();

    searchId.current++;
    const currentSearchId = searchId.current;

    setLoading(true);

    try {
      const dados = await getGitHubUser(username);

      if (currentSearchId !== searchId.current) {
        return;
      }

      setProfileData(dados);
    } catch (erro) {
      if (currentSearchId !== searchId.current) {
        return;
      }

      switch (erro.type) {
        case "USER_NOT_FOUND":
          setError("❌ Usuário não encontrado.");
          break;

        case "RATE_LIMIT":
          setError("⚠️ Limite de acesso à API atingido.");
          break;

        case "SERVER_ERROR":
          setError("🔴 O servidor do GitHub apresentou um erro.");
          break;

        default:
          setError("❌ Não foi possível realizar a busca.");
      }

      console.log(erro);
    } finally {
      // Só a pesquisa mais recente pode desligar o loading
      if (currentSearchId === searchId.current) {
        setLoading(false);
      }
    }
  }
  return (
    <>
      <Header />

      <main>
        <h2>Bem-vindo ao GitHub Insights</h2>
        <p>
          Analise perfis do GitHub de forma inteligente, compare desenvolvedores
          e visualize estatísticas completas.
        </p>

        <SearchBar
          searchTerm={searchTerm}
          onSearchTermChange={setSearchTerm}
          onSearch={handleSearch}
        />
        <Profile profileData={profileData} error={error} loading={loading} />
      </main>
    </>
  );
}

export default Home;
