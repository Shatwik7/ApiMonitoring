import * as grpc from "@grpc/grpc-js";
import * as protoLoader from "@grpc/proto-loader";
import path from 'path';
import { ProtoGrpcType } from './types/alert';

const grpc_uri=process.env.GRPC_URI||'localhost:50051';

// Load the .proto file
const packageDef = protoLoader.loadSync(path.join(__dirname, '../proto/alert.proto'),
{
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
});
const grpcObject = grpc.loadPackageDefinition(packageDef) as unknown as  ProtoGrpcType;


export const notifactionService = new grpcObject.alertManager.NotificationService(
    grpc_uri,
    grpc.credentials.createInsecure()
);

export const incidentService = new grpcObject.alertManager.IncidentService(
  grpc_uri,
  grpc.credentials.createInsecure()
);