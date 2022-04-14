import { FastifySchema } from 'fastify';

export const postAdminSchema: FastifySchema = {
  body: {
    type: 'object',
    additionalProperties: false,
    required: [
      'isMaster',
      'name',
      'phone',
      'email',
      'password',
      'confirmPassword',
    ],
    properties: {
      isMaster: {
        type: 'boolean',
      },
      name: {
        type: 'string',
        minLength: 1,
      },
      phone: {
        type: 'string',
        minLength: 1,
      },
      email: {
        type: 'string',
        format: 'email',
      },
      password: {
        type: 'string',
        minLength: 1,
      },
      confirmPassword: {
        type: 'string',
        minLength: 1,
      },
    },
  },
};

export const getAdminSchema: FastifySchema = {
  querystring: {
    type: 'object',
    additionalProperties: false,
    properties: {
      lastIndex: {
        type: 'integer',
        minimum: 0,
        default: 0,
      },
      limit: {
        type: 'integer',
        minimum: 1,
      },
      email: {
        type: 'string',
        format: 'email',
      },
      id: {
        type: 'integer',
        minimum: 1,
      },
    },
  },
};

export const postAdminUpdateSchema: FastifySchema = {
  body: {
    type: 'object',
    additionalProperties: false,
    required: ['isMaster', 'name', 'phone', 'email'],
    properties: {
      isMaster: {
        type: 'boolean',
      },
      name: {
        type: 'string',
        minLength: 1,
      },
      phone: {
        type: 'string',
        minLength: 1,
      },
      email: {
        type: 'string',
        format: 'email',
      },
    },
  },
  params: {
    type: 'object',
    additionalProperties: false,
    required: ['id'],
    properties: {
      id: {
        type: 'integer',
        minimum: 1,
      },
    },
  },
};

export const postAdminUpdatePasswordSchema: FastifySchema = {
  body: {
    type: 'object',
    additionalProperties: false,
    required: ['password', 'confirmPassword'],
    properties: {
      password: {
        type: 'string',
        minLength: 1,
      },
      confirmPassword: {
        type: 'string',
        minLength: 1,
      },
    },
  },
  params: {
    type: 'object',
    additionalProperties: false,
    required: ['id'],
    properties: {
      id: {
        type: 'integer',
        minimum: 1,
      },
    },
  },
};

export const deleteAdminSchema: FastifySchema = {
  params: {
    type: 'object',
    additionalProperties: false,
    required: ['id'],
    properties: {
      id: {
        type: 'integer',
        minimum: 1,
      },
    },
  },
};

export const restoreAdminSchema: FastifySchema = {
  params: {
    type: 'object',
    additionalProperties: false,
    required: ['id'],
    properties: {
      id: {
        type: 'integer',
        minimum: 1,
      },
    },
  },
};
