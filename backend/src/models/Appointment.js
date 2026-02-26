import mongoose from 'mongoose';

const appointmentSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    serviceId: { type: mongoose.Schema.Types.ObjectId, ref: 'Service', required: true },
    assignedStaffId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    startAt: { type: Date, required: true },
    endAt: { type: Date, required: true },
    status: {
      type: String,
      enum: ['pending', 'confirmed', 'done', 'cancelled'],
      default: 'pending'
    },
    notes: { type: String, trim: true },
    amountPaid: { type: Number, default: 0, min: 0 }
  },
  { timestamps: true }
);

export const Appointment = mongoose.model('Appointment', appointmentSchema);
