import axios from "axios"
import { useEffect, useState } from "react"

export default function Patient(){
    const [data, setData] = useState([])
    const [filter, setFilter] = useState("")

    useEffect(() => {
      axios.get("/api/getPhysios")
      .then((res)=>{
        console.log(res.data);
        setData(res.data)
      })
    }, [])

    function filterTime(time){
        if(filter===""){
            return true
        }
        if(filter==="Morning" && time.split(":")[0]<12){
            return true
        }
        if(filter==="Afternoon" && 12<=time.split(":")[0] && time.split(":")[0]<17){
            return true
        }
        if(filter==="Evening" && 17<=time.split(":")[0] && time.split(":")[0]<=23){
            return true
        }

        return false
    }

    function allocate(e){
        e.preventDefault()
    }
    return(
        <>
            <div>
                <div>
                    Filter
                </div>
                <select onChange={(e)=>{setFilter(e.target.value)}}>
                    <option value={""}>All</option>
                    <option value={"Morning"}>Morning</option>
                    <option value={"Afternoon"}>Afternoon</option>
                    <option value={"Evening"}>Evening</option>
                </select>
            </div>
            {
                data.map((item, idx)=>{
                    return(
                        <div key={idx} className="flex flex-col gap-2 m-5 my-10">
                            <div>{"Physio "+(idx+1)}</div>
                            <div>
                                <div>
                                    Mon
                                </div>
                                <form>
                                    {   
                                        item.Mon&&
                                        item.Mon.split(" ").filter((item)=>{return filterTime(item)}).map((time, idx1)=>{
                                            return(
                                                <button onClick={(e)=>{allocate(e)}} className=" rounded-full bg-slate-400 px-4 mx-2" key={idx} value={item.id +" "+time +" "+ "Mon"} name={item.id +" "+time +" "+ "Mon"}>{time}</button>
                                            )
                                        })
                                    }
                                </form>

                                <div>
                                    Tue
                                </div>
                                <form>
                                    {
                                        item.Tue&&
                                        item.Tue.split(" ").filter((item)=>{return filterTime(item)}).map((time, idx)=>{
                                            return(
                                                <button onClick={(e)=>{allocate(e)}} className=" rounded-full bg-slate-400 px-4 mx-2" key={idx} value={item.id +" "+time +" "+ "Tue"} name={item.id +" "+time +" "+ "Tue"}>{time}</button>
                                            )
                                        })
                                    }
                                </form>

                                <div>
                                    Wed
                                </div>
                                <form>
                                    {
                                        item.Wed&&
                                        item.Wed.split(" ").filter((item)=>{return filterTime(item)}).map((time, idx)=>{
                                            return(
                                                <button onClick={(e)=>{allocate(e)}} className=" rounded-full bg-slate-400 px-4 mx-2" key={idx} value={item.id +" "+time +" "+ "Wed"} name={item.id +" "+time +" "+ "Wed"}>{time}</button>
                                            )
                                        })
                                    }
                                </form>

                                <div>
                                    Thu
                                </div>
                                <form>
                                    {
                                        item.Thu&&
                                        item.Thu.split(" ").filter((item)=>{return filterTime(item)}).map((time, idx)=>{
                                            return(
                                                <button onClick={(e)=>{allocate(e)}} className=" rounded-full bg-slate-400 px-4 mx-2" key={idx} value={item.id +" "+time +" "+ "Thu"} name={item.id +" "+time +" "+ "Thu"}>{time}</button>
                                            )
                                        })
                                    }
                                </form>

                                <div>
                                    Fri
                                </div>
                                <form>
                                    {
                                        item.Fri&&
                                        item.Fri.split(" ").filter((item)=>{return filterTime(item)}).map((time, idx)=>{
                                            return(
                                                <button onClick={(e)=>{allocate(e)}} className=" rounded-full bg-slate-400 px-4 mx-2" key={idx} value={item.id +" "+time +" "+ "Fri"} name={item.id +" "+time +" "+ "Fri"}>{time}</button>
                                            )
                                        })
                                    }
                                </form>

                                <div>
                                    Sat
                                </div>
                                <form>
                                    {
                                        item.Sat&&
                                        item.Sat.split(" ").filter((item)=>{return filterTime(item)}).map((time, idx)=>{
                                            return(
                                                <button onClick={(e)=>{allocate(e)}} className=" rounded-full bg-slate-400 px-4 mx-2" key={idx} value={item.id +" "+time +" "+ "Sat"} name={item.id +" "+time +" "+ "Sat"}>{time}</button>
                                            )
                                        })
                                    }
                                </form>

                            </div>
                        </div>
                    )
                })
            }
        </>
    )
}