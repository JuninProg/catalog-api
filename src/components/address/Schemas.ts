import { FastifySchema } from 'fastify';

export const getAddressZipCodeSchema: FastifySchema = {
  querystring: {
    type: 'object',
    additionalProperties: false,
    required: ['zipCode'],
    properties: {
      zipCode: {
        type: 'string',
        minLength: 8,
        maxLength: 8,
      },
    },
  },
};

export const getAddressCoordinatesSchema: FastifySchema = {
  querystring: {
    type: 'object',
    additionalProperties: false,
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
};

export const postAddressSchema: FastifySchema = {
  body: {
    type: 'object',
    additionalProperties: false,
    required: ['zipCode', 'city', 'state', 'country', 'coordinates'],
    properties: {
      zipCode: {
        type: 'string',
        minLength: 8,
        maxLength: 8,
      },
      city: {
        type: 'string',
        minLength: 1,
      },
      state: {
        type: 'string',
        minLength: 1,
      },
      country: {
        type: 'string',
        minLength: 1,
      },
      coordinates: {
        type: 'object',
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

export const getAddressSchema: FastifySchema = {
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
      id: {
        type: 'integer',
        minimum: 1,
      },
      zipCode: {
        type: 'string',
        minLength: 8,
        maxLength: 8,
      },
    },
  },
};

export const postAddressUpdateSchema: FastifySchema = {
  body: {
    type: 'object',
    additionalProperties: false,
    required: ['zipCode', 'city', 'state', 'country', 'coordinates'],
    properties: {
      zipCode: {
        type: 'string',
        minLength: 8,
        maxLength: 8,
      },
      city: {
        type: 'string',
        minLength: 1,
      },
      state: {
        type: 'string',
        minLength: 1,
      },
      country: {
        type: 'string',
        minLength: 1,
      },
      coordinates: {
        type: 'object',
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

export const deleteAddressSchema: FastifySchema = {
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

export const restoreAddressSchema: FastifySchema = {
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
