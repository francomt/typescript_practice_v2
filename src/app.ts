import axios from "axios";

// declare var google: any;

const form = document.querySelector("form")!;
const addressInput = document.getElementById("address")! as HTMLInputElement;

const GOOGLE_API_KEY = "";

type GoogleGeocodingResponse = {
  data: {
    results: { geometry: { location: { lat: number; lng: number } } }[];
    status: "OK";
  };
};

async function searchAddressHandler(event: Event) {
  event.preventDefault();

  const enteredAddress = addressInput.value;

  try {
    const response: GoogleGeocodingResponse = await axios.get(
      `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURI(
        enteredAddress
      )}&key=${GOOGLE_API_KEY}`
    );

    if (response.data.status !== "OK") {
      throw new Error("Could not fetch location");
    }

    const coordinates = response.data.results[0].geometry.location;

    const map = new google.maps.Map(
      document.getElementById("map") as HTMLDivElement,
      {
        center: coordinates,
        zoom: 8,
      }
    );

    const marker = new google.maps.Marker({ position: coordinates, map: map });
  } catch (error) {
    alert(error.message);
    console.error(error);
  }
}

form.addEventListener("submit", searchAddressHandler);
