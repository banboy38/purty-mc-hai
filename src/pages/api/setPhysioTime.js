import { createClient } from '@supabase/supabase-js'

export default async function handler(req, res) {
    
    if(req.method==="POST"){
        // {
        //     "id": 2,
        //     "day":"Wed",
        //     "data":{
        //         "Wed":"22:30"
        //     }
        
        // }

        const supabase = createClient('https://ukxiygarirdmhkubmvnc.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVreGl5Z2FyaXJkbWhrdWJtdm5jIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTcwMzc4NTExOCwiZXhwIjoyMDE5MzYxMTE4fQ.K0KxaiboSBtiE2Z1ldelCrZNGDIyH0T366Nc7uTo_bg')
        
        const day = req.body.day
        const time = req.body.time
        const id = req.body.id

        supabase
            .from('Physios')
            .select(day)
            .eq("id", id)
            .then((res)=>{
                

                let dayString = res.data[0][day] ? res.data[0][day] + " " +time : time

                let temp = {}
                eval(`temp = {${day} : dayString}`);

                // console.log(temp, res);

                supabase
                .from('Physios')
                .update(temp)
                .eq("id", id)
                .then((res)=>{
                    console.log(res);
                    res.status(200).json("Successfully set time");
                })
                .catch((err)=>{
                    // res.status(500).json("Server error");
                })
                
            })
            .catch((err)=>{
                // res.status(500).json("Server error");
            })

        


        res.status(200).json("Successfully set time");
        // res.status(200).json(req.method);
    }
    else if(req.method === "PATCH"){
        // {
        //     "id": 2,
        //     "day":"Wed",
        //     "time":22:30        
        // }
        
        const supabase = createClient('https://ukxiygarirdmhkubmvnc.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVreGl5Z2FyaXJkbWhrdWJtdm5jIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTcwMzc4NTExOCwiZXhwIjoyMDE5MzYxMTE4fQ.K0KxaiboSBtiE2Z1ldelCrZNGDIyH0T366Nc7uTo_bg')

        const id = req.body.id
        const day = req.body.day
        const time = req.body.time

        let days = await supabase.from('Physios').select(day).eq("id", id)

        // console.log(req.body);

        days = days.data[0][day].split(" ")
        

        let idx = days.indexOf(time)

        if(idx<0){
            res.status(300).json("Bad Request")
        }

        let dayString = days.slice(0,idx).concat(days.slice(idx+1))
        dayString = dayString.join(" ")
        

        let temp = {}
        eval(`temp = {${day}:dayString}`)

        
        let data = await supabase.from("Physios").update(temp).eq("id",id)

        res.status(200).json("Successfully set time");

    }
  
}
