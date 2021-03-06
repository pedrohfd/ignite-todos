import React from 'react'
import {
  FlatList,
  Image,
  TouchableOpacity,
  View,
  Text,
  StyleSheet,
  FlatListProps,
} from 'react-native'
import Icon from 'react-native-vector-icons/Feather'

import { ItemWrapper } from './ItemWrapper'

import trashIcon from '../assets/icons/trash/trash.png'
import penIcon from '../assets/icons/pen/pen.png'

export interface Task {
  id: number
  title: string
  done: boolean
}

interface TasksListProps {
  tasks: Task[]
  toggleTaskDone: (id: number) => void
  removeTask: (id: number) => void
  editTask: (id: number) => void
}

export function TasksList({
  tasks,
  toggleTaskDone,
  removeTask,
  editTask,
}: TasksListProps) {
  return (
    <FlatList
      data={tasks}
      keyExtractor={item => String(item.id)}
      contentContainerStyle={{ paddingBottom: 24 }}
      showsVerticalScrollIndicator={false}
      renderItem={({ item, index }) => {
        return (
          <ItemWrapper index={index}>
            <View>
              <TouchableOpacity
                testID={`button-${index}`}
                activeOpacity={0.7}
                style={styles.taskButton}
                //TODO - use onPress (toggle task) prop
                onPress={() => toggleTaskDone(item.id)}
              >
                <View
                  testID={`marker-${index}`}
                  //TODO - use style prop
                  style={!item.done ? styles.taskMarker : styles.taskMarkerDone}
                >
                  {item.done && <Icon name='check' size={12} color='#FFF' />}
                </View>

                <Text
                  //TODO - use style prop
                  style={!item.done ? styles.taskText : styles.taskTextDone}
                >
                  {item.title}
                </Text>
              </TouchableOpacity>
            </View>

            <TouchableOpacity
              style={{
                marginLeft: 150,
                borderRightWidth: 1,
                paddingRight: 25,
                borderColor: '#c4c4c4',
              }}
              onPress={() => editTask(item.id)}
            >
              <Image source={penIcon} />
            </TouchableOpacity>

            <TouchableOpacity
              testID={`trash-${index}`}
              style={{ paddingHorizontal: 24 }}
              onPress={() => removeTask(item.id)}
              //TODO - use onPress (remove task) prop
            >
              <Image source={trashIcon} />
            </TouchableOpacity>
          </ItemWrapper>
        )
      }}
      style={{
        marginTop: 32,
      }}
    />
  )
}

const styles = StyleSheet.create({
  taskButton: {
    flex: 1,
    paddingHorizontal: 24,
    paddingVertical: 15,
    marginBottom: 4,
    borderRadius: 4,
    flexDirection: 'row',
    alignItems: 'center',
  },
  taskMarker: {
    height: 16,
    width: 16,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#B2B2B2',
    marginRight: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  taskText: {
    color: '#666',
    fontFamily: 'Inter-Medium',
  },
  taskMarkerDone: {
    height: 16,
    width: 16,
    borderRadius: 4,
    backgroundColor: '#1DB863',
    marginRight: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  taskTextDone: {
    color: '#1DB863',
    textDecorationLine: 'line-through',
    fontFamily: 'Inter-Medium',
  },
})
