import React, { useState } from 'react';

const Counter = () => {
  
    const [counter, setCounter] = useState(0)
    return (
        <>
            <div className='container'>
                <h1 className='text-center' id='title'>Counter</h1>
                <div>
                    <p className='counter-label'>
                        {counter}
                    </p>
                    <div className='counter-control'>
                        <button onClick={() => setCounter(counter + 1)}>Increase</button>
                        <button onClick={() => setCounter(0)}>Reset</button>
                    </div>
                </div>
            </div>
        </>
    )
}
export default Counter;
