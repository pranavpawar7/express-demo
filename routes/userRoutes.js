const express = require("express")
const router = express.Router()
const db = require("../config/db")

router.post("hey-api", (req, res) => {})
router.post("hey-apiii", (req, res) => {})

router.post("/user-type-list", (req, res) => {
	const query = `
    SELECT SQL_CALC_FOUND_ROWS * FROM users;
    SELECT FOUND_ROWS() AS total_records;
  `

	db.query(query, (err, results) => {
		if (err) return res.status(500).json({ success: 0, message: err.message })

		const userTypes = results[0]
		const total = results[1][0].total_records

		const list = userTypes.map((type) => {
			const date = new Date(type.created_at * 1000) // If timestamp in seconds
			const formattedDate = date
				.toLocaleString("en-GB", {
					day: "2-digit",
					month: "short",
					year: "numeric",
				})
				.replace(" ", " ")
				.replace(",", ",") // To ensure format like 20 Jun, 2025
			return {
				id: type.id,
				name: type.name,
				created_at_formated: formattedDate,
			}
		})

		res.json({
			success: 1,
			message: `${total} types found`,
			list,
			total_records: total,
		})
	})
})

router.post("/user-insert", (req, res) => {
	const { name } = req.body

	if (!name) {
		return res.json({ success: 0, message: "Name is required" })
	}

	const created_at = Math.floor(Date.now() / 1000) // Unix timestamp

	const sql = `INSERT INTO users (name, created_at) VALUES (?, ?)`

	db.query(sql, [name, created_at], (err, result) => {
		if (err) {
			return res.status(500).json({ success: 0, message: err.message })
		}

		res.json({
			success: 1,
			message: "User inserted successfully",
			inserted_id: result.insertId,
			created_at,
		})
	})
})
module.exports = router


// hello
// hi