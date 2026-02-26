import { Service } from '../models/Service.js';
import { ApiError } from '../utils/apiError.js';
import { getPagination } from '../utils/pagination.js';

export const createService = async (req, res) => {
  const service = await Service.create(req.body);
  res.status(201).json(service);
};

export const listServices = async (req, res) => {
  const { page, limit, skip } = getPagination(req.query);
  const search = req.query.search?.trim();

  const filter = search
    ? { name: { $regex: search, $options: 'i' } }
    : {};

  const [rows, total] = await Promise.all([
    Service.find(filter).sort({ createdAt: -1 }).skip(skip).limit(limit),
    Service.countDocuments(filter)
  ]);

  res.json({ rows, meta: { page, limit, total } });
};

export const updateService = async (req, res) => {
  const service = await Service.findByIdAndUpdate(req.params.id, req.body, { new: true });

  if (!service) {
    throw new ApiError(404, 'Service not found');
  }

  res.json(service);
};
