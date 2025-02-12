const express = require("express")
const app = express();
const cookieParser = require("cookie-parser")
const cors = require("cors")
const { cloudinaryConnect } = require("./config/cloudinary")
const fileUpload = require("express-fileupload");
const connectDB = require("./config/db")
const dotenv = require("dotenv");


dotenv.config();

connectDB();
const PORT = process.env.PORT || 8080



// middleware 
app.use(express.json())
app.use(cookieParser());
app.use(cors({
    origin: "*",
    credentials: true,
}))

app.use(
    fileUpload({
        useTempFiles: true,
        tempFileDir: "/tmp"
    })
)

cloudinaryConnect();

app.use("/api/v1/image", require("./routes/imageRoute"))
app.use("/api/v1/location", require("./routes/locationRoute"))
app.use("/api/v1/room", require("./routes/roomRoute"))
app.use("/api/v1/tifin", require("./routes/tifinRoute"))
app.use("/api/v1/auth", require("./routes/authRoute"))
app.use("/api/v1/rating", require("./routes/ratingReview"))
app.use("/api/v1", require("./routes/commonRoutes"))
app.use("/api/v1/contact", require("./routes/contactRoute"))



// default route 
app.get("/", (req, res) => {
    return res.json({
        success: true,
        message: "Your server is up and running ..."
    })
})

app.listen(PORT, () => {
    console.log(`Server is running at port no ${PORT}`)
})
