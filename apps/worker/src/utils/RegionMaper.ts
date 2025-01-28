import { Region } from "@prisma/client";

export const mapRegion = (region: string): Region => {
    const regionMapping: Record<string, Region> = {
      europe: Region.europe,
      americas: Region.americas,
      asia: Region.asia,
      oceania: Region.oceania,
    };
    return regionMapping[region];
  };