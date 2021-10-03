import { firebaseDB } from "./firebase";

class MemoRepository {
  syncMemo(userId, onUpdate) {
    const ref = firebaseDB.ref(`${userId}/memoList`);
    ref.on("value", (snapshot) => {
      const value = snapshot.val();
      value && onUpdate(value);
    });
    return () => ref.off();
  }

  searchMemo(userId, query, onUpdate) {
    const ref = firebaseDB.ref(`${userId}/memoList`);

    ref.on("value", (snapshot) => {
      const searchedValue = {};
      const value = snapshot.val();
      for (const key in value) {
        if (
          value[key].title.includes(query) ||
          value[key].title.toLowerCase().includes(query) ||
          value[key].title.toUpperCase().includes(query)
        ) {
          searchedValue[key] = value[key];
        }
      }
      value && onUpdate(searchedValue);
    });
  }

  saveMemo(userId, memo) {
    firebaseDB.ref(`${userId}/memoList/${memo.id}`).set(memo);
  }

  removeMemo(userId, memo) {
    firebaseDB.ref(`${userId}/memoList/${memo.id}`).remove();
  }

  removeCheckedMemo(userId, id) {
    firebaseDB.ref(`${userId}/memoList/${id}`).remove();
  }

  countTheme(userId, onUpdate) {
    const ref = firebaseDB.ref(`${userId}/memoList`);
    let [light, dark, red, blue] = [0, 0, 0, 0];
    ref.on("value", (snapshot) => {
      const value = snapshot.val();
      for (const key in value) {
        const theme = value[key].theme;
        switch (theme) {
          case "light":
            light++;
            break;
          case "dark":
            dark++;
            break;
          case "red":
            red++;
            break;
          case "blue":
            blue++;
            break;
          default:
            throw new Error(`unknown theme: ${theme}`);
        }
      }

      const numberOfTheme = [light, dark, red, blue];
      onUpdate(numberOfTheme);
    });
  }
}

export default MemoRepository;
