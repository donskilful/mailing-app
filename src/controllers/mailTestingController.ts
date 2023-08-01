import { Request, Response } from 'express';
import mailingService from '../mail/service';
import confirmEmailTemplate from '../mail/confirmEmail';
import resetPasswordTemplate from '../mail/resetPassword';
import vehicleApprovedEmailTemplate from '../mail/vehicleApproved';
import vehicleDeclinedEmailTemplate from '../mail/vehicleDeclined';
import vehiclePendingEmailTemplate from '../mail/vehiclePending';
import vehicleSubmittedEmailTemplate from '../mail/vehicleSubmitted';
import vehicleDetailsSubmitedNotifyAdminTemplate from '../mail/vehicleDetailsSubmitedNotifyAdmin';

const email: any = process.env.rhodaEmail;

const verificationCode = 8985;
const resetCode = 5567;

const name = 'user';
const fullName = 'John doe';

const sendMail = async (req: Request, res: Response) => {
  try {
    // mailingService(
    //   'Confirm Email',
    //   confirmEmailTemplate(verificationCode, name),
    //   email,
    // );
    mailingService(
      'Forgot password',
      resetPasswordTemplate(resetCode, fullName),
      email,
    );
    // mailingService(
    //   'Vehicle approved',
    //   vehicleApprovedEmailTemplate(fullName),
    //   email,
    // );
    // mailingService(
    //   'Vehicle declined',
    //   vehicleDeclinedEmailTemplate(fullName),
    //   email,
    // );
    // mailingService(
    //   'Vehicle pending',
    //   vehiclePendingEmailTemplate(fullName),
    //   email,
    // );
    // mailingService(
    //   'Vehicle submitted',
    //   vehicleSubmittedEmailTemplate(fullName),
    //   email,
    // );
    // mailingService(
    //   'New driver submission',
    //   vehicleDetailsSubmitedNotifyAdminTemplate(),
    //   email,
    // );
    return res.status(200).json({
      status: 'success',
      message: 'Email sent',
      data: ['Email sent successfully'],
    });
  } catch (error) {
    return res
      .status(500)
      .json({ status: 'error', message: 'Ops! Something went wrong', error });
  }
};

export default {
  sendMail,
};
