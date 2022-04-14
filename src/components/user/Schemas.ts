import { FastifySchema } from 'fastify';

export const postUsersSchema: FastifySchema = {
  body: {
    type: 'object',
    additionalProperties: false,
    required: [
      'name',
      'phone',
      'addressZipCode',
      'addressCity',
      'addressState',
      'addressCountry',
      'addressCoordinates',
    ],
    properties: {
      name: {
        type: 'string',
        minLength: 1,
      },
      phone: {
        type: 'string',
        minLength: 1,
      },
      addressZipCode: {
        type: ['string', 'null'],
        minLength: 8,
        maxLength: 8,
      },
      addressCity: {
        type: ['string', 'null'],
        minLength: 1,
      },
      addressState: {
        type: ['string', 'null'],
        minLength: 1,
      },
      addressCountry: {
        type: ['string', 'null'],
        minLength: 1,
      },
      addressCoordinates: {
        type: ['object', 'null'],
        required: ['lat', 'long'],
        properties: {
          lat: {
            type: 'number',
          },
          long: {
            type: 'number',
          },
        },
      },
    },
  },
};

export const getUsersSchema: FastifySchema = {
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
    },
  },
};

export const postUsersUpdateSchema: FastifySchema = {
  body: {
    type: 'object',
    additionalProperties: false,
    required: [
      'name',
      'phone',
      'addressZipCode',
      'addressCity',
      'addressState',
      'addressCountry',
      'addressCoordinates',
    ],
    properties: {
      name: {
        type: 'string',
        minLength: 1,
      },
      phone: {
        type: 'string',
        minLength: 1,
      },
      addressZipCode: {
        type: ['string', 'null'],
        minLength: 8,
        maxLength: 8,
      },
      addressCity: {
        type: ['string', 'null'],
        minLength: 1,
      },
      addressState: {
        type: ['string', 'null'],
        minLength: 1,
      },
      addressCountry: {
        type: ['string', 'null'],
        minLength: 1,
      },
      addressCoordinates: {
        type: ['object', 'null'],
        required: ['lat', 'long'],
        properties: {
          lat: {
            type: 'number',
          },
          long: {
            type: 'number',
          },
        },
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
