import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router";
import useFetch from "../../hooks/useFetch";
import { useTheme } from "../../hooks/useTheme";

import "./Create.css";

const Create = () => {
  const [title, setTitle] = useState("");
  const [method, setMethod] = useState("");
  const [cookingTime, setCookingTime] = useState("");
  const [ingredients, setIngredients] = useState([]);
  const [newIngredient, setNewIngredient] = useState("");
  const ingredientInput = useRef(null);

  const { mode } = useTheme();
  const { postData, data } = useFetch("http://localhost:4000/recipes", "POST");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    postData({
      title,
      ingredients,
      method,
      cookingTime: `${cookingTime} minutes`,
    });
    setTitle("");
    setMethod("");
    setCookingTime("");
  };

  const addIngredient = (e) => {
    e.preventDefault();
    const ing = newIngredient.trim();

    if (ing && !ingredients.includes(ing)) {
      setIngredients((prevIngredients) => [...prevIngredients, ing]);
    }
    setNewIngredient("");
    ingredientInput.current.focus();
  };

  useEffect(() => {
    if (data) {
      navigate("/");
    }
  }, [data, navigate]);

  return (
    <div className={`create ${mode}`}>
      <h2 className="page-title">Add a New Recipe</h2>
      <form onSubmit={handleSubmit}>
        <label>
          <span>Recipe title:</span>
          <input
            type="text"
            onChange={(e) => setTitle(e.target.value)}
            value={title}
            required
          />
        </label>

        <label>
          <span>Recipe ingredients:</span>
          <div className="ingredients">
            <input
              type="text"
              onChange={(e) => setNewIngredient(e.target.value)}
              value={newIngredient}
              ref={ingredientInput}
            />
            <button className="btn" onClick={addIngredient}>
              Add
            </button>
          </div>
        </label>
        <div className="current-ingredients">
          <p>Current ingredients:</p>
          {ingredients.map((ingredient) => (
            <em key={ingredient}>{ingredient},</em>
          ))}
        </div>

        <label>
          <span>Recipe method:</span>
          <textarea
            onChange={(e) => setMethod(e.target.value)}
            value={method}
            required
          />
        </label>

        <label>
          <span>Cooking time (minutes):</span>
          <input
            type="number"
            onChange={(e) => setCookingTime(e.target.value)}
            value={cookingTime}
            required
          />
        </label>

        <button className="btn">Submit</button>
      </form>
    </div>
  );
};

export default Create;
