import RecipeList from "../../components/RecipeList";
import useFetch from "../../hooks/useFetch";
import { useTheme } from "../../hooks/useTheme";

import "./Home.css";

const Home = () => {
  const { data, isPending, error } = useFetch("http://localhost:4000/recipes");
  const { mode } = useTheme();

  return (
    <div className="home">
      {error && <p className={`error ${mode}`}>{error}</p>}
      {isPending && <p className={`loading ${mode}`}>Loading...</p>}
      {data && <RecipeList recipes={data} />}
    </div>
  );
};

export default Home;
