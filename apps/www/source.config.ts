import {
  defineConfig,
  defineDocs,
  frontmatterSchema,
} from "fumadocs-mdx/config"
import rehypePrettyCode from "rehype-pretty-code"
import { z } from "zod"

import { transformers } from "@/lib/highlight-code"

export default defineConfig({
  mdxOptions: {
    rehypePlugins: (plugins) => {
      plugins.shift()
      plugins.push([
        // TODO: fix the type.
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        rehypePrettyCode as any,
        {
          theme: {
            dark: "github-dark",
            light: "github-light-default",
          },
          transformers,
        },
      ])

      return plugins
    },
  },
})

export const docs = defineDocs({
  dir: "../../projects",
  docs: {
    schema: frontmatterSchema.extend({
      links: z
        .object({
          doc: z.string().optional(),
          api: z.string().optional(),
        })
        .optional(),
      authorIds: z.array(z.string()).optional(),
      categories: z.array(z.string()).optional(),
      isFeatured: z.boolean().optional(),
      image: z.string().optional(),
      demoUrl: z.string().nullable().optional(),
      repoUrl: z.string().nullable().optional(),
      videoUrl: z.string().nullable().optional(),
      xUrl: z.string().nullable().optional(),
      date: z.string().optional(),
    }),
  },
})
