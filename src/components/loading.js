import React from 'react'

import {ScaleLoader} from 'halogen'

const Loading = () => <div className="center ma7 center" style={{height: '40px', width: '45px'}}>
    <ScaleLoader color='#000' size="150px"/>
</div>;

export {Loading}