import { incidentService } from "./grpcClient"; // Assuming this is your gRPC client
import { Timestamp } from "./types/google/protobuf/Timestamp"; // If using proto-loader
import * as grpc from "@grpc/grpc-js";

/**
 * Resolves an incident by sending the necessary gRPC request.
 * @param id - The incident ID to resolve.
 */
export async function resolveIncidentHandler(id: number): Promise<void> {
    const resolvedAt = new Date() as Timestamp;
    return new Promise((resolve, reject) => {
        incidentService.ResolveIncident(
            {
                apiId: id,
                resolvedAt: resolvedAt,
                resolved: true,
                acknowledged: true,
            },
            (error: grpc.ServiceError | null) => {
                if (error) {
                    console.error("Error resolving incident:", error);
                    return reject(error);
                }
                console.log(`Incident ${id} resolved successfully.`);
                resolve();
            }
        );
    });
}
