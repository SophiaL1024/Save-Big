import React ,{useContext}from 'react';
import dateContext from "../../context.js";
import { PieChart, Pie, Cell, Legend, Tooltip, ResponsiveContainer,Sector } from 'recharts';
import { useCallback, useState } from "react";

const COLORS = ['#ffa1b5', '#a1b5ff', '#FFCC66', '#66CCCC'];

const renderActiveShape = (props: any) => {
  const RADIAN = Math.PI / 180;
  const {
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    startAngle,
    endAngle,
    fill,
    payload,
    percent,
    value
  } = props;
  const sin = Math.sin(-RADIAN * midAngle);
  const cos = Math.cos(-RADIAN * midAngle);
  const sx = cx + (outerRadius + 10) * cos;
  const sy = cy + (outerRadius + 10) * sin;
  const mx = cx + (outerRadius + 30) * cos;
  const my = cy + (outerRadius + 30) * sin;
  const ex = mx + (cos >= 0 ? 1 : -1) * 22;
  const ey = my;
  const textAnchor = cos >= 0 ? "start" : "end";

  return (
    <g>
      <text x={cx} y={cy} dy={8} textAnchor="middle" fill={fill}>
        {payload.name}
      </text>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
      />
      <Sector
        cx={cx}
        cy={cy}
        startAngle={startAngle}
        endAngle={endAngle}
        innerRadius={outerRadius + 6}
        outerRadius={outerRadius + 10}
        fill={fill}
      />
      <path
        d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`}
        stroke={fill}
        fill="none"
      />
      <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
      <text
        x={ex + (cos >= 0 ? 1 : -1) * 12}
        y={ey}
        textAnchor={textAnchor}
        fill="#999"
      >{`PV ${value}`}</text>
      <text
        x={ex + (cos >= 0 ? 1 : -1) * 12}
        y={ey}
        dy={18}
        textAnchor={textAnchor}
        fill="#999"
      >
        {`(Rate ${(percent * 100).toFixed(2)}%)`}
      </text>
    </g>
  );
};

export default function BudgetPieChart(){

  const {incomeAndBudget,expenseAndBudget} = useContext(dateContext);

  // let totalIncome=0;
  // incomeAndBudget.forEach(element => {
  //   totalIncome+=Number(element.income_sum);
  // });
  // let totalExpense=0;
  // expenseAndBudget.forEach(element => {
  //   totalExpense+=Number(element.expense_sum);
  // });

  const [activeIndex, setActiveIndex] = useState(0);
  const onPieEnter = useCallback(
    (_, index) => {
      setActiveIndex(index);
    },
    [setActiveIndex]
  );

  

  const data1 = incomeAndBudget.map(e=> {
    // console.log(e)
    
    return {
      name: e.name,
      value: Number(e.income_sum),
    }
  })

  const data2 = expenseAndBudget.map(e=> {
    // console.log(e)
    
    return {
      name: e.name,
      value: Number(e.expense_sum),
    }
  })


  console.log(data1)
  return(
    <PieChart width={500} height={500}>
    <Pie
      activeIndex={activeIndex}
      activeShape={renderActiveShape}
      data={data1}
      cx={200}
      cy={200}
      innerRadius={60}
      outerRadius={80}
      fill="#ffa1b5"
      dataKey="value"
      onMouseEnter={onPieEnter}
    >
      {data1.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
      </Pie>
  
      <Pie
      activeIndex={activeIndex}
      activeShape={renderActiveShape}
      data={data2}
      cx={200}
      cy={200}
      innerRadius={60}
      outerRadius={80}
      fill="#ffa1b5"
      dataKey="value"
      onMouseEnter={onPieEnter}
    >
      {data2.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
      </Pie>
      <br/>
      </PieChart>
    // <>
    //   <ResponsiveContainer width="100%" height="100%">
    //     <PieChart width={400} height={400}>
      
    //       <Pie
    //         dataKey="value"
    //         isAnimationActive={false}
    //         data={data}
    //         cx="50%"
    //         cy="50%"
    //         outerRadius={80}
    //         fill="#8884d8"
    //         label
    //       />
         
    //       <Tooltip />
    //     </PieChart>
    //     </ResponsiveContainer>

    // "pie chart goes here"<br/>
    // totalIncome:{totalIncome}<br/>
    // totalExpense:{totalExpense} 
    // </>
    )
}

//incomeAndBudget looks like this:[{income_sum,id,name,month,year,userId},{},{},{},{},{},{}.......]

// So the Pie chart structure should be :
//incomeAndBudget[0].income_sum/totalIncome, incomeAndBudget[1].income_sum/totalIncome,....

// and show incomeAndBudget[0].name beside each part of pie.