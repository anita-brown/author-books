"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkAuth = exports.logIn = exports.signUp = exports.getAllUsers = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const userModel_1 = __importDefault(require("../models/userModel"));
const utils_1 = require("../utils/utils");
const mySecret = "ughyjkkoiughjkhu3jkhu748uhjki78h";
// get all Users
const getAllUsers = (req, res) => {
    try {
        const data = userModel_1.default.find({}, (err, users) => {
            if (err)
                return res.json({ msg: "error occur in getting all users..." });
            if (users) {
                res.json(users);
            }
        });
    }
    catch (error) {
        console.log(error, "error occured.");
        res.status(500).json({ error });
    }
};
exports.getAllUsers = getAllUsers;
// Sign up
const signUp = async (req, res) => {
    try {
        const { error } = (0, utils_1.validateUserEntry)(req.body);
        if (error) {
            return res.status(400).json({ msg: "Validation failed..." });
        }
        console.log(req.body);
        const { firstName, lastName, DOB, email, phoneNumber, password } = req.body;
        const data = await userModel_1.default.create({ firstName, lastName, DOB, email, phoneNumber, password });
        console.log(data);
        const token = await jsonwebtoken_1.default.sign({
            email,
        }, mySecret, {
            expiresIn: "30d",
        });
        res.status(201).json({ status: "success", token, data });
    }
    catch (error) {
        console.log(error, "error occured.");
        res.status(500).json({ error });
    }
};
exports.signUp = signUp;
// Login 
const logIn = async (req, res) => {
    try {
        console.log(req.body);
        const { error } = (0, utils_1.validateloginEntry)(req.body);
        if (error) {
            return res.status(401).json({ msg: "Validation failed..." });
        }
        const { email, password } = req.body;
        const data = await userModel_1.default.findOne({ email }).select('+password');
        let isMatch = await bcrypt_1.default.compare(password, data.password);
        if (!isMatch) {
            return res.status(400).json({
                errors: [
                    {
                        msg: "Invalid Credentials",
                    },
                ],
            });
        }
        const token = await jsonwebtoken_1.default.sign({
            email,
        }, mySecret, {
            expiresIn: "30d",
        });
        res.status(201).json({ status: "success", token, data });
    }
    catch (error) {
        console.log(error, "error occured.");
        res.status(500).json({ error });
    }
};
exports.logIn = logIn;
// //  Authentication custom middleware
const checkAuth = async (req, res, next) => {
    try {
        if (!req.headers.authorization) {
            return res.status(400).json({
                error: [
                    {
                        msg: "No token found!!",
                    },
                ],
            });
        }
        const token = req.headers.authorization.split(" ")[1];
        if (!token) {
            return res.status(400).json({
                error: [
                    {
                        msg: "No token found",
                    },
                ],
            });
        }
        let user = (await jsonwebtoken_1.default.verify(token, "ughyjkkoiughjkhu3jkhu748uhjki78h"));
        // console.log(user)
        req.user = user.email;
        req.user = user.hashedPassword;
        next();
    }
    catch (error) {
        console.log(error);
        return res.status(400).json({
            errors: [
                {
                    msg: "Token invalid",
                },
            ],
        });
    }
};
exports.checkAuth = checkAuth;
// export const getAllUsers = (req: Request, res: Response) => {
//   const userData = readUsersFile();
//   res.status(200).json({ message: "succesfull", userData });
// };
// SIGNUP
// export const signUp = async (req: Request, res: Response) => {
//   try {
//     const userData = readUsersFile();
//     // To check validation of reqbody
//     [
//       check("name", "Full name required"),
//       check("email", "Please provide a valid email").isEmail(),
//       check("dateOfBirth"),
//       check(
//         "password",
//         "Please provide password greater than 6 characters"
//       ).isLength({
//         min: 6,
//         max: 10,
//       }),
//     ];
//     const { id, name, dateOfBirth, password, email } = req.body;
//     console.log(req.body, "req data from form");
//     //  Validate the input
//     const errors = validationResult(req.body);
//     if (!errors.isEmpty()) {
//       return res.status(400).json({
//         errors: errors.array(),
//       });
//     }
//     // Validate if user doesn't exist
//     let userNewData = userData.find((user: Users) => {
//       return user.email === email;
//     });
//     if (userNewData) {
//       return res.status(400).json({
//         errors: [
//           {
//             msg: "This user already exists",
//           },
//         ],
//       });
//     }
//     const hashedPassword = await bcrypt.hash(password, 10);
//     console.log(hashedPassword);
//     userData.push({
//       id: uuid4(),
//       name,
//       dateOfBirth,
//       email,
//       password: hashedPassword,
//     });
//     console.log(userData, "user data");
//     const token = await jwt.sign(
//       {
//         email,
//       },
//       mySecret,
//       {
//         expiresIn: "10d",
//       }
//     );
//     res.json({
//       token,
//     });
//     writeUsersFile(userData);
//   } catch (err) {
//     console.log(err, "error occured");
//   }
// };
// // LOGIN
// export const logIn = async (req: Request, res: Response) => {
//   const userData = readUsersFile();
//   const { password, email } = req.body;
//   let userNewData = userData.find((user: Users) => {
//     return user.email === email;
//   });
//   if (!userNewData) {
//     return res.status(400).json({
//       errors: [
//         {
//           msg: "Invalid Credentials",
//         },
//       ],
//     });
//   }
//   let isMatch = await bcrypt.compare(password, userNewData.password);
//   if (!isMatch) {
//     return res.status(400).json({
//       errors: [
//         {
//           msg: "Invalid Credentials",
//         },
//       ],
//     });
//   }
//   const token = await jwt.sign(
//     {
//       email,
//     },
//     "ughyjkkoiughjkhu3jkhu748uhjki78h",
//     {
//       expiresIn: "10d",
//     }
//   );
//   res.json({
//     token,
//   });
// };
// //  Authentication custom middleware
// export const checkAuth = async (
//   req: reqUser,
//   res: Response,
//   next: NextFunction
// ) => {
//   if (!req.headers.authorization) {
//     return res.status(400).json({
//       error: [
//         {
//           msg: "No token found!!",
//         },
//       ],
//     });
//   }
//   const token = req.headers.authorization.split(" ")[1];
//   if (!token) {
//     return res.status(400).json({
//       error: [
//         {
//           msg: "No token found",
//         },
//       ],
//     });
//   }
//   try {
//     let user = (await jwt.verify(
//       token,
//       "ughyjkkoiughjkhu3jkhu748uhjki78h"
//     )) as { [key: string]: string };
//     // console.log(user)
//     req.user = user.email;
//     req.user = user.hashedPassword;
//     next();
//   } catch (error) {
//     console.log(error);
//     return res.status(400).json({
//       errors: [
//         {
//           msg: "Token invalid",
//         },
//       ],
//     });
//   }
// };
// export default {
//   getAllUsers,
//   signUp,
//   logIn,
//   checkAuth,
// };
