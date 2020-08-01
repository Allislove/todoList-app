import React from "react";
import { RingLoader } from "react-spinners";

export default function Loading() {
  return (
    <div className="loading">
      <RingLoader color="#00296D" />
      <h4>Cargando</h4>
    </div>
  );
}
