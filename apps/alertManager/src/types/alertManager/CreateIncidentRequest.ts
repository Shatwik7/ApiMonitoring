// Original file: proto/alert.proto

import type { ApiError as _alertManager_ApiError, ApiError__Output as _alertManager_ApiError__Output } from '../alertManager/ApiError';

export interface CreateIncidentRequest {
  'apiId'?: (number);
  'description'?: (string);
  'type'?: (_alertManager_ApiError);
  'statusCode'?: (number);
  'screenshot'?: (string);
}

export interface CreateIncidentRequest__Output {
  'apiId': (number);
  'description': (string);
  'type': (_alertManager_ApiError__Output);
  'statusCode': (number);
  'screenshot': (string);
}
