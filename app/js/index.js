import React from "react";
import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route, useParams } from "react-router-dom";
const root = ReactDOM.createRoot(document.getElementById("app"));

import App from "./components/App.jsx";

const GetParamsApp = () => {
    const { id } = useParams();
    if (id) return <App id={id} />;
};

root.render(
    <StrictMode>
        <BrowserRouter>
            <Routes>
                <Route path="/dist" element={<App />}></Route>
                <Route path="/dist/:id" element={<GetParamsApp />}></Route>
            </Routes>
        </BrowserRouter>
    </StrictMode>
);
