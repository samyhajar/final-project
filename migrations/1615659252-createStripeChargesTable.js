exports.up = async (sql) => {
  await sql`
    CREATE TABLE stripe_charges (
      id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
      status_id INT REFERENCES statuses (id),
			document_id INT REFERENCES documents (id),
			stripe_sessions_id VARCHAR(75)
    )
  `;
};

exports.down = async (sql) => {
  await sql`
    DROP TABLE stripe_charges
  `;
};
