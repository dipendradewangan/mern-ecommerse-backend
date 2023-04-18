
const sendToken = (user, statusCode, res) => {

    const token = user.getUserToken();

    const cookieOptions = {
        httpOnly: true,
        expires: new Date(Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000)
    }

    res.status(statusCode).cookie("token", token, cookieOptions).json({
        success: true,
        token
    })
}

module.exports = sendToken;