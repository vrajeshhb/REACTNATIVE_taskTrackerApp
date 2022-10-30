// Author : Vrajesh Bhimajiani.
// React-native Git Project App One.
import React, {useState, useEffect} from 'react';
import type {Node} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  AsyncStorage,
} from 'react-native';
import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

import {Focus} from './src/features/focus/Focus';
import {Timer} from './src/features/timer/Timer';
//import {FlexDirectionBasics} from './src/FlexDirectionBasics';

const STATUS = {
  FINISED: 1,
  INCOMPLETE: 0,
};
const App: addSubject => Node = () => {
  const [focusSubject, setFocusSubject] = useState(null);
  const [subjectHistory, setSubjectHistory] = useState([]);

  const isDarkMode = useColorScheme() === 'dark';
  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  const onStopTask = () => {
    setFocusSubject(null);
  };

  const StoreSubjectHistory = (subject, status) => {
    setSubjectHistory([
      ...subjectHistory,
      {key: String(subjectHistory.length + 1), subject, status},
    ]);
  };
  const clearHistory = () => {
    //need  to clear history here...
    setSubjectHistory([]);
  };

  //demonstration for AsyncStrogae to store the subject history while app is been closed
  const SaveSubjectHistory = async () => {
    try {
      await AsyncStorage.setItem(
        'subjectHistory',
        JSON.stringify(subjectHistory),
      );
    } catch (e) {
      console.log(e);
    }
  };
  const LoadFocusHistory = async () => {
    try {
      const history = await AsyncStorage.getItem('subjectHistory');
      if (history && JSON.parse(history).length) {
        setSubjectHistory(JSON.parse(history));
      }
    } catch (e) {
      console.log(e);
    }
  };
  //loadfosuchistroy function must be called on mount of the app ,
  useEffect(() => {
    LoadFocusHistory();
  }, []);
  useEffect(() => {
    //setSubjectHistory([...subjectHistory, focusSubject]);
    SaveSubjectHistory();
  }, [focusSubject]);
  //better way is to make function using const.
  //now ended up using it for async strogare.

  return (
    <View style={styles.container}>
      {focusSubject ? (
        <Timer
          focusSubject={focusSubject}
          onTimerEnd={() => {
            StoreSubjectHistory(focusSubject, STATUS.FINISED);
            setFocusSubject(null);
          }}
          onStopTask={() => {
            StoreSubjectHistory(focusSubject, STATUS.INCOMPLETE);
            onStopTask();
          }}
        />
      ) : (
        <Focus
          addSubject={setFocusSubject}
          subjectHistory={subjectHistory}
          clearHistory={clearHistory}
        />
      )}

      {/* <Text>{focusSubject}</Text> */}
      {/* <FlexDirectionBasics /> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, padding: 20, backgroundColor: 'purple', marginTop: 30},
});

export default App;
