var express = require("express");
var router = express.Router();
const usermodel = require("../model/userschema");

/* GET home page. */
//  http://localhost:3000/create
/*
{
    "id":"002",
    "title":"laptop",
    "deacription":"best for study",
    "price":"50000",
    "discount":"3%",
    "rating":"4.0",
    "stock":"9",
    "brand":"HP",
    "category":"study",
    "thumbnail":"hp_pavillion",
    "images":"more_images"
}
*/



// Search All Product
//URL: http://localhost:3000/add_products
router.post("/add_products", async function (req, res, next) {

  var obj = {
    id: req.body.id,
    title: req.body.title,
    description: req.body.description,
    price: req.body.price,
    discount: req.body.discount,
    rating: req.body.rating,
    stock: req.body.stock,
    brand: req.body.brand,
    category: req.body.category,
    thumbnail: req.body.thumbnail,
    images: req.body.images,
  };
  var data = await usermodel.create(obj);
  res.status(201).json({
    status: "Data Insert Successfully",
    data,
  });
});

// Search All Product
//URL: http://localhost:3000/getall/products
router.post("/getall/products", async function (req, res) {
  var products = await usermodel.find();

  res.status(201).json({
    status: "success",
    products,
  });
});

//BASIC SEARCH DATA     WITHOUT PAGINATION
//URL: http://localhost:3000/particular/search?title=laptop
router.get("/particular/search", async function (req, res) {
  var srch_name = req.query;
  var search = await usermodel.find(srch_name);
  res.status(201).json({
    status: "success",
    search,
  });
});

//BASIC SEARCH DATA      WITH PAGINATION
// URL: http://localhost:3000/pagination/search?title=laptop&page=1&limit=2
router.get("/pagination/search", async function (req, res) {
  var srch_name = req.query;
  var { page, limit } = req.query;

  if (!page) page = 1;
  if (!limit) limit = 10;

  const skip = (page - 1) * limit;
  const searchData = await usermodel.find(srch_name).limit(limit).skip(skip);
  const TotalFoundData = await usermodel.find(srch_name).countDocuments();
  res.status(201).json({
    status: "success",
    page: page,
    limit: limit,
    TotalFoundData,
    searchData,
  });
});

// UPDATE products
// URL:   http://localhost:3000/product/update?title=laptop&update_title=mobile&id=1
router.get("/product/update", async function (req, res) {
  var id = req.query.id;
  var title = req.query.title;
  var update_title = req.query.update_title;
  console.log(id, title, update_title);

  var id_check = await usermodel.find({ id: id });

  if (id_check) {
    var oldvalue = { title: title };
    var newvalue = { title: update_title };
    usermodel.updateOne(oldvalue, newvalue, function (err, result) {
      if (err) throw err;
      res.send("Update title Successfully");
    });
  } else {
    res.send("id note found");
  }
});

// Delete products
// URL:   http://localhost:3000/product/delete?id=3
router.get("/product/delete", async function (req, res) {
  var D_id = req.query.id;
  console.log(D_id);

  usermodel.deleteOne({ id: D_id }, function (err, result) {
    res.status(201).json({
      D_id,
      msg: "Deleted",
    });
  });
});

module.exports = router;
