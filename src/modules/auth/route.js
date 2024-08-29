const exporess = require("express");
const response = require("../../red/response");
const controller = require("./index");

const router = exporess.Router();

router.get("/login", login);

async function login(req, res, next) {
  try {
    const token = await controller.login(req.body.user, req.body.password);
    response.success(req, res, token, 200);
  } catch (err) {
    next(err);
  }
}

module.exports = router;
