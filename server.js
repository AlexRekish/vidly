const express = require(`express`);
const app = express();
const genres = require('./routes/genres');
const helmet = require('helmet');


app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static(`public`));
app.use(helmet());
app.use(`/api/genres`, genres);


app.listen(3502, () => {
  console.log(`listening on port 3502...`);
});
