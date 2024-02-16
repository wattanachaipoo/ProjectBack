const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

exports.getByUser = async (req, res, next) => {
  try {
    const todos = await prisma.reservation.findMany({
      where: { userId: req.user.id }
    });
    res.json({ todos });
  } catch (err) {
    next(err);
  }
}
exports.getAllReservations = async function(req, res, next) {
  try {
    const reservations = await prisma.reservation.findMany();
    res.json({ reservations });
  } catch (error) {
    next(error); // ส่งข้อผิดพลาดไปยัง middleware ที่จัดการกับข้อผิดพลาด
  }
};

exports.reservation = async (req, res, next) => {
  // validate req.body
  const data = req.body;
  try {
    const rs = await prisma.reservation.create({
      data: { ...data, userId: req.user.id }
    });
    res.json({ msg: 'Create OK', result: rs });
  } catch (err) {
    next(err);
  }
}


