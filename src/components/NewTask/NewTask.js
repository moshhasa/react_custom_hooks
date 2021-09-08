import useHttp from '../hooks/use-http';

import Section from '../UI/Section';
import TaskForm from './TaskForm';

const NewTask = ({onAddTask}) => {
  const {isLoading, error, sendRequest : addTask} = useHttp();

  const enterTaskHandler = async (taskText) => {
    addTask({
      url : 'http://localhost:8085/tasks',
      method: 'POST',
      body: { text: taskText },
      headers: {
        'Content-Type': 'application/json',
      }
    }, task => onAddTask(task))
  };

  return (
    <Section>
      <TaskForm onEnterTask={enterTaskHandler} loading={isLoading} />
      {error && <p>{error}</p>}
    </Section>
  );
};

export default NewTask;
