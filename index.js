import express from "express";
import multer from "multer";
import path from "path";

const app = express();
const port = 8000;

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const ext = path.extname(file.originalname);
    cb(null, file.fieldname + "-" + uniqueSuffix + ext);
  },
});

const upload = multer({ storage });

app.get("/", (req, res) => {
  return res.render("homepage");
});

app.post("/upload", upload.single("randomImageUpload"), (req, res) => {
  console.log(req.body);
  console.log(req.file);

  return res.render("homepage", { success: "File uploaded successfully!" });
});

app.listen(port, () => {
  console.log(`server started at port : ${port}`);
});
