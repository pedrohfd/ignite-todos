import React, { useState } from 'react'
import { Alert, StyleSheet, View } from 'react-native'

import { Header } from '../components/Header'
import { Task, TasksList } from '../components/TasksList'
import { TodoInput } from '../components/TodoInput'

export function Home() {
  const [tasks, setTasks] = useState<Task[]>([])
  const [edit, setEdit] = useState(0)

  function handleAddTask(newTaskTitle: string) {
    //TODO - add new task
    const data = {
      id: new Date().getTime(),
      title: newTaskTitle,
      done: false,
    }

    const foundItem = tasks.find(item => item.title === newTaskTitle)

    if (foundItem) {
      Alert.alert(
        'Task ja cadastrada',
        'Você não pode cadastrar uma task com o mesmo nome'
      )
      return
    }

    setTasks(oldState => [...oldState, data])
  }

  function handleToggleTaskDone(id: number) {
    //TODO - toggle task done if exists
    const updatedTasks = tasks.map(item => ({ ...item }))

    const foundItem = updatedTasks.find(item => item.id === id)

    if (!foundItem) {
      return
    }

    foundItem.done = !foundItem.done

    setTasks(updatedTasks)
  }

  function handleRemoveTask(id: number) {
    //TODO - remove task from state
    Alert.alert(
      'Remover item',
      'Tem certeza que você deseja remover esse item?',
      [
        {
          text: 'Sim',
          onPress: () =>
            setTasks(oldState => oldState.filter(item => item.id !== id)),
        },
        { text: 'Não' },
      ],
      { cancelable: false }
    )
  }

  function handleEditTask(id: number) {
    setEdit(id)
  }

  return (
    <View style={styles.container}>
      <Header tasksCounter={tasks.length} />

      <TodoInput addTask={handleAddTask} />

      <TasksList
        tasks={tasks}
        toggleTaskDone={handleToggleTaskDone}
        removeTask={handleRemoveTask}
        editTask={handleEditTask}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EBEBEB',
  },
})
