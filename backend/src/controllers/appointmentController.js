import { Appointment } from '../models/Appointment.js';
import { Service } from '../models/Service.js';
import { ApiError } from '../utils/apiError.js';
import { getPagination } from '../utils/pagination.js';

export const createAppointment = async (req, res) => {
  const { serviceId, startAt, notes } = req.body;
  const service = await Service.findById(serviceId);

  if (!service || !service.isActive) {
    throw new ApiError(404, 'Service not found or inactive');
  }

  const startDate = new Date(startAt);
  const endAt = new Date(startDate.getTime() + service.durationMinutes * 60000);

  const conflict = await Appointment.findOne({
    assignedStaffId: { $exists: true, $ne: null },
    startAt: { $lt: endAt },
    endAt: { $gt: startDate },
    status: { $in: ['pending', 'confirmed'] }
  });

  if (conflict) {
    throw new ApiError(409, 'Requested slot conflicts with an active appointment');
  }

  const appointment = await Appointment.create({
    userId: req.user.sub,
    serviceId,
    startAt: startDate,
    endAt,
    notes,
    status: 'pending'
  });

  res.status(201).json(appointment);
};

export const listAppointments = async (req, res) => {
  const { page, limit, skip } = getPagination(req.query);
  const search = req.query.search?.trim();
  const status = req.query.status;

  const filter = {
    ...(req.user.role === 'user' ? { userId: req.user.sub } : {}),
    ...(status ? { status } : {})
  };

  if (search) {
    filter.$or = [{ notes: { $regex: search, $options: 'i' } }];
  }

  const [rows, total] = await Promise.all([
    Appointment.find(filter)
      .populate('serviceId', 'name price durationMinutes')
      .populate('userId', 'name email')
      .sort({ startAt: 1 })
      .skip(skip)
      .limit(limit),
    Appointment.countDocuments(filter)
  ]);

  res.json({ rows, meta: { page, limit, total } });
};

export const updateAppointment = async (req, res) => {
  const appointment = await Appointment.findById(req.params.id);
  if (!appointment) {
    throw new ApiError(404, 'Appointment not found');
  }

  if (req.user.role === 'user' && appointment.userId.toString() !== req.user.sub) {
    throw new ApiError(403, 'Not allowed to update this appointment');
  }

  Object.assign(appointment, req.body);
  await appointment.save();

  res.json(appointment);
};
