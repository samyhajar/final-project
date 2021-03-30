import { NextApiRequest, NextApiResponse } from 'next';
import { getDocumentbyuserId } from '../../util/database';
import {
  createDocument,
  getSessionByToken,
  getUserIdFromSessionToken,
} from '../../util/database';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    const documents = await getDocumentbyuserId();
    res.json({ documents: documents });
    console.log(documents);
  }

  if (req.method === 'POST') {
    const user = await getUserIdFromSessionToken(req.cookies.session);

    const document = await createDocument(
      req.body.name,
      req.body.address,
      req.body.optionalAddress,
      req.body.ort,
      req.body.plz,
      req.body.staat,
      req.body.sender,
      req.body.recipient,
      req.body.date,
      req.body.body,
      user.userId,
    );
    res.json(document);
  }
}
