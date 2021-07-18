import { fabric } from "fabric";
import React from 'react';


const useFabricJs = (canvas, options) => {

    const [fabricInstance, setFabricInstance] = React.useState((new fabric.Canvas(canvas, options)));

    renderAll = () => {

    }


    React.useEffect(() => {
        if (canvas && !fabricInstance) {
            setFabricInstance((new fabric.Canvas(canvas, options)));
        }
    }, [canvas]);


    return {
        fabricInstance
    }
}