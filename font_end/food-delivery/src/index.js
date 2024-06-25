import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "bootstrap/dist/css/bootstrap.css";
import "remixicon/fonts/remixicon.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./index.css";
import store from "./store/store";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import { I18nextProvider } from 'react-i18next';
import i18n from '../src/components/Config/i18n'; // Import your i18n configuration

ReactDOM.render(
    <React.StrictMode>
        <Router>
            <Provider store={store}>
                <I18nextProvider i18n={i18n}>
                    <App />
                </I18nextProvider>
            </Provider>
        </Router>
    </React.StrictMode>,
    document.getElementById("root")
);
