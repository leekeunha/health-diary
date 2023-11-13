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
  debugger;
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

export async function getExerciseHistories(uid) {
  return get(ref(database, `exerciseHistory/${uid}`)).then((snapshot) => {
    if (snapshot.exists()) {
      const userData = snapshot.val();
      console.log('userData : ', JSON.stringify(userData));

      // 각 날짜별로 운동 기록을 반환하는 구조를 생성합니다.
      return Object.entries(userData).map(([date, bodyParts]) => {
        // 날짜 및 시간 형식을 변환합니다.
        const formattedDate = formatDate(date);

        // bodyPartId별로 exerciseId의 배열을 생성합니다.
        let exerciseByBodyPart = {};
        Object.entries(bodyParts).forEach(([bodyPartId, exercises]) => {
          exerciseByBodyPart[bodyPartId] = Object.keys(exercises);
        });

        return {
          date: formattedDate,
          ...exerciseByBodyPart
        };
      });
    }
    return [];
  });
}

// "2023110817"과 같은 문자열을 "2023.11.08" 날짜 형식으로 변환합니다.
// 시간은 추가 정보가 필요하므로 가정한 값 "10:00"을 사용합니다.
function formatDate(dateStr) {
  const year = dateStr.substring(0, 4);
  const month = dateStr.substring(4, 6);
  const day = dateStr.substring(6, 8);
  // 실제 사용할 때는 dateStr에 시간 정보를 포함시켜야 합니다.
  return `${year}.${month}.${day}.10:00`; // 시간 정보를 어떻게 처리할지에 따라 변경이 필요합니다.
}




export async function getBodyParts() {
  return get(ref(database, 'bodyParts')).then((snapshot) => {
    if (snapshot.exists()) {
      return Object.values(snapshot.val());
    }
    return [];
  });
}

export async function getBodyPartById(id) {
  // return get(ref(database, `exerciseHistory/${uid}`)).then((snapshot) => {
  return get(ref(database, `bodyParts/${id}`)).then((snapshot) => {
    if (snapshot.exists()) {
      console.log('getBodyPartById', Object.values(snapshot.val()));
      return Object.values(snapshot.val());
    }
    return [];
  });
}

export async function getExerciseNameById(bodyPartId, exerciseId) {
  // return get(ref(database, `exerciseHistory/${uid}`)).then((snapshot) => {
  return get(ref(database, `bodyParts/${bodyPartId}/${exerciseId}`)).then((snapshot) => {
    if (snapshot.exists()) {
      console.log('getBodyPartById', Object.values(snapshot.val()));
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
  console.log('let exercises =', JSON.stringify(exercises));

  Object.entries(exercises).forEach(([sportId, exercise]) => {
    const setsData = {};

    exercise.sets.forEach((set, index) => {
      const setId = uuid(); // Generate a unique ID for each set
      setsData[setId] = {
        ...set,
        id: setId,
        no: index + 1 // Set number
      };
    });

    exerciseHistoryData[sportId] = setsData;
  });

  const dbRef = ref(database, `exerciseHistory/${userId}/${exerciseDateFormatted}/${exerciseBodyPartId}`);
  return set(dbRef, exerciseHistoryData);
}