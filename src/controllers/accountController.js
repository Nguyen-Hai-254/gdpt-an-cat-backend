import User from "../models/userModel";
import bcrypt from "bcrypt";
import { createToken } from "../ultis/createToken"

const saltRounds = 10;
const salt = bcrypt.genSaltSync(saltRounds);

class AccountController {
    static signup = async (req, res) => {
        try {
            if (!req.body.email || !req.body.password || !req.body.confirmPassword || !req.body.name) {
                return res.status(500).json('Thiếu các thông tin bắt buộc');
            }

            if (req.body.password !== req.body.confirmPassword) {
                return res.status(400).json('Mật khẩu và xác nhận mật khẩu không khớp!');
            }

            const findEmail = await User.findOne({ email: req.body.email });

            if (findEmail) {
                return res.status(400).json('Email này đã được dùng để tạo tài khoản!');
            }

            const hashPassword = bcrypt.hashSync(req.body.password, salt);

            await User.create({
                email: req.body.email,
                password: hashPassword,
                name: req.body.name,
            })

            return res.status(200).json({
                statusCode: 200,
                message: 'Tạo tài khoản thành công!'
            });
        } catch (e) {
            return res.status(500).json(e.message);
        }
    }

    static login = async (req, res) => {
        try {
            if (!req.body.email || !req.body.password) {
                return res.status(500).json('Thiếu các thông tin bắt buộc');
            }

            const findEmail = await User.findOne({ email: req.body.email });
            if (!findEmail) {
                return res.status(404).json('Email không tồn tại trong hệ thống!');
            }

            const checkPassword = await bcrypt.compare(req.body.password, findEmail.password);
            if (!checkPassword) {
                return res.status(400).json('Sai mật khẩu!');
            }

            let payload = {
                userId: findEmail._id,
                email: findEmail.email,
                role: findEmail.role,
                expireIn: process.env.JWT_EXPIRE_IN
            }
            let token = createToken(payload)
            findEmail.lassLogin = Date.now()
            await findEmail.save()

            return res.status(200).json({
                message: 'Đăng nhập thành công!',
                data: {
                    access_token: token,
                    userData: {
                        userId: findEmail._id,
                        email: findEmail.email,
                        role: findEmail.role,
                    }
                }
            })
        } catch (e) {
            return res.status(500).json(e.message);
        }
    }

    static getMatThu = async (req, res) => {
        try {
            return res.status(200).json('OK');
        } catch (e) {
            return res.status(500).json(e.message);
        }
    }
}

export default AccountController;