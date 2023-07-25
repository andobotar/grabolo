import { useCallback, useMemo, useState } from 'react';
import classNames from 'classnames';

import './app.scss';
import classes from './App.module.scss';

const COLORS = [
  'yellow',
  'black',
  'silver',
  'dodgerblue',
  'tomato',
  'limegreen'
];

function App() {
  const [isRolling, setIsRolling] = useState(false);
  const [number, setNumber] = useState();
  const [colorIndex, setColorIndex] = useState();

  const handleClick = useCallback(() => {
    setIsRolling(true);
    const timeout = Math.random() * 1500;
    setTimeout(() => {
      setNumber(Math.floor(Math.random() * 6));
      setColorIndex(Math.floor(Math.random() * 6));
      setIsRolling(false);
    }, timeout);
  }, []);

  const colorCardText = useMemo(() => {
    if (isRolling) {
      return <div className="loader" />;
    } else if (colorIndex === undefined) {
      return '?';
    } else {
      return '';
    }
  }, [colorIndex, isRolling]);

  const numCardText = useMemo(() => {
    if (isRolling) {
      return <div className="loader" />;
    } else if (number === undefined) {
      return '?';
    } else {
      return number + 1;
    }
  }, [isRolling, number]);

  return (
    <>
      <div className={classes.container}>
        <div
          className={classNames(classes.card, classes.colorCard)}
          style={{
            backgroundColor:
              isRolling || colorIndex === undefined
                ? 'white'
                : COLORS[colorIndex]
          }}
        >
          {colorCardText}
        </div>
        <div className={classNames(classes.card, classes.numberCard)}>
          {numCardText}
        </div>
      </div>
      <div className={classes.buttonContainer}>
        <button onClick={handleClick}>roll dice</button>
      </div>
    </>
  );
}

export default App;
