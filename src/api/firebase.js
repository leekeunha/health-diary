import { initializeApp } from 'firebase/app';
import { v4 as uuid } from 'uuid';
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  onAuthStateChanged,
} from 'firebase/auth';
import { getDatabase, ref, set, get, remove } from 'firebase/database';

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
  const bodyPartId = uuid();
  const bodyPartData = {
    id: bodyPartId,
    name: bodyPartName
  };

  const bodyPartRef = ref(database, `bodyParts/${bodyPartId}`);
  return set(bodyPartRef, bodyPartData);
}

export async function addSport(bodyPartId, sportId, sportName) {
  const sportData = {
    id: sportId,
    name: sportName,
  };

  return set(ref(database, `sports/${bodyPartId}/${sportId}`), sportData);
}

export async function deleteSport(bodyPartId, sportId) {
  return remove(ref(database, `sports/${bodyPartId}/${sportId}`));
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

      return Object.entries(userData).map(([date, bodyParts]) => {
        const formattedDate = formatDate(date);

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

export async function getExerciseNameByChildId(childId) {
  const sportsPath = 'sports';
  try {
    const sportsSnapshot = await get(ref(database, sportsPath));
    if (sportsSnapshot.exists()) {
      const sportsData = sportsSnapshot.val();
      for (const bodyPartId in sportsData) {
        for (const exerciseId in sportsData[bodyPartId]) {
          const exerciseData = sportsData[bodyPartId][exerciseId];
          if (exerciseData.id === childId) {
            return exerciseData.name;
          }
        }
      }
      console.log('No exercise with the given id found');
      return null;
    } else {
      console.log('No data available in the sports path');
      return null;
    }
  } catch (error) {
    console.error('Firebase getExerciseNameByChildId error: ', error);
    throw new Error(`Unable to fetch exercise name by child id: ${error.message}`);
  }
}



export async function getfetchHistoryDetails(uid, date) {
  return get(ref(database, `exerciseHistory/${uid}/${date}`)).then((snapshot) => {
    if (snapshot.exists()) {
      const userData = snapshot.val();
      const formattedData = [];

      Object.keys(userData).forEach(bodyPartId => {
        Object.keys(userData[bodyPartId]).forEach(exerciseId => {

          const sets = Object.values(userData[bodyPartId][exerciseId]).sort((a, b) => {
            return a.no - b.no;
          });

          formattedData.push({
            id: exerciseId,
            sets: sets
          });
        });
      });

      console.log('getfetchHistoryDetails : ', JSON.stringify(formattedData));

      return formattedData;
    }
    return [];
  });
}




function formatDate(dateStr) {
  const year = dateStr.substring(0, 4);
  const month = dateStr.substring(4, 6);
  const day = dateStr.substring(6, 8);
  const hour = dateStr.substring(8, 10);
  return `${year}.${month}.${day}.${hour}:00`;
}

export async function getSportHistories(userId, exerciseId) {
  const exerciseHistoryRef = ref(database, `exerciseHistory/${userId}`);

  try {
    const snapshot = await get(exerciseHistoryRef);

    if (snapshot.exists()) {
      let maxSetsByDate = {};
      const userData = snapshot.val();
      console.log(JSON.stringify(userData));

      for (const [date, exercises] of Object.entries(userData)) {
        for (const exerciseData of Object.values(exercises)) {
          const exerciseSets = exerciseData[exerciseId];
          if (exerciseSets) {
            for (const set of Object.values(exerciseSets)) {
              if (set.weight.trim() !== "") {
                const weight = parseInt(set.weight, 10);

                if (!isNaN(weight) && (!maxSetsByDate[date] || weight > maxSetsByDate[date].weight)) {
                  maxSetsByDate[date] = { date, reps: set.reps, weight };
                }
              }
            }
          }
        }
      }
      console.log({ maxSetsByDate });

      return Object.values(maxSetsByDate);
    } else {
      console.log('No data available for this user');
      return null;
    }
  } catch (error) {
    console.error('Error fetching sport histories:', error);
    return null;
  }
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
  return get(ref(database, `bodyParts/${id}`)).then((snapshot) => {
    if (snapshot.exists()) {
      return Object.values(snapshot.val());
    }
    return [];
  });
}

export async function getExerciseNameByIds(bodyPartId, exerciseId) {
  const sportPath = `sports/${bodyPartId}/${exerciseId}`;
  try {

    const snapshot = await get(ref(database, sportPath));
    if (snapshot.exists()) {
      const exerciseNames = snapshot.val();

      return Object.keys(exerciseNames).map(key => exerciseNames[key]);
    } else {
      console.log('No data available for: ', sportPath);
      return [];
    }
  } catch (error) {
    console.error('Firebase getExerciseNameById error: ', error);
    throw new Error(`Unable to fetch exercise names: ${error.message}`);
  }
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

  Object.entries(exercises).forEach(([sportId, exercise]) => {
    const setsData = {};

    exercise.sets.forEach((set, index) => {
      const setId = uuid();
      setsData[setId] = {
        ...set,
        id: setId,
        no: index + 1
      };
    });

    exerciseHistoryData[sportId] = setsData;
  });

  const dbRef = ref(database, `exerciseHistory/${userId}/${exerciseDateFormatted}/${exerciseBodyPartId}`);
  return set(dbRef, exerciseHistoryData);
}
