import React from 'react';
import './App.css';
import AppRouter from "./app/AppRouter";
import {BrowserRouter} from 'react-router-dom'
import ScrollToTop from "core/components/scroll/ScrollToTop";


function App() {
    return (
        <BrowserRouter>
            <ScrollToTop/>
            <AppRouter/>
        </BrowserRouter>
    );
}

export default App;
