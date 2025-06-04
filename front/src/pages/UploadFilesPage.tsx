import { useState } from "react";
import { HeaderSection } from "../section";

export const UploadFilesPage = () => {
  const [selectedFile, setSelectedFile] = useState<Record<string, File>>({});

  const handleFileChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    fieldName: string
  ) => {
    const files = event.currentTarget.files;

    if (files && files.length > 0) {
      setSelectedFile((prev) => ({
        ...prev,
        [fieldName]: files[0],
      }));
    }
  };
  console.log(selectedFile);
  const sendFile = async () => {
    if (!selectedFile) {
      console.error("No hay archivo seleccionado");
      return;
    }
    const formData = new FormData();
    formData.append("one", selectedFile.file1);
    formData.append("two", selectedFile.file2);

    console.log(JSON.stringify(formData));
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
      <HeaderSection title="Unificador de Excel" />
      {/* dropzone */}
      <div className="grid grid-cols-2  gap-3 place-content-center p-2">
        <input
          type="file"
          name="file1"
          onChange={(event) => handleFileChange(event, "file1")}
          className="w-full h-1.2screen border-2 border-amber-50"
        />
        <input
          type="file"
          name="file2"
          onChange={(event) => handleFileChange(event, "file2")}
          className="w-full h-1.2screen border-2 border-amber-50 "
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
