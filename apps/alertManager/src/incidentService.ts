import * as grpc from "@grpc/grpc-js";
import { Prisma, PrismaClient ,ApiError } from "@prisma/client";
import { IncidentServiceHandlers } from "./types/alertManager/IncidentService";
import {CreateIncidentRequest} from "./types/alertManager/CreateIncidentRequest";
import { CreateIncidentResponse } from "./types/alertManager/CreateIncidentResponse";
import { AcknowledgeIncidentRequest } from "./types/alertManager/AcknowledgeIncidentRequest";
import { AcknowledgeIncidentResponse } from "./types/alertManager/AcknowledgeIncidentResponse";
import { ResolveIncidentRequest } from "./types/alertManager/ResolveIncidentRequest";
import { ResolveIncidentResponse } from "./types/alertManager/ResolveIncidentResponse";

export class IncidentService implements IncidentServiceHandlers {
  [key: string]: grpc.UntypedHandleCall;
  private static prisma = new PrismaClient();

  // CreateIncident handler
  async CreateIncident(
    call: grpc.ServerUnaryCall<CreateIncidentRequest, CreateIncidentRequest>,
    callback: grpc.sendUnaryData<CreateIncidentResponse>
  ) {
    try {
      const { apiId, description="", statusCode, screenshot } = call.request;
      const apiError: ApiError = call.request.type as ApiError;

      if (!apiId) {
        return callback({
          code: grpc.status.INVALID_ARGUMENT,
          details: "apiId and statusCode are required.",
        });
      }
      const existingIncident = await IncidentService.prisma.incident.findFirst({
        where: {
          apiId,
          resolved: false,
        },
      });
      
      if (existingIncident) {
        return callback({
          code: grpc.status.ALREADY_EXISTS,
          details: `An active incident already exists for apiId: ${apiId}`,
        });
      }
      const newIncident = await IncidentService.prisma.incident.create({
        data: {
          apiId,
          description,
          type:apiError,
          statusCode,
          screenshot: screenshot || null,
          createdAt: new Date(),
          resolved: false,
          acknowledged: false,
        },
      });

      callback(null, {
        incidentId: newIncident.id,
        message: "Incident created successfully.",
      });
    } catch (err) {
      console.error("Error creating incident:", err);
      callback({
        code: grpc.status.INTERNAL,
        details: "An error occurred while creating the incident.",
      });
    }
  }

  async AcknowledgeIncident(
    call: grpc.ServerUnaryCall<
      AcknowledgeIncidentRequest,
      AcknowledgeIncidentRequest
    >,
    callback: grpc.sendUnaryData<AcknowledgeIncidentResponse>
  ) {
    try {
      const { incidentId } = call.request;

      const updatedIncident = await IncidentService.prisma.incident.update({
        where: { id: incidentId },
        data: { acknowledged: true },
      });

      callback(null, { message: "Incident acknowledged successfully." ,});
    } catch (err) {
      console.error("Error acknowledging incident:", err);

      if (err instanceof Error) {
        callback({
          code: grpc.status.NOT_FOUND,
          details: "Incident not found.",
        });
      } else {
        callback({
          code: grpc.status.INTERNAL,
          details: "An error occurred while acknowledging the incident.",
        });
      }
    }
  }

  // ResolveIncident handler
  async ResolveIncident(
    call: grpc.ServerUnaryCall<ResolveIncidentRequest, ResolveIncidentRequest>,
    callback: grpc.sendUnaryData<ResolveIncidentResponse>
  ) {
    try {
      const { incidentId, resolvedAt, resolved, acknowledged } = call.request;

      const resolvedDate = new Date();

      const updatedIncident = await IncidentService.prisma.incident.update({
        where: { id: incidentId },
        data: {
          resolved,
          resolvedAt: resolvedDate,
          acknowledged: acknowledged ?? undefined,
        },
      });

      callback(null, { message: "Incident resolved successfully." });
    } catch (err) {
      console.error("Error resolving incident:", err);

      if (err instanceof Error) {
        callback({
          code: grpc.status.NOT_FOUND,
          details: "Incident not found.",
        });
      } else {
        callback({
          code: grpc.status.INTERNAL,
          details: "An error occurred while resolving the incident.",
        });
      }
    }
  }
}

export default IncidentService;
