import { CrudRequest } from '@nestjsx/crud';
export class CrudRequestDto implements CrudRequest {
  parsed: {
    fields: [];
    paramsFilter: [];
    authPersist: undefined;
    search: {};
    filter: [];
    or: [];
    join: [];
    sort: [];
    limit: undefined;
    offset: undefined;
    page: undefined;
    cache: undefined;
    includeDeleted: undefined;
  };
  options: {
    query: { alwaysPaginate: false };
    routes: {
      createOneBase: {
        returnShallow: false;
      };
    };
    params: {};
  };
}

const reqCrud: CrudRequest = {
  parsed: {
    fields: [],
    paramsFilter: [],
    authPersist: undefined,
    search: {},
    filter: [],
    or: [],
    join: [],
    sort: [],
    limit: undefined,
    offset: undefined,
    page: undefined,
    cache: undefined,
    includeDeleted: undefined,
  },
  options: {
    query: { alwaysPaginate: false },
    routes: {
      createOneBase: {
        returnShallow: false,
      },
    },
    params: {},
  },
};
export default reqCrud;
