export interface ErrorRes {
  response: {
    data: {
      error: string;
      message: string;
    };
  };
}
