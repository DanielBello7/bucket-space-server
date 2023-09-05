import { _Request, _Response } from "@/global";

function handleNotFoundError(req: _Request, res: _Response) {
  return res.status(404).json({ msg: 'page not found' });
}

export default handleNotFoundError;
