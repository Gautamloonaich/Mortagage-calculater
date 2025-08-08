import { useEffect, useState } from "react"

function Calculator()
{
    
    let[p,setprincipal ]=useState();
    let[r,setrate ]=useState();
    let[y,setyear ]=useState();
    let [total,settotal]= useState();
    let [amountintrest,setamountintrest]= useState();
  
    function calculation(e){
       let value=parseInt(e.target.value);//Convert string into intiger(we get the value from input fild it always in form of string either we pass in number )
       let id=e.target.id; // get id from input field to apply if condution
       
       if(id=="principle")
       {
        setprincipal(value);
       }
       else if(id=="rate")
       {
        setrate(value);
       }
       else
       {
        setyear(value);
       }
    
    }
    
    //P(r(1+r)^n/((1+r)^n)-1))
    function calculationMI()
    {
        if(p && r && y){
          let Rate=r/12/100;// convert rate per year to  per  mounth(value of ra is for per mounth not per year)
          
          let calcpower=Math.pow(1+Rate,y*12);//convert (year*12) yearin per mounth otherwise it is in mounth and Math.pow is used to calculate the power value 
          let finalamount=Math.round( p*(Rate*calcpower)/(calcpower-1));//Math.round is used to get roundoff value not in decimel
           let total=finalamount*y*12;
           let totalamount=total-p;
          settotal(finalamount);
          setamountintrest(totalamount);
          
        }
        
          

    }
    
   
    useEffect(()=>{
       calculationMI()
    },[total])

  return(
    
  <div className="  pt-14 flex justify-center items-center">
   
    <div className="bg-white max-w-130  p-10 space-y-5 [&>*]:space-y-2 [&>*]:font-semibold rounded-md shadow-gray-500 shadow-2xl">
        
        <div className="">
            <h1 className="text-blue-700">Principle Lone Amount</h1>
            <input type="number" className="bg-white border border-white rounded-sm outline-0 p-2 w-80 shadow-sm shadow-blue-300 focus:border focus:border-blue-300"  placeholder="Lone amount" id="principle" value={p} onChange={calculation}/>
        </div>
        <div className="">
            <h1 className="text-blue-700">Intrest rate</h1>
            <input type="number" className="bg-white border border-white rounded-sm outline-0  p-2 w-80 shadow-sm shadow-blue-300 focus:border focus:border-blue-300" placeholder="Intrest rate" id="rate" value={r} onChange={calculation} />
        </div>
        <div className="">
            <h1 className="text-blue-700">Length of lone </h1>
            <input type="number" className="bg-white border border-white rounded-sm outline-0 p-2 w-80 shadow-sm shadow-blue-300 focus:border focus:border-blue-300" placeholder="Lone year" id= "year" value={y} onChange={calculation} />
        </div>
        
        <div className="flex flex-col items-center ">
        <button className="border rounded-md bg-blue-600 w-70 text-white hover:bg-blue-900 py-2 px-3 my-3 text-xl" onClick={calculationMI}>Calculate</button>
        <p className="mt-4 font-bold">EMI : <span className="font-medium ">{total}</span> Rs per mounth</p>

        </div>
    </div>
  </div>
  )
}
export default Calculator