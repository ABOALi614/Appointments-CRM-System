import { Appointment } from '../models/Appointment.js';

export const getOverviewReport = async (_req, res) => {
  const [totalAppointments, statusBreakdown, revenueStats] = await Promise.all([
    Appointment.countDocuments(),
    Appointment.aggregate([
      { $group: { _id: '$status', count: { $sum: 1 } } },
      { $project: { _id: 0, status: '$_id', count: 1 } }
    ]),
    Appointment.aggregate([
      { $group: { _id: null, totalRevenue: { $sum: '$amountPaid' } } },
      { $project: { _id: 0, totalRevenue: 1 } }
    ])
  ]);

  res.json({
    totalAppointments,
    totalRevenue: revenueStats[0]?.totalRevenue || 0,
    statusBreakdown
  });
};
