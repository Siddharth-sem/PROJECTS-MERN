const SearchBar = ({search, setSearch}) => {
  return (
    <div>
      <input 
      type="text" 
      placeholder="Search notes..."
      value={search}
      onChange={(e)=>setSearch(e.target.value)}
      />
    </div>
  )
}

export default SearchBar