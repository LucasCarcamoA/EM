import { Header } from "./layout/Header";
import { AppRouter } from "./router/AppRouter";

function App() {
  return (
    <div className="app h-full-screen bg-secondary">
      <Header />
      <AppRouter />
    </div>
  );
}

export default App;
