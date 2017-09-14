var express = require('express');
var graphqlHTTP = require('express-graphql');
var { buildSchema } = require('graphql');
var fs = require('fs');
var bodyParser = require('body-parser');
var http = require('http');
var path = require('path');

// Construct a schema, using GraphQL schema language
var Schema = buildSchema(`
type Query {
  id(num: Int): Int
  title(num: Int): String
  list(num: Int, arrNum: Int): [Int]
  rating(num: Int): Int
}
`);
// get json from file
var dataJSON = JSON.parse(fs.readFileSync('./sorce.json', 'utf8'));
// The root provides a resolver function for each API endpoint
var root = {
    id: (arg) =>{
        return dataJSON.cars[arg.num].id
    },
    title: (arg)=>{
        return dataJSON.cars[arg.num].title
    },
    list: (arg, argArr)=>{
        // console.log(argArr)
        return dataJSON.cars[arg.num].list
    },
    rating: (arg)=>{
        return dataJSON.cars[arg.num].rating
    }
};
// console.log(dataJSON);
var app = express();
app.use('/graphql', graphqlHTTP({
  schema: Schema,
  rootValue: root,
  graphiql: true,
}));

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));
// Redirect all non api requests to the index
app.get('*', function(req, res) {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
  });
app.listen(4000);
console.log('Running a GraphQL API server at localhost:4000/graphql - use this URL to use GraphiQL');
console.log('Application root URL localhost:4000 - use this URL to enter application');