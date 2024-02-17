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
exports.getAllReservations = async function (req, res, next) {
  try {
    // Fetch all reservations ordered by id in descending order
    const reservations = await prisma.reservation.findMany({
      orderBy: { id: 'desc' },
      take: 1
    });

    // Return all reservations as an array
    res.json({ reservations });
  } catch (error) {
    next(error);
  }
};



exports.reservation = async (req, res, next) => {
  // validate req.body
  const data = req.body;
  try {
    const rs = await prisma.reservation.create({
      data: { ...data, userId: req.user.id }
    });
    res.json({ msg: 'จองเสร็จสิ้น', result: rs });
  } catch (err) {
    next(err);
  }
}

exports.updateReservation = async (req, res, next) => {
  // validate req.body
  const data = req.body;

  try {
    // ตรวจสอบความถูกต้องของ req.body
    if (!data || Object.keys(data).length === 0) {
      return res.status(400).json({ msg: 'ระบุข้อมูลการอัปเดตไม่ถูกต้อง' });
    }

    // ค้นหาการจองล่าสุด
    const latestReservation = await prisma.reservation.findFirst({
      orderBy: { id: 'desc' } // เรียงลำดับการจองตาม id ที่สร้างล่าสุด
    });

    // ตรวจสอบว่ามีการจองหรือไม่
    if (!latestReservation) {
      return res.status(404).json({ msg: 'ไม่พบการจองที่สามารถอัปเดตได้' });
    }

    // อัปเดตข้อมูลการจอง
    const { start_date, end_date, ...restData } = data;
    const startDateISOString = new Date(start_date).toISOString();
    const endDateISOString = new Date(end_date).toISOString();

    const updatedReservation = await prisma.reservation.update({
      where: { id: latestReservation.id },
      data: {
        ...restData,
        start_date: startDateISOString,
        end_date: endDateISOString
      }
    });

    // ส่งข้อมูลการอัปเดตการจองกลับไป
    res.json({ msg: 'อัปเดตการจองเรียบร้อยแล้ว', result: updatedReservation });
  } catch (err) {
    next(err); // ส่งข้อผิดพลาดไปยัง middleware ถัดไปใน Express
  }
};  


exports.getAll = async function (req, res, next) {
  try {
    // Fetch all reservations ordered by id in descending order
    const reservations = await prisma.reservation.findMany({
      orderBy: { id: 'asc' },
    });

    // Return all reservations as an array
    res.json({ reservations });
  } catch (error) {
    next(error);
  }
};

