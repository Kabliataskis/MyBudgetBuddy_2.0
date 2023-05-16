const Category = require("../models/categoryModel");
const Expense = require("../models/expenseModel");
const {saveAction} = require("./actionController");


exports.getAllCategories = async (req, res) => {
  const {limit = 0} = req.query;
  try {
    const allCategories = await Category.find()
    .sort({ createdAt: -1 })
    .limit(limit);

    res.status(200).json({
      status: "success",
      results: allCategories.length,
      data: {
        categories: allCategories,
      },
    });
  } catch (err) {
    res.status(500).json({
      status: "error",
      message: err.message,
    });
  }
};

exports.getCategory = async (req, res) => {
  try {
    const GetCategory = await Category.findById(req.params.id);
    if (!GetCategory) {
      return res.status(404).json({ msg: `Kategorija nr: ${id} neegzistuoja`});
    } else {
        res.status(200).json(GetCategory);
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
  
};


exports.addCategory = async (req, res) => {
  try {
    const isCategoryExist = await Category.findOne({title: req.body.title});
    if(isCategoryExist){
        return res.status(404).json({ msg: `Kategorija su tokiu pavadinimu jau egzistuoja`});
    }else{
        const newCategory = await Category.create({
            title: req.body.title,
            imgSrc: req.body.imgSrc,
        });
        await saveAction(req.userInfo.id, 'category_add', newCategory);
        res.status(201).json(newCategory);
    }

  } catch (err) {
    console.log(err);
    res.status(500).json({ mess: err });
  }
};

exports.deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const Delete_Category = await Category.findById(id);
    if (!Delete_Category) {
      return res.status(404).json({ msg: `Kategorija nr: ${id} neegzistuoja`});
    } else {
        const isCategoryUsed = await Expense.findOne({category: id});
        if(isCategoryUsed){
            return res.status(404).json({ msg: `Kategorija nr: ${id} naudojama vartotojų.`});
        }else{
            try{
                const delete_ = await Category.findByIdAndDelete(id);
                res.status(200).json({
                  status: "success",
                  message: `Kategorija nr: ${id} sėkmingai pašalinta.`,
                  category: Delete_Category,
                });
                await saveAction(req.userInfo.id, 'category_delete', Delete_Category);
              }catch (error){
                res.status(500).json({ error: error.message });
              }
        }

      }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.editCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const Edit_Category = await Category.findById(id);
    if (!Edit_Category) {
      return res.status(404).json({ msg: `Kategorija nr: ${id} neegzistuoja`});
    } else {

        try{
          const Updated_Category = await Category.findOneAndUpdate({
                  _id: id,
                },{
                  title: req.body.title,
                  imgSrc: req.body.imgSrc,
                },  { new: true }
                );
                await saveAction(req.userInfo.id, 'category_edit', Updated_Category);
                res.json({
                  status: "success",
                  data: Updated_Category
                })
        }catch (error){
          res.status(500).json({ error: error.message });
        }
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
