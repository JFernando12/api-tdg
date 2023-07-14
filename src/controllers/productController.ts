import { Request, Response } from 'express';
import { NotFoundError } from '../errors';
import { Product } from '../models';
import response from '../network/response';

const create = async (req: Request, res: Response) => {
  const { name, description } = req.body;
  const file = req.file as Express.MulterS3.File;
  const image = file.location;

  const product = Product.build({
    name,
    description,
    image,
  });

  await product.save();

  res.status(201).json(product);
};

const getAll = async (req: Request, res: Response) => {
  const products = await Product.find({});

  response.success(req, res, 200, products);
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

  const { name, description } = req.body;

  product.set({
    name,
    description,
  });

  await product.save();

  res.status(200).json(product);
};

const remove = async (req: Request, res: Response) => {
  const product = await Product.findOneAndDelete({ _id: req.params.id });

  res.status(200).json(product);
};

export default {
  create,
  getAll,
  getById,
  update,
  remove,
};
