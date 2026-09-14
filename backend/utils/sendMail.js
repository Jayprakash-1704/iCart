import nodemailer from "nodemailer";





const sendMail = async (to, subject, text) => {
  try {
    const transporter = nodemailer.createTransport({
      host: process.env.ETHEREAL_HOST,
      port: Number(process.env.ETHEREAL_PORT),
      secure: false, 
      auth: {
        user: process.env.ETHEREAL_USER,
        pass: process.env.ETHEREAL_PASS,
      },
    });

    const mailOptions = {
      from: process.env.ETHEREAL_USER,
      to,
      subject,
      text,
    };

    const info = await transporter.sendMail(mailOptions);

    console.log("Email sent:", info.messageId);
    console.log("Preview URL:", nodemailer.getTestMessageUrl(info));
  } catch (error) {
    console.log("Error Sending Mail:", error);
  }
};


export default sendMail;