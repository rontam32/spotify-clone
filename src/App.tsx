import { Provider, useDispatch } from "react-redux";
import { SnackbarProvider } from "./contexts";
import AuthProvider from "./contexts/AuthContext";
import HeaderProvider from "./contexts/HeaderContext";
import { store } from "./redux/store";
import Router from "./routes/Router";
function App() {
  return (
    <Provider store={store}>
      <AuthProvider>
        <SnackbarProvider>
          <HeaderProvider>
            <Router />
          </HeaderProvider>
        </SnackbarProvider>
      </AuthProvider>
    </Provider>
  );
}

export default App;
