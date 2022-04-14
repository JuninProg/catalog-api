import { FastifySchema } from 'fastify';

export const postAdminLoginSchema: FastifySchema = {
  body: {
    type: 'object',
    additionalProperties: false,
    required: ['email', 'password'],
    properties: {
      email: {
        type: 'string',
        format: 'email',
      },
      password: {
        type: 'string',
        minLength: 1,
      },
    },
  },
};

export const postUserLoginSchema: FastifySchema = {
  body: {
    type: 'object',
    additionalProperties: false,
    required: ['phone'],
    properties: {
      phone: {
        type: 'string',
        minLength: 1,
      },
    },
  },
};

export const postCustomerLoginSchema: FastifySchema = {
  body: {
    type: 'object',
    additionalProperties: false,
    required: ['email', 'password'],
    properties: {
      email: {
        type: 'string',
        format: 'email',
      },
      password: {
        type: 'string',
        minLength: 1,
      },
    },
  },
};
