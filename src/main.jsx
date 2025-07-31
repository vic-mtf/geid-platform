import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import { Provider as ReduxProvider } from "react-redux";
import { NotificationsProvider } from "@toolpad/core/useNotifications";
import store from "./redux/store";
import "./styles/index.css";
import App from "./App";
import ConfigAppProvider from "./components/ConfigAppProvider";

const root = ReactDOM.createRoot(document.getElementById("root"));
const slotProps = { snackbar: { autoHideDuration: 7000 } };

root.render(
  <StrictMode>
    <ReduxProvider store={store}>
      <ConfigAppProvider>
        <NotificationsProvider slotProps={slotProps}>
          <App />
        </NotificationsProvider>
      </ConfigAppProvider>
    </ReduxProvider>
  </StrictMode>
);
