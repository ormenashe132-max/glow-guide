type SearchBarProps = {
  searchText: string
  onSearchTextChange: (text: string) => void
}

function SearchBar({ searchText, onSearchTextChange }: SearchBarProps) {
  return (
    <label>
      חיפוש לפי שם
      <input
        type="search"
        value={searchText}
        onChange={(event) => onSearchTextChange(event.target.value)}
      />
    </label>
  )
}

export default SearchBar
