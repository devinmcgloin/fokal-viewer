import React from 'react'

import ReactLoading from 'react-loading'

const Loading = () => <div className="center ma7 center" style={{height: 150, width: 150}}>
    <ReactLoading type='cubes' color='#000000' height={150} width={150}/>
</div>

export {Loading}