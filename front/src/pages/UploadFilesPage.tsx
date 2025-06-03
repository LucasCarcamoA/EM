import { useState } from "react";

export const UploadFilesPage = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleFileChange = (event: any) => {
    setSelectedFile(event.target.files[0]);
  };

  const sendFile = async () => {
    if (!selectedFile) {
      console.error("No hay archivo seleccionado");
      return;
    }
    const formData = new FormData();
    formData.append("archivo", selectedFile);

    try {
      const resp = await fetch("http://localhost:8080/upload", {
        method: "POST",
        body: formData,
      });

      const data = await resp.json();
      console.log("respuesta:", data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      {/* dropzone */}
      <div className="grid place-content-center">
        <input
          type="file"
          onChange={handleFileChange}
          className="w-2xl h-1.2screen border-2 border-amber-50 "
        />
      </div>
      {/* actions */}
      <div className=" grid place-content-center mt-2">
        <button
          onClick={sendFile}
          className="h-15 p-1 border-2 border-amber-50"
        >
          subir a endpoint
        </button>
      </div>
    </>
  );
};
