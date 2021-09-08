import React, { useEffect, useState } from 'react';

import Tasks from './components/Tasks/Tasks';
import NewTask from './components/NewTask/NewTask';
import useHttp from './components/hooks/use-http';

function App() {
  const [tasks, setTasks] = useState([]);
  
  
  const {isLoading, error, sendRequest : fetchTasks} = useHttp();
  // const [isLoading, setIsLoading] = useState(false);
  // const [error, setError] = useState(null);
  // const [tasks, setTasks] = useState([]);

  // const fetchTasks = async () => {
  //   setIsLoading(true);
  //   setError(null);
  //   try {
  //     const response = await fetch(
  //       'http://localhost:8085/tasks'
  //     );

  //     if (!response.ok) {
  //       throw new Error('Request failed!');
  //     }

  //     setTasks(await response.json());
  //   } catch (err) {
  //     setError(err.message || 'Something went wrong!');
  //   }
  //   setIsLoading(false);
  // };

  useEffect(() => {
    const transformTasks = tasks => setTasks(tasks)
    fetchTasks({ url : 'http://localhost:8085/tasks'  }, transformTasks);
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
        onFetch={fetchTasks}
      />
    </React.Fragment>
  );
}

export default App;
