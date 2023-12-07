import React, { useEffect, useState } from "react"
import { View, Text, FlatList, Button, TextInput, StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { addTodo, deleteTodo, editTodo, fetchTodos} from "../redux/action";
import { TouchableOpacity } from "react-native-web";

const Home =()=>{
    const dispatch = useDispatch();
  const todos = useSelector((state) => state.todos);

  const [newTodo, setNewTodo] = useState('');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch('https://656591f5eb8bb4b70ef1d670.mockapi.io/todo1');
      const result = await response.json();
      dispatch(fetchTodos(result));
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleAddTodo = async () => {
    try {
      const todo = {
        id: Math.random().toString(),
        todojob: newTodo,
      };
      await fetch('https://656591f5eb8bb4b70ef1d670.mockapi.io/todo1', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(todo),
      });
      fetchData();
      setNewTodo('');
    } catch (error) {
      console.error('Error adding todo:', error);
    }
  };

  const handleDeleteTodo = async (todoId) => {
    try {
      await fetch(`https://656591f5eb8bb4b70ef1d670.mockapi.io/todo1/${todoId}`, {
        method: 'DELETE',
      });
      fetchData();
    } catch (error) {
      console.error('Error deleting todo:', error);
    }
  };

  const handleEditTodo = async (todo) => {
    try {
      const updatedTodo = {
        ...todo,
        todojob: 'Updated Todo', // Update with the new todojob value
      };
      await fetch(`https://656591f5eb8bb4b70ef1d670.mockapi.io/todo1/${todo.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedTodo),
      });
      fetchData();
    } catch (error) {
      console.error('Error editing todo:', error);
    }
  };

  const renderTodoItem = ({ item }) => (
    <View style={{flexDirection: 'row', marginTop: 20}}>
      <Text style={{fontWeight: 'bold', marginBottom: 20}}>id:{item.id}</Text>
      <Text  style={{fontWeight: 'bold', marginLeft: 20}}>item:{item.todojob}</Text>
      <TouchableOpacity style={{backgroundColor: 'blue', width: 70, height: 20, borderRadius: 5,alignItems: 'center', justifyContent: 'center', marginLeft: 20, marginRight: 5 }}  onPress={() => handleEditTodo(item)} >
          <Text style={{color: '#FFFFFF'}}>Edit</Text>
      </TouchableOpacity>
      <TouchableOpacity style={{backgroundColor: 'red', width: 70, height: 20, borderRadius: 5,alignItems: 'center', justifyContent: 'center'}} onPress={() => handleDeleteTodo(item.id)} >
          <Text style={{color: '#FFFFFF'}}>DELETE</Text>
      </TouchableOpacity>
      {/* <Button title="Edit" onPress={() => handleEditTodo(item)} />
      <Button title="Delete" onPress={() => handleDeleteTodo(item.id)} /> */}
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={{color: '#C4C4C4', fontSize: 30, fontWeight: 'bold'}}>Your Todo List:</Text>
      <FlatList 
        data={todos}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderTodoItem}
      />
      <View style={{flexDirection: 'row'}}>
        <TextInput style={{width: 250, height: 40, borderColor: '#C4C4C4', borderWidth: 1, borderRadius: 5, marginRight: 5, marginBottom: 20}}
          placeholder="Enter a new todo"
          value={newTodo}
          onChangeText={(text) => setNewTodo(text)}/>
        <TouchableOpacity style={{width: 80, height: 35, alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderColor: 'red', backgroundColor: '#6a94ff', borderRadius: 5}}  onPress={handleAddTodo} >
          <Text>Add Todo</Text>
        </TouchableOpacity>
       
        {/* <Button style={{marginBottom: 20}} title="Add Todo" onPress={handleAddTodo} /> */}
      </View>
      
    </View>
  );
};
const styles = StyleSheet.create({
  container:{
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'

  }
})
export default Home;