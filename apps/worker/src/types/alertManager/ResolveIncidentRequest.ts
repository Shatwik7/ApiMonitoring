// Original file: proto/alert.proto

import type { Timestamp as _google_protobuf_Timestamp, Timestamp__Output as _google_protobuf_Timestamp__Output } from '../google/protobuf/Timestamp';

export interface ResolveIncidentRequest {
  'apiId'?: (number);
  'resolvedAt'?: (_google_protobuf_Timestamp | null);
  'resolved'?: (boolean);
  'acknowledged'?: (boolean);
}

export interface ResolveIncidentRequest__Output {
  'apiId': (number);
  'resolvedAt': (_google_protobuf_Timestamp__Output | null);
  'resolved': (boolean);
  'acknowledged': (boolean);
}
