import { createRoute, z } from '@hono/zod-openapi';
import { BasicAnimeSchema } from '../../globalSchema/schema.js';

const Item = z.any();

const schema = z.object({
  status: z.boolean(),
  data: z.object({
    trending: z.array(
      BasicAnimeSchema.extend({
        rank: z.number(),
      })
    ),
  }),
});

const homeSchema = createRoute({
  method: 'post',
  path: '/home',
  responses: {
    200: {
      content: {
        'application/json': {
          schema: schema,
        },
      },
    },
  },
  description: 'Retrieve The HomePage Data',
});

export default homeSchema;
