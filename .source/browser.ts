// @ts-nocheck
import { browser } from 'fumadocs-mdx/runtime/browser';
import type * as Config from '../source.config';

const create = browser<typeof Config, import("fumadocs-mdx/runtime/types").InternalTypeConfig & {
  DocData: {
  }
}>();
const browserCollections = {
  docs: create.doc("docs", {"index.mdx": () => import("../content/docs/index.mdx?collection=docs"), "design/components.mdx": () => import("../content/docs/design/components.mdx?collection=docs"), "design/inline-treatments.mdx": () => import("../content/docs/design/inline-treatments.mdx?collection=docs"), "design/tokens.mdx": () => import("../content/docs/design/tokens.mdx?collection=docs"), "faq/index.mdx": () => import("../content/docs/faq/index.mdx?collection=docs"), "prototypes/card-interactions.mdx": () => import("../content/docs/prototypes/card-interactions.mdx?collection=docs"), "research/source-metadata.mdx": () => import("../content/docs/research/source-metadata.mdx?collection=docs"), }),
};
export default browserCollections;