const NoteController = require("../controllers/controller.notes");

const router = require("express").Router();

router.route("/").get(NoteController.list).post(NoteController.store);
router.route("/:id").delete(NoteController.destroy);
router.route("/:id").put(NoteController.update);

module.exports = router;
