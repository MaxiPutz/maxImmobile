# Real Estate Data Website for Vienna

This project is a web-based platform that provides users with comprehensive information about real estate properties in the area around Vienna. It includes interactive features such as a MapBox integration for displaying property locations, a transit layer for visualizing transport times, and a user-friendly interface for managing favorite properties.

## Features

### 1. MapBox Integration
- Displays real estate properties using latitude and longitude data on an interactive map.
- Only properties within the current viewport of the map are shown in the accompanying list.

### 2. Property List
- A dynamic list of real estate properties that updates as the user navigates through the map.
- Each list item represents an estate within the map’s current viewport.

### 3. Transit Layer
- Displays color-filled rectangles on the map to indicate transport times around Vienna.
  - **Green**: Short transportation time.
  - **Red**: Long transportation time.
- Each rectangle includes an overlay with the exact transport time for clearer understanding.

### 4. Property Cards
- Each property in the list is displayed as a card containing the following features:
  - **Open in Link**: Navigate to the detailed page of the property.
  - **Hide**: Remove the property from the current list view.
  - **Add to Favorites**: Save the property to a personal favorites list.

### 5. Favorites List
- A feature to view and manage favorite properties.
- Users can access their favorites list and interact with it from the side menu.

### 6. Two Menu Bars
- **Filter Menu**: Allows users to filter properties based on specific features.
- **Transit Layer Menu**: Users can switch between different transit layers or access the favorites list from this menu.

## Technologies Used
- **MapBox**: For displaying interactive maps and integrating real estate locations with lat/lng data.
- **HTML/CSS/JavaScript**: For building the core website structure, design, and interactivity.
- **LitElement**: Used for creating web components and managing state effectively across the UI.

## How to Set Up the Project

### 1. **Clone the Repository**
   ```bash
   git clone https://github.com/yourusername/real-estate-vienna.git
   cd real-estate-vienna
   ```
### 2. **Create Access Token File**
   Create a file in the following path: `staticNewUI/private/`
   
   Inside the file, add the following content:

   ```
   const token = "yourMapboxAccessToken";
   export const mapboxglAccessToken = token;
   export const accessTokenObject = {
     token: token
   };
   ```
Replace "yourMapboxAccessToken" with your actual Mapbox access token.
### 3. **Install Dependencies**
Ensure that you have npm and node installed on your system. Then, run:
```
npm install
```

### 4. **Run the Development** 
Server Start the development server with the following command:
```
npm run start
```
This will launch the application in your default browser at http://localhost:3000.

