import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getSearch } from "../api";
import { toast } from "react-toastify";

function SearchBar() {

  const [filter, setFilter] = useState("");
  const [isFilterReady, setIsFilterReady] = useState(false);
  
  const navigate = useNavigate();

  useEffect(() => {
    if (isFilterReady) {
      navigate(
        `/questions?limit=10&offset=0&filter=${encodeURIComponent(filter)}`
      );
    }
  }, [isFilterReady, filter, navigate]);

  async function handleSubmitSearch(event) {
    event.preventDefault();
    try {
      await getSearch(filter);
      setIsFilterReady(true);
    } catch (error) {
      toast.error("An error has occured", error.message);
    }
  }

  function handleInput(event) {
    setFilter(event.target.value.toLowerCase());
  }

  return (
    <>
      <form>
        <label htmlFor="search">
          <span>Search questions</span>
        </label>
        <input
          type="text"
          placeholder="Hearch questions"
          onChange={handleInput}
        />
        <button type="submit" onClick={handleSubmitSearch}>
          Search
        </button>
      </form>
    </>
  );
}

export default SearchBar;
