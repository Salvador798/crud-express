const exporess = require("express");
const response = require("../../red/response");
const controller = require("./index");

const router = exporess.Router();

router.get("/", all);
router.get("/:id", one);
router.post("/", added);
router.put("/", deleted);

async function all(req, res, next) {
  try {
    const items = await controller.all();
    response.success(req, res, items, 200);
  } catch (err) {
    next(err);
  }
}

async function one(req, res, next) {
  try {
    const items = await controller.one(req.params.id);
    response.success(req, res, items, 200);
  } catch (err) {
    next(err);
  }
}

async function added(req, res, next) {
  try {
    const items = await controller.added(req.body);
    if (req.body.id == 0) {
      message = "Saved Item";
    } else {
      message = "Updated Item";
    }
    response.success(req, res, message, 201);
  } catch (err) {
    next(err);
  }
}

async function deleted(req, res, next) {
  try {
    const items = await controller.deleted(req.body);
    response.success(req, res, "Item removed", 200);
  } catch (err) {
    next(err);
  }
}

module.exports = router;
