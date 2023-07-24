import { Todo } from './Todos';

interface Props {
  data: Todo;
  onToggleComplete: (todo: Todo) => void;
  onDelete: (todo: Todo) => void;
}

export function TodoItem({ data, onToggleComplete, onDelete }: Props) {
  return (
    <li>
      <label>
        <input
          type="checkbox"
          checked={data.completed}
          onChange={() => onToggleComplete(data)}
        />{' '}
        {data.title}
      </label>{' '}
      <button onClick={() => onDelete(data)}>&times;</button>
    </li>
  );
}
