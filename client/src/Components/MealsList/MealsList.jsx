// MealsList Component: Displays a list of multiple meal items in a structured format.
// 
// Key Features:
// - Renders a collection of meal data, each within a MealCard.
// - Supports features like sorting, filtering, and searching.
// - Integrates with global state to reflect the current meal selection.

import React, { useEffect, useMemo, useState } from "react";

export default function MealsList({ dishes }) {
  const [fetchedRecipes, setFetchedRecipes] = useState([]); // State to store the fetched recipes
  const [error, setErrorMessage] = useState(""); // State to manage any error messages

  // Effect to fetch recipes whenever the 'dishes' prop changes
  useEffect(() => {
    setFetchedRecipes([]);
    fetchRecipes(); // Call function to fetch recipes
  }, [dishes]);

  // Function to fetch recipes from the 'dishes' prop
  const fetchRecipes = async () => {
    const tempRecipes = [];
    for (let i = 0; i < dishes.recipes.length; i++) {
      try {
        tempRecipes.push(dishes.recipes[i]); // Add each recipe to the temporary array
      } catch (error) {
        console.error("Get recipes failed:", error);
        setErrorMessage("Failed to fetch recipes."); // Set error message if fetching fails
      }
    }
    setFetchedRecipes(tempRecipes); // Update state with fetched recipes
  };

  // Separate dishes by category using useMemo for performance optimization
  const starters = useMemo(
    () => fetchedRecipes.filter((dish) => dish.category === "starter"),
    [fetchedRecipes]
  );
  const mainCourse = useMemo(
    () => fetchedRecipes.filter((dish) => dish.category === "main course"),
    [fetchedRecipes]
  );
  const dessert = useMemo(
    () => fetchedRecipes.filter((dish) => dish.category === "dessert"),
    [fetchedRecipes]
  );

  console.log("dessert", dessert);
  return (
    <div>
      {/* Starters List */}
      {starters.length > 0 && (
        <>
          <h2 className="text-xl font-semibold mb-4">Starters</h2>
          <ul className="w-full">
            {starters.map((dish, index) => (
              <React.Fragment key={index}>
                <li className="flex items-start mb-4">
                  <div className="mr-4">
                    <img
                      className="h-10 w-10 rounded-full object-cover"
                      src={dish.image}
                      alt={dish.recipeName}
                    />
                  </div>
                  <div>
                    <p className="text-lg font-medium">{dish.recipeName}</p>
                    <p className="text-sm ">{dish.description}</p>
                  </div>
                </li>
                {index < starters.length - 1 && (
                  <hr className="border-t border-gray-200 my-2" />
                )}
              </React.Fragment>
            ))}
          </ul>
        </>
      )}

      {/* Main Course List */}
      {mainCourse.length > 0 && (
        <>
          <h2 className="text-xl font-semibold mb-4">Main Course</h2>
          <ul className="w-full">
            {mainCourse.map((dish, index) => (
              <React.Fragment key={index}>
                <li className="flex items-start mb-4">
                  <div className="mr-4 w-20">
                    <img
                      className="h-10 w-10 rounded-full object-cover"
                      src={dish.image}
                      alt={dish.recipeName}
                    />
                  </div>
                  <div>
                    <p className="text-lg font-medium">{dish.recipeName}</p>
                    <p className="text-sm ">{dish.description}</p>
                  </div>
                </li>
                {index < mainCourse.length - 1 && (
                  <hr className="border-t border-gray-200 my-2" />
                )}
              </React.Fragment>
            ))}
          </ul>
        </>
      )}

      {/* Dessert List */}
      {dessert.length > 0 && (
        <>
          <h2 className="text-xl font-semibold mb-4">Dessert</h2>
          <ul className="w-full">
            {dessert.map((dish, index) => (
              <React.Fragment key={index}>
                <li className="flex items-start mb-4">
                  <div className="mr-4">
                    <img
                      className="h-10 w-10 rounded-full object-cover"
                      src={dish.image}
                      alt={dish.recipeName}
                    />
                  </div>
                  <div>
                    <p className="text-lg font-medium">{dish.recipeName}</p>
                    <p className="text-sm ">{dish.description}</p>
                  </div>
                </li>
                {index < dessert.length - 1 && (
                  <hr className="border-t border-gray-200 my-2" />
                )}
              </React.Fragment>
            ))}
          </ul>
        </>
      )}

      {/* Display error message if any error occurs */}
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
          <span className="block sm:inline">{error}</span>
          <button
            onClick={() => setErrorMessage("")} // Clear error message when close button is clicked
            className="absolute top-0 bottom-0 right-0 px-4 py-3"
          >
            <svg
              className="fill-current h-6 w-6 text-red-500"
              role="button"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
            >
              <title>Close</title>
              <path d="M14.348 5.652a1 1 0 00-1.414 0L10 8.586 7.066 5.652a1 1 0 10-1.414 1.414L8.586 10l-2.934 2.934a1 1 0 101.414 1.414L10 11.414l2.934 2.934a1 1 0 001.414-1.414L11.414 10l2.934-2.934a1 1 0 000-1.414z" />
            </svg>
          </button>
        </div>
      )}
    </div>
  );
}
