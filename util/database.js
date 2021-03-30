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
      username as user_name
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

export async function createDocument(
  name,
  address,
  optionalAddress,
  ort,
  plz,
  staat,
  sender,
  recipient,
  date,
  body,
  user_id,
) {
  const documents = await sql`
    INSERT INTO documents
      (name, address, optionalAddress, ort, plz, staat, sender, recipient, date, body, user_id)
    VALUES
    (${name}, ${address}, ${optionalAddress}, ${ort}, ${plz}, ${staat}, ${sender} ,${recipient}, ${date}, ${body}, ${user_id})
    RETURNING *
  `;
  return camelcaseRecords(documents)[0];
}

export async function getUserIdFromSessionToken(token) {
  const userId = await sql`
    SELECT
      user_id
    FROM
      sessions
    WHERE
      token = ${token}
  `;

  return camelcaseRecords(userId)[0];
}

export async function getDocumentbyuserId(user_id) {
  const documentsInfo = sql`
    SELECT
     *
     FROM
    documents
  `;
  return documentsInfo;
}
