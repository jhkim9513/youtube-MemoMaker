import firebaseApp from "./firebase";

class MemoRepository {
  syncMemo(userId, onUpdate) {
    const ref = firebaseApp.database().ref(`${userId}/memoList`);
    ref.on("value", (snapshot) => {
      const value = snapshot.val();
      value && onUpdate(value);
    });
    return () => ref.off();
  }

  saveMemo(userId, memo) {
    firebaseApp.database().ref(`${userId}/memoList/${memo.id}`).set(memo);
  }

  removeMemo(userId, memo) {
    firebaseApp.database().ref(`${userId}/memoList/${memo.id}`).remove();
  }
}

export default MemoRepository;
