const express =require("express")
const app = express()

app.get("/api",(req,res)=>{
    res.json({msg:"server is sending"})
})

const PORT = process.env.PORT || 4000;
app.listen(PORT,()=>
{
    console.log(`server is running at ${PORT}`)
})