import type { Request, Response } from 'express';

export const queryParameterExample = async (req: Request, res: Response) => {
  const { name } = req.query;
  if (!name) return res.status(400).send('Name is required');

  res
    .status(418)
    .send(
      'I cant make coffee! Thanks for your request though, ' +
        req.query.name +
        '. Great use of a query parameter!'
    );
};
