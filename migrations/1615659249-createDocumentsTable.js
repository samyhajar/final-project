exports.up = async (sql) => {
  await sql`
		CREATE TABLE documents(
		id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  	name VARCHAR(50),
		address VARCHAR(50),
		optionalAddress VARChAR(50),
		ort VARCHAR(50),
		plz INT,
		staat VARCHAR(50),
		sender VARCHAR(50),
		recipient VARCHAR(50),
		date DATE,
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
