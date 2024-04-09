import React from "react";
import { Card, Skeleton } from "@nextui-org/react";
import { useTranslations } from "next-intl";

export default function NotFound() {
  const t = useTranslations("ErrorMessage");
  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <Card className="w-full space-y-5 p-4 m-4" radius="lg">
        <div className="space-y-3">
          <Skeleton className="w-4/5 rounded-lg">
            <div className="h-3 w-4/5 rounded-lg bg-default-200"></div>
          </Skeleton>
          <Skeleton className="w-3/5 rounded-lg">
            <div className="h-3 w-3/5 rounded-lg bg-default-200"></div>
          </Skeleton>
          <h1>{t("notFeature")}</h1>
          <Skeleton className="w-4/5 rounded-lg">
            <div className="h-3 w-4/5 rounded-lg bg-default-200"></div>
          </Skeleton>
          <Skeleton className="w-3/5 rounded-lg">
            <div className="h-3 w-3/5 rounded-lg bg-default-200"></div>
          </Skeleton>
        </div>
      </Card>
    </div>
  );
}
