import React, { useContext, useState } from "react";
import { DepartureContext } from "../context/context";
import { DestinationContext } from "../context/context";
import { FaPlaneDeparture } from "react-icons/fa6";
import { FaPlaneArrival } from "react-icons/fa6";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";
import { useTranslations } from "next-intl";

function InputItem({ type }: { type: string }) {
  const t = useTranslations("SearchSection");
  const [value, setValue] = useState(null);
  const { departure, setDeparture } = useContext(DepartureContext);
  const { destination, setDestination } = useContext(DestinationContext);

  const handleOnChange = (value: any) => {
    if (!value) {
      setValue(null);
      if (type === "departure") {
        setDeparture(null);
      } else {
        setDestination(null);
      }
      return;
    }

    // Prepare place API service
    const placeID = value.value.place_id;
    const service = new google.maps.places.PlacesService(document.createElement("div"));

    // Load the place details
    service.getDetails(
      {
        placeId: placeID,
        fields: ["geometry"],
      },
      (place, status) => {
        if (
          place &&
          place.geometry &&
          place.geometry.location &&
          status === google.maps.places.PlacesServiceStatus.OK
        ) {
          const location = {
            lat: place.geometry.location.lat(),
            lng: place.geometry.location.lng(),
            name: value.label,
            type: value.value.types,
            placeID: value.value.place_id,
          };

          // Update the context
          type === "departure" ? setDeparture(location) : setDestination(location);
        }
      }
    );

    // Update the input box display
    setValue(value);
  };

  return (
    <div className="bg-slate-200 p-3 rounded-lg mt-3 flex items-center gap-4">
      {type === "departure" ? (
        <FaPlaneDeparture className="fill-gray-900" width={70} height={70} />
      ) : (
        <FaPlaneArrival className="fill-gray-900" width={70} height={70} />
      )}
      <GooglePlacesAutocomplete
        apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}
        autocompletionRequest={{
          componentRestrictions: {
            country: ["hk"],
          },
        }}
        selectProps={{
          id: type,
          instanceId: type,
          value,
          onChange: (value) => handleOnChange(value),
          placeholder: type === "departure" ? t("departure") : t("destination"),
          isClearable: true,
          className: "w-full",
          components: {
            DropdownIndicator: null,
          },
          styles: {
            control: (provided) => ({
              ...provided,
              backgroundColor: "transparent",
              border: "none",
              borderBottom: "1px solid #AAA",
              boxShadow: "none",
              borderRadius: "none",
            }),
            option: (provided) => ({
              ...provided,
              backgroundColor: "transparent",
              color: "black",
            }),
          },
        }}
      />
    </div>
  );
}

export default InputItem;
