import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import MealCarousel from "../../Components/MealCarousel/MealCarousel";
import { fetchAllMeals } from "../store/slices/mealSlice";
import { fetchAllRecipes } from "../store/slices/recipesSlice";
import { Dialog } from "@headlessui/react";
import axios from "axios";
import addImage from "../../assets/images/add.svg";
import closeImage from "../../assets/images/close.svg";
import SelectField from "../../Components/SelectField";
import TextField from "../../Components/TextField";
import { BACKEND_URL } from "../../config/config";
import AddIcon from "../../Components/Buttons/AddIcon";
import DeleteIcon from "../../Components/Buttons/DeleteIcon";

// Meal Component: Main page component for displaying detailed meal information.
//
// Key Features:
// - Displays a carousel of meals fetched from the backend.
// - Allows users to add new meals by selecting recipes from a list.
// - Includes a modal for adding meals, with input validation and error handling.

const Meal = () => {
  // State management for the modal, error messages, selected recipes, and more.
  const [openModal, setOpenModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [foodName, setFoodName] = useState("");
  const [selectedRecipe, setSelectedRecipe] = useState();
  const [recipes, setRecipes] = useState([]);
  const meals = useSelector((state) => state.meals.meals);
  const dishes = useSelector((state) => state.recipes.recipes);
  const user = useSelector((state) => state.auth.user);
  const darkMode = useSelector((state) => state.darkMode.darkMode);

  const dispatch = useDispatch();

  // Fetching all recipes and meals on component mount.
  useEffect(() => {
    dispatch(fetchAllRecipes());
    dispatch(fetchAllMeals());
  }, [dispatch]);

  // Function to open the modal for adding a new meal.
  const handleModalOpen = () => {
    setOpenModal(true);
  };

  // Function to close the modal and reset selected dish state.
  const handleModalClose = () => {
    setOpenModal(false);
    setSelectedRecipe(null);
  };

  // Function to handle the form submission for adding a new meal.
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (recipes?.length === 0) {
        return setErrorMessage("Please select at least one recipe");
      }
      const payload = {
        name: foodName,
        user: user._id,
        recipes: recipes.map((f) => f._id),
      };
      await axios.post(`${BACKEND_URL}/api/meal/meals`, payload);
      dispatch(fetchAllMeals());
      setOpenModal(false); // Close the modal
      setFoodName("");
      setRecipes([]);
      setSelectedRecipe();
      setErrorMessage("");
    } catch (error) {
      console.log("Error occurred", error);
      if (error.response && error.response.status === 409) {
        setErrorMessage("Meal already exists. Please try again.");
      } else {
        setErrorMessage("An error occurred. Please try again later.");
      }
    }
  };

  // Function to handle the change in selected dish from the dropdown.
  const handleDishChange = (e) => {
    const selectedRecipe = dishes.find(
      (dish) => dish.recipeName === e.target.value
    );
    setSelectedRecipe(selectedRecipe);
  };

  // Function to delete a selected recipe from the meal.
  const handleDeleteRecipe = (index) => {
    const tempFood = [...recipes];
    tempFood.splice(index, 1);
    setRecipes(tempFood);
  };

  // Function to add a new selected recipe to the list of recipes for the meal.
  const handleAddNewRecipe = () => {
    if (!selectedRecipe) return;
    const rec = dishes.find((r) => r._id === selectedRecipe);
    setRecipes([...recipes, rec]);
  };

  return (
    <div className="flex flex-col items-center justify-center p-5">
      {/* Button to open the modal for adding a new meal */}
      <button
        type="button"
        className="mt-2 mb-2 bg-[#B81D33] text-white hover:bg-[#A71B2F] py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-[#B81D33] focus:ring-opacity-50"
        onClick={handleModalOpen}
      >
        Add Meal
      </button>

      {/* Dialog component from Headless UI to create a modal */}
      <Dialog open={openModal} onClose={handleModalClose}>
        <div
          className={`absolute w-1/2 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-4 shadow-xl rounded-lg modal-widths ${
            darkMode ? "bg-black text-white" : "bg-white text-black"
          } max-h-[90vh] min-h-[300px] overflow-y-auto border-2 border-[#B81D33]`}
        >
          <h2 className="text-xl font-semibold text-[#B81D33] text-center mb-5">
            Add Meal
          </h2>
          {errorMessage && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4">
              <span className="block sm:inline">{errorMessage}</span>
              <button
                onClick={() => setErrorMessage("")}
                className="absolute top-0 bottom-0 right-0 px-4 py-3"
              >
                <svg
                  className="fill-current h-6 w-6 text-red-500"
                  role="button"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                >
                  <title>Close</title>
                  <path d="M14.348 5.652a1 1 0 10-1.414-1.414L10 7.172 7.066 4.238a1 1 0 10-1.414 1.414l2.934 2.934-2.934 2.934a1 1 0 101.414 1.414L10 10.828l2.934 2.934a1 1 0 101.414-1.414L11.828 10l2.934-2.934z" />
                  </svg>
              </button>
            </div>
          )}
          {/* Form to add a new meal */}
          <form onSubmit={handleSubmit}>
            <TextField
              label="Meal Name"
              value={foodName ?? ""}
              onChange={(e) => setFoodName(e.target.value)}
              fullWidth
              className="mb-2"
            />
            <div className="flex items-center mb-2">
              <SelectField
                value={selectedRecipe}
                onChange={(e) => setSelectedRecipe(e.target.value)}
                label="Recipe Name"
                required
              >
                <option value="">Select Recipe</option>

                {dishes &&
                  dishes.map((dish) => (
                    <option key={dish._id} value={dish._id}>
                      {dish.recipeName}
                    </option>
                  ))}
              </SelectField>
              <div className="mt-5 ms-2">
                <AddIcon onClick={handleAddNewRecipe} />
              </div>
            </div>
            <ul className="w-full mt-2">
              {recipes?.length > 0 &&
                recipes.map((dish, index) => (
                  <React.Fragment key={index}>
                    <li className="flex items-start py-4 border-b">
                      <div className="flex-shrink-0 mr-4">
                        <img
                          className="w-10 h-10 rounded-full"
                          alt={dish.recipeName}
                          src={dish.image}
                        />
                      </div>
                      <div className="flex-1">
                        <p className="text-base font-medium">
                          {dish.recipeName}
                        </p>
                        <span className="text-sm text-primary">
                          {dish.description}
                        </span>
                      </div>

                      <DeleteIcon onClick={() => handleDeleteRecipe(index)} />
                    </li>
                  </React.Fragment>
                ))}
            </ul>

            <button
              type="submit"
              className="mt-2 mb-2 bg-[#B81D33] hover:bg-[#B81D33] text-white py-2 px-4 rounded"
            >
              Add Meal
            </button>
          </form>
        </div>
      </Dialog>

      {/* Displaying the meal carousel */}
      <div className="meal-list">
        <MealCarousel meals={meals} />
      </div>
    </div>
  );
};

export default Meal;
