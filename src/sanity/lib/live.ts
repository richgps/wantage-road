// Querying with "sanityFetch" will keep content automatically updated
// Before using it, import and render "<SanityLive />" in your layout, see
// https://github.com/sanity-io/next-sanity#live-content-api for more information.
import { client } from './client';
import { token } from "@/sanity/lib/token"
import { defineLive } from "next-sanity";

import { apiVersion } from '../env';

export const { sanityFetch, SanityLive } = defineLive({
  client: client.withConfig({
    apiVersion,
  }),
  serverToken: token,
  browserToken: token,
});
