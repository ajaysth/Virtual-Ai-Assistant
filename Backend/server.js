import "dotenv/config"
import app from './src/app.js';

const PORT = process.env.PORT

app.get("/", (req, res) => {
    res.json({
        "message":"Server started successfully"
        });
})

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
