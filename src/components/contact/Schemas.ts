import { FastifySchema } from 'fastify';

export const postContactsSchema: FastifySchema = {
  body: {
    type: 'object',
    additionalProperties: false,
    required: ['name', 'phone', 'description'],
    properties: {
      name: {
        type: 'string',
        minLength: 1,
      },
      phone: {
        type: 'string',
        minLength: 1,
      },
      description: {
        type: 'string',
        minLength: 1,
      },
    },
  },
};
