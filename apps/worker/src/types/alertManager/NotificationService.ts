// Original file: proto/alert.proto

import type * as grpc from '@grpc/grpc-js'
import type { MethodDefinition } from '@grpc/proto-loader'
import type { SendEmailRequest as _alertManager_SendEmailRequest, SendEmailRequest__Output as _alertManager_SendEmailRequest__Output } from '../alertManager/SendEmailRequest';
import type { SendEmailResponse as _alertManager_SendEmailResponse, SendEmailResponse__Output as _alertManager_SendEmailResponse__Output } from '../alertManager/SendEmailResponse';
import type { SendSmsRequest as _alertManager_SendSmsRequest, SendSmsRequest__Output as _alertManager_SendSmsRequest__Output } from '../alertManager/SendSmsRequest';
import type { SendSmsResponse as _alertManager_SendSmsResponse, SendSmsResponse__Output as _alertManager_SendSmsResponse__Output } from '../alertManager/SendSmsResponse';
import type { TestAlertRequest as _alertManager_TestAlertRequest, TestAlertRequest__Output as _alertManager_TestAlertRequest__Output } from '../alertManager/TestAlertRequest';
import type { TestAlertResponse as _alertManager_TestAlertResponse, TestAlertResponse__Output as _alertManager_TestAlertResponse__Output } from '../alertManager/TestAlertResponse';

export interface NotificationServiceClient extends grpc.Client {
  SendEmail(argument: _alertManager_SendEmailRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_alertManager_SendEmailResponse__Output>): grpc.ClientUnaryCall;
  SendEmail(argument: _alertManager_SendEmailRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_alertManager_SendEmailResponse__Output>): grpc.ClientUnaryCall;
  SendEmail(argument: _alertManager_SendEmailRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_alertManager_SendEmailResponse__Output>): grpc.ClientUnaryCall;
  SendEmail(argument: _alertManager_SendEmailRequest, callback: grpc.requestCallback<_alertManager_SendEmailResponse__Output>): grpc.ClientUnaryCall;
  sendEmail(argument: _alertManager_SendEmailRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_alertManager_SendEmailResponse__Output>): grpc.ClientUnaryCall;
  sendEmail(argument: _alertManager_SendEmailRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_alertManager_SendEmailResponse__Output>): grpc.ClientUnaryCall;
  sendEmail(argument: _alertManager_SendEmailRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_alertManager_SendEmailResponse__Output>): grpc.ClientUnaryCall;
  sendEmail(argument: _alertManager_SendEmailRequest, callback: grpc.requestCallback<_alertManager_SendEmailResponse__Output>): grpc.ClientUnaryCall;
  
  SendSms(argument: _alertManager_SendSmsRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_alertManager_SendSmsResponse__Output>): grpc.ClientUnaryCall;
  SendSms(argument: _alertManager_SendSmsRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_alertManager_SendSmsResponse__Output>): grpc.ClientUnaryCall;
  SendSms(argument: _alertManager_SendSmsRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_alertManager_SendSmsResponse__Output>): grpc.ClientUnaryCall;
  SendSms(argument: _alertManager_SendSmsRequest, callback: grpc.requestCallback<_alertManager_SendSmsResponse__Output>): grpc.ClientUnaryCall;
  sendSms(argument: _alertManager_SendSmsRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_alertManager_SendSmsResponse__Output>): grpc.ClientUnaryCall;
  sendSms(argument: _alertManager_SendSmsRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_alertManager_SendSmsResponse__Output>): grpc.ClientUnaryCall;
  sendSms(argument: _alertManager_SendSmsRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_alertManager_SendSmsResponse__Output>): grpc.ClientUnaryCall;
  sendSms(argument: _alertManager_SendSmsRequest, callback: grpc.requestCallback<_alertManager_SendSmsResponse__Output>): grpc.ClientUnaryCall;
  
  TestAlert(argument: _alertManager_TestAlertRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_alertManager_TestAlertResponse__Output>): grpc.ClientUnaryCall;
  TestAlert(argument: _alertManager_TestAlertRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_alertManager_TestAlertResponse__Output>): grpc.ClientUnaryCall;
  TestAlert(argument: _alertManager_TestAlertRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_alertManager_TestAlertResponse__Output>): grpc.ClientUnaryCall;
  TestAlert(argument: _alertManager_TestAlertRequest, callback: grpc.requestCallback<_alertManager_TestAlertResponse__Output>): grpc.ClientUnaryCall;
  testAlert(argument: _alertManager_TestAlertRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_alertManager_TestAlertResponse__Output>): grpc.ClientUnaryCall;
  testAlert(argument: _alertManager_TestAlertRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_alertManager_TestAlertResponse__Output>): grpc.ClientUnaryCall;
  testAlert(argument: _alertManager_TestAlertRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_alertManager_TestAlertResponse__Output>): grpc.ClientUnaryCall;
  testAlert(argument: _alertManager_TestAlertRequest, callback: grpc.requestCallback<_alertManager_TestAlertResponse__Output>): grpc.ClientUnaryCall;
  
}

export interface NotificationServiceHandlers extends grpc.UntypedServiceImplementation {
  SendEmail: grpc.handleUnaryCall<_alertManager_SendEmailRequest__Output, _alertManager_SendEmailResponse>;
  
  SendSms: grpc.handleUnaryCall<_alertManager_SendSmsRequest__Output, _alertManager_SendSmsResponse>;
  
  TestAlert: grpc.handleUnaryCall<_alertManager_TestAlertRequest__Output, _alertManager_TestAlertResponse>;
  
}

export interface NotificationServiceDefinition extends grpc.ServiceDefinition {
  SendEmail: MethodDefinition<_alertManager_SendEmailRequest, _alertManager_SendEmailResponse, _alertManager_SendEmailRequest__Output, _alertManager_SendEmailResponse__Output>
  SendSms: MethodDefinition<_alertManager_SendSmsRequest, _alertManager_SendSmsResponse, _alertManager_SendSmsRequest__Output, _alertManager_SendSmsResponse__Output>
  TestAlert: MethodDefinition<_alertManager_TestAlertRequest, _alertManager_TestAlertResponse, _alertManager_TestAlertRequest__Output, _alertManager_TestAlertResponse__Output>
}
