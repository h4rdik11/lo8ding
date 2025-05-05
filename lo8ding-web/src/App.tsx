import React from "react";
import { SimpleLoader } from "lo8ding-lib";

export default function App() {
  return (
    <div className="p-8">
      <h1 className="text-2xl mb-4">Library Showcase</h1>
      <SimpleLoader />
    </div>
  );
}