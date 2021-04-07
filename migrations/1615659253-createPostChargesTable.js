exports.up = async (sql) => {
  await sql`
    CREATE TABLE post_charges (
      id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
      status_id INT REFERENCES statuses (id),
			document_id INT REFERENCES documents (id)
    )
  `;
};

exports.down = async (sql) => {
  await sql`
    DROP TABLE post_charges
  `;
};
