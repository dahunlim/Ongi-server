import { version } from '../../package.json';
import { Router } from 'express';
import sessionChecker from '../session-checker';
import event from './event';

export default ({config, db, passport}) => {
  let api = Router();

  // perhaps expose some API metadata at the root
  api.get('/', sessionChecker(), (req, res) => {
    res.json({version});
  });

  api.post('/login', passport.authenticate('local'), (req, res) => {
    res.sendStatus(200);
  });

  api.use('/event', event({ config, db }));

  return api;
};
  