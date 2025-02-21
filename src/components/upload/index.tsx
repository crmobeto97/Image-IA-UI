import { ImagesAPI } from "@/apis/APIImages";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";


interface Props {
    onClose: () => void;
    isOpen: boolean;
    setRefresh: () => void;
}

const Upload: React.FC<Props> = ({ onClose, isOpen, setRefresh }) => {

    const [step, setStep] = useState<number>(1);
    const [files, setFiles] = useState<File[]>([]);

    const handleClose = () => {

        setFiles([]);
        onClose();
        setRefresh();
    }

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files) {
            const files = Array.from(event.target.files);
            setFiles((prev) => [...prev, ...files]);
        }
    };

    const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        if (event.dataTransfer.files) {
            const files = Array.from(event.dataTransfer.files);
            setFiles((prev) => [...prev, ...files]);
        }
    };

    const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
    };

    const {
        mutate: addImages,
        isPending: isAddingImagesPending
      } = useMutation({
          mutationFn: (data: FormData) => ImagesAPI.uploadImage(data),
          onSuccess: () => {
            alert('Imagen subida correctamente');
            handleClose();
          },
          onError: (error) => {
            console.log('Error', error);
          }
      });

      const handleUpload = () => {
          if(files.length == 0){
            alert('Selecciona al menos una imagen');
            return;
          }
      
          const uuid = localStorage.getItem("unique_token");
          if(!uuid || !uuid.trim()){
            alert('Error al obtener el token');
            return;
          }
      
          const data = new FormData();
          data.append('token', uuid);
          Array.from(files).forEach((image) => {
            data.append('files', image);
          });
      
          addImages(data);

          
        };

    if (!isOpen) return null;

    return (
        <div className={`
            fixed 
            inset-0 
            flex 
            items-center 
            justify-center 
            bg-gray-800 
            bg-opacity-50 
            z-[999]
            overflow-y-auto
            min-h-screen
            `} >
            <div className={`
                bg-white 
                p-6 
                rounded-lg 
                shadow-lg 
                w-3/4
                max-w-3/4
                h-auto
                max-h-[90vh]
                overflow-y-auto
                `} >
                {
                    step == 1 ? (<></>) :
                        step == 2 ? (<></>) :
                            step == 3 ? (<></>) :
                                null
                }


                <div className="flex flex-col px-2 py-8" >

                    <div className="flex flex-col items-center mb-4" >


                        <div
                            className="w-full max-w-md p-6 border-2 border-dashed border-gray-400 rounded-lg bg-gray-50 flex flex-col items-center justify-center"
                            onDrop={handleDrop}
                            onDragOver={handleDragOver}
                        >
                            <input
                                type="file"
                                accept="image/*"
                                multiple
                                className="hidden"
                                id="fileInput"
                                onChange={handleFileChange}
                            />
                            <label
                                htmlFor="fileInput"
                                className="cursor-pointer text-[30px] font-bold text-gray-800"
                            >
                                Arrastre y suelte aquí los archivos
                            </label>
                        </div>

                        <div className="mt-4 w-full max-w-md">
                            {files.map((file, index) => (
                                <div key={index} className="text-gray-800 text-sm truncate font-bold">
                                    {file.name}
                                </div>
                            ))}
                        </div>

                    </div>

                    <div className="flex flex-row justify-between items-center">

                        <button onClick={handleClose} className="bg-transparent text-[18px] text-red-600" >Cancelar</button>
                        <button disabled={isAddingImagesPending} onClick={handleUpload} className={`bg-black text-white text-[18px] px-6 py-2 rounded-[10px] font-bold ${isAddingImagesPending && 'cursor-not-allowed'}`} >Cargar</button>

                    </div>
                </div>

            </div>
        </div>
    )
}

export default Upload;