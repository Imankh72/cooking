import { useLocation } from "react-router";
import useFetch from "../../hooks/useFetch";
import RecipeList from "../../components/RecipeList";
import { useTheme } from "../../hooks/useTheme";

import "./Search.css";

const Search = () => {
  const { mode } = useTheme();

  const queryString = useLocation().search;
  const queryParams = new URLSearchParams(queryString);
  const query = queryParams.get("q");

  const url = `http://localhost:4000/recipes?q=${query}`;
  const { data, isPending, error } = useFetch(url);

  return (
    <div>
      <h2 className={`page-title ${mode}`}>Recipes including "{query}"</h2>
      {error && <p className={`error ${mode}`}>{error}</p>}
      {isPending && <p className="loading">Loading...</p>}
      {data && <RecipeList recipes={data} />}
    </div>
  );
};

export default Search;
