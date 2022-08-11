const express = require("express")
const app = express()
app.use(express.json())

const cors = require("cors")
app.use(cors({origin: "*"}))


app.listen(4000 , () => {console.log("Server running at http://localhost:4000")})


// json-server -p 4000 expense.db.json // this is the command to run the server