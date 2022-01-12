const router = express.Router();
import express, { NextFunction, Response, Request } from 'express';

/* GET home page. */
router.get('/', function(req: Request, res: Response, next: NextFunction) {
  res.render('index', { title: 'Express' });
});

export default router;

