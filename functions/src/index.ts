import * as functions from "firebase-functions";
import { Client } from "@elastic/enterprise-search";
import { SearchResponse } from "@elastic/enterprise-search/lib/api/app/types";
import "dotenv/config";

const ELASTIC_ENDPOINT = "https://recipe-finder.ent.us-central1.gcp.cloud.es.io";
const ENGINE_NAME = "recipe-search-engine";

const cors = require("cors")({ origin: true });

const client = new Client({
  url: ELASTIC_ENDPOINT,
  auth: {
    username: "elastic",
    password: process.env.ELASTIC_PASSWORD || "",
  }
});

const cleanResults = ({ results }: SearchResponse, queriedIngredients: string[]) => (
  // Note: ts-ignore is required here because Elastic types are just wrong >:(
  // @ts-ignore
  results.map(({ instructions, ingredients, id, title, _meta }) => ({
    instructions: instructions.raw,
    ingredients: ingredients.raw,
    id: id.raw,
    title: title.raw,
    match: _meta.score / 10
  })).sort((recipeA, recipeB) => recipeB.match - recipeA.match)
);

export const searchRecipes = functions.https.onRequest(async (request, response) => {
  cors(request, response, async () => {
    const textSearch: string = request.body.text;
    const ingredients: string[] = request.body.ingredients;
    const page: number | undefined = request.body.page;
    try {
      const appSearchResponse = await client.app.search({
        engine_name: ENGINE_NAME,
        body: {
          query: textSearch,
          filters: {
            any: {
              searchingredients: ingredients
            }
          },
          page: {
            size: 20,
            current: page
          },
          search_fields: {
            instructions: {},
            ingredients: {},
            title: {}
          },
          result_fields: {
            id: { raw: {} },
            instructions: { raw: {} },
            ingredients: { raw: {} },
            title: { raw: {} }
          }
        }
      });
      response.status(200).send({
        page: appSearchResponse.meta.page,
        results: cleanResults(appSearchResponse, ingredients)
      });
    } catch (e) {
      console.error(e);
      response.status(400).send({ error: e });
    }
  });
});