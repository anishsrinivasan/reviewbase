import { API_RESPONSE_CODE, TApiResponse } from "@/entities/api";

export const failedResponse = (
  message: string,
  code?: API_RESPONSE_CODE,
  data?: any
) => {
  return {
    data,
    success: false,
    code: code || API_RESPONSE_CODE.INTERNAL_ERROR,
    message,
  } as TApiResponse<any>;
};

export const successResponse = (
  message: string,
  data?: any,
  code?: API_RESPONSE_CODE
) => {
  return {
    data,
    success: true,
    code: code || API_RESPONSE_CODE.SUCCESS,
    message,
  } as TApiResponse<any>;
};

export const failedEdgeResponse = ({
  message,
  statusCode,
  code,
  data,
}: {
  message: string;
  statusCode?: number;
  code?: API_RESPONSE_CODE;
  data?: any;
}) => {
  const payload = {
    data,
    success: false,
    code: code || API_RESPONSE_CODE.INTERNAL_ERROR,
    message,
  } as TApiResponse<any>;

  return new Response(JSON.stringify(payload), {
    status: statusCode || 500,
    statusText: message,
  });
};

export const successEdgeResponse = ({
  message,
  statusCode,
  code,
  data,
}: {
  message: string;
  statusCode?: number;
  code?: API_RESPONSE_CODE;
  data?: any;
}) => {
  const payload = {
    data,
    success: true,
    code: code || API_RESPONSE_CODE.SUCCESS,
    message,
  } as TApiResponse<any>;

  return new Response(JSON.stringify(payload), {
    status: statusCode || 200,
  });
};
