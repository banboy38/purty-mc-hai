import { createClient } from '@supabase/supabase-js'
import axios from 'axios'

export default async function handler(req, res) {

    if(req.method==="POST"){

        const supabase = createClient('https://ukxiygarirdmhkubmvnc.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVreGl5Z2FyaXJkbWhrdWJtdm5jIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTcwMzc4NTExOCwiZXhwIjoyMDE5MzYxMTE4fQ.K0KxaiboSBtiE2Z1ldelCrZNGDIyH0T366Nc7uTo_bg')
        
        const id = req.body.data.split(" ")[0]
        const time = req.body.data.split(" ")[1]
        const day = req.body.data.split(" ")[2]

        // console.log(id, time, day);
        // console.log({id:id, day:day, time:time});
        let temp = {}
        eval(`temp = {${day}:time}`)
        console.log(temp);
        await supabase.from("Allocated").update(temp).eq("id", id)

        try{

            await axios.patch("https://purty-mc-hai.vercel.app/api/setPhysioTime", {id:id, day:day, time:time})
    
            let tempmin = (Number(time.split(":")[1])+15)%60
            let temphr = Number(time.split(":")[0])
            if(tempmin===0){
                temphr = String(temphr+1)
                tempmin = "00"
            }            
            // console.log({id:id, day:day, time:temphr+":"+tempmin});
            await axios.patch("https://purty-mc-hai.vercel.app/api/setPhysioTime", {id:id, day:day, time:temphr+":"+tempmin})

            tempmin = (Number(tempmin)+15)%60
            temphr = Number(temphr)
            if(tempmin===0){
                temphr = String(temphr+1)
                tempmin = "00"
            }
            // console.log({id:id, day:day, time:temphr+":"+tempmin});
            await axios.patch("https://purty-mc-hai.vercel.app/api/setPhysioTime", {id:id, day:day, time:temphr+":"+tempmin})

            res.status(200).json("Success");
        }
        catch{
            res.status(500).json("Failure")
        }

        res.status(200).json("Success");
        


    }
}
