import mongoose from 'mongoose';

function connectDb() {
    const dbUrl = process.env.DB_URL!
    console.log(dbUrl, "database url")
    mongoose.connect(dbUrl, (error) => {
        if (error) {
            console.log('unable to connect to db')
            process.exit(1)
        }
        console.log('connected successfully to db.')
    })


}

export default connectDb