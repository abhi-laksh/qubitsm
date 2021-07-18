import { fabric } from "fabric";
import React from 'react';
import json from '../../../assets/a.json';

const FabricCanvas = React.memo(({ imageSrc }) => {

    const canvasRef = React.useRef();

    const [fabricInstance, setFabricInstance] = React.useState()


    React.useEffect(() => {
        if (!!canvasRef.current && !fabricInstance) {
            setFabricInstance((new fabric.Canvas(canvasRef.current, {
                width: 600,
                height: 600,
                backgroundColor: "#aaa"
            })));
        }
    }, [canvasRef]);


    React.useEffect(() => {
        if (!!fabricInstance) {
            // fabricInstance.renderAll();
            addImage()
        }
    }, [fabricInstance]);

    const addImage = () => {
        if (fabricInstance) {
            // fabric.Image.fromURL("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQxswv67cLPgpb1Uvra-Qf944oG9FnezOgNWw&usqp=CAU", (img) => {
            //     fabricInstance.add(img)
            // })
            fabricInstance.loadFromJSON(json, function () {
                fabricInstance.renderAll();
                console.log(JSON.stringify(fabricInstance));
                var json = fabricInstance.toJSON();
                console.log(JSON.stringify(json))
            })
        }
    };



    return (
        <canvas ref={canvasRef} />
    )
})

export default FabricCanvas
