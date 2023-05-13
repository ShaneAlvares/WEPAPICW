var express = require("express");
const app = express();
var router = express.Router();
// var path = require('path');
// const bodyParser = require('body-parser');
const mongoose = require("mongoose");

app.set("view engine", "ejs");
app.use(express.json());

// Connect to MongoDB
// mongoose.connect('mongodb+srv://apiwebcw:W4ZPk1AWIGmrR8zZ@holidaycentral.7bwifhs.mongodb.net/HolidayCentral', { useNewUrlParser: true, useUnifiedTopology: true });
// const db = mongoose.connection;
// db.on('error', console.error.bind(console, 'connection error:'));
// db.once('open', function() {
//   console.log('Connected to the database');
// });

// Define a schema for the Package model
const packageSchema = new mongoose.Schema(
  {
    name: String,
    description: String,
    destination: String,
    duration: Number,
    capacity: Number,
    specialty: String,
    price: Number,
    rating: Number,
    hotel_id: String,
    imgPath: String,
  },
  { timestamps: true, versionKey: false }
);

const checkoutPackageSchema = new mongoose.Schema(
  {
    packageId: String,
    fullName: String,
    email: String,
    phone: String,
    numPersons: Number,
    startDate: Date,
    endDate: Date
   
   
  },{ timestamps: true, versionKey: false });


// Create a Mongoose model for the Package schema
const Package = mongoose.model("Package", packageSchema);
const CheckoutPackage = mongoose.model('checkoutPackage', checkoutPackageSchema);

// Define API endpoints

// GET /packages/:id: Get a specific package by ID
router.get("/:id", async (req, res) => {
  try {
    const package = await Package.findById(req.params.id);
    if (package) {
      res.json(package);
    } else {
      res.status(404).json({ error: "Package not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// POST /packages: Create a new package
router.post("/", async (req, res) => {
  try {
    const package = new Package(req.body);
    console.log(req.body);
    const savedPackage = await package.save();
    res.json(savedPackage);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// PUT /packages/:id: Update an existing package
router.put("/:id", async (req, res) => {
  try {
    const package = await Package.findById(req.params.id);
    if (package) {
      package.set(req.body);
      const savedPackage = await package.save();
      //   res.json(savedPackage);
      res.status(200).json({ message: "Package Update Sucessfuly" });
    } else {
      res.status(404).json({ error: "Package not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Search for packages
router.get("/", async (req, res) => {
  const { destination, duration, specialty, capacity, rating } = req.query;

  const query = Package.find();

  if (destination) {
    query.where("destination").equals(destination);
  }

  if (duration) {
    query.where("duration").equals(duration);
  }

  if (specialty) {
    query.where("specialty").equals(specialty);
  }

  if (capacity) {
    query.where("capacity").lte(capacity);
  }

  if (rating) {
    query.where("rating").gte(rating);
  }

  const results = await query.exec();

  res.json(results);
});

// DELETE /packages/:id: Delete an existing package
router.delete("/:id", async (req, res) => {
  try {
    const package = await Package.findById(req.params.id);
    if (package) {
      await package.remove();
      res.json({ message: "Package deleted" });
    } else {
      res.status(404).json({ error: "Package not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// POST /cart: Add a package to the cart
router.post("/cart", async (req, res) => {
  try {
    const package = await Package.findById(req.body.packageId);
    if (!package) {
      return res.status(404).json({ error: "Package not found" });
    }
    const cartItem = {
      packageId: package._id,
      quantity: req.body.quantity,
      price: package.price,
      total: req.body.quantity * package.price,
    };
    req.session.cart = req.session.cart || [];
    req.session.cart.push(cartItem);
    res.json({ message: "Package added to cart" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET /cart: Get the items in the cart
router.get("/cart", async (req, res) => {
  try {
    const cart = req.session.cart || [];
    const packageIds = cart.map((item) => item.packageId);
    const packages = await Package.find({ _id: { $in: packageIds } });
    const items = cart.map((item) => {
      const package = packages.find((p) => p._id.equals(item.packageId));
      return {
        packageId: item.packageId,
        quantity: item.quantity,
        price: item.price,
        total: item.total,
        destination: package.destination,
      };
    });
    res.json(items);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// DELETE /cart/:packageId: Remove a package from the cart
router.delete("/cart/:packageId", async (req, res) => {
  try {
    const cart = req.session.cart || [];
    const index = cart.findIndex(
      (item) => item.packageId === req.params.packageId
    );
    if (index === -1) {
      return res.status(404).json({ error: "Package not found in cart" });
    }
    cart.splice(index, 1);
    res.json({ message: "Package removed from cart" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// POST /checkout: Checkout the items in the cart
router.post("/checkout", async (req, res) => {
  try {
    const cart = req.session.cart || [];
    const packageIds = cart.map((item) => item.packageId);
    const packages = await Package.find({ _id: { $in: packageIds } });
    const items = cart.map((item) => {
      const package = packages.find((p) => p._id.equals(item.packageId));
      return {
        packageId: item.packageId,
        quantity: item.quantity,
        price: item.price,
        total: item.total,
        destination: package.destination,
      };
    });
    const total = cart.reduce((acc, item) => acc + item.total, 0);
    req.session.cart = [];
    res.json({ items, total });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// POST /checkout: Checkout New
router.post("/bookings", async (req, res) => {
  try {
    const packageCheckoutPackage = new CheckoutPackage(req.body);
    console.log(req.body);
    const savedPackage = await packageCheckoutPackage.save();
    res.json(savedPackage);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
