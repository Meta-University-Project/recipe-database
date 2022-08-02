import { initializeApp } from "firebase/app";
import { doc, getDoc, getFirestore } from "firebase/firestore";
import { FirestoreToRegularUnitConversion, FirestoreUnit } from "./units";

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

const firestoreRecipeToRecipe = ({ ingredients, quantities, searchIngredients, units, url, forms, ...data }: FirestoreRecipe): Recipe => {
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

export default app;

