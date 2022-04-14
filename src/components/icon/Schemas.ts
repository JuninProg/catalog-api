import { FastifySchema } from 'fastify';

export const postIconsSchema: FastifySchema = {
  params: {
    type: 'object',
    additionalProperties: false,
    required: ['name'],
    properties: {
      name: {
        type: 'string',
        minLength: 1,
      },
    },
  },
};

export const deleteIconsSchema: FastifySchema = {
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
