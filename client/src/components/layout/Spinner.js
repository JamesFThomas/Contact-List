import React, {Fragment} from 'react';
import spinner from './spinner.gif';

// this component displays the spinner gif when fetched data is loading
    //  because arrow function, implicit return can be used
const Spinner = () =>
    <Fragment>
      <img src={spinner} alt='Loading ...' style={{width:'200px', margin:'auto', display:'block'}} />
    </Fragment>

export default Spinner;