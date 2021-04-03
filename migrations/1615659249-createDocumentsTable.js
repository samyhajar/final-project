exports.up = async (sql) => {
  await sql`
		CREATE TABLE documents(
		id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  	name VARCHAR(100),
		address VARCHAR(100),
		optionalAddress VARChAR(100),
		ort VARCHAR(50),
		plz INT,
		staat VARCHAR(50),
		sender VARCHAR(200),
		recipient VARCHAR(200),
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
