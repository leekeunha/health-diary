import "./api/firebase.js";
import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import App from "./App";
import Home from "./pages/Home";
import AllBodyParts from "./pages/AllBodyParts";
import AllSports from "./pages/AllSports";
import AllExerciseHistories from "./pages/AllExerciseHistories.jsx";
import AllSportsSets from "./pages/AllSportsSets";
import AllMaxWeightHistories from "./pages/AllMaxWeightHistories";
import AllHistoryDetails from "./pages/AllHistoryDetails.jsx";
import NotFound from "./pages/NotFound";
import AllSportsForMaxWeight from "./pages/AllSportsForMaxWeight.jsx";
import AllSportHistories from "./pages/AllSportHistories.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <NotFound />,
    children: [
      { index: true, path: "/", element: <Home /> },
      { path: "/bodyParts", element: <AllBodyParts /> },
      { path: "/sports", element: <AllSports /> },
      { path: "/sportsForMaxWeight", element: <AllSportsForMaxWeight /> },
      { path: "/sets", element: <AllSportsSets /> },
      { path: "/histories", element: <AllExerciseHistories /> },
      { path: "/sportHistories", element: <AllSportHistories /> },
      { path: "/maxWeightHistories", element: <AllMaxWeightHistories /> },
      { path: "/historyDetails", element: <AllHistoryDetails /> },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
