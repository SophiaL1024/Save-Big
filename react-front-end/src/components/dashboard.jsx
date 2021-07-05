import  React,{useEffect, useState,useContext } from "react";
import axios from 'axios';
import dateContext from "../context.js";

const Dashboard=function(){

  const [state, setState] = useState({
    dashboardData:{}
  }); 

  const {month,year} = useContext(dateContext);

  useEffect(() => {
   
    axios
      .get("/dashboards/1", { params: { year,month } } )
      .then((res) => {
        console.log("res.data",res.data);
        setState((prev) => ({ ...prev, dashboardData: res.data }));
      });
  }, [month,year]);
  
  return(
    <>
    currentMonthIncome :{state.dashboardData.currentMonthIncome }<br/>
    currentMonthExpense :{state.dashboardData.currentMonthExpense }<br/>
    annualIncome :{state.dashboardData.annualIncome }<br/>
    annualExpense :{state.dashboardData.annualExpense }<br/>
    balanceBudget:{state.dashboardData.balanceBudget}<br/>
    monthlyBalance:{state.dashboardData.monthlyBalance}<br/>
    selected month:{month}<br/>
    selected year:{year}<br/>
    </>
  );
}

export default Dashboard;