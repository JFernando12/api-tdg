const create = async (req: Request, res: Response) => {
  const { name, description, price, category, image } = req.body;

  const product = Product.build({
    name,
    description,
    price,
    category,
    image,
  });

  await product.save();

  res.status(201).json(product);
};

const getAll = async (req: Request, res: Response) => {
  const products = await Product.find({});

  res.status(200).json(products);
};

const getById = async (req: Request, res: Response) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    throw new NotFoundError();
  }

  res.status(200).json(product);
};

const update = async (req: Request, res: Response) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    throw new NotFoundError();
  }

  const { name, description, price, category, image } = req.body;

  product.set({
    name,
    description,
    price,
    category,
    image,
  });

  await product.save();

  res.status(200).json(product);
};

const remove = async (req: Request, res: Response) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    throw new NotFoundError();
  }

  await product.remove();

  res.status(200).json(product);
};
