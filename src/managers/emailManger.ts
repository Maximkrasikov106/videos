import nodemailer from 'nodemailer'

export  const emailManger = {
   async sendEmailConfirmMessager(email: string, code: any) {
      let transport = nodemailer.createTransport({
         service: "gmail",
         auth: {
            user: "pingwin106@gmail.com",
            pass: process.env.password
         }
      });
      let info = await transport.sendMail({
         from: "Max",
         to: email,
         subject: 'subject',
         html: ' <h1>Thank for your registration</h1>\n' +
             ' <p>To finish registration please follow the link below:\n' +
             code +
             '     <a href=\'https://somesite.com/confirm-email?code=' + code + '\'>complete registration</a>\n' +
             ' </p>'
      })
      return true;
   }
}