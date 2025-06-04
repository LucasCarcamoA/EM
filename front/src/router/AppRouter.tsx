import { Navigate, Route, Routes } from "react-router";
import { UploadFilesPage, DiffViewerPage, MergeResultPage } from "../pages";

export const AppRouter = () => {
  return (
    <Routes>
      <Route path="/upload" element={<UploadFilesPage />} />
      <Route path="/compare" element={<DiffViewerPage />} />
      <Route path="/result" element={<MergeResultPage />} />

      <Route path={"*"} element={<Navigate to={"upload"} />} />
    </Routes>
  );
};
