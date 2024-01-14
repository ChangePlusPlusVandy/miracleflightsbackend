import type { Request, Response } from 'express';

export const pathParameterExample = async (req: Request, res: Response) => {
  const { name } = req.params;

  if (!name) return res.status(400).send('Name is required');

  res
    .status(418)
    .send(
      'I cant make coffee! Thanks for your request though, ' +
        name +
        +'. Great use of a path parameter!'
    );
};
