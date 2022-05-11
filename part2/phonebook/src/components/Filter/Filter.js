const Filter = ({ handleSearch, searchResult }) => {
  return (
    <div>
      <form>
        <label>
          Search: {""}
          <input
            type="text"
            name="search"
            value={searchResult}
            onChange={handleSearch}
          ></input>
        </label>
      </form>
    </div>
  );
};

export default Filter;
