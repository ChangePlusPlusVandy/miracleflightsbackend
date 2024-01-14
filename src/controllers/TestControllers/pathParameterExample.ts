import type { Request, Response } from 'express';

export const pathParameterExample = async (req: Request, res: Response) => {
  const { value } = req.params;

  if (!value) return res.status(400).send('Name is required');

  res
    .status(418)
    .send(
      'I cant make coffee! Thanks for your request though, ' +
        value +
        '. Great use of a path parameter!'
    );
};
