import { NextApiRequest, NextApiResponse } from 'next';
import { getDocumentbyuserId } from '../../util/database';
import {
  createDocument,
  getSessionByToken,
  getUserIdFromSessionToken,
  createStatus,
  getStatusPendingById,
} from '../../util/database';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    const documents = await getDocumentbyuserId();
    res.json({ documents: documents });
    console.log(documents);

    // const status = await getStatusPendingById();
    // res.json({ status: status });
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

    // const order = await createStatus(
    //   req.body.statusId,
    //   req.body.documentId,
    //   req.body.stripeSessionsId,
    // );
    // res.json(order);
  }
}
