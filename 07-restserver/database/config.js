import mongoose from "mongoose"


const dbConecction = async()=>{

    try {
        
        await mongoose.connect(process.env.MONGODB_ATLAS,{
            useNewUrlParser: true,
            useUnifiedTopology: true
        });

        console.log("DB is connected");

    } catch (error) {
        console.log(error);
        throw new Error(`Error a la hora de iniciar la base de datos`)
    }
        
    

};




export {
    dbConecction
}