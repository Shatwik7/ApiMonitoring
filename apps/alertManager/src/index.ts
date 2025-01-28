import path from 'path';
import * as grpc from '@grpc/grpc-js';
import { ProtoGrpcType } from './types/alert';

// Load the generated proto
import * as protoLoader from '@grpc/proto-loader';
import IncidentService from './incidentService';
import { NotificationService } from './notifactionService';
const packageDefinition = protoLoader.loadSync(
  path.join(__dirname, '../proto/alert.proto'),
  {
    longs: String,
    enums: String,
    defaults: true,
    oneofs: true,
  }
);
const proto = grpc.loadPackageDefinition(packageDefinition) as unknown as ProtoGrpcType;

// Set up and start the gRPC server
const server = new grpc.Server();

//Adding services in the server

server.addService(
  proto.alertManager.IncidentService.service,
  new IncidentService()
);

server.addService(
  proto.alertManager.NotificationService.service,
  new NotificationService()
);



server.bindAsync(
  '0.0.0.0:50051', 
  grpc.ServerCredentials.createInsecure(),
  (err,port) => {
  if (err) {
    console.error("Error starting server:", err);
    return;
  }
  console.log(`Server is running on 0.0.0.0:${port}`);
});
