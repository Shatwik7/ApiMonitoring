// Original file: proto/alert.proto

import type * as grpc from '@grpc/grpc-js'
import type { MethodDefinition } from '@grpc/proto-loader'
import type { AcknowledgeIncidentRequest as _alertManager_AcknowledgeIncidentRequest, AcknowledgeIncidentRequest__Output as _alertManager_AcknowledgeIncidentRequest__Output } from '../alertManager/AcknowledgeIncidentRequest';
import type { AcknowledgeIncidentResponse as _alertManager_AcknowledgeIncidentResponse, AcknowledgeIncidentResponse__Output as _alertManager_AcknowledgeIncidentResponse__Output } from '../alertManager/AcknowledgeIncidentResponse';
import type { CreateIncidentRequest as _alertManager_CreateIncidentRequest, CreateIncidentRequest__Output as _alertManager_CreateIncidentRequest__Output } from '../alertManager/CreateIncidentRequest';
import type { CreateIncidentResponse as _alertManager_CreateIncidentResponse, CreateIncidentResponse__Output as _alertManager_CreateIncidentResponse__Output } from '../alertManager/CreateIncidentResponse';
import type { ResolveIncidentRequest as _alertManager_ResolveIncidentRequest, ResolveIncidentRequest__Output as _alertManager_ResolveIncidentRequest__Output } from '../alertManager/ResolveIncidentRequest';
import type { ResolveIncidentResponse as _alertManager_ResolveIncidentResponse, ResolveIncidentResponse__Output as _alertManager_ResolveIncidentResponse__Output } from '../alertManager/ResolveIncidentResponse';

export interface IncidentServiceClient extends grpc.Client {
  AcknowledgeIncident(argument: _alertManager_AcknowledgeIncidentRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_alertManager_AcknowledgeIncidentResponse__Output>): grpc.ClientUnaryCall;
  AcknowledgeIncident(argument: _alertManager_AcknowledgeIncidentRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_alertManager_AcknowledgeIncidentResponse__Output>): grpc.ClientUnaryCall;
  AcknowledgeIncident(argument: _alertManager_AcknowledgeIncidentRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_alertManager_AcknowledgeIncidentResponse__Output>): grpc.ClientUnaryCall;
  AcknowledgeIncident(argument: _alertManager_AcknowledgeIncidentRequest, callback: grpc.requestCallback<_alertManager_AcknowledgeIncidentResponse__Output>): grpc.ClientUnaryCall;
  acknowledgeIncident(argument: _alertManager_AcknowledgeIncidentRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_alertManager_AcknowledgeIncidentResponse__Output>): grpc.ClientUnaryCall;
  acknowledgeIncident(argument: _alertManager_AcknowledgeIncidentRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_alertManager_AcknowledgeIncidentResponse__Output>): grpc.ClientUnaryCall;
  acknowledgeIncident(argument: _alertManager_AcknowledgeIncidentRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_alertManager_AcknowledgeIncidentResponse__Output>): grpc.ClientUnaryCall;
  acknowledgeIncident(argument: _alertManager_AcknowledgeIncidentRequest, callback: grpc.requestCallback<_alertManager_AcknowledgeIncidentResponse__Output>): grpc.ClientUnaryCall;
  
  CreateIncident(argument: _alertManager_CreateIncidentRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_alertManager_CreateIncidentResponse__Output>): grpc.ClientUnaryCall;
  CreateIncident(argument: _alertManager_CreateIncidentRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_alertManager_CreateIncidentResponse__Output>): grpc.ClientUnaryCall;
  CreateIncident(argument: _alertManager_CreateIncidentRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_alertManager_CreateIncidentResponse__Output>): grpc.ClientUnaryCall;
  CreateIncident(argument: _alertManager_CreateIncidentRequest, callback: grpc.requestCallback<_alertManager_CreateIncidentResponse__Output>): grpc.ClientUnaryCall;
  createIncident(argument: _alertManager_CreateIncidentRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_alertManager_CreateIncidentResponse__Output>): grpc.ClientUnaryCall;
  createIncident(argument: _alertManager_CreateIncidentRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_alertManager_CreateIncidentResponse__Output>): grpc.ClientUnaryCall;
  createIncident(argument: _alertManager_CreateIncidentRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_alertManager_CreateIncidentResponse__Output>): grpc.ClientUnaryCall;
  createIncident(argument: _alertManager_CreateIncidentRequest, callback: grpc.requestCallback<_alertManager_CreateIncidentResponse__Output>): grpc.ClientUnaryCall;
  
  ResolveIncident(argument: _alertManager_ResolveIncidentRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_alertManager_ResolveIncidentResponse__Output>): grpc.ClientUnaryCall;
  ResolveIncident(argument: _alertManager_ResolveIncidentRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_alertManager_ResolveIncidentResponse__Output>): grpc.ClientUnaryCall;
  ResolveIncident(argument: _alertManager_ResolveIncidentRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_alertManager_ResolveIncidentResponse__Output>): grpc.ClientUnaryCall;
  ResolveIncident(argument: _alertManager_ResolveIncidentRequest, callback: grpc.requestCallback<_alertManager_ResolveIncidentResponse__Output>): grpc.ClientUnaryCall;
  resolveIncident(argument: _alertManager_ResolveIncidentRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_alertManager_ResolveIncidentResponse__Output>): grpc.ClientUnaryCall;
  resolveIncident(argument: _alertManager_ResolveIncidentRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_alertManager_ResolveIncidentResponse__Output>): grpc.ClientUnaryCall;
  resolveIncident(argument: _alertManager_ResolveIncidentRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_alertManager_ResolveIncidentResponse__Output>): grpc.ClientUnaryCall;
  resolveIncident(argument: _alertManager_ResolveIncidentRequest, callback: grpc.requestCallback<_alertManager_ResolveIncidentResponse__Output>): grpc.ClientUnaryCall;
  
}

export interface IncidentServiceHandlers extends grpc.UntypedServiceImplementation {
  AcknowledgeIncident: grpc.handleUnaryCall<_alertManager_AcknowledgeIncidentRequest__Output, _alertManager_AcknowledgeIncidentResponse>;
  
  CreateIncident: grpc.handleUnaryCall<_alertManager_CreateIncidentRequest__Output, _alertManager_CreateIncidentResponse>;
  
  ResolveIncident: grpc.handleUnaryCall<_alertManager_ResolveIncidentRequest__Output, _alertManager_ResolveIncidentResponse>;
  
}

export interface IncidentServiceDefinition extends grpc.ServiceDefinition {
  AcknowledgeIncident: MethodDefinition<_alertManager_AcknowledgeIncidentRequest, _alertManager_AcknowledgeIncidentResponse, _alertManager_AcknowledgeIncidentRequest__Output, _alertManager_AcknowledgeIncidentResponse__Output>
  CreateIncident: MethodDefinition<_alertManager_CreateIncidentRequest, _alertManager_CreateIncidentResponse, _alertManager_CreateIncidentRequest__Output, _alertManager_CreateIncidentResponse__Output>
  ResolveIncident: MethodDefinition<_alertManager_ResolveIncidentRequest, _alertManager_ResolveIncidentResponse, _alertManager_ResolveIncidentRequest__Output, _alertManager_ResolveIncidentResponse__Output>
}
