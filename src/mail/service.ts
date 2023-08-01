import nodemailer from 'nodemailer';

// async..await is not allowed in global scope, must use a wrapper
async function mailingService(
  subject: string,
  template: string,
  receiver: string,
): Promise<void> {
  // create reusable transporter object using the default SMTP transport
  const transporter = nodemailer.createTransport({
    host: 'cityxplorer.io',
    port: 587,
    secure: false,
    logger: true,
    auth: {
      user: process.env.email,
      pass: process.env.password,
    },
    tls: {
      rejectUnauthorized: false,
    },
  });

  // send mail with defined transport object
  try {
    const data = await transporter.sendMail({
      from: `City Xplorer mailing ${process.env.email}`, // sender address
      to: receiver, // list of receivers
      subject,
      html: template, // html body
    });
    console.log('data', data);
  } catch (error) {
    console.log('error', error);
  }
}

export default mailingService;
