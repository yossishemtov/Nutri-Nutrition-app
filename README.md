# NutriPlus

NutriPlus is a web application designed to help users manage their nutrition and meal planning effectively. It provides tools for meal tracking, recipe management, and nutritional calculations, all integrated into a user-friendly interface.

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Architecture](#architecture)
- [Services](#services)
- [Installation](#installation)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)

## Features

- **User Registration**: Users can create accounts to access personalized features.
- **Recipe Sharing**: Users can publish their recipes and view recipes shared by others.
- **Grocery List Management**: Easily add ingredients from selected recipes to a shopping list.
- **Meal Planning**: Plan meals and calculate total calorie intake based on selected recipes.
- **Meal Tracking**: Users can log their meals and track nutritional values.
- **Recipe Management**: Add, update, and delete recipes, complete with ingredient lists and instructions.
- **Nutritional Calculator**: Calculate nutritional values based on meal components.
- **Responsive Design**: Works on various devices, ensuring a seamless experience.

## Technologies Used

- **Frontend**: 
  - React
  - Vite
  - Tailwind CSS
- **Backend**:
  - Node.js
  - Express.js
- **Database**:
  - MongoDB (required for storing user and recipe data)

## Architecture

### Client-Side Structure

- **Components**: Contains reusable components such as buttons, forms, and modals for various functionalities.
  - `UpdateMeal`: A form component that fetches and updates meal details, allowing users to manage their meal recipes.
- **Pages**: Composed of individual page components that organize the application’s layout.
  - `HomePage`: The main landing page of the application.
  - `LoginPage`: Handles user authentication.
- **Redux Store**: Manages global application state, including user authentication and meal data.

### Server-Side Structure

- **Controllers**: Handle the logic for meal and recipe management, responding to requests from the client-side.
  - `mealControllers.js`: Manages meal data operations, such as fetching and updating meals.
- **Models**: Define the structure of the data and the schema for meals, recipes, and user accounts.
  - `mealModel.js`: Represents the meal data schema.
- **Routes**: Define API endpoints that the client can use to interact with the server.
  - `mealRoutes.js`: Routes for meal-related operations.

## Services

- **Meal Service**: Handles all operations related to meals, including CRUD functionalities for meal data.
- **Recipe Service**: Manages recipe-related operations, ensuring that users can create, read, update, and delete recipes.
- **User Service**: Manages user authentication and user-related data, providing secure access to the application.
- **Nutrition Service**: Performs calculations related to the nutritional values of meals and recipes, ensuring that users receive accurate information.

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/nutriplus.git
   cd nutriplus
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Ensure you have MongoDB installed and running.

4. Start the development server:
   ```bash
   npm start
   ```

5. Open your browser and go to `http://localhost:3000`.

## Usage

1. Create an account or log in.
2. Navigate to the meal tracking section to log your meals.
3. Use the recipe management feature to add new recipes.
4. Access the nutritional calculator to analyze your meals.
5. Add ingredients from recipes to your grocery list.
6. Plan meals and calculate total calories based on your selected recipes.


## Contributing

Contributions are welcome! Please read the [CONTRIBUTING.md](CONTRIBUTING.md) for more details.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

