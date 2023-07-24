const apiUrl = import.meta.env.VITE_API_URL;

export class ApiError extends Error {
  statusCode = 400;

  constructor(message: string, statusCode: number) {
    super();
    this.message = message;
    this.statusCode = statusCode;
  }
}

async function handleApiResponse(res: Response) {
  if (!res.ok) {
    if (res.status >= 400 && res.status < 500) {
      const message = await res.json();
      throw new ApiError(message, res.status);
    }
    throw new Error('Something went wrong, please try again later.');
  }
  return res.json();
}

interface RequestOptions extends RequestInit {
  token?: string | null;
}

function addAuthorization(options: RequestOptions) {
  if (options.token) {
    options.headers = {
      ...options.headers,
      Authorization: `Bearer ${options.token}`,
    };
  }
  return options;
}

export function getApi(entity: string) {
  function create(body: object, options: RequestOptions = {}) {
    options.headers = {
      ...options.headers,
      'Content-type': 'application/json',
    };
    options.body = JSON.stringify(body);
    options.method = 'POST';
    addAuthorization(options);

    return fetch(apiUrl + entity, options).then(handleApiResponse);
  }

  function read(search?: Record<string, string>, options: RequestOptions = {}) {
    options = addAuthorization(options);

    let searchString = '';
    if (search) {
      const params = new URLSearchParams(search);
      searchString = '?' + params.toString();
      // for (const key in search) {
      //   if (searchString !== '?') {
      //     searchString += '&';
      //   }
      //   searchString += `${key}=${search[key]}`;
      // }
    }
    return fetch(apiUrl + entity + searchString, options).then(
      handleApiResponse
    );
  }

  function readOne(id: number | string, options: RequestOptions = {}) {
    options = addAuthorization(options);

    return fetch(`${apiUrl}${entity}/${id}`, options).then(handleApiResponse);
  }

  function update(id: number, body: object, options: RequestOptions = {}) {
    options.headers = {
      ...options.headers,
      'Content-type': 'application/json',
    };
    options.body = JSON.stringify(body);
    options.method = 'PATCH';
    addAuthorization(options);

    return fetch(`${apiUrl}${entity}/${id}`, options).then(handleApiResponse);
  }

  function remove(id: number, options: RequestOptions = {}) {
    options.method = 'DELETE';
    addAuthorization(options);

    return fetch(`${apiUrl}${entity}/${id}`, options).then(handleApiResponse);
  }

  return {
    create,
    read,
    readOne,
    update,
    remove,
  };
}
