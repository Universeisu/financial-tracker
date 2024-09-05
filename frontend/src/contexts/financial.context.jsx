import { createContext,useContext,useEffect,useState } from "react";
import FinancialService from"../service/financial.service";

import { useUser } from "@clerk/clerk-react";

export const financialRecordContext = createContext();

export const financialRecordsProvider = ({Children}) =>{
    const [Records,setRecords] = useState([])
    const {user }= useUser();
    const fetchRecords = async() =>{
        if(!user) return;
        try{
            const response = await FinancialService.getallFinancialRecordsByUserId(user.id)
            if(response.status === 200){
                setRecords(response.data);

            }
        }catch (error) {
            console.log(error);
        }
    };
    useEffect(()=>{
        fetchRecords();
    },[user]);

    const addRecord = async(record) =>{
        try {
          const response = await FinancialService.addRecords(record);
          if(response.status == 200) {
            setRecords((prev)=> [...prev,response.data]);

          }

        } catch (error) {
          console.log();
        }
    };


    const updateRecord = async (id, newRecord) => {
      try {
        const response = await FinancialService.updateFinancialRecord(
          id,
          newRecord
        );
        if (response.status === 200) {
          setRecords((prev) =>
            prev.map((record) => {
              if (record.id === id) {
                return newRecord;
              } else {
                return record;
              }
            })
          );
        }
      } catch (error) {
        console.error(error);
      }
    };


const deleteRecord = async (id) => {
        try {
          const response = await FinancialService.deleteRecord(id);
          if (response.status === 200) {
            setRecords((prev) => prev.filter((record) => record.id !== id));
          }
        } catch (error) {
          console.log(error);
        }
    }

    return (
        <financialRecordContext.Provider value={{ Records, addRecord, updateRecord, deleteRecord }}>
            {Children}
        </financialRecordContext.Provider>
    );
};

export const useFinancialRecords = () => useContext(financialRecordContext);