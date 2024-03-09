import {Router} from "express"
import {FetchDatafromAPI, DataByCityName, DataAfterUpdation,RegisterUser,LoginUser} from "../controllers/User.controller.js"
const router = Router();

router.route("/registration").post(RegisterUser)

router.route("/login").post(LoginUser)

router.route("/weather").post(FetchDatafromAPI)

router.route('/:city/:id').get(DataByCityName)

router.route('/:city/:id').put(DataAfterUpdation)

export default router