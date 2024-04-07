import axios from "axios";

const getPlacesData = async () => {
  try {
    const response = await axios.get(
      "https://travel-advisor.p.rapidapi.com/restaurants/list-in-boundary",
      {
        params: {
          bl_latitude: "11.847676",
          bl_longitude: "11.847676",
          tr_longitude: "12.839768",
          tr_latitude: "12.839768",
        },
        headers: {
          "x-rapidapi-host": "travel-advisor.p.rapidapi.com",
          "x-rapidapi-key": "SIGN-UP-FOR-KEY",
        },
      }
    );
  } catch (error) {
    console.log(error);
  }
};
