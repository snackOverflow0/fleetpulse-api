import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer'

@Injectable()
export class EmailService {
  constructor(private mailerService: MailerService) {}

  async sendDeliverReceipt(recipientEmail: string, trackingNo: string, recipientName: string ) {
    try {
      await this.mailerService.sendMail({
        to: recipientEmail,
        from: '"FleetPulse Core Support" <no-reply@fleetpulse.com>',
        subject: `Package Delivered Successfully! — ${trackingNo}`,
        html: `
          <div style="font-family: Arial, sans-serif; padding: 25px; border: 1px solid #e0e0e0; border-radius: 8px; max-width: 600px;">
            <h2 style="color: #2e7d32; margin-bottom: 10px;">Good Day, ${recipientName}!</h2>
            <p style="font-size: 16px; color: #333;">Your package with the tracking identification number:</p>
            <div style="background-color: #f5f5f5; padding: 15px; border-left: 5px solid #2e7d32; font-size: 18px; font-weight: bold; margin: 15px 0;">
              ${trackingNo}
            </div>
            <p style="font-size: 16px; color: #333;">is successful and safely delivered of our active fleet driver crew on your location.</p>
            <hr style="border: 0; border-top: 1px solid #eeeeee; margin: 20px 0;" />
            <p style="font-size: 12px; color: #888888; font-style: italic;">This is automated generation notification from FleetPulse Logistics System. Please do not reply directly to this mailer window.</p>
          </div>
        `,
      })
      console.log(`\x1b[36m[EMAIL SYSTEM INFO]\x1b[0m Automated transactional receipt dispatched cleanly to ${recipientEmail}`);
    } catch (error) {
      throw new InternalServerErrorException(`Email delivery pipeline failure: ${error.message}`);
    }
  }
}
