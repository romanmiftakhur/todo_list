import React, { useState } from 'react';
import { View, Text, TextInput, Button, TouchableOpacity, FlatList, Dimensions, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const { width, height} = Dimensions.get('screen');

const App = () => {

  const [todos, setTodos] = useState([
    {id: 1, name: 'reading', completed: true},
    {id: 2, name: 'coding', completed: false}
  ]);

  const [ inputText, setInputText] = useState('');

  const addTodo = () => {
    if(inputText == '') {
      Alert.alert('Error', 'Please Input Todo');
    } else {
      const NewTodo = {
        id: Math.random(),
        name: inputText,
        completed: false
      }
      setTodos([...todos, NewTodo]);
      setInputText('');
    }
  }
  
  const markTodo = id => {
    const NewTodo = todos.map(item => {
      if(item.id == id){
        return{...item, completed: true}
      }
      return item;
    });
    setTodos(NewTodo);
  }

  const deleteTodo = id => {
    const NewTodo = todos.filter(item => item.id !== id);
    setTodos(NewTodo);
  }

  const clearAll = () => {
    setTodos([])
  }
  
  return (
    <View style={{ flex: 1, margin: 0, padding: 0,}}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', padding: 20, backgroundColor: 'white', elevation: 10}}>
        <Text style={{ fontSize: 20, fontWeight: 'bold', color: 'black'}}>TODO LIST</Text>
        <TouchableOpacity onPress={clearAll}>
          <Icon name='delete' size={30} color='red' />
        </TouchableOpacity>
      </View>
        <FlatList
          data={todos}
          renderItem={({item, index}) => (
            <View style={{ padding: 15, elevation: 5, borderRadius: 5, backgroundColor: 'white', marginBottom: 10, flexDirection: 'row', justifyContent: 'space-between'}}>
              <Text style={{ fontSize: 16, fontWeight: 'bold', marginHorizontal: 5, textDecorationLine: item?.completed ? 'line-through' : 'none' }}
              >
                {item.name}
              </Text>              
              <View style={{ flexDirection: 'row'}}>
                {
                  !item?.completed && (
                    <TouchableOpacity style={{ backgroundColor: 'green', marginHorizontal: 5 }} onPress={() => markTodo(item?.id)}>
                      <Icon name='done' size={24} color='white' />
                    </TouchableOpacity>
                )}
                <TouchableOpacity style={{ backgroundColor: 'red', marginHorizontal: 5}} onPress={() => deleteTodo(item?.id)}>
                  <Icon name='delete' size={24} color='white'/>
                </TouchableOpacity>
              </View>
            </View>
          )}
          showsVerticalScrollIndicator={false}
          style={{ marginTop: 15, marginHorizontal: 10, marginBottom: 80 }}
        />
      <View style={{ position: 'absolute', bottom: 0, flexDirection: 'row', marginHorizontal: 5, marginVertical: 20, justifyContent:'space-between'}}>
        <View style={{ width: width/1.4, borderRadius: 100, elevation: 5, backgroundColor: 'white', paddingLeft: 20,}}>
          <TextInput 
            placeholder='Input' 
            value={inputText}
            onChangeText={text => setInputText(text)}
          />
        </View>
        <TouchableOpacity style={{ borderRadius: 55, width: 50, marginLeft: 15, height: 50, backgroundColor: 'red', padding: 10 }} onPress={addTodo}>
          <Icon name='add' size={30} color='white'/>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default App