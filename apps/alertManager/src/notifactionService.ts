import * as grpc from '@grpc/grpc-js';
import { NotificationServiceHandlers } from './types/alertManager/NotificationService';
import { TestAlertRequest } from './types/alertManager/TestAlertRequest';
import { TestAlertResponse } from './types/alertManager/TestAlertResponse';
import { SendEmailRequest } from './types/alertManager/SendEmailRequest';
import { SendEmailResponse } from './types/alertManager/SendEmailResponse';
import { SendSmsRequest } from './types/alertManager/SendSmsRequest';
import { SendSmsResponse } from './types/alertManager/SendSmsResponse';
import { sendSMS } from './twilio/sms';
import {PrismaClient} from '@prisma/client';
import {mail, sendIncidentMail} from './email/email';



export class NotificationService implements NotificationServiceHandlers{
    [key : string] : grpc.UntypedHandleCall
    private static prisma= new PrismaClient();

    async TestAlert(
        call: grpc.ServerUnaryCall<TestAlertRequest, TestAlertRequest>,
        callback: grpc.sendUnaryData<TestAlertResponse>
    ): Promise<void> {
        try {
            const user = await NotificationService.prisma.user.findFirstOrThrow();
            try {
                await sendIncidentMail(user.email, {
                    api_url: "https://example.com",
                    started_at: new Date(),
                    errortype: "DNS",
                    acknowledge_url: "#",
                    unavailable_url: "#",
                });
            } catch (mailError) {
                console.error("Error sending incident email:", mailError);
                return callback({
                    code: grpc.status.INTERNAL,
                    message: "Failed to send the incident email.",
                });
            }
            return callback(null, {
                message: "TestAlert sent successfully.",
            });
        } catch (error) {
            if (error instanceof Error &&error.name === "NotFoundError") {
                return callback({
                    code: grpc.status.NOT_FOUND,
                    message: "User not found.",
                });
            }
            return callback({
                code: grpc.status.UNKNOWN,
                message: "An unexpected error occurred while processing TestAlert.",
            });
        }
    }

    async SendEmail(
        call: grpc.ServerUnaryCall<SendEmailRequest, SendEmailRequest>,
        callback: grpc.sendUnaryData<SendEmailResponse>
    ): Promise<void> {
        try {
            const { userId, message } = call.request;
            if (!userId || !message) {
                return callback({
                    code: grpc.status.INVALID_ARGUMENT,
                    message: 'Invalid request: userId and message are required.',
                });
            }
            const user = await NotificationService.prisma.user.findFirst({
                where: { id: userId },
            });
            if (!user) {
                return callback({
                    code: grpc.status.NOT_FOUND,
                    message: `User with ID ${userId} not found.`,
                });
            }
            try {
                await mail(user.email, '', message, '');
            } catch (emailError) {
                return callback({
                    code: grpc.status.INTERNAL,
                    message: 'Failed to send the email. Please try again later.',
                });
            }
            return callback(null, {
                message: 'Mail sent successfully.',
            });
        } catch (error) {
            return callback({
                code: grpc.status.UNKNOWN,
                message: 'An unexpected error occurred.',
            });
        }
    }


    async SendSms(
        call: grpc.ServerUnaryCall<SendSmsRequest, SendSmsRequest>,
        callback: grpc.sendUnaryData<SendSmsResponse>
    ): Promise<void> {
        try {
            const { userId, message } = call.request;
            if (!userId || !message) {
                return callback({
                    code: grpc.status.INVALID_ARGUMENT,
                    message: "Invalid request: userId and message are required.",
                });
            }
            const user = await NotificationService.prisma.user.findFirst({
                where: { id: userId },
            });
            if (!user || !user.phone) {
                return callback({
                    code: grpc.status.NOT_FOUND,
                    message: `User with ID ${userId} not found or does not have a phone number.`,
                });
            }
            try {
                await sendSMS(user.phone.toString(), message);
            } catch (smsError) {
                return callback({
                    code: grpc.status.INTERNAL,
                    message: "Failed to send the SMS. Please try again later.",
                });
            }
            return callback(null, {
                message: "SMS sent successfully.",
            });
        } catch (error) {
            return callback({
                code: grpc.status.UNKNOWN,
                message: "An unexpected error occurred while processing the SMS request.",
            });
        }
    }    
}