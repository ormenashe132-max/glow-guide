type SearchBarProps = {
  searchText: string
  onSearchTextChange: (text: string) => void
}

function SearchBar({ searchText, onSearchTextChange }: SearchBarProps) {
  return (
    <label className="search-label">
      חיפוש לפי שם
      <span className="search-field">
        <span className="search-icon" aria-hidden="true">
          🔍
        </span>
        <input
          type="search"
          value={searchText}
          onChange={(event) => onSearchTextChange(event.target.value)}
        />
      </span>
    </label>
  )
}

export default SearchBar
