// routes changes
const express = require("express");
const router = express.Router();
const db = require("../config/db");

router.post("/user-list", (req, res) => {
    const { id } = req.body;

    let query = "";
    let values = [];

    if (id && id !== "") {
        query = `SELECT * FROM users WHERE id = ?`;
        values = [id];
    } else {
        query = `
            SELECT SQL_CALC_FOUND_ROWS * FROM users;
            SELECT FOUND_ROWS() AS total_records;
        `;
    }

    db.query(query, values, (err, results) => {
        if (err) return res.status(500).json({ success: 0, message: err.message });

        if (id && id !== "") {
            const user = results[0];

            if (!user) {
                return res.json({ success: 0, message: "User not found" });
            }

            const date = new Date(user.created_at * 1000);
            const formattedDate = date.toLocaleString("en-GB", {
                day: "2-digit",
                month: "short",
                year: "numeric",
            });

            return res.json({
                success: 1,
                message: "User details found",
                data: {
                    id: user.id,
                    name: user.name,
                    created_at_formated: formattedDate,
                },
            });
        } else {
            const userList = results[0].map((user) => {
                const date = new Date(user.created_at * 1000);
                const formattedDate = date.toLocaleString("en-GB", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                });

                return {
                    id: user.id,
                    name: user.name,
                    created_at_formated: formattedDate,
                };
            });

            const total = results[1][0].total_records;

            return res.json({
                success: 1,
                message: `${total} users found`,
                list: userList,
                total_records: total,
            });
        }
    });
});

router.post("/user-insert", (req, res) => {
    const { name, id } = req.body;

    if (!name) {
        return res.json({ success: 0, message: "Name is required" });
    }

    let sql = "";
    const created_at = Math.floor(Date.now() / 1000); // Unix timestamp
    let values = [];

    if (id && id != "") {
        sql = `UPDATE users SET name = ?, updated_at = ? WHERE id = ?`;
        values = [name, created_at, id];
    } else {
        sql = `INSERT INTO users (name, created_at) VALUES (?, ?)`;
        values = [name, created_at];
    }

    db.query(sql, values, (err, result) => {
        if (err) {
            return res.status(500).json({ success: 0, message: err.message });
        }

        res.json({
            success: 1,
            message: id ? "User updated successfully" : "User inserted successfully",
            inserted_id: result.insertId || id,
            created_at,
        });
    });
});

module.exports = router;

[
    [],
    [
        [
            {
                total_record: 20,
            },
        ],
    ],
];
