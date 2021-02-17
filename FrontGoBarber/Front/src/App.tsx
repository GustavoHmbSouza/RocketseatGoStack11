import { BrowserRouter } from "react-router-dom";
import Routes from "./routes";
import GlobalStyle from "./styles/global";
import { AuthProvider } from "./hooks/Auth";

import AppProvider from "./hooks/index";

const App: React.FC = () => (
    <>
        <BrowserRouter>
            <AppProvider>
                <Routes />
            </AppProvider>
        </BrowserRouter>
        <GlobalStyle />
    </>
);

export default App;
