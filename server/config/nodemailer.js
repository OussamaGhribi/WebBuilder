import nodemailer from "nodemailer";

var transporter = nodemailer.createTransport({
    host: "smtp.mailmug.net",
    port: 2525,
    auth: {
      user: "fslnvhqm4b6zjbza",
      pass: "zw748fjjcixwz7w6"
    }
  });


export default transporter;
