import "dotenv/config"
import app from './src/app.js';
import connectDB from "./src/config//db.js"

const PORT = process.env.PORT

app.get("/", (req, res) => {
    res.json({
        "message":"Server started successfully"
        });
})

await connectDB()

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
