'use client';

import { ImagesAPI } from "@/apis/APIImages";
import Upload from "@/components/upload";
import { useMutation, useQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";

const Home: React.FC = () => {

  const [search, setSearch] = useState<string>('');
  const [date, setDate] = useState<string>('');
  const [view, setView] = useState<string>('LIST');
  const [imageList, setImageList] = useState<string[]>([]);
  const [uploadOpen, setUploadOpen] = useState<boolean>(false);
  const [refresh, setRefresh] = useState<boolean>(false);
  const [token, setToken] = useState<string | null>(null);
  const [processedList, setProcessedList] = useState<string[]>([]);

  

  // Set token only on client
  useEffect(() => {
    let localToken = window.localStorage.getItem("unique_token");
    if (!localToken) {
      localToken = uuidv4();
      window.localStorage.setItem("unique_token", localToken);
    }
    setToken(localToken);
  }, []);

  // Query only runs once token is available
  const {
    data, isLoading, isError, error
  } = useQuery({
    queryKey: ['images', token, refresh],
    enabled: !!token,
    queryFn: () => ImagesAPI.getAllRaw(token as string),
  })


  useEffect(()=> {
    if(data){
      setImageList(data.data);
    }
  }, [data]);


  const {
    data: processedData,
    isLoading: isProcessedLoading,
    isError: isProcessedError,
    error: processedError
  } = useQuery({
    queryKey: ['processedImages', token, refresh],
    enabled: !!token,
    queryFn: () => ImagesAPI.getAllProcessed(token as string),
  });

  useEffect(() => {
    if (processedData) {
      setProcessedList(processedData.data);
    }
  }, [processedData]);
  

  return (
    <>
      <Upload
        isOpen={uploadOpen}
        onClose={() => setUploadOpen(!uploadOpen)}
        
        setRefresh={() => setRefresh(!refresh)}
      />


      <div className="p-4">

        <div className="flex flex-col md:flex-row justify-between items-center md:items-start mb-2" >
          <div className="flex flex-row space-x-2" >
            <span className="text-[20px]" >
              Documentos
            </span>
            <span className="text-[20px]">
              {'>'}
            </span>
            <span className="text-[20px] font-bold">
              Carga
            </span>

          </div>

          <button onClick={() => setUploadOpen(!uploadOpen)} className="bg-black text-white font-bold text-[16px] px-8 py-2 rounded-[10px] mt-2 md:mt-0" >
            Subir archivo
          </button>
        </div>


        <div className="flex flex-col md:flex-row items-center">

          <div className="w-full md:w-1/2 flex flex-col md:flex-row justify-between space-y-2 md:space-y-0 items-center" >

            <input className="bg-white text-[18px] px-8 py-4 rounded-[20px]" placeholder="Buscar" type="text" value={search} onChange={(e) => setSearch(e.target.value)} />

            <label className="bg-transparent text-[18px] font-bold " >
              Fecha:
              <input className="bg-transparent px-8 py-4 font-normal" placeholder="Fecha" type="date" value={date} onChange={(e) => setDate(e.target.value)} />
            </label>
          </div>

          <div className="w-full md:w-1/2 flex flex-col md:flex-row justify-end items-center space-y-2 md:space-y-0 space-x-0 md:space-x-24 px-10  ">
            <div className="bg-white rounded-[30px] h-12" >
              <button onClick={() => setView('LIST')} className={`font-bold text-[25px]  w-14 h-12 rounded-[30px] ${view == 'LIST' && 'bg-gray-800 text-white'}`} >L</button>
              <button onClick={() => setView('SQUARE')} className={`font-bold text-[25px] w-14 h-12 rounded-[30px] ${view == 'SQUARE' && 'bg-gray-800 text-white'} `}>C</button>
            </div>

            <button className="bg-transparent text-[20px] border border-solid border-gray-600 border-[4px] w-12 h-12 rounded-full" >
              D
            </button>
          </div>
        </div>

        <div className="flex flex-col md:flex-row mt-4" >

          <div className="w-full md:w-[75%] bg-white mb-4 md:mb-0 md:mr-4 rounded-[20px] min-h-screen py-8" >
            {
              isLoading ? <div className="flex justify-center items-center h-screen" >Cargando...</div> :
                isError ? <div className="flex justify-center items-center h-screen" >Error: {error.message}</div> :
                <div>
                  {
                    view == 'LIST' ? 
                    <table className="w-full border-collapse px-1 text-[16px] text-[#494949] text-left " >
                      <thead>
                            <tr>
                                <th className="w-[10%]">

                                </th>
                                <th className="w-[40%]">Archivo</th>
                                <th className="w-[25%]">Tipo</th>
                                <th className="w-[25%]">Fecha</th>
                            </tr>
                        </thead>
                        <tbody>

                            <tr>
                                <td colSpan={8} style={{ height: '16px' }}></td>
                            </tr>

                            {imageList.map((item: any, index: any) => (
                                
                                    <tr key={index} className="border-b border-solid border-blue-300" >
                                       
                                        <td className=""></td>
                                        <td className="">{item}</td>
                                       
                                    </tr>
                                    
                               

                            ))}
                            
                            {processedList.map((item: any, index: any) => (
                                
                                <tr key={index} className="border-b border-solid border-green-300" >
                                   
                                    <td className=""></td>
                                    <td className="">{item}</td>
                                   
                                </tr>
                                
                           

                        ))}
                        </tbody>


                    </table> : view == 'SQUARE' ? <div className="grid grid-cols-3 gap-4 p-4" ></div> : null
                  }
                </div>
            }
          </div>

          <div className="w-full md:w-[25%] bg-white  mb-4 md:mb-0 rounded-[20px] min-h-screen">

          </div>


        </div>


      </div>
    </>)
}

export default Home;