const router = require("express").Router();
const { Tag, Product, ProductTag } = require("../../models");

// The `/api/tags` endpoint

router.get("/", async (req, res) => {
  const tags = await Tag.findAll({
    include: [{ model: Product, through: ProductTag }],
  });
  res.status(200).json(tags);
});

router.get("/:id", async (req, res) => {
  try {
    const tags = await Tag.findByPk(req.params.id, {
      include: [{ model: Product, through: ProductTag }],
    });
    if (!tags) {
      res.status(404).json({ message: "No existing tag matches this ID" });
      return;
    }
    res.status(200).json(tags);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post("/", async (req, res) => {
  // create a new tag
  try {
    const tags = await Tag.create(req.body);
    res.status(200).json(tags);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.put("/:id", async (req, res) => {
  try {
    const newTag = await Tag.update(req.body, { where: { id: req.params.id } });
    res.status(200).json(newTag);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete("/:id", async (req, res) => {
  // delete on tag by its `id` value
  try {
    const deleteTags = Tag.destroy({ where: { id: req.params.id } });
    res.status(200).json(deleteTags);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
