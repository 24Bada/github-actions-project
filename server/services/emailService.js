/**
 * Kora Server — Email Service
 *
 * Sends OTP and password reset emails via Nodemailer.
 * Falls back to console logging in development (no email config).
 */

const nodemailer = require("nodemailer");
const config = require("../config");

let transporter = null;

function getTransporter() {
  if (transporter) return transporter;

  if (!config.email.user || !config.email.pass) {
    // Dev mode — no real email
    return null;
  }

  transporter = nodemailer.createTransport({
    host: config.email.host,
    port: config.email.port,
    auth: {
      user: config.email.user,
      pass: config.email.pass,
    },
  });

  return transporter;
}

async function sendOtpEmail(to, otp) {
  const transport = getTransporter();

  if (!transport) {
    // Dev mode — log it
    console.log(`\n📧 Kora OTP for ${to}: ${otp}\n`);
    return;
  }

  await transport.sendMail({
    from: `"Kora Messenger" <${config.email.user}>`,
    to,
    subject: "Your Kora Verification Code",
    html: `
      <div style="font-family: sans-serif; max-width: 480px; margin: 0 auto;">
        <h2 style="color: #2563EB;">Kora Messenger</h2>
        <p>Your verification code is:</p>
        <h1 style="font-size: 36px; letter-spacing: 4px; color: #2563EB;">${otp}</h1>
        <p>This code expires in ${config.otpExpiresMinutes} minutes.</p>
        <p style="color: #999; font-size: 12px;">If you didn't request this, ignore this email.</p>
      </div>
    `,
  });
}

module.exports = { sendOtpEmail };
