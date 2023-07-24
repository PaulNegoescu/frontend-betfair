import { useEffect, useState } from 'react';
import { TodoItem } from './TodoItem';
import { getApi } from '@/utils/apiHelper';
import { useAuth } from '..';

export interface Todo {
  id: number;
  userId: number;
  title: string;
  completed: boolean;
}

const { read, create, update, remove } = getApi('todos');

export function Todos() {
  const [todos, setTodos] = useState<Todo[] | null>(null);

  const { user, token } = useAuth();

  useEffect(() => {
    async function getTodos() {
      const todos = await read({ userId: String(user?.id) }, { token });

      setTodos(todos);
    }

    getTodos();
  }, [user, token]);

  function handleCompleteTodo(todo: Todo) {
    const newCompleted = !todo.completed;

    update(todo.id, { completed: newCompleted }, { token });

    setTodos((oldState) => {
      // const newState = (oldState as Todo[]).map((t) => {
      //   if (t.id === todo.id) {
      //     t.completed = newCompleted;
      //   }
      //   return t;
      // });

      todo.completed = newCompleted;
      const newState = [...(oldState as Todo[])];
      return newState;
    });
  }

  async function handleDeleteTodo(todo: Todo) {
    await remove(todo.id, { token });

    const newTodos = (todos as Todo[]).filter((t) => t !== todo);
    setTodos(newTodos);
  }

  async function handleAddTodo(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const data = new FormData(form);
    const newTodo = {
      userId: user?.id,
      title: data.get('title'),
      completed: false,
    };

    const todo = await create(newTodo, { token });

    if (todos) {
      setTodos([...todos, todo]);
    }

    form.reset();
  }

  return (
    <>
      <h1>Todos</h1>
      <form onSubmit={handleAddTodo}>
        <label htmlFor="title">What do you want to do?</label>
        <input type="text" id="title" name="title" />
        <button type="submit">Add Todo</button>
      </form>
      {todos && (
        <ul>
          {todos.map((todo) => (
            <TodoItem
              key={todo.id}
              data={todo}
              onToggleComplete={handleCompleteTodo}
              onDelete={handleDeleteTodo}
            />
          ))}
        </ul>
      )}
    </>
  );
}
