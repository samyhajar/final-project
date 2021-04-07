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

    console.log('####', req.body);
    const document = await createDocument(
      req.body.sender.name,
      req.body.sender.address,
      req.body.sender.optionalAddress,
      req.body.sender.ort,
      req.body.sender.plz,
      req.body.sender.staat,
      req.body.date,
      req.body.body,
      user.userId,
      req.body.recipient.name,
      req.body.recipient.address,
      req.body.recipient.optionalAddress,
      req.body.recipient.ort,
      req.body.plz,
      req.body.staat,
    );
    res.json(document);
  }
}
