const nodemailer = require("nodemailer");
const { google } = require("googleapis");

const { OAuth2 } = google.auth;
const { EMAIL, MAILING_CLIENT_ID, MAILING_CLIENT_SECRET, MAILING_REFRESH_TOKEN, OAUTH_LINK } = process.env;

const auth = new OAuth2(MAILING_CLIENT_ID, MAILING_CLIENT_SECRET, MAILING_REFRESH_TOKEN, OAUTH_LINK);

exports.sendEmailVerification = (email, name, url) => {
  auth.setCredentials({
    refresh_token: MAILING_REFRESH_TOKEN,
  });

  const accessToken = auth.getAccessToken();

  const smtp = nodemailer.createTransport({
    service: "gmail",
    auth: {
      type: "OAuth2",
      user: EMAIL,
      clientId: MAILING_CLIENT_ID,
      refreshToken: MAILING_REFRESH_TOKEN,
      accessToken,
    },
  });

  const mailingOptions = {
    from: EMAIL,
    to: email,
    subject: "CSMC email verification",
    html: `<div style="max-width:600px;padding:20px;background:#f1f1f1;font-family:sans-serif"><h4>Hi,<br>${name}. Thanks for join our platform. Check below for verify your email.</h4><a href="${url}">Active Link</a><p>From<br>CSMC Limited.</p></div>`,
  };

  smtp.sendMail(mailingOptions, (err, res) => {
    if (err) return err;
    return res;
  });
};
