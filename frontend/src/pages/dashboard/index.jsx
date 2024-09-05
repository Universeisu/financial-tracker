import React from "react";
import { useUser } from "@clerk/clerk-react";
import { useFinancialRecords } from "../../contexts/financial.context";
import AddRecordForm from "./AddRecordForm";
import FinalRecordTable from "./FinalRecordTable";

const Dashboard = () => {
  const { user } = useUser();
  return (
    <div className="max-w-screen-2xl container mx-auto xl:px-24 px-4">
      <div>Welcome {user?.firstName}! Here are your finance</div>
      <AddRecordForm />
      <div>Total Monthly: 0000฿</div>
      <FinalRecordTable />
    </div>
  );
};

export default Dashboard;
