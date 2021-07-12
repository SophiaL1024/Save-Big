import  React,{ useContext,useState} from "react";
import dateContext from "../../context.js";
import axios from 'axios';

import {  TextField, Button, Dialog, DialogActions, DialogContent, DialogContentText,DialogTitle} from "@material-ui/core";

export default function budgetForm(props){

  const {incomeAndBudget,expenseAndBudget,setState,userId} = useContext(dateContext);
  
  const [formValue, setFormValue] = useState({ 
    date:"", 
    year:0,
    month: 0,
    amount: "",
    name: "" ,
    "userId":userId
  });

  const handleOpen=props.open;
  const tabType=props.tabType;


  const handleClose = () => {
    props.setOpen(false);
  };

  const handleChange = (key,value) => { 
    setFormValue(prev => ({
      ...prev,
      [key]:value  
    }))
  }

  const handleSubmit = () => {
 
    formValue.year=Number(formValue.date.slice(0,4));
    formValue.month=Number(formValue.date.slice(-2));
    //Don't need to setState for newly created balance_budget,cause it don't need to be rendered in the current page.
    axios.post('http://localhost:3000/budgets', {data:{formValue,tabType}}) 

    .then((resolve) => {
      if(tabType===0){
        const newIncomeAndBudget=incomeAndBudget.map(e=>{return {...e}});

        newIncomeAndBudget.push({name:formValue.name,
                amount:formValue.amount,
                month:formValue.month,
                year:formValue.year,
                user_id:1, 
                id:resolve.data
                });
  
        setState((prev) => ({ 
          ...prev,      
          incomeAndBudget: newIncomeAndBudget               
        }));

      }

      else if(tabType===1){

      const newExpenseAndBudget=expenseAndBudget.map(e=>{return {...e}});

      newExpenseAndBudget.push({name:formValue.name,
              amount:formValue.amount,
              month:formValue.month,
              year:formValue.year,
              user_id:1, 
              id:resolve.data
              });

      setState((prev) => ({ 
        ...prev,      
        expenseAndBudget: newExpenseAndBudget               
      }));
     }

    })
      .then(()=>{
         setFormValue({
         date:"", 
         year:0,
         month: 0,
         amount: "",
         name: ""   
         }); 
       })       
      .catch(err => console.log( err));

      handleClose();
  };

  
 

  return (
    <>

    <Dialog open={handleOpen} onClose={handleClose} aria-labelledby="form-dialog-title">

    <DialogTitle id="form-dialog-title">{tabType===0?'New Income Budget':'New Expense Budget'}</DialogTitle>

     <DialogContent>
     
     {/* <DialogContentText>{tabType===0?'Set up income budget':((tabType===1?'Set up expense budget':'Set up saving goal'))} </DialogContentText> */}

      <TextField
        autoFocus
        margin="dense"
        id="name"
        label="budget title" 
        type="text" 
        onChange={(event)=>handleChange("name",event.target.value)}
        value={formValue.name}  
      />
      <br/>
      <TextField        
        margin="dense"
        id="amount"
        type="number"
        label="amount" 
        onChange={(event)=>handleChange("amount",event.target.value)}
        value={formValue.amount}  
      />
      <br/>
      <TextField
        margin="dense"
        id="date"
        type="month"
        onChange={(event)=>handleChange("date",event.target.value)}        
        // inputProps={tabType===2?{ min: '2021-08' }:{ min:'2021-01' }} //hard code min month
      />
    </DialogContent>

    <DialogActions>
      <Button onClick={handleClose} color="primary">
        Cancel
      </Button>
      <Button onClick={handleSubmit} color="primary">
        Submit
      </Button>
    </DialogActions>

  </Dialog>
  </>
  )
}