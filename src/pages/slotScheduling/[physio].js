import axios from "axios";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";


export default function Physio(){

    const [currDay, setCurrDay] = useState(false)
    const [data, setData] = useState([])
    const [physioId, setPhysioId] = useState(-1)
    const [physioName, setPhysioName] = useState("")

    let times = ["5:30"]
    while(true){
        let last = times[times.length-1]
        let hr = Number(last.split(":")[0])
        let min = Number(last.split(":")[1])

        min = (min+15)%60
        if(min===0){
            min = "00"
            hr += 1
        }

        times.push(String(hr)+":"+min)

        if(hr===23){
            break
        }
        
    }

    // console.log(times);

    useEffect(() => {

        let date = (new Date).toUTCString().split(" ")
        setCurrDay(date[0].slice(0, 3))

        axios.get("/api/getPhysios")
        .then((res)=>{

            let temp = {}
            for(let item of res.data){
                // console.log(item,window.location.pathname.split("/")[2], item["id"]);
                if(item["id"]==window.location.pathname.split("/")[2]){
                    // console.log(item);
                    temp = item
                    setPhysioId(item["id"])
                    setPhysioName(item["Name"])
                    break
                }
            }

            let information = []
            // console.log(temp);

            for(let item in temp){
                if(item!="created_at" && item!="Name" && item!="id"){
                    let arr = temp[item] ? temp[item].split(" ") : []
                    eval(`information.push({
                        day:item,
                        times:arr
                    })`)
                }
            }

            // console.log(information);
            setData(information)
        })


    //   console.log(date);

    }, [])

    function submit(data){
        data.preventDefault()
        let payload = {
            id: physioId,
        }

        eval(`payload = {...payload, day:data.target.day.value,time:data.target.time.value}`)

        axios.post("/api/setPhysioTime", payload)
        .then((res)=>{
            window.location.reload()
        })

        
        // Payload data format
        // {
        //     "id": 2,
        //     "day":"Wed",
        //     "time":"22:30"
        
        // }
    }
    
    function remove(data){
        data.preventDefault()
        let payload = {
            id: physioId,
        }

        // console.log(data.target.value);

        eval(`payload = {...payload, day:data.target.value.split(" ")[1],time:data.target.value.split(" ")[0]}`)
        
        // console.log(payload);

        axios.patch("/api/setPhysioTime", payload)
        .then((res)=>{
            console.log(res.data);
            window.location.reload()
        })

        // Payload data format
        // {
        //     "id": 2,
        //     "day":"Wed",
        //     "time":"22:30"        
        // }
        
    }

    if(!currDay){
        return(
            <>
                <div>Loading...</div>
            </>
        )
    }
    else if(currDay==="Sun")
        return(
            <>
                {physioName}
                {   data.map((item)=>{
                        
                        return(
                            <div key={item["day"]}>
                                <div>{item["day"]}</div>
                                <form onSubmit={(e)=>{submit(e)}}>

                                    <input type="text" name={"day"} defaultValue={item["day"]} hidden/>
                                    <select name={"time"}>
                                        {
                                            times.map((time, idx)=>{

                                                if(!item["times"].includes(time))
                                                return(
                                                    <option key={idx}>{time}</option>
                                                )
                                            })
                                        }
                                    </select>

                                    <button>Submit</button>
                                </form>

                                <form>

                                    {
                                        item["times"].map((time, idx)=>{
                                            return(
                                                <button onClick={(e)=>{remove(e)}} className=" rounded-full bg-slate-400 px-4 mx-2" key={idx} value={time +" "+ item["day"]} name={time +" "+ item["day"]}>{time}</button>
                                            )
                                        })
                                    }
                                    
                                </form>
                            
                            </div>
                        )
                    })
                    
                }
                
                
            </>
        )
    else
        return(
            <>
                Times
            </>
        )    
}