export type ServiceErrorMsg = {
  message: string;
};

export type ServiceErrorNumber = 400 | 401 | 404 | 409 | 422;

export type ServiceError = {
  status: ServiceErrorNumber;
  data: ServiceErrorMsg;
};

export type ServiceSucceedNumber = 200 | 201;

export type ServiceResponseSuceed<T> = {
  status: ServiceSucceedNumber;
  data: T;
};

type loginErrorMsg = { message: string };
type loginSucceed = { token: string };

export type ServiceResponse<T> = ServiceError | ServiceResponseSuceed<T>;
export type loginResponse = loginErrorMsg | loginSucceed;
export type roleResponse = { role: string };
