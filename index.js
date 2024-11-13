import mongoose, { Schema } from "mongoose";
import express, { json } from "express"
import cors from "cors"
import dotenv from "dotenv"

dotenv.config();
const PORT = process.env.PORT || 3001
const app = express();

app.use(express.json());

app.use(cors());

mongoose.connect(process.env.MONGO_URL)
  .then(() => {
    console.log("mongodb is connected")
  })
  .catch((e) => {
    console.log(e)
  })

const userSchema = new mongoose.Schema({
  email: String,
  password: String
})

const userModel = mongoose.model("users", userSchema)

app.get('/', (req, res) => {
  res.send("hello world")

})
app.post('/signup', (req, res) => {
  userModel.create(req.body)
    .then(users => res.json(users))
    .catch(err => res.json(err))
})

app.post('/login', (req, res) => {
  const { email, password } = req.body
  userModel.findOne({ email: email })
    .then(user => {
      if (user) {
        if (user.password === password) {
          res.json("success")
        }
        else {
          res.json("password is incorrect")
        }
      }
      else {
        res.json("No record exist")
      }
    })
})

app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`)
})
// mongoose.connect(process.env.MONGO_URL)
//   .then(() => {
//     console.log("connected mongodb")
//   })
//   .catch((error) => {
//     console.log(error)
//   })

// const userSchema = new mongoose.Schema({
//   email: {
//     type: String,
//     required: true,
//   },
//   password: {
//     type: String,
//     required: true,
//   }
// })

// const user = mongoose.model('users', userSchema)

// app.get("/", (req, res) => {
//   res.send("hello world")
// })


// app.post("/login", (req, res) => {
//   const { email, password } = req.body;
//   user.findOne({ email: email })
//     .then(user => {
//       if (user) {
//         if (user.password === password) {
//           res.json("Success")
//         } else {
//           res.json("Password is incorrect")
//         }
//       } else {
//         res.json("No record exist")
//       }

//     })

// })

// app.post("/submit", async (req, res) => {
//   const body = req.body;
//   if (
//     !body ||
//     !body.email ||
//     !body.password
//   ) {
//     return res.status(400).json({ msg: "all done" })
//   }

//   const result = await user.create({
//     email: body.email,
//     password: body.password,
//   })
//   console.log(result)
//   return res.status(201).json({ msg: "success" });
// });

// app.listen(PORT, () => {
//   console.log("server connected")
// })