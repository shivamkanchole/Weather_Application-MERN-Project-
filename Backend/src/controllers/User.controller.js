import { asyncHandler } from "../utils/asyncHandler.js";
import { WeatherData } from "../APIservice/Api.js";
import { apiResponse } from "../utils/apiResponse.js";
import { ApiError } from "../utils/apiErrors.js";
import { User } from "../models/User.model.js";

const RegisterUser = asyncHandler(async (req, res) => {
  // get user details from frontend
  // validation - not empty
  // check if user already exists: username, email, and more as you want
  // create user object - create entry in db
  // remove password and refresh token field from response
  // check for user creation
  // return res

  const { FullName, email, password } = req.body;
  console.log(FullName);

  if ([FullName, email, password].some((field) => field?.trim() === "")) {
    throw new ApiError(401, "All fields are required");
  }

  const IsuserExisted = await User.findOne({
    $or: [{ FullName }, { email }],
  });
  if (IsuserExisted) {
    return res.json(new apiResponse(400,{},"Already Registered"))
    // throw new ApiError(402, "You have allready Registered");
  }

  const user = await User.create({
    FullName,
    email,
    password,
  })
  
  const Createduser = await User.findById(user._id).select("-password")
  if(!Createduser){
   throw new ApiError(500,{},"Server Error, Registration Failed")
  }
  
  return res
  .status(200)
  .json(new apiResponse(200,Createduser,"Registration Successfull"))

});

const GenerateAccessAndRefreshTokens = async (userid) => {
  try {
    const user = await User.findById(userid);
    const accesstoken = user.generateAccessToken();
    const refreshtoken = user.generateRefreshToken();

    user.refreshToken = refreshtoken
    await user.save({ validateBeforeSave: false })

    return { accesstoken, refreshtoken };
  } catch (error) {
    throw new ApiError(
      500,
      {},
      "something went wrong while generating access and refresh tokne "
    );
  }
};


const LoginUser = asyncHandler(async(req,res) =>{
  const {email, password} = req.body
  // console.log(email)

  if(
    [email, password].some((field) => field?.trim() === "")
  ){
     return res
     .status(400)
     .json(new ApiError(400,{},"All Fields Are Required"))
  }

  const user = await User.findOne({
    $or:[{email}]
  })
  if(!user){
    return res
    .status(404)
    .json(new ApiError(404,{},"Invalid username or password"))
  }

  // console.log("we got user")

  const Ispasswordcorrect = await user.isPasswordCorrect(password)
  if(!Ispasswordcorrect){
    return res
    .status(400)
    .json(new ApiError(400,{},"Wrong Password"))
  }

  const { accesstoken, refreshtoken } = await GenerateAccessAndRefreshTokens( user._id);

  
  const loggedinuser = await User.findById(user._id).select(
    "-password -refreshToken"
  );  
  
  const options = {
    httpOnly: true,
    secure: true,
  };

  return res
  .status(200)
  .cookie("accesstoken", accesstoken, options)
  .cookie("refreshtoken", refreshtoken, options)
  .json(new apiResponse(200,loggedinuser,"login successfull"))
})

const FetchDatafromAPI = asyncHandler(async (req, res) => {
  const { firstcity, secondcity, thirdcity, fourthcity } = req.body;

  if (
    [firstcity, secondcity, thirdcity, fourthcity].some(
      (city) => city?.trim() === ""
    )
  ) {
    throw new ApiError(400, "Invalid city names");
  }

  const firstcitydata = await WeatherData(firstcity);
  const secondcitydata = await WeatherData(secondcity);
  const thirdcitydata = await WeatherData(thirdcity);
  const fourthcitydata = await WeatherData(fourthcity);

  if (
    [firstcitydata, secondcitydata, thirdcitydata, fourthcitydata].some(
      (citydata) => citydata.length === ""
    )
  ) {
    throw new ApiError(500, "Server error, please try again later");
  }

  return res
    .status(200)
    .json(
      new apiResponse(
        200,
        [firstcitydata, secondcitydata, thirdcitydata, fourthcitydata],
        "Successful response"
      )
    );
});

const DataByCityName = asyncHandler(async (req, res) => {
  const { city } = req.params;

  const Citydata = await WeatherData(city);

  return res
    .status(200)
    .json(new apiResponse(200, [Citydata], "Successful response"));
});

const DataAfterUpdation = asyncHandler(async (req, res) => {
  const { city } = req.params;

  const Citydata = await WeatherData(city);
  console.log(Citydata);

  return res
    .status(200)
    .json(new apiResponse(200, [Citydata], "City updated successfully"));
});

export { FetchDatafromAPI, DataByCityName, DataAfterUpdation, RegisterUser,LoginUser };
