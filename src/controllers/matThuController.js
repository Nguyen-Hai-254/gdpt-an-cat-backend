import MatThu from "../models/matThuModel.js";
import User from "../models/userModel.js";

class MatThuController {
    static createMatThu = async (req, res) => {
        try {
            if (!req.body.OTT || !req.body.NW || !req.body.BV) {
                return res.status(400).json('Thiếu các trường bắt buộc của mật thư!');
            }

            const checkOTT = await MatThu.findOne({ OTT: req.body.OTT })
            if (checkOTT) {
                return res.status(400).json('OTT của mật thư đã tồn tại trong hệ thống!');
            }

            const findAllMatThu = await MatThu.countDocuments();

            await MatThu.create({
                OTT: req.body.OTT,
                OTTIsImage: req.body.OTTIsImage,
                NW: req.body.NW,
                NWIsImage: req.body.NWIsImage,
                BV: req.body.BV,
                key: req.body.key,
                STT: findAllMatThu + 1
            })

            return res.status(200).json({
                statusCode: 200,
                message: 'Tạo mật thư thành công!'
            });
        } catch (e) {
            return res.status(500).json(e.message);
        }
    }

    static getAllMatThu = async (req, res) => {
        try {
            const skip = req.query.skip ? req.query.skip : 0;
            const limit = req.query.limit ? req.query.limit : 10;
            let findAllMatThu = await MatThu.find().sort({ STT: 1 }).skip(skip).limit(limit);
            const count = await MatThu.countDocuments();

            return res.status(200).json({
                message: 'OK',
                data: {
                    data: findAllMatThu,
                    count: count
                }
            })
        } catch (e) {
            return res.status(500).json(e.message);
        }
    }

    static getMatThuById = async (req, res) => {
        try {
            if (!req.query.id) {
                return res.status(400).json('Thiếu id của mật thư!');
            }

            const findMatThu = await MatThu.findById(req.query.id);

            if (!findMatThu) {
                return res.status(400).json('Mật thư không tồn tại!');
            }

            return res.status(200).json({
                message: 'OK',
                data: findMatThu
            })
        } catch (e) {
            return res.status(500).json(e.message);
        }
    }

    static updateMatThu = async (req, res) => {
        try {
            if (!req.query.id || !req.body.OTT || !req.body.NW || !req.body.BV) {
                return res.status(400).json('Thiếu các thông tin cần thiết của mật thư!');
            }

            let findMatThu = await MatThu.findById(req.query.id);

            if (!findMatThu) {
                return res.status(400).json('Mật thư không tồn tại!');
            }

            findMatThu.OTT = req.body.OTT;
            if (req.body.OTTIsImage) findMatThu.OTTIsImage = req.body.OTTIsImage;
            findMatThu.NW = req.body.NW;
            if (req.body.NWIsImage) findMatThu.NWIsImage = req.body.NWIsImage;
            findMatThu.BV = req.body.BV;
            findMatThu.key = req.body.key;

            findMatThu.save();

            return res.status(200).json({
                statusCode: 200,
                message: 'Cập nhật mật thư thành công!'
            })
        } catch (e) {
            return res.status(500).json(e.message);
        }
    }

    static getMatThuByUser = async (req, res) => {
        try {
            if (!req.user || !req.user.userId) {
                return res.status(403).json('Người dùng chưa đăng nhập!');
            }

            let STTOfMatThu;
            let findMatThu;
            const findUser = await User.findById(req.user.userId);
            const totalMatThu = await MatThu.countDocuments();
            if (req.query.STT) {
                STTOfMatThu = req.query.STT;
                if (findUser.matThu >= STTOfMatThu - 1) {
                    findMatThu = await MatThu.findOne({ STT: STTOfMatThu });
                }
                else {
                    return res.status(403).json('Bạn phải vượt qua mật thư trước mật thư này!');
                }
            }
            else {
                findMatThu = await MatThu.findOne({
                    STT: findUser.matThu + 1
                });
            }

            return res.status(200).json({
                message: "OK",
                data: findMatThu,
                totalMatThu: totalMatThu,
                currentMatThu: findUser.matThu
            })
        } catch (e) {
            return res.status(500).json(e.message);
        }
    }

    static submitMatThu = async (req, res) => {
        try {
            if (!req.user || !req.user.userId) {
                return res.status(403).json('Người dùng chưa đăng nhập!');
            }

            if (!req.query.matThuId || !req.body.BV) {
                return res.status(400).json('Bạch văn không được trống!');
            }

            let matThuId = req.query.matThuId;
            let findUser = await User.findById(req.user.userId);
            let findMatThu = await MatThu.findById(matThuId);

            if (findUser.matThu === findMatThu.STT - 1) {
                if (req.body.BV === findMatThu.BV) {
                    findUser.matThu = findMatThu.STT;
                    await findUser.save();
                    findMatThu.userCount += 1;
                    await findMatThu.save();

                    return res.status(200).json({
                        statusCode: 200,
                        message: `Chúc mừng bạn đã giải thành công mật thư, bạch văn là "` + findMatThu.BV + "\"",
                    })
                }
            }
            else if (findUser.matThu < findMatThu.STT - 1) {
                return res.status(403).json('Bạn phải vượt qua mật thư trước mật thư này!');
            }
            else {
                if (req.body.BV === findMatThu.BV) {
                    return res.status(200).json({
                        statusCode: 200,
                        message: `Chúc mừng bạn đã giải thành công mật thư, bạch văn là "` + findMatThu.BV + `"`,
                        BV: findMatThu.BV
                    })
                }
            }

            return res.status(400).json('Bạch văn chưa chính xác!');
        } catch (e) {
            return res.status(500).json(e.message);
        }
    }

    static deleteMatThu = async (req, res) => {
        try {
            if (!req.query.id) {
                return res.status(400).json('Thiếu id của mật thư!');
            }

            const findMatThu = await MatThu.findById(req.query.id);

            if (!findMatThu) {
                return res.status(400).json('Mật thư không tồn tại!');
            }

            await MatThu.deleteOne({ _id: req.query.id });

            return res.status(200).json({
                statusCode: 200,
                message: 'Xóa mật thư thành công!'
            })
        } catch (e) {
            return res.status(500).json(e.message);
        }
    }
}

export default MatThuController;