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
		date DATE,
		recipientName VARCHAR(100),
		recipientAddress VARCHAR(100),
		recipientOptionalAddress VARCHAR(100),
		recipientOrt VARCHAR(100),
		recipientPlz INT,
		recipientStaat VARCHAR(100),
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
