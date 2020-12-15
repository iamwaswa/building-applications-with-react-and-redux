import React from 'react';
import { render } from 'react-dom';

function Hi(){
  return <p>Hello darkness my old friend</p>;
}

render(<Hi />, document.getElementById(`app`));