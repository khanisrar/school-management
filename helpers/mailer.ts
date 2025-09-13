import sgMail from "@sendgrid/mail";

sgMail.setApiKey(process.env.SENDGRID_API_KEY as string);

export const sendEmail = async (to: string, subject: string, html: string) => {
  try {
    const msg = {
      to,
      from: process.env.SENDGRID_SENDER_EMAIL as string,
      subject,
      html,
    };
    await sgMail.send(msg);
    console.log("Email sent successfully");
  } catch (error) {
    console.error("Error sending email:", error);
    throw error;
  }
};
