// @ts-nocheck
import * as __fd_glob_11 from "../content/docs/prototypes/card-interactions.mdx?collection=docs"
import * as __fd_glob_10 from "../content/docs/research/source-metadata.mdx?collection=docs"
import * as __fd_glob_9 from "../content/docs/faq/index.mdx?collection=docs"
import * as __fd_glob_8 from "../content/docs/design/tokens.mdx?collection=docs"
import * as __fd_glob_7 from "../content/docs/design/inline-treatments.mdx?collection=docs"
import * as __fd_glob_6 from "../content/docs/design/components.mdx?collection=docs"
import * as __fd_glob_5 from "../content/docs/index.mdx?collection=docs"
import { default as __fd_glob_4 } from "../content/docs/research/meta.json?collection=docs"
import { default as __fd_glob_3 } from "../content/docs/prototypes/meta.json?collection=docs"
import { default as __fd_glob_2 } from "../content/docs/faq/meta.json?collection=docs"
import { default as __fd_glob_1 } from "../content/docs/design/meta.json?collection=docs"
import { default as __fd_glob_0 } from "../content/docs/meta.json?collection=docs"
import { server } from 'fumadocs-mdx/runtime/server';
import type * as Config from '../source.config';

const create = server<typeof Config, import("fumadocs-mdx/runtime/types").InternalTypeConfig & {
  DocData: {
  }
}>({"doc":{"passthroughs":["extractedReferences"]}});

export const docs = await create.docs("docs", "content/docs", {"meta.json": __fd_glob_0, "design/meta.json": __fd_glob_1, "faq/meta.json": __fd_glob_2, "prototypes/meta.json": __fd_glob_3, "research/meta.json": __fd_glob_4, }, {"index.mdx": __fd_glob_5, "design/components.mdx": __fd_glob_6, "design/inline-treatments.mdx": __fd_glob_7, "design/tokens.mdx": __fd_glob_8, "faq/index.mdx": __fd_glob_9, "research/source-metadata.mdx": __fd_glob_10, "prototypes/card-interactions.mdx": __fd_glob_11, });