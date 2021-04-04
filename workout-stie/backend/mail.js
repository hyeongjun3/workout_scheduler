const nodemailer = require('nodemailer');

class mail {
    constructor() {
    }

    static sendMail(user_email,code) {

        return nodemailer.createTestAccount()
        .then(test_account => {
            let transporter = nodemailer.createTransport({
                host: "smtp.ethereal.email",
                port: 587,
                secure : false,
                auth: {
                    user : test_account.user,
                    pass : test_account.pass,
                },
            });
            return transporter
        })
        .then(transporter => {
            let info = transporter.sendMail({
                from: '"admin" <whow1101@naver.com>',
                to: `${user_email}`,
                subject: "Hello",
                text : "Hellor word~~?",
                html : `<h1>Enter below code</h1><h2>${code}</h2>`,
            });

            return info;
        })
        .then(info => {
            console.log("Message sent: %s", info.messageId);
            // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
        
            // Preview only available when sending through an Ethereal account
            console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
            // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
        })
    }
}

module.exports = mail

// mail.sendMail("whow1101@naver.com",1234).then().catch(err => {console.log(err)})
// main().catch(console.error);