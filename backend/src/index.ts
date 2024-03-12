import express, { Request, Response } from 'express';
import { recommendedProducts } from './dummyData';

const app = express();
const port = 3001;
const cors = require('cors');
let feature_enabled = true;
app.use(cors());

app.use(express.json());

app.get("/get-product-recommendations", (_: Request, res: Response) => {
  const randomNumber = Math.random();

  if (randomNumber > 1) {
    const shuffledProducts = recommendedProducts
      .map(value => ({ value, sort: Math.random() }))
      .sort((a, b) => a.sort - b.sort)
      .map(({ value }) => value);

    const randomProducts = shuffledProducts.slice(0, 5);
    return res.json(randomProducts);
  }

  return res.status(500).send('Internal Server Error');
});

app.get("/get-products-by-category", (req: Request, res: Response) => {
  const products = recommendedProducts
    .filter(product => product.productType == req.query.productType)

  return res.json(products);
});

app.get("/unfinished-feature", (_: Request, res: Response) => {
  if (!feature_enabled) {
    return res.status(404).send("No features here ;D")
  }
  // Oh no, this feature is not ready for production!
  return res.status(500).send('Internal Server Error');
});

app.post("/feature-enable", (req: Request, res: Response) => {
  try {
    feature_enabled = req.body.enable;
    return res.status(200).send(`feature switched to ${req.body.enable}`);
  } catch (e) {
    return res.status(400).send("body must be 'true' or 'on' to enable the feature, or 'false' or 'off' to disable it");
  }
});

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
