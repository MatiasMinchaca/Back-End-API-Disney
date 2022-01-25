/* Requires */
const express = require('express');
const app = express();
const methodOverride = require('method-override');
const path = require('path');
const cors = require('cors');
const axios = require('axios')
/* PORT */
const port = 3001;

/* Routers */
const authRouter = require('./routers/authRouter');
const charactersRouter = require('./routers/charactersRouter');
const moviesRouter = require('./routers/moviesRouter');
const testRouter = require('./routers/testRouter');

/* MIDDLEWARES */
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, '../public')));
app.use(express.urlencoded({ extended : false })); 
app.use(cors())
app.use(express.json());
app.use(methodOverride('_method'));

/* Routes */
app.use('/auth', authRouter);
app.use('/characters', charactersRouter);
app.use('/movies', moviesRouter); 
app.use('/test', testRouter); 
app.use((req, res, next)=>{
    res.status(404).json(
        {
            error: 'The requested endpoint does not exist'
        }
    )
})

/* Server */
app.listen(port, () => {
    console.log(`server runnig in port ${port}\n http://localhost:${port}`)
})