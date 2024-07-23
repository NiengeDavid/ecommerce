'use client'

import { createClient } from '@sanity/client'
import imageUrlBuilder from "@sanity/image-url";

export const client = createClient({
  projectId: 'bjizggh7',
  dataset: "production",
  apiVersion: "2024-04-16",
  useCdn: true,
  token: process.env.NEXT_APP_SANITY_TOKEN,
  ignoreBrowserTokenWarning: true
});

const builder = imageUrlBuilder(client);

export const urlFor = (source) => builder.image(source);