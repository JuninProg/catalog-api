import { FastifySchema } from 'fastify';

export const postCustomerSchema: FastifySchema = {
  body: {
    type: 'object',
    additionalProperties: false,
    required: ['name', 'phone', 'email', 'password', 'confirmPassword'],
    properties: {
      name: {
        type: ['string', 'null'],
        minLength: 1,
      },
      phone: {
        type: ['string', 'null'],
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

export const getCustomersSchema: FastifySchema = {
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

export const postCustomerUpdateSchema: FastifySchema = {
  body: {
    type: 'object',
    additionalProperties: false,
    required: ['name', 'phone', 'email'],
    properties: {
      name: {
        type: ['string', 'null'],
        minLength: 1,
      },
      phone: {
        type: ['string', 'null'],
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

export const postCustomerUpdatePasswordSchema: FastifySchema = {
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

export const deleteCustomerSchema: FastifySchema = {
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

export const restoreCustomerSchema: FastifySchema = {
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
