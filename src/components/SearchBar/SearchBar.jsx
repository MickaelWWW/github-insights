import "./SearchBar.css";

function SearchBar({ searchTerm, onSearchTermChange, onSearch }) {
  function handleChange(event) {
    onSearchTermChange(event.target.value);
  }

  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder="Digite o usuário do GitHub"
        value={searchTerm}
        onChange={handleChange}
      />
      <button type="button" onClick={onSearch}>
        Pesquisar
      </button>
    </div>
  );
}

export default SearchBar;
