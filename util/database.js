import { generateToken } from './sessions';
import camelcaseKeys from 'camelcase-keys';
import postgres from 'postgres';

require('dotenv-safe').config();

const sql = postgres(
  'postgres://finalproject:finalproject@localhost:5432/finalproject',
);

function camelcaseRecords(records) {
  return records.map((record) => camelcaseKeys(record));
}

export async function getUsers() {
  const users = await sql`
    SELECT * FROM users
  `;

  return camelcaseRecords(users);
}

export async function getTeamMemberById(id) {
  const users = await sql`
    SELECT
      *
    FROM
      users
    WHERE
      id = ${id}
  `;

  return camelcaseRecords(users)[0];
}

export async function createUsers(firstName, lastName) {
  const users = await sql`
    INSERT INTO users
      (first_name, last_name)
    VALUES
      (${firstName}, ${lastName})
    RETURNING *
  `;

  return camelcaseRecords(users)[0];
}

export async function updateUserFirstNameById(id, firstName) {
  const users = await sql`
    UPDATE
      users
    SET
      first_name = ${firstName}
    WHERE
      id = ${id}
    RETURNING *
  `;

  return camelcaseRecords(users)[0];
}

export async function deleteUserById(id) {
  const users = await sql`
    DELETE FROM
      users
    WHERE
      id = ${id}
    RETURNING *
  `;

  return camelcaseRecords(users)[0];
}

export async function createSessionWithFiveMinuteExpiry() {
  const token = generateToken();

  const sessions = await sql`
    INSERT INTO sessions
      (token, expiry)
    VALUES
      (${token}, NOW() + INTERVAL '5 minutes')
    RETURNING *
  `;

  return camelcaseRecords(sessions)[0];
}

export async function createSessionByUserId(userId) {
  const token = generateToken();

  const sessions = await sql`
    INSERT INTO sessions
      (token, user_id)
    VALUES
      (${token}, ${userId})
    RETURNING *
  `;

  return camelcaseRecords(sessions)[0];
}

export async function deleteSessionById(id) {
  const sessions = await sql`
    DELETE FROM
      sessions
    WHERE
      id = ${id}
    RETURNING *
  `;
  return camelcaseRecords(sessions)[0];
}
export async function deleteAllExpiredSessions() {
  const sessions = await sql`
    DELETE FROM
      sessions
    WHERE
      expiry < NOW()
    RETURNING *
  `;
  return camelcaseRecords(sessions)[0];
}

export async function getSessionByToken(sessionToken) {
  if (!sessionToken) {
    return undefined;
  }

  const sessions = await sql`
    SELECT
      *
    FROM
      sessions
    WHERE
      token = ${sessionToken} AND
      expiry > NOW()
  `;
  return camelcaseRecords(sessions)[0];
}

export async function isSessionTokenNotExpired(sessionToken) {
  const sessions = await sql`
    SELECT
      *
    FROM
      sessions
    WHERE
      token = ${sessionToken} AND
      expiry > NOW()
  `;
  return sessions.length > 0;
}

export async function deleteSessionByToken(token) {
  const sessions = await sql`
    DELETE FROM
      sessions
    WHERE
      token = ${token}
    RETURNING *
  `;
  return camelcaseRecords(sessions)[0];
}

export async function getUserById(id) {
  const users = await sql`
    SELECT
      id,
      username
    FROM
      users
    WHERE
      id = ${id}
  `;
  return camelcaseRecords(users)[0];
}

export async function getUserByUsername(username) {
  const users = await sql`
    SELECT
      username
    FROM
      users
    WHERE
      username = ${username}
  `;
  return camelcaseRecords(users)[0];
}

export async function getUserWithHashedPasswordByUsername(username) {
  const users = await sql`
    SELECT
      *
    FROM
      users
    WHERE
      username = ${username}
  `;
  return camelcaseRecords(users)[0];
}

export async function createUser(username, passwordHash) {
  const users = await sql`
    INSERT INTO users
      (username, password_hash)
    VALUES
      (${username}, ${passwordHash})
    RETURNING id, username
  `;
  return camelcaseRecords(users)[0];
}

// SQL Join
// Get information from multiple tables
// export async function getTeamMemberWithRoleById(id) {
//   const teamMembers = await sql`
//     SELECT
//       users.id as team_member_id,
//       users.first_name as first_name,
//       users.last_name as last_name,
//     FROM
//       team_members,
//       roles
//     WHERE
//       team_members.id = ${id} AND
//       team_members.role_id = roles.id
//   `;

//   return camelcaseRecords(teamMembers)[0];
// }
