const router = require('express').Router();

const auth = require('../middlewares/auth');

const cors = require('../middlewares/cors');

const userRouter = require('./users');

const cardRouter = require('./cards');

const NotFoundError = require('../errors/NotFoundError');

const {
  createUser,
  login,
} = require('../controllers/users');

const {
  validateSignup,
  validateSignin,
} = require('../middlewares/validate');

const allowedCors = [
  'https://praktikum.tk',
  'http://praktikum.tk',
  'http://localhost:3000',
  'http://127.0.0.1:3000',
  'http://mesto.raznex.nomoredomains.rocks',
  'https://mesto.raznex.nomoredomains.rocks',
];

router.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

router.use(cors({
  origin: allowedCors,
  credentials: true,
}));

router.post('/signup', validateSignup, createUser);

router.post('/signin', validateSignin, login);

router.use(auth, userRouter);

router.use(auth, cardRouter);

router.use('*', (req, res, next) => {
  next(new NotFoundError('Такой страницы не существует'));
});

module.exports = router;
