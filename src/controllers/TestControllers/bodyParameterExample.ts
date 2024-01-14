import type { Request, Response } from 'express';

export const bodyParameterExample = async (req: Request, res: Response) => {
  const { name } = req.body;

  if (!name) return res.status(400).send('Name is required');

  res
    .status(418)
    .send(
      'I cant make coffee! Thanks for your request though, ' +
        name +
        +'. Great use of a body parameter!'
    );
};
