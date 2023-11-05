const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', (req, res) => {
  // find all categories
  try {
    const getCategories = await Category.findAll({
      include: [
        {
          model: Product,
          required: true,
        },
      ],
    });
    res.json(getCategories);
  } catch(error) {
    res.status(400).json({error: error.message});
  }
});

router.get('/:id', (req, res) => {
  // find one category by its `id` value
  try {
    const { id } = req. params; 
    const getCategory = await Category.findByPk (id, {
      include: [Product],
    });
    if (getCategory) {
      res.json (getCategory);
    } else {
      res.status(404).json({ error: "Record not found" });
      }
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
});

router.post('/', (req, res) => {
  try {
    const newCategory = await Category.create(req.body);
      res.status(201).json(newCategory);
    } catch (error) {
      res.status(400).json({ error: error.message });
  }
});

router.put('/:id', (req, res) => {
  try {
    const { id } = req.params;
    const [updateCategory] = await Category.update(req.body, {where: { id }});
    if (updateCategory === 1) {
      res.json({ message: "Record updated successfully" });
      } else {
        res.status(404).json({ error: "Record not found" });
      }
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
});
  
router.delete('/:id', (req, res) => {
 try {
  const { id } = req.params;
  const deleteCategory = await Category.destroy({ where: { id }});
  if (deleteCategory === 1) {
    res.json({ message: "Record deleted successfully" });
      } else {
        res.status(404).json({ error: "Record not found" });
      }
    } catch (error) {
      res.status(400).json({ error: error.message });
  }
 });

module.exports = router;
