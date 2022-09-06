const express = require("express")
const dotenv = require("dotenv")
dotenv.config()

// const { Sequelize, QueryTypes } = require('sequelize')
const { Sequelize, Model, DataTypes } = require('sequelize')
const app = express()

app.use(express.json())

const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false
    }
  },
});

class Note extends Model {}
Note.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  content: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  important: {
    type: DataTypes.BOOLEAN
  },
  date: {
    type: DataTypes.DATE
  }
}, {
  sequelize,
  underscored: true,
  timestamps: false,
  modelName: 'note'
})

Note.sync()

app.get('/api/notes', async (req, res) => {
    // using directly sql query that means not using model
//   const notes = await sequelize.query("SELECT * FROM notes", { type: QueryTypes.SELECT })

// with using model
const notes = await Note.findAll()
console.log(JSON.stringify(notes, null, 2))
  res.json(notes)
})

app.post('/api/notes', async (req, res) => {
    try {
      const note = await Note.create(req.body)
      return res.json(note)
    } catch(error) {
      return res.status(400).json({ error })
    }
})

app.get('/api/notes/:id', async (req, res) => {
  const note = await Note.findByPk(req.params.id)
  if (note) {
    // console.log(note.toJSON())
    res.json(note)
  } else {
    res.status(404).end()
  }
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})



