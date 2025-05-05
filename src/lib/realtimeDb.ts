
import { ref, set, get, onValue, off, push, remove, update, query, orderByChild } from 'firebase/database';
import { rtdb } from './firebase';

// Generic function to save data to a specific path
export const saveData = async (path: string, data: any) => {
  try {
    await set(ref(rtdb, path), data);
    return true;
  } catch (error) {
    console.error('Error saving data:', error);
    return false;
  }
};

// Generate a new unique key and save data
export const pushData = async (path: string, data: any) => {
  try {
    const newRef = push(ref(rtdb, path));
    await set(newRef, data);
    return newRef.key;
  } catch (error) {
    console.error('Error pushing data:', error);
    return null;
  }
};

// Retrieve data once
export const getData = async (path: string) => {
  try {
    const snapshot = await get(ref(rtdb, path));
    if (snapshot.exists()) {
      return snapshot.val();
    }
    return null;
  } catch (error) {
    console.error('Error getting data:', error);
    return null;
  }
};

// Subscribe to real-time updates
export const subscribeToData = (path: string, callback: (data: any) => void) => {
  const dataRef = ref(rtdb, path);
  onValue(dataRef, (snapshot) => {
    if (snapshot.exists()) {
      callback(snapshot.val());
    } else {
      callback(null);
    }
  });

  // Return the reference and path to allow unsubscribing later
  return { ref: dataRef, path };
};

// Unsubscribe from real-time updates
export const unsubscribeFromData = (subscription: { ref: any, path: string }) => {
  off(subscription.ref);
};

// Update specific fields in an existing node
export const updateData = async (path: string, updates: any) => {
  try {
    await update(ref(rtdb, path), updates);
    return true;
  } catch (error) {
    console.error('Error updating data:', error);
    return false;
  }
};

// Remove data at specified path
export const removeData = async (path: string) => {
  try {
    await remove(ref(rtdb, path));
    return true;
  } catch (error) {
    console.error('Error removing data:', error);
    return false;
  }
};

// Query data by child value
export const queryByChild = (path: string, child: string, callback: (data: any) => void) => {
  const dataQuery = query(ref(rtdb, path), orderByChild(child));
  onValue(dataQuery, (snapshot) => {
    const data: { [key: string]: any } = {};
    snapshot.forEach((childSnapshot) => {
      data[childSnapshot.key as string] = childSnapshot.val();
    });
    callback(data);
  });

  return { ref: dataQuery, path };
};
