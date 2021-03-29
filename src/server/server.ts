import * as express from 'express';
import Router from './routes/';
import * as passport from 'passport';
import './middleware/localstrategy';
import './middleware/bearerstrategy';


const app = express();


app.use(express.static('public'));
app.use(express.json());
app.use(passport.initialize())

app.use(Router);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server listening on port: ${port}`));
