import { NextApiRequest, NextApiResponse } from 'next';
import { getSessionByToken, getUserById } from '../../util/database';

export default async function handler(req, res) {
  const userId = (await getSessionByToken(req.cookies.session))?.userId;

  const isSessionValid = Boolean(userId);
  const userName = (await getUserById(userId))?.userName;
  const name = isSessionValid ? userName : '';
  res.send({ isSessionValid: isSessionValid, userName: name });
}
