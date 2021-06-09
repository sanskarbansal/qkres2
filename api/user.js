const router = require("express").Router();
const db = require("../connection");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

function calculate_age(dob) {
    dob = new Date(dob);
    var diff_ms = Date.now() - dob.getTime();
    var age_dt = new Date(diff_ms);

    return Math.abs(age_dt.getUTCFullYear() - 1970);
}

router.post("/register", (req, res) => {
    const { username, email, password, firstName, lastName } = req.body;
    if (!username || !email || !password || !lastName) return res.status(404).json({ error: "Please provide all the details" });
    db.query("SELECT * FROM users WHERE email = ? or username = ?  ", [email, username], async (err, results) => {
        if (err) return res.json("error while fetching user");
        if (results.length > 0) {
            return res.status(409).json({
                error: "User already exists",
            });
        }
        let hashedPass = await bcrypt.hash(password, 8);
        db.query("INSERT INTO users SET ? ", { name: `${firstName} ${lastName}`, username: username, email: email, password: hashedPass });
        return res.json({ message: "User created successfully" });
    });
});

router.post("/login", async (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) return res.status(404).json({ error: "Please provide all the details" });
    const query = "SELECT * FROM users WHERE username = ?";
    db.query(query, [username], async (err, results) => {
        if (results.length == 0) return res.status(403).json({ error: "Wrong username/password" });

        let flag = await bcrypt.compare(password, results[0].password);
        if (flag) {
            let { username, email, name, dob, age, address } = results[0];
            if (dob) dob = JSON.stringify(dob).split("T")[0].substr(1);
            const token = jwt.sign(JSON.stringify({ username, email, name, dob, age, address }), process.env.SECRETE_KEY);
            return res.status(200).json({
                token,
            });
        }
        return res.status(403).json({ error: "Wrong username/password" });
    });
});

router.post("/update", (req, res) => {
    const { username, address, dob, token } = req.body;
    const age = calculate_age(dob);
    const user = jwt.verify(token, process.env.SECRETE_KEY);
    if (user.username !== username) return res.status(403).json({ error: "You are not permitted to do this." });
    const query = "UPDATE users SET address = ?, dob = ?, age = ? where username = ?";
    db.query(query, [address, dob, age, username], async (err) => {
        if (err) {
            return res.status(404).json({
                error: "Error while updating.",
            });
        }
        const token = jwt.sign(JSON.stringify({ ...user, dob, address, age }), process.env.SECRETE_KEY);
        return res.status(200).json({
            token,
        });
    });
});
module.exports = router;
