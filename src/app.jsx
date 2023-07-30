import React from "react";
import Header from "./components/header";
import Footer from "./components/footer";
import CanvasSheet from "./components/render";

export default function App() {
  return (
    <div className="flex flex-col">
      <Header />
      <CanvasSheet />
      <Footer />
    </div>
  );
}
