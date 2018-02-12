const express = require('express');
const mysql = require('mysql');

// Create connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  database: 'citrus'
});

// connect
db.connect( (err) => {
  if(err){
    throw err;
  }
  console.log('Mysql Connected...');
});

const app = express();

// // create db
// app.get('/createdb', (req, res) => {
//   let sql = 'CREATE DATABASE nodemysql';
//   db.query(sql, (err, result) => {
//     if(err) throw err;
//     console.log(result);
//     res.send('Database created... woho');
//   });
// });
//
// // Create table
// app.get('/createpoststable', (req, res) => {
//   let sql = 'CREATE TABLE posts(id int AUTO_INCREMENT, title VARCHAR(255), body VARCHAR(255), PRIMARY KEY (id))';
//   db.query(sql, (err, result) => {
//     if(err) throw err;
//     console.log(result);
//     res.send('Posts table created...');
//   });
// });

// Insert post 1
// app.get('/addpost1', (req, res) => {
//   let post = {title: 'post one', body: 'This is post number one'};
//   let sql = 'INSERT INTO posts SET ?';
//   let query = db.query(sql, post, (err, result) => {
//     if(err) throw err;
//     console.log(result);
//     res.send('Post 1 added...');
//   });
// });
//
// app.get('/addpost2', (req, res) => {
//   let post = {title: 'post two', body: 'This is post number two'};
//   let sql = 'INSERT INTO posts SET ?';
//   let query = db.query(sql, post, (err, result) => {
//     if(err) throw err;
//     console.log(result);
//     res.send('Post 2 added...');
//   });
// });

//select posts
app.get('/getposts', (req, res) => {
  let sql = 'SELECT * FROM clues';
  let query = db.query(sql, (err, results) => {
    if(err) throw err;
    for(let vals of results){
    console.log(vals.clues_id);
    }
    res.send('Posts fetched...');
  });
});

// Select single post
app.get('/getpost/:id', (req, res) => {
  let sql = `SELECT * FROM played_match WHERE match_id = ${req.params.id}`;
  let query = db.query(sql, (err, result) => {
    if(err) throw err;
    if(result[0].isActive === 0){
      console.log('woops');
    }
    console.log(result);

    res.send('Post fetched');
  });
});

// Update post
app.get('/updatepost/:id', (req, res) => {
  let newTitle = "";
  let sql = `UPDATE posts SET title = '${newTitle}' WHERE id = ${req.params.id}`;
  let query = db.query(sql, (err, result) => {
    if(err) throw err;
    console.log(result);
    res.send('Post uppdated');
  });
});


// Delete post
app.get('/deletepost/:id', (req, res) => {
  let sql = `DELETE FROM posts WHERE id = ${req.params.id}`;
  let query = db.query(sql, (err, result) => {
    if(err) throw err;
    console.log(result);
    res.send('Post deleted');
  });
});

app.listen(8080, () => {
  console.log('Server start on port 8080');
});
