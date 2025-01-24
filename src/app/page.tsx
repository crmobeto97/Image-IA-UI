'use client';

import Upload from "@/components/upload";
import React, { useState } from "react";


const Home: React.FC = () => {

  const [search, setSearch] = useState<string>('');
  const [date, setDate] = useState<string>('');
  const [view, setView] = useState<string>('LIST');
  const [imageList, setImageList] = useState<any[]>([]);
  const [uploadOpen, setUploadOpen] = useState<boolean>(false);

  const addImageToList = (image: any) => {
    setImageList((prev) => [...prev, image]);
  };

  return (
    <>
      <Upload
        isOpen={uploadOpen}
        onClose={() => setUploadOpen(!uploadOpen)}
        onAddImage={addImageToList}
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

          <button onClick={()=> setUploadOpen(!uploadOpen)} className="bg-black text-white font-bold text-[16px] px-8 py-2 rounded-[10px] mt-2 md:mt-0" >
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

          <div className="w-full md:w-[75%] bg-white mb-4 md:mb-0 md:mr-4 rounded-[20px] min-h-screen" >

          </div>

          <div className="w-full md:w-[25%] bg-white  mb-4 md:mb-0 rounded-[20px] min-h-screen">

          </div>


        </div>


      </div>
    </>)
}

export default Home;