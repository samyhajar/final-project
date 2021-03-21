exports.up = async (sql) => {
  await sql`
		CREATE TABLE documents(
		id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  	vor_nachname VARCHAR(50),
		addresse VARCHAR(50),
		door_block VARChAR(50),
		ort VARCHAR(50),
		plz INT,
		recipient VARCHAR(50),
		date Date,
		body TEXT,
		user_id INT NOT NULL REFERENCES users(id)
		);
	`;
};

exports.down = async (sql) => {
  await sql`
	DROP TABLE documents
	`;
};
