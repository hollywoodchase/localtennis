import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const { isLoggedIn, loggedInUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true); // Track loading state

  useEffect(() => {
    // If the user is not logged in, redirect to login
    console.log("LOAD1")
    console.log(isLoading)
    console.log(isLoggedIn)
    console.log(loggedInUser)
    if (!isLoggedIn && !isLoading) {
        console.log("LOAD2")
      navigate("/login");
    } else if (loggedInUser) {
      // Only set loading to false once the user is logged in and data is available
      setIsLoading(false);
    }
  }, [isLoggedIn, loggedInUser, isLoading, navigate]); // Ensure navigate is a dependency

  // Don't render the page until the user is loaded or logged in
  if (isLoading) {
    return <div>Loading...</div>; // You can replace this with a spinner if needed
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-200 py-12">
      <div className="bg-white shadow-lg rounded-xl p-8 w-full sm:w-96 lg:w-1/3">
        <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
          Welcome, {loggedInUser.fname}!
        </h1>
        <div className="space-y-4">
          <div className="p-4 bg-gray-50 rounded-lg shadow-md">
            <p className="text-gray-700">
              <span className="font-semibold">First Name:</span> {loggedInUser.fname}
            </p>
          </div>

          <div className="p-4 bg-gray-50 rounded-lg shadow-md">
            <p className="text-gray-700">
              <span className="font-semibold">Last Name:</span> {loggedInUser.lname}
            </p>
          </div>

          <div className="p-4 bg-gray-50 rounded-lg shadow-md">
            <p className="text-gray-700">
              <span className="font-semibold">Location:</span> {loggedInUser.locationname}
            </p>
          </div>

          <div className="p-4 bg-gray-50 rounded-lg shadow-md">
            <p className="text-gray-700">
              <span className="font-semibold">Favorite Player:</span> {loggedInUser.fplayer}
            </p>
          </div>

          <div className="p-4 bg-gray-50 rounded-lg shadow-md">
            <p className="text-gray-700">
              <span className="font-semibold">Rival:</span> {loggedInUser.rival_name}
            </p>
          </div>

          <div className="p-4 bg-gray-50 rounded-lg shadow-md">
            <p className="text-gray-700">
              <span className="font-semibold">Celebration:</span> {loggedInUser.celebration}
            </p>
          </div>

          <div className="p-4 bg-gray-50 rounded-lg shadow-md">
            <p className="text-gray-700">
              <span className="font-semibold">Phone:</span> {loggedInUser.phone}
            </p>
          </div>

          <div className="p-4 bg-gray-50 rounded-lg shadow-md">
            <p className="text-gray-700">
              <span className="font-semibold">Email:</span> {loggedInUser.email}
            </p>
          </div>

          <div className="p-4 bg-gray-50 rounded-lg shadow-md">
            <p className="text-gray-700">
              <span className="font-semibold">League:</span> {loggedInUser.leaguename}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
