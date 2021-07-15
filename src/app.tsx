import * as React from 'react';
const useState = React.useState;
const useEffect = React.useState;
import LinearProgress from '@material-ui/core/LinearProgress';

interface ProgressItem {
  done: number;
  lock: 'not started' | 'in progress' | 'completed';
}
interface ProgressType extends Array<ProgressItem> {}

const status_to_color: { [key: string]: 'primary' | 'secondary' } = {
  'not started': 'secondary',
  'in progress': 'primary',
  completed: 'primary',
};

const defaultData = new Array<ProgressItem>(30);
for (let i = 0; i < 30; i++) {
  defaultData[i] = { done: 0, lock: 'not started' };
}

export default () => {
  const [data, setData] = useState<ProgressType>(defaultData);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const getData = () => {
    setIsLoading(true);
    fetch('/progress', { method: 'POST' })
      .then((result: any) => {
        if (result.ok) {
          result.json().then((obj: ProgressType) => {
            setData(obj);
            console.log(obj);
            setIsLoading(false);
          });
        }
      })
      .catch(console.log);
  };
  useEffect(() => {
    getData();
    const timer = setTimeout(() => getData(), 60 * 1000);
    return () => {
      clearTimeout(timer);
    };
  });
  return (
    <>
      <h1>Load visualizer for CommonGen image scraping</h1>
      <p>Updates every 30 seconds.{isLoading && <> Fetching data...</>}</p>
      {data.map((progressItem, index) => (
        <>
          <p>
            Depth {index}/30: {Math.round((progressItem.done / 32574) * 100)}%{' '}
            {progressItem.done}/32574 ({progressItem.lock})
          </p>
          <LinearProgress
            color={status_to_color[progressItem.lock]}
            variant="determinate"
            value={(progressItem.done / 32574) * 100}
          ></LinearProgress>
        </>
      ))}
    </>
  );
};
