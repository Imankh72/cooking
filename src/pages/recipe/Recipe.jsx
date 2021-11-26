import { useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import useFetch from "../../hooks/useFetch";
import { useTheme } from "../../hooks/useTheme";
import deleteIcon from "../../assets/delete-icon.svg";

import "./Recipe.css";

const Recipe = () => {
  const { id } = useParams();
  const { mode } = useTheme();

  const {
    error,
    isPending,
    data: recipe,
  } = useFetch(`http://localhost:4000/recipes/${id}`);
  const navigate = useNavigate();

  const deleteRecipe = async (id) => {
    await fetch(`http://localhost:4000/recipes/${id}`, { method: "DELETE" });
    navigate("/");
  };

  useEffect(() => {
    setTimeout(() => {
      if (error) navigate("/");
    }, 2000);
  }, [error, navigate]);

  return (
    <div className={`recipe ${mode}`}>
      {error && <p className="error">{error}</p>}
      {isPending && <p className="loading">Loading...</p>}
      {recipe && (
        <>
          <h2 className={`page-title ${mode}`}>{recipe.title}</h2>
          <p>Takes {recipe.cookingTime} to cook.</p>
          <ul>
            {recipe.ingredients.map((ingredient) => (
              <li key={ingredient}>{ingredient}</li>
            ))}
          </ul>
          <p className="method">{recipe.method}</p>
          <img
            className="delete"
            src={deleteIcon}
            onClick={() => deleteRecipe(recipe.id)}
            alt="delete icon"
          />
        </>
      )}
    </div>
  );
};

export default Recipe;
