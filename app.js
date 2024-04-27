const express = require("express");
const app = express();
const port = 3001;

app.use(express.static("public"));

app.set("view engine", "ejs");

app.get("/", (req, res) => {
  res.render("index", (err, html) => {
    if (err) {
      console.error("Error rendering index page:", err);
      return res.status(500).send("An error occurred rendering the page");
    }
    res.send(html);
  });
});

app.listen(port, (err) => {
  if (err) {
    console.error("Failed to start server:", err);
    return;
  }
  console.log(`Server running at http://localhost:${port}`);
});
