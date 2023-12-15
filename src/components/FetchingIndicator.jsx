import React from "react";
import Loader from "./Loader";
import { useIsFetching } from "react-query";
export default function FetchingIndicator() {
  const isFetching = useIsFetching();
  if (!isFetching) return null;
  
    return (
      <div className="fetching-indicator">
        <Loader />
      </div>
    );
  
}
