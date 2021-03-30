exports.up = async (sql) => {
  await sql`
    CREATE TABLE statuses (
      id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
      title VARCHAR(20)
    )
  `;
};

exports.down = async (sql) => {
  await sql`
    DROP TABLE statuses
  `;
};
