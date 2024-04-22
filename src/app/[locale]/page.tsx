"use client";
import React, { useState, useCallback } from "react";
import { Input, Button } from "@nextui-org/react";
import { Card, CardHeader, CardBody, CardFooter, Link, Image } from "@nextui-org/react";
import Swal from "sweetalert2";
import TextTransition, { presets } from "react-text-transition";
import { useTranslations } from "next-intl";

type retDataType = {
  places: Array<{
    displayName: {
      text: string;
    };
    formattedAddress: string;
    currentOpeningHours: {
      openNow: boolean;
    };
    types: Array<string>;
    location: {
      latitude: number;
      longitude: number;
    };
  }>;
};

export default function ExplorePage() {
  const t = useTranslations("AskAI");
  const [input, setInput] = useState("");
  const [data, setData] = useState<retDataType | null>(null);

  const handleSubmit = useCallback(async ({ e, value }: { e: any; value: string }) => {
    e.preventDefault();
    try {
      if (!value) {
        Swal.fire({
          icon: "error",
          title: "Please enter a prompt",
          showConfirmButton: false,
          showCancelButton: false,
          showCloseButton: false,
          timer: 1500,
        });
        return;
      }
      const result = await explorePlaces(value);
      if (typeof result === "object" && result !== null) {
        setData(result);
        Swal.fire({
          icon: "success",
          showConfirmButton: false,
          showCancelButton: false,
          showCloseButton: false,
          timer: 500,
        });
      } else {
        throw new Error("Returned result is not a JSON object");
      }
    } catch (error) {
      console.error("Error:", error);
      Swal.fire({
        icon: "error",
        title: "Please try another prompt",
        showConfirmButton: false,
        showCancelButton: false,
        showCloseButton: false,
        timer: 1500,
      });
    }
  }, []);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        height: "80vh",
        padding: "10px",
      }}
    >
      {data && (
        <div
          style={{ marginTop: "10px", overflow: "auto", flex: data == null ? "20vh" : "1 1 60vh" }}
        >
          {data.places.map((place, index) => (
            <Card key={index} className="py-4 my-4">
              <CardHeader className="gap-5 pb-0 pt-2 px-4 flex-col items-start">
                <h6 className="font-bold text-large">{place.displayName.text}</h6>
                <small className="text-default-400">Address: {place.formattedAddress}</small>
                <h6 className="text-tiny uppercase font-bold">
                  Open Now:{" "}
                  {place.currentOpeningHours
                    ? place.currentOpeningHours.openNow
                      ? "Yes"
                      : "No"
                    : "N/A"}
                </h6>
              </CardHeader>
              <CardBody className="text-default-400 gap-5 pb-0 pt-2 px-4 flex-row items-start overflow-visible py-2">
                <div style={{ display: "flex", flexWrap: "wrap" }}>
                  {place.types.map((type, index) => {
                    return (
                      <small key={index} style={{ margin: "5px" }}>
                        {type.replaceAll("_", " ")}
                      </small>
                    );
                  })}
                </div>
              </CardBody>
              <CardFooter>
                <Link
                  isExternal
                  href={`https://www.google.com/maps/search/?api=1&query=${place.location.latitude}%2C${place.location.longitude}`}
                  showAnchorIcon
                >
                  Direction
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
      {!data && <PromptTipsWidget />}
      <div style={{ padding: "10px" }}>
        <form
          onSubmit={(e) => handleSubmit({ e, value: input })}
          style={{ display: "flex", alignItems: "center", gap: "10px" }}
        >
          <Input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            style={{ flex: 1, marginRight: "10px", padding: "5px" }}
            placeholder={t("lookingFor")}
          />
          <Button type="submit" style={{ padding: "5px 10px" }}>
            {t("askAI")}
          </Button>
        </form>
      </div>
    </div>
  );
}

import { DrivingBusWidget } from "@/components/widgets";

function PromptTipsWidget() {
  const t = useTranslations("AskAI");
  const [index, setIndex] = React.useState(0);
  const TEXTS = [t("explain"), t("building"), t("food")];
  React.useEffect(() => {
    const intervalId = setInterval(
      () => setIndex((index) => index + 1),
      6000 // every 3 seconds
    );
    return () => clearTimeout(intervalId);
  }, []);
  return (
    <div className="flex flex-col gap-5 justify-center items-center h-dvh p-10">
      {/* <DrivingBusWidget /> */}
      <Image src="/bus.gif" alt="AskAI" style={{ width: "100%", height: "auto" }} />
      <h1 color="#AAAAAA">
        <TextTransition className="text-gray-400 text-center" springConfig={presets.wobbly}>
          {TEXTS[index % TEXTS.length]}
        </TextTransition>
      </h1>
    </div>
  );
}

async function explorePlaces(place: string) {
  try {
    const response = await fetch("api?query=" + place);

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await response.json();
    // return JSON.stringify(data);
    return data;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
}
