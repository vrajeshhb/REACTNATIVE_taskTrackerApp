import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  SafeAreaView,
} from 'react-native';
import React, {useState} from 'react';
import {
  Avatar,
  Button,
  Card,
  Title,
  Paragraph,
  TextInput,
} from 'react-native-paper';

//import {RoundedButton} from '../../components/RoundedButton';
import {paddingSize, fontSize} from '../../utils/sizes';
//import {useKeepAwake} from 'expo-keep-awake'; // skiped from chapter25
//flatlist empty templete
const LeftContent = props => <Avatar.Icon {...props} icon="folder" />;

const Item = ({subject, status}) => (
  <Card
    style={{margin: 10, backgroundColor: status === 0 ? 'pink' : '#ccd5ae'}}>
    <Card.Content>
      <Title
        style={{
          fontWeight: 'bold',
          textAlign: 'center',
          fontSize: fontSize.xl,
        }}>
        {subject}
      </Title>
      <Paragraph style={{textAlign: 'center'}}>
        {status === 0 ? (
          <Text style={{fontWeight: 'bold', color: 'red'}}>INCOMPLETED</Text>
        ) : (
          <Text style={{fontWeight: 'bold', color: 'green'}}> COMPLETED</Text>
        )}
      </Paragraph>
    </Card.Content>
  </Card>
  // <View
  //   style={([styles.item], {flexDirection: 'row', justifyContent: 'center'})}>
  //    <Text style={styles.title}>{subject}</Text>
  //   <Text style={([styles.title], {marginTop: 15})}>{status}</Text>
  // </View>
);

export const Focus = ({addSubject, subjectHistory, clearHistory}) => {
  //useKeepAwake();
  const [tempItem, setTempItem] = useState(null);
  //flatlist empty item render
  const renderItem = ({item}) => (
    <Item subject={item.subject} status={item.status} />
  );

  return (
    <View styles={{flex: 1}}>
      <View styles={styles.titlecontainer}>
        <Text style={styles.title}>what would you like to focus on ? </Text>
        {/* <Text style={styles.title}>{tempItem} </Text> */}
      </View>

      {/* flex row example code */}
      <View
        style={{
          flexDirection: 'row',
          alignItem: 'center',
          justifyContent: 'center',
        }}>
        <TextInput
          style={styles.textInput}
          onChangeText={setTempItem}
          value={tempItem}
          // onSubmitEditing={({nativeEvent}) => {
          //   setTempItem(nativeEvent.text);
          // }}
        />
        {/* <RoundedButton
          onPress={() => {
            addSubject(tempItem);
            console.log('Rounded Button Pressed');
          }}
          style={{marginLeft: 10}}
          title="+"
          size={50}
        /> */}
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            addSubject(tempItem);
          }}>
          <Text style={styles.buttonTxt}>+</Text>
        </TouchableOpacity>
      </View>

      {!!subjectHistory.length && (
        <SafeAreaView>
          {/* <View style={{flexDirection: 'row'}}>
            <Text
              style={{
                textAlign: 'center',
                color: '#fff',
                fontSize: fontSize.lg,
                fontWeight: 'bold',
                marginTop: fontSize.md,
              }}>
              History
            </Text>
          </View> */}
          <TouchableOpacity
            style={styles.buttonClear}
            onPress={() => {
              clearHistory();
            }}>
            <Text style={styles.buttonTxtClear}>Clear History</Text>
          </TouchableOpacity>
          {/* Empty flatlist is here. */}
          <FlatList
            data={subjectHistory}
            renderItem={renderItem}
            keyExtractor={item => item.key}
            contentContainerStyle={{textAlign: 'center', alignItem: 'center'}}
          />
        </SafeAreaView>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
  titleContainer: {
    flex: 0.5,
    padding: paddingSize.md,
    justifyContent: 'center',
  },
  title: {
    color: '#fff',
    fontSize: fontSize.lg,
    fontWeight: 'bold',
  },
  inputcontainer: {},
  textInput: {
    flex: 1,
    backgroundColor: '#fff',
    // marginTop: 25,
  },
  button: {
    borderTopLeftRadius: 50,
    borderTopEndRadius: 50,
    borderBottomLeftRadius: 50,
    borderBottomEndRadius: 50,
    //   borderRadius: size,
    widht: 50,
    height: 50,
    borderColor: '#fff',
    borderWidth: 2,
    marginLeft: 10,
    padding: 5,
    alignItem: 'center',
  },
  buttonClear: {
    borderTopLeftRadius: 50,
    borderTopEndRadius: 50,
    borderBottomLeftRadius: 50,
    borderBottomEndRadius: 50,
    //   borderRadius: size,
    widht: '50%',
    height: 50,
    borderColor: '#9d0208',
    borderWidth: 2,
    //marginLeft: 5,
    padding: 5,
    alignItem: 'center',
    backgroundColor: '#fdffb6',
    marginTop: 10,
  },
  buttonTxt: {
    textAlign: 'center',
    fontSize: 28,
    color: '#fff',
    fontWeight: 'bold',
  },
  buttonTxtClear: {
    textAlign: 'center',
    fontSize: fontSize.lg,
    color: '#9d0208',
    fontWeight: 'bold',
    marginTop: 5,
  },
});
