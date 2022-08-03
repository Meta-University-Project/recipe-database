import React from "react";
import { initializeApp } from "firebase/app";
import { collection, doc, getDoc, getDocs, getFirestore, query, where } from "firebase/firestore";
import axios, { AxiosResponse } from "axios";
import { getIngredientDetails } from "./utils";
import { FirestoreToRegularUnitConversion, FirestoreUnit } from "./units";

const SearchEndpoint = "https://us-central1-recipe--finder.cloudfunctions.net/searchRecipes";

const firebaseConfig = {
  apiKey: "AIzaSyB6_FtCCZMcRZ2edNytPrlPtQEH_zT8SqA",
  authDomain: "recipe--finder.firebaseapp.com",
  projectId: "recipe--finder",
  storageBucket: "recipe--finder.appspot.com",
  messagingSenderId: "851668473144",
  appId: "1:851668473144:web:781368dc86ec7505d19dcd",
  measurementId: "G-J19S7T0ECD"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

export const firestoreRecipeToRecipe = ({ ingredients, quantities, searchIngredients, units, url, forms, id, ...data }: FirestoreRecipe): Recipe => {
  const newIngredients: Ingredient[] = ingredients.map((name, index) => {
    const unit = FirestoreToRegularUnitConversion[units[index] as FirestoreUnit] || units[index];
    return {
      name,
      unit,
      quantity: quantities[index],
      form: forms[index]
    }
  });
  return {
    ...data,
    id,
    ingredients: newIngredients
  };
};

export const getRecipe = async (recipeId: string) => {
  const docRef = doc(db, "recipes", recipeId);
  const docSnap = await getDoc(docRef);
  if (!docSnap.exists()) {
    throw new Error(`No recipe exists with ID ${recipeId}`);
  }
  return firestoreRecipeToRecipe(docSnap.data() as FirestoreRecipe);
};

export const getIngredients = async () => {
  let options: IngredientOption[] = [];
  const querySnapshot = await getDocs(collection(db, "ingredients"));
  querySnapshot.forEach((doc) => {
    options.push({ id: doc.id, name: doc.data().name });
  });
  return options;
};

export const search = async (ingredients: SearchedIngredient[], textQuery: string, ingredientOptions: IngredientOption[], setNextPage: React.Dispatch<React.SetStateAction<number | null>>): Promise<Recipe[]> => {
  const { data } = await axios.post(SearchEndpoint, {
    text: textQuery,
    ingredients: ingredients.map(({ id }) => getIngredientDetails(id, ingredientOptions)?.name)
      .filter((ingredient) => !!ingredient)
  }) as AxiosResponse<SearchResponse>;
  setNextPage(data.page.current === data.page.total_pages ? null : data.page.current + 1);
  if (data.results.length === 0)
    return [];
  const recipesRef = collection(db, "recipes");
  const results = [...data.results];
  const recipes: Recipe[] = [];
  while (results.length > 0) {
    let queryData = results.splice(0, 10).map(({ id }) => id);
    const q = query(recipesRef, where("id", "in", queryData));
    const querySnapshot = await getDocs(q);
    for (const doc of querySnapshot.docs) {
      const data: FirestoreRecipe = doc.data() as FirestoreRecipe;
      const recipe = firestoreRecipeToRecipe(data);
      recipes.push(recipe);
    }
  }
  return recipes;
}

export default app;

