import React from "react";
import { useQuery } from "react-query";

export default function useLabelsData() {
  const labelsQuery = useQuery({
    queryKey: ["labels"],
    queryFn: ({ signal }) =>
      fetch("api/labels", { signal }).then((res) => res.json()),
    staleTime: 1000 * 60 * 60,
    placeholderData: [
      { id: "bug", color: "red", name: "bug" },
      { id: "enhancement", color: "blue", name: "enhancement" },
      { id: "feature", color: "cyan", name: "feature" },
    ],
  });
  return labelsQuery;
}
