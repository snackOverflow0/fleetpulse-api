import { Global, Module } from '@nestjs/common';
import { MailerModule } from '@nestjs-modules/mailer';
import { EmailService } from './email.service';
import * as nodemailer from 'nodemailer'; // 🔌 Import raw nodemailer for generating test tokens

@Global()
@Module({
  imports: [
    MailerModule.forRootAsync({
      useFactory: async () => {
        const testAccount = await nodemailer.createTestAccount();
        
        console.log(`\x1b[32m[DYNAMIC SMTP CLIENT initialized]\x1b[0m Fresh Inbox Assigned: ${testAccount.user}`);
        
        return {
          transport: {
            host: testAccount.smtp.host,
            port: testAccount.smtp.port,
            secure: testAccount.smtp.secure,
            auth: {
              user: testAccount.user,
              pass: testAccount.pass,
            },
          },
        };
      },
    }),
  ],
  providers: [EmailService],
  exports: [EmailService],
})
export class EmailModule {}