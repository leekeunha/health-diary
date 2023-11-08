import { initializeApp } from 'firebase/app';
import { v4 as uuid } from 'uuid';
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  onAuthStateChanged,
} from 'firebase/auth';
import { getDatabase, ref, set, get, remove, update } from 'firebase/database';

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_FIREBASE_DB_URL,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
};

const app = initializeApp(firebaseConfig);
const auth = getAuth();
const provider = new GoogleAuthProvider();
const database = getDatabase(app);

export function login() {
  signInWithPopup(auth, provider).catch(console.error);
}

export function logout() {
  signOut(auth).catch(console.error);
}

export function onUserStateChange(callback) {
  onAuthStateChanged(auth, async (user) => {
    const updatedUser = user ? await adminUser(user) : null;

    callback(updatedUser);
  });
}

async function adminUser(user) {
  return get(ref(database, 'admins'))
    .then((snapshot) => {
      if (snapshot.exists()) {
        const admins = snapshot.val();
        const isAdmin = admins.includes(user.uid);
        return { ...user, isAdmin };
      }
      return user;
    });
}

export async function addNewProduct(product, image) {
  const id = uuid();
  return set(ref(database, `products/${id}`), {
    ...product,
    id,
    price: parseInt(product.price),
    image,
    options: product.options.split(','),
  });
}

export async function addBodyPart(bodyPartName) {
  const bodyPartId = uuid(); // Generate a unique ID for the new body part
  const bodyPartData = {
    id: bodyPartId,
    name: bodyPartName
  };

  const bodyPartRef = ref(database, `bodyParts/${bodyPartId}`);
  return set(bodyPartRef, bodyPartData);
}

export async function addSport(bodyPartId, sportName) {
  const sportId = uuid(); // Generate a unique ID for the sport
  const sportData = {
    id: sportId,
    name: sportName,
  };

  return set(ref(database, `sports/${bodyPartId}/${sportId}`), sportData);
}

export async function getProducts() {
  return get(ref(database, 'products')).then((snapshot) => {
    if (snapshot.exists()) {
      return Object.values(snapshot.val());
    }
    return [];
  });
}

export async function getBodyParts() {
  return get(ref(database, 'bodyParts')).then((snapshot) => {
    if (snapshot.exists()) {
      return Object.values(snapshot.val());
    }
    return [];
  });
}


export async function getMainMenus() {
  return get(ref(database, 'mainMenus')).then((snapshot) => {
    if (snapshot.exists()) {
      return Object.values(snapshot.val());
    }
    return [];
  });
}

export async function getCart(userId) {
  return get(ref(database, `carts/${userId}`))
    .then((snapshot) => {
      const items = snapshot.val() || {};
      return Object.values(items);
    });
}

export async function getSports(bodyPartId) {
  return get(ref(database, `sports/${bodyPartId}`))
    .then((snapshot) => {
      const items = snapshot.val() || {};
      return Object.values(items);
    });
}

export async function addOrUpdateToCart(userId, product) {
  return set(ref(database, `carts/${userId}/${product.id}`), product);
}

export async function removeFromCart(userId, productId) {
  return remove(ref(database, `carts/${userId}/${productId}`));
}

export async function saveExerciseSets(userId, exerciseDateFormatted, exerciseBodyPartId, exercises) {

  const exerciseHistoryData = {};


  exercises.forEach((exercise) => {
    const sportId = exercise.id;
    const setsData = {};

    exercise.sets.forEach((set, index) => {
      const setId = uuid(); // 각 세트에 대해 고유 ID 생성
      setsData[setId] = {
        ...set,
        id: setId,
        no: index + 1 // 세트 번호
      };
    });

    exerciseHistoryData[sportId] = setsData;
  });

  const dbRef = ref(database, `exerciseHistory/${userId}/${exerciseDateFormatted}/${exerciseBodyPartId}`);
  return set(dbRef, exerciseHistoryData);
}
