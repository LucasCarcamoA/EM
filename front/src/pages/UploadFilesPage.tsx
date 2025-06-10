import { useRef, useState } from "react";
import { HeaderSection } from "../section";

interface StateAcceptedFile {
  oneFile: Boolean;
  twoFile: Boolean;
}

export const UploadFilesPage = () => {
  const [selectedFile, setSelectedFile] = useState<Record<string, File>>({});
  const fileOneRef = useRef<HTMLInputElement>(null);
  const fileTwoRef = useRef<HTMLInputElement>(null);
  const [error, setError] = useState(null);
  const [acceptedFile, setAcceptedFile] = useState<StateAcceptedFile>({
    oneFile: true,
    twoFile: true,
  });
  const acceptedFileExtension = [".xlsx", ".xlsm", ".xlsb", ".xltx"];

  const handleFileChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    fieldName: string
  ) => {
    const files = event.currentTarget.files;

    if (!files) return;

    const pointPosition = files[0].name.indexOf(".");
    const currentExtensionFile = files[0].name.slice(
      pointPosition,
      files[0].name.length
    );

    const isAcceptedFile = acceptedFileExtension.some(
      (extension) => extension === currentExtensionFile
    );

    setAcceptedFile((prev) => {
      return { ...prev, [fieldName]: isAcceptedFile };
    });

    if (files && files.length > 0) {
      setSelectedFile((prev) => ({
        ...prev,
        [fieldName]: files[0],
      }));
    }
  };

  const uploadExcelFile = async () => {
    if (!selectedFile) {
      console.error("No hay archivo seleccionado");
      return;
    }
    const formData = new FormData();
    formData.append("one", selectedFile.file1);
    formData.append("two", selectedFile.file2);

    JSON.stringify(formData.forEach((value) => console.log(value)));

    try {
      const resp = await fetch("http://localhost:8080/upload", {
        method: "POST",
        body: formData,
      });

      const data = await resp.json();
      console.log("respuesta:", data);
    } catch (errorMessage: any) {
      setError(errorMessage.message);
    }
  };

  const openUpaderFile = (file: React.RefObject<HTMLInputElement | null>) => {
    if (!file.current) return;

    file.current.click();
  };
  console.log(selectedFile);
  return (
    <div>
      <HeaderSection title="Unificador de Excel" />
      {/* dropzone */}
      <div className="grid grid-cols-2  gap-3 place-content-center p-section">
        <div
          className={`grid relative ${
            acceptedFile.oneFile ? "border-dark" : "border-error"
          } border-dashed border-1 rounded-md p-component bg-dark`}
        >
          <input
            ref={fileOneRef}
            type="file"
            name="oneFile"
            onChange={(event) => handleFileChange(event, "oneFile")}
            className="w-full h-1.2screen text-[0px]"
          />
          <div className="absolute grid justify-self-center self-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              id="excel-file"
              viewBox="0 0 128 128"
              className="w-32 justify-self-center"
            >
              <path
                className={`${
                  acceptedFile.oneFile ? "fill-success" : "fill-error"
                }`}
                d="M80.016 96h-8.297L63.75 83.039 55.781 96H48l11.367-17.672-10.64-16.594h8.016l7.383 12.328 7.242-12.328h7.828L68.438 78.727zM104 80c-13.255 0-24 10.745-24 24s10.745 24 24 24 24-10.745 24-24-10.745-24-24-24m10.882 16.988-.113.176-8.232 11.438c-.548.866-1.508 1.398-2.537 1.398s-1.989-.532-2.536-1.397l-8.346-11.614a3.01 3.01 0 0 1 .01-2.994 3.01 3.01 0 0 1 2.596-1.494H100V86c0-1.654 1.346-3 3-3h2c1.654 0 3 1.346 3 3v6.5h4.276c1.065 0 2.061.572 2.596 1.494a3.01 3.01 0 0 1 .01 2.994"
              ></path>
              <path
                fill="#ff9a30"
                d="m84 125.95-.05.05H84zM114 77v-.05l-.05.05z"
              ></path>
              <path
                className={acceptedFile.oneFile ? "fill-success" : "fill-error"}
                d="M111.071 44.243 71.757 4.929A9.94 9.94 0 0 0 64.687 2H24c-5.514 0-10 4.486-10 10v104c0 5.514 4.486 10 10 10h59.95l-4-4H24c-3.309 0-6-2.691-6-6V12c0-3.309 2.691-6 6-6h40.687c1.603 0 3.109.624 4.242 1.757l39.314 39.314A6.04 6.04 0 0 1 110 51.313V72.95l4 4V51.313c0-2.67-1.04-5.181-2.929-7.07"
              ></path>
              <path fill="#fff" d="m113.95 77 .05-.05-4-4"></path>
            </svg>
            <p className="text-gray-300 mt-2.5">
              {" "}
              Formatos aceptados .xlsx, .xlsm, .xlsb, .xltx
            </p>
            {!acceptedFile.oneFile && (
              <span className="text-bold text-error mt-2.5">
                El archivo no tiene el formato correcto
              </span>
            )}
          </div>
          <button
            className="p-component w-2xs bg-zinc-500 rounded-md absolute bottom-5  justify-self-center hover:cursor-pointer"
            onClick={() => openUpaderFile(fileOneRef)}
          >
            Subir Excel
          </button>
        </div>
        <div
          className={`grid relative ${
            acceptedFile.twoFile ? "border-dark" : "border-error"
          } border-dashed border-1 rounded-md p-component bg-dark`}
        >
          <input
            ref={fileTwoRef}
            type="file"
            name="twoFile"
            onChange={(event) => handleFileChange(event, "twoFile")}
            className="w-full h-1.2screen text-[0px]"
          />
          <div className="absolute grid justify-self-center self-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              id="excel-file"
              viewBox="0 0 128 128"
              className="w-32 justify-self-center"
            >
              <path
                className={acceptedFile.twoFile ? "fill-success" : "fill-error"}
                d="M80.016 96h-8.297L63.75 83.039 55.781 96H48l11.367-17.672-10.64-16.594h8.016l7.383 12.328 7.242-12.328h7.828L68.438 78.727zM104 80c-13.255 0-24 10.745-24 24s10.745 24 24 24 24-10.745 24-24-10.745-24-24-24m10.882 16.988-.113.176-8.232 11.438c-.548.866-1.508 1.398-2.537 1.398s-1.989-.532-2.536-1.397l-8.346-11.614a3.01 3.01 0 0 1 .01-2.994 3.01 3.01 0 0 1 2.596-1.494H100V86c0-1.654 1.346-3 3-3h2c1.654 0 3 1.346 3 3v6.5h4.276c1.065 0 2.061.572 2.596 1.494a3.01 3.01 0 0 1 .01 2.994"
              ></path>
              <path
                fill="#ff9a30"
                d="m84 125.95-.05.05H84zM114 77v-.05l-.05.05z"
              ></path>
              <path
                className={acceptedFile.twoFile ? "fill-success" : "fill-error"}
                d="M111.071 44.243 71.757 4.929A9.94 9.94 0 0 0 64.687 2H24c-5.514 0-10 4.486-10 10v104c0 5.514 4.486 10 10 10h59.95l-4-4H24c-3.309 0-6-2.691-6-6V12c0-3.309 2.691-6 6-6h40.687c1.603 0 3.109.624 4.242 1.757l39.314 39.314A6.04 6.04 0 0 1 110 51.313V72.95l4 4V51.313c0-2.67-1.04-5.181-2.929-7.07"
              ></path>
              <path fill="#fff" d="m113.95 77 .05-.05-4-4"></path>
            </svg>
            <p className="text-gray-300 mt-2.5">
              {" "}
              Formatos aceptados .xlsx, .xlsm, .xlsb, .xltx
            </p>
            {!acceptedFile.twoFile && (
              <span className="text-bold text-error mt-2.5">
                El archivo no tiene el formato correcto
              </span>
            )}
          </div>

          <button
            className="p-component w-2xs bg-zinc-500 rounded-md absolute bottom-5  justify-self-center hover:cursor-pointer"
            onClick={() => openUpaderFile(fileTwoRef)}
          >
            Subir Excel
          </button>
        </div>
      </div>
      {error && (
        <h2 className="p-2 bg-warning text-error grid place-content-center">
          {" "}
          Error: {error}
        </h2>
      )}
      {/* showFileSelected */}
      <div className="grid grid-cols-2  gap-3 place-content-center p-section pt-0 ">
        <span
          className={`flex gap-3.5 items-center  rounded-md p-component bg-dark h-20 text-amber-50`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            xmlSpace="preserve"
            id="Capa_1"
            x="0"
            y="0"
            version="1.1"
            viewBox="0 0 512 512"
            height={32}
            width={32}
          >
            <path
              fill="#ECEFF1"
              d="M496 432.011H272c-8.832 0-16-7.168-16-16v-320c0-8.832 7.168-16 16-16h224c8.832 0 16 7.168 16 16v320c0 8.832-7.168 16-16 16"
            ></path>
            <g fill="#388E3C">
              <path d="M336 176.011h-64c-8.832 0-16-7.168-16-16s7.168-16 16-16h64c8.832 0 16 7.168 16 16s-7.168 16-16 16M336 240.011h-64c-8.832 0-16-7.168-16-16s7.168-16 16-16h64c8.832 0 16 7.168 16 16s-7.168 16-16 16M336 304.011h-64c-8.832 0-16-7.168-16-16s7.168-16 16-16h64c8.832 0 16 7.168 16 16s-7.168 16-16 16M336 368.011h-64c-8.832 0-16-7.168-16-16s7.168-16 16-16h64c8.832 0 16 7.168 16 16s-7.168 16-16 16M432 176.011h-32c-8.832 0-16-7.168-16-16s7.168-16 16-16h32c8.832 0 16 7.168 16 16s-7.168 16-16 16M432 240.011h-32c-8.832 0-16-7.168-16-16s7.168-16 16-16h32c8.832 0 16 7.168 16 16s-7.168 16-16 16M432 304.011h-32c-8.832 0-16-7.168-16-16s7.168-16 16-16h32c8.832 0 16 7.168 16 16s-7.168 16-16 16M432 368.011h-32c-8.832 0-16-7.168-16-16s7.168-16 16-16h32c8.832 0 16 7.168 16 16s-7.168 16-16 16"></path>
            </g>
            <path
              fill="#2E7D32"
              d="M282.208 19.691c-3.648-3.04-8.544-4.352-13.152-3.392l-256 48A15.955 15.955 0 0 0 0 80.011v352c0 7.68 5.472 14.304 13.056 15.712l256 48c.96.192 1.952.288 2.944.288 3.712 0 7.328-1.28 10.208-3.68a16 16 0 0 0 5.792-12.32v-448c0-4.768-2.112-9.28-5.792-12.32"
            ></path>
            <path
              fill="#FAFAFA"
              d="m220.032 309.483-50.592-57.824 51.168-65.792c5.44-6.976 4.16-17.024-2.784-22.464s-16.992-4.16-22.464 2.784l-47.392 60.928-39.936-45.632c-5.856-6.72-15.968-7.328-22.56-1.504-6.656 5.824-7.328 15.936-1.504 22.56l44 50.304-44.608 57.344c-5.44 6.976-4.16 17.024 2.784 22.464a16.1 16.1 0 0 0 9.856 3.36c4.768 0 9.472-2.112 12.64-6.176l40.8-52.48 46.528 53.152A15.87 15.87 0 0 0 208 336.011c3.744 0 7.488-1.312 10.528-3.968 6.656-5.824 7.328-15.936 1.504-22.56"
            ></path>
          </svg>
          {selectedFile?.oneFile
            ? selectedFile?.oneFile.name
            : "Aun no selecciona ningun excel ñllll"}
        </span>
        <span
          className={`flex gap-3.5 items-center  rounded-md p-component bg-dark h-20 text-amber-50`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            xmlSpace="preserve"
            id="Capa_1"
            x="0"
            y="0"
            version="1.1"
            viewBox="0 0 512 512"
            height={32}
            width={32}
          >
            <path
              fill="#ECEFF1"
              d="M496 432.011H272c-8.832 0-16-7.168-16-16v-320c0-8.832 7.168-16 16-16h224c8.832 0 16 7.168 16 16v320c0 8.832-7.168 16-16 16"
            ></path>
            <g fill="#388E3C">
              <path d="M336 176.011h-64c-8.832 0-16-7.168-16-16s7.168-16 16-16h64c8.832 0 16 7.168 16 16s-7.168 16-16 16M336 240.011h-64c-8.832 0-16-7.168-16-16s7.168-16 16-16h64c8.832 0 16 7.168 16 16s-7.168 16-16 16M336 304.011h-64c-8.832 0-16-7.168-16-16s7.168-16 16-16h64c8.832 0 16 7.168 16 16s-7.168 16-16 16M336 368.011h-64c-8.832 0-16-7.168-16-16s7.168-16 16-16h64c8.832 0 16 7.168 16 16s-7.168 16-16 16M432 176.011h-32c-8.832 0-16-7.168-16-16s7.168-16 16-16h32c8.832 0 16 7.168 16 16s-7.168 16-16 16M432 240.011h-32c-8.832 0-16-7.168-16-16s7.168-16 16-16h32c8.832 0 16 7.168 16 16s-7.168 16-16 16M432 304.011h-32c-8.832 0-16-7.168-16-16s7.168-16 16-16h32c8.832 0 16 7.168 16 16s-7.168 16-16 16M432 368.011h-32c-8.832 0-16-7.168-16-16s7.168-16 16-16h32c8.832 0 16 7.168 16 16s-7.168 16-16 16"></path>
            </g>
            <path
              fill="#2E7D32"
              d="M282.208 19.691c-3.648-3.04-8.544-4.352-13.152-3.392l-256 48A15.955 15.955 0 0 0 0 80.011v352c0 7.68 5.472 14.304 13.056 15.712l256 48c.96.192 1.952.288 2.944.288 3.712 0 7.328-1.28 10.208-3.68a16 16 0 0 0 5.792-12.32v-448c0-4.768-2.112-9.28-5.792-12.32"
            ></path>
            <path
              fill="#FAFAFA"
              d="m220.032 309.483-50.592-57.824 51.168-65.792c5.44-6.976 4.16-17.024-2.784-22.464s-16.992-4.16-22.464 2.784l-47.392 60.928-39.936-45.632c-5.856-6.72-15.968-7.328-22.56-1.504-6.656 5.824-7.328 15.936-1.504 22.56l44 50.304-44.608 57.344c-5.44 6.976-4.16 17.024 2.784 22.464a16.1 16.1 0 0 0 9.856 3.36c4.768 0 9.472-2.112 12.64-6.176l40.8-52.48 46.528 53.152A15.87 15.87 0 0 0 208 336.011c3.744 0 7.488-1.312 10.528-3.968 6.656-5.824 7.328-15.936 1.504-22.56"
            ></path>
          </svg>
          {selectedFile?.twoFile
            ? selectedFile?.oneFile.name
            : "Aun no selecciona ningun excel"}
        </span>
      </div>
      {/* actions */}
      <div className=" grid place-content-center mt-2">
        <button
          onClick={uploadExcelFile}
          className="p-component w-2xs bg-accent rounded-md absolute bottom-5  justify-self-center hover:cursor-pointer"
        >
          subir a endpoint
        </button>
      </div>
    </div>
  );
};
