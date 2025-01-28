import type * as grpc from '@grpc/grpc-js';
import type { EnumTypeDefinition, MessageTypeDefinition } from '@grpc/proto-loader';

import type { IncidentServiceClient as _alertManager_IncidentServiceClient, IncidentServiceDefinition as _alertManager_IncidentServiceDefinition } from './alertManager/IncidentService';
import type { NotificationServiceClient as _alertManager_NotificationServiceClient, NotificationServiceDefinition as _alertManager_NotificationServiceDefinition } from './alertManager/NotificationService';

type SubtypeConstructor<Constructor extends new (...args: any) => any, Subtype> = {
  new(...args: ConstructorParameters<Constructor>): Subtype;
};

export interface ProtoGrpcType {
  alertManager: {
    AcknowledgeIncidentRequest: MessageTypeDefinition
    AcknowledgeIncidentResponse: MessageTypeDefinition
    ApiError: EnumTypeDefinition
    CreateIncidentRequest: MessageTypeDefinition
    CreateIncidentResponse: MessageTypeDefinition
    IncidentService: SubtypeConstructor<typeof grpc.Client, _alertManager_IncidentServiceClient> & { service: _alertManager_IncidentServiceDefinition }
    NotificationService: SubtypeConstructor<typeof grpc.Client, _alertManager_NotificationServiceClient> & { service: _alertManager_NotificationServiceDefinition }
    ResolveIncidentRequest: MessageTypeDefinition
    ResolveIncidentResponse: MessageTypeDefinition
    SendEmailRequest: MessageTypeDefinition
    SendEmailResponse: MessageTypeDefinition
    SendSmsRequest: MessageTypeDefinition
    SendSmsResponse: MessageTypeDefinition
    TestAlertRequest: MessageTypeDefinition
    TestAlertResponse: MessageTypeDefinition
  }
  google: {
    protobuf: {
      Timestamp: MessageTypeDefinition
    }
  }
}

