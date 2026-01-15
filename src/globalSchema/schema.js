const z = require('zod');
export const BasicAnimeSchema = z.object({
  title: z.string(),
  alternativeTitle: z.string(),
  id: z.string(),
  poster: z.url(),
});