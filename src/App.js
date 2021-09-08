import React, { useEffect, useState } from 'react';

import Tasks from './components/Tasks/Tasks';
import NewTask from './components/NewTask/NewTask';
import useHttp from './components/hooks/use-http';

function App() {
  const [tasks, setTasks] = useState([]);
  const url = 'http://localhost:8085/tasks';
  
  const {isLoading, error, sendRequest : fetchTasks} = useHttp();
 
  
  useEffect(() => {
    fetchTasks({ url : url}, tasks => setTasks(tasks));
  }, [fetchTasks]);

  const taskAddHandler = (task) => {
    setTasks((prevTasks) => prevTasks.concat(task));
  };

  return (
    <React.Fragment>
      <NewTask onAddTask={taskAddHandler} />
      <Tasks
        items={tasks}
        loading={isLoading}
        error={error}
        onFetch={() => fetchTasks({ url : url }, tasks => setTasks(tasks))}
      />
    </React.Fragment>
  );
}

export default App;
