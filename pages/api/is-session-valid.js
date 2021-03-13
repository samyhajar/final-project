import { NextApiRequest, NextApiResponse } from 'next';
import { getSessionByToken } from '../../util/database';

export default async function handler(req, res) {
  const isSessionValid = Boolean(
    (await getSessionByToken(req.cookies.session))?.userId,
  );
  res.send({ isSessionValid: isSessionValid });
}
