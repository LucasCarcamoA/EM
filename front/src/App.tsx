import { Header } from "./layout/Header";
// import { AppRouter } from "./router/AppRouter";
import { UploadFilesPage } from "./pages/UploadFilesPage";

function App() {
  return (
    <div className="app h-full-screen bg-secondary">
      <Header />
      {/* <AppRouter /> */}
      <UploadFilesPage />
    </div>
  );
}

export default App;
