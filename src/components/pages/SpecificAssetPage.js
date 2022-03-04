import React, { useState, useEffect,  } from "react";
import { Link, useParams } from 'react-router-dom';
function SpecificAssetPage() {
  let params = useParams();
  
  useEffect(() => {
   console.log(params.assetName);
  }, []);

  return (
    <>
    <h> full settings for {params.assetName} </h>
    <br></br>
    <br></br>
    <br></br>
    <br></br>
    </>
  );
}



export default SpecificAssetPage;