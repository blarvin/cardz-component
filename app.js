const express = require("express");
const app = express();
const port = 3001;

app.use(express.static("public"));

app.set("view engine", "ejs");

// app.get("/", (req, res) => {
//   res.render("index", (err) => {
//     if (err) {
//       console.log(err);
//       return res.status(500).send("Error rendering view.");
//     }
//   });
// });

app.get('/', (req, res, next) => {

  res.render('index', (err, html) => {

    if(err) {
      return next(err); 
    }

    res.send(html);

  });

});

// Error handling middleware
app.use((err, req, res, next) => {
  
  console.log(err); 
  res.status(500).send('Error rendering view');

})



// app.get('/', (req, res) => {
//   res.render('index');
// });


app.listen(port, (err) => {
  if (err) {
    console.error("Failed to start server:", err);
    return;
  }
  console.log(`Server running at http://localhost:${port}`);
});
