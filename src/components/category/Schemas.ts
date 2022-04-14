import { FastifySchema } from 'fastify';

export const postCategoriesSchema: FastifySchema = {
  body: {
    type: 'object',
    additionalProperties: false,
    required: ['name', 'categoryId', 'addressId', 'iconId'],
    properties: {
      name: {
        type: 'string',
        minLength: 1,
      },
      categoryId: {
        type: ['integer', 'null'],
        minimum: 1,
      },
      addressId: {
        type: ['integer', 'null'],
        minimum: 1,
      },
      iconId: {
        type: 'integer',
        minimum: 1,
      },
    },
  },
};

export const getCategoriesSchema: FastifySchema = {
  querystring: {
    type: 'object',
    additionalProperties: false,
    properties: {
      page: {
        type: 'integer',
        minimum: 1,
      },
      limit: {
        type: 'integer',
        minimum: 1,
      },
      lat: {
        type: 'number',
      },
      long: {
        type: 'number',
      },
      nonDeleted: {
        type: 'boolean',
        enum: [true],
      },
    },
  },
};

export const postCategoriesUpdateSchema: FastifySchema = {
  body: {
    type: 'object',
    additionalProperties: false,
    required: ['name', 'iconId'],
    properties: {
      name: {
        type: 'string',
        minLength: 1,
      },
      iconId: {
        type: 'integer',
        minimum: 1,
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

export const deleteCategorySchema: FastifySchema = {
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

export const restoreCategorySchema: FastifySchema = {
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

export const postCategoriesAdsSchema: FastifySchema = {
  body: {
    type: 'object',
    additionalProperties: false,
    required: [
      'customerId',
      'name',
      'description',
      'facebook',
      'instagram',
      'website',
      'email',
    ],
    properties: {
      customerId: {
        type: 'integer',
        minimum: 1,
      },
      name: {
        type: 'string',
        minLength: 1,
      },
      description: {
        type: ['string', 'null'],
        minLength: 1,
      },
      facebook: {
        type: ['string', 'null'],
        minLength: 1,
      },
      instagram: {
        type: ['string', 'null'],
        minLength: 1,
      },
      website: {
        type: ['string', 'null'],
        minLength: 1,
      },
      email: {
        type: ['string', 'null'],
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

export const getCategoriesAdsSchema: FastifySchema = {
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

export const postCategoriesAdsUpdateSchema: FastifySchema = {
  body: {
    type: 'object',
    additionalProperties: false,
    required: [
      'name',
      'description',
      'facebook',
      'instagram',
      'website',
      'email',
    ],
    properties: {
      name: {
        type: 'string',
        minLength: 1,
      },
      description: {
        type: ['string', 'null'],
        minLength: 1,
      },
      facebook: {
        type: ['string', 'null'],
        minLength: 1,
      },
      instagram: {
        type: ['string', 'null'],
        minLength: 1,
      },
      website: {
        type: ['string', 'null'],
        minLength: 1,
      },
      email: {
        type: ['string', 'null'],
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

export const deleteCategoryAdSchema: FastifySchema = {
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

export const restoreCategoryAdSchema: FastifySchema = {
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

export const postCategoriesAdsPhonesSchema: FastifySchema = {
  body: {
    type: 'object',
    additionalProperties: false,
    required: ['isWhatsapp', 'phone'],
    properties: {
      isWhatsapp: {
        type: 'boolean',
      },
      phone: {
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

export const deleteCategoryAdPhoneSchema: FastifySchema = {
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

export const postCategoriesAdsAddressesSchema: FastifySchema = {
  body: {
    type: 'object',
    additionalProperties: false,
    required: [
      'zipCode',
      'city',
      'state',
      'country',
      'coordinates',
      'street',
      'complement',
      'number',
      'neighborhood',
    ],
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
      street: {
        type: 'string',
        minLength: 1,
      },
      number: {
        type: 'string',
        minLength: 1,
      },
      complement: {
        type: ['string', 'null'],
        minLength: 1,
      },
      neighborhood: {
        type: ['string', 'null'],
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

export const deleteCategoryAdAddressSchema: FastifySchema = {
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

export const getCategoryAdSchema: FastifySchema = {
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

export const postCategoriesAdsAddressesUpdateSchema: FastifySchema = {
  body: {
    type: 'object',
    additionalProperties: false,
    required: [
      'zipCode',
      'city',
      'state',
      'country',
      'coordinates',
      'street',
      'complement',
      'number',
      'neighborhood',
    ],
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
      street: {
        type: 'string',
        minLength: 1,
      },
      number: {
        type: 'string',
        minLength: 1,
      },
      complement: {
        type: ['string', 'null'],
        minLength: 1,
      },
      neighborhood: {
        type: ['string', 'null'],
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

export const postCategoriesAdsPhonesUpdateSchema: FastifySchema = {
  body: {
    type: 'object',
    additionalProperties: false,
    required: ['isWhatsapp', 'phone'],
    properties: {
      isWhatsapp: {
        type: 'boolean',
      },
      phone: {
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

export const postCategoriesAdsFilesSchema: FastifySchema = {
  params: {
    type: 'object',
    additionalProperties: false,
    required: ['id', 'type'],
    properties: {
      id: {
        type: 'integer',
        minimum: 1,
      },
      type: {
        type: 'string',
        minLength: 1,
      },
    },
  },
};

export const postCategoriesAdsFilesUpdateSchema: FastifySchema = {
  body: {
    type: 'object',
    additionalProperties: false,
    required: ['type'],
    properties: {
      type: {
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

export const deleteCategoryAdFileSchema: FastifySchema = {
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

export const postCategoriesAdsActionsSchema: FastifySchema = {
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
  body: {
    type: 'object',
    additionalProperties: false,
    required: ['type', 'description', 'userId', 'uuid'],
    properties: {
      type: {
        type: 'string',
        minLength: 1,
      },
      description: {
        type: 'string',
        minLength: 1,
      },
      userId: {
        type: ['integer', 'null'],
        minimum: 1,
      },
      uuid: {
        type: 'string',
        minLength: 1,
      },
    },
  },
};

export const getCategoriesAdsActionsSchema: FastifySchema = {
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
  querystring: {
    type: 'object',
    additionalProperties: false,
    properties: {
      startDate: {
        type: 'string',
        format: 'date',
      },
      endDate: {
        type: 'string',
        format: 'date',
      },
      type: {
        type: 'string',
        minLength: 1,
      },
      groupByType: {
        type: 'boolean',
        enum: [true],
      },
    },
  },
};

export const postCategoriesAdsActionsUpdateSchema: FastifySchema = {
  body: {
    type: 'object',
    additionalProperties: false,
    required: ['uuid'],
    properties: {
      uuid: {
        type: 'string',
        minLength: 1,
      },
    },
  },
};

export const getFindCategoriesAdsSchema: FastifySchema = {
  querystring: {
    type: 'object',
    additionalProperties: false,
    properties: {
      page: {
        type: 'integer',
        minimum: 1,
      },
      limit: {
        type: 'integer',
        minimum: 1,
      },
      category: {
        type: 'string',
        minLength: 1,
      },
      name: {
        type: 'string',
        minLength: 1,
      },
      description: {
        type: 'string',
        minLength: 1,
      },
      lat: {
        type: 'number',
      },
      long: {
        type: 'number',
      },
    },
  },
};
