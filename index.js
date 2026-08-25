import express from "express";
import cors from "cors";

const app = express();
const port = process.env.PORT || 8000;

app.use(cors());
app.use(express.json());

const posts = [];

app.get('/', (req, res) => {
    res.send(`Server is running on port ${port}`);
});

app.post("/posts", (req, res) => {
    const { title, content, author } = req.body;

    if (!title || title.length < 3)
        return res.status(400).json({ error: "Title must be at least 3 characters" });

    if (!content || content.length < 10)
        return res.status(400).json({ error: "Content must be at least 10 characters" });

    if (!author)
        return res.status(400).json({ error: "Author is required" });

    const post = { id: posts.length + 1, title, content, author, createdAt: new Date().toISOString() };
    posts.push(post);
    res.status(201).json({ message: "Blog post created successfully", post });
});


app.get("/posts/:id", (req, res) => {
    const post = posts.find(p => p.id === Number(req.params.id));
    if (!post)
        return res.status(404).json({ error: `Blog post with ID ${req.params.id} not found`, });
    res.json(post);
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});