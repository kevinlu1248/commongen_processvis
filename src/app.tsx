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

export default (props: any) => {
  const [data, setData] = useState<ProgressType>(defaultData);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const getData = () => {
    setIsLoading(true);
    props.collectionRef
      .get()
      .then((querySnapshot: any) => {
        const tmpData = defaultData;
        querySnapshot.forEach((doc: any) => {
          tmpData[doc.id] = doc.data();
        });
        setIsLoading(false);
        setData(tmpData);
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
