// Create Token and saving in cookie

const sendToken =(agency, statusCode, res)=>{

    const token = agency.getJWTToken();
    //options for cookie

    const options = {
        expires: new Date(
            Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000
        ),
        httpOnly: true,
    };

    res.status(statusCode).cookie('token', token, options).json({
        success: true,
        agency,
        token,
    });
} 

module.exports = sendToken;