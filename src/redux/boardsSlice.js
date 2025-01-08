import { createSlice } from "@reduxjs/toolkit";
import data from '../data/data.json'

const boardsSlice = createSlice({
    name:'boards',
    initialState: data.boards,
    reducers : {
        addBoard: (state, action) => {
          // console.log(state)
          const isActive = state.length > 0 ? false : true;
          const payload = action.payload;
          console.log(payload)
          const board = {
            name: payload.name,
            isActive,
            colums: [],
          };
          board.columns = payload.boardColumn;
          console.log(board)
          state.push(board);
        },
        editBoard: (state, action) => {
          const payload = action.payload;
          const board = state.find((board) => board.isActive);
          board.name = payload.name;
          board.colums = payload.boardColumn;
        },
        deleteBoard: (state) => {
          const board = state.find((board) => board.isActive);
          state.splice(state.indexOf(board), 1);
        },
        setBoardActive: (state, action) => {
          state.map((board, index) => {
            index === action.payload.index
              ? (board.isActive = true)
              : (board.isActive = false);
            return board;
          });
        },
        addTask: (state, action) => {
          const { title, status, description, subTasks,AssingTo, dudeDate, newColIndex, priority } =
            action.payload;
            // console.log(subtasks)
          const task = { title, description, subTasks, status,AssingTo, dudeDate, priority };
          const board = state.find((board) => board.isActive);
          const column = board.colums.find((col, index) => index === newColIndex);
          column.task.push(task);
        },
        editTask: (state, action) => {
          const {
            title,
            status,
            description,
            subTasks,
            AssingTo, 
            dudeDate,
            prevColIndex,
            newColIndex,
            taskIndex,
            priority
          } = action.payload;
          const board = state.find((board) => board.isActive);
          const column = board.colums.find((col, index) => index === prevColIndex);
          const task = column.task.find((task, index) => index === taskIndex);
          task.title = title;
          task.status = status;
          task.AssingTo = AssingTo;
          task.dudeDate = dudeDate;
          task.description = description;
          task.subTasks = subTasks;
          task.priority = priority;
          if (prevColIndex === newColIndex) return;
          column.task = column.task.filter((task, index) => index !== taskIndex);
          const newCol = board.colums.find((col, index) => index === newColIndex);
          newCol.task.push(task);
        },
        dragTask: (state, action) => {
          const { colIndex, prevColIndex, taskIndex } = action.payload;
          const board = state.find((board) => board.isActive);
          const prevCol = board.colums.find((col, i) => i === prevColIndex);
          const task = prevCol.task.splice(taskIndex, 1)[0];
          board.columns.find((col, i) => i === colIndex).task.push(task);
        },
        setSubtaskCompleted: (state, action) => {
          const payload = action.payload;
          const board = state.find((board) => board.isActive);
          const col = board.colums.find((col, i) => i === payload.colIndex);
          const task = col.task.find((task, i) => i === payload.taskIndex);
          const subtask = task.subTasks.find((subtask, i) => i === payload.index);
          subtask.isCompleted = !subtask.isCompleted;
        },
        setTaskStatus: (state, action) => {
          const payload = action.payload;
          const board = state.find((board) => board.isActive);
          const columns = board.colums;
          const col = columns.find((col, i) => i === payload.colIndex);
          if (payload.colIndex === payload.newColIndex) return;
          const task = col.task.find((task, i) => i === payload.taskIndex);
          task.status = payload.status;
          col.task = col.task.filter((task, i) => i !== payload.taskIndex);
          const newCol = columns.find((col, i) => i === payload.newColIndex);
          newCol.task.push(task);
        },
        deleteTask: (state, action) => {
          const payload = action.payload;
          const board = state.find((board) => board.isActive);
          const col = board.colums.find((col, i) => i === payload.colIndex);
          col.task = col.task.filter((task, i) => i !== payload.taskIndex);
        },
      }
})

export default boardsSlice;