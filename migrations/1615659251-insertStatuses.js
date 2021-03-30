const statuses = [
  { title: 'Pending' },
  { title: 'Successful' },
  { title: 'Rejected' },
];

exports.up = async (sql) => {
  await sql`
	INSERT INTO statuses
	${sql(statuses, 'title')}
	`;
};

exports.down = async (sql) => {
  await sql`
		DELETE FROM
		statuses
		`;
};
