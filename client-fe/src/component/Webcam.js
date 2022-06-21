import React, { useState } from 'react';
import Webcam from "react-webcam";


const WebcamComponent = () => <Webcam />;

// const videoConstraints = {
//     width: 220,
//     height: 200,
//     facingMode: "user"
// };

export const WebcamCapture = () => {

    const [image,setImage]=useState('');
    const webcamRef = React.useRef(null);
    const [deviceId, setDeviceId] = React.useState();
    const [devices, setDevices] = React.useState([]);

    const videoConstraints = (deviceId==="")?{
        width: 220,
        height: 200,
        facingMode: "user"
    }:{
        width: 220,
        height: 200,
        facingMode: "user",
        deviceId: deviceId
    };

    const handleDevices = React.useCallback(
        mediaDevices =>
          setDevices(mediaDevices.filter(({ kind }) => kind === "videoinput")),
        [setDevices]
      );
    
    React.useEffect(
        () => {
          navigator.mediaDevices.enumerateDevices().then(handleDevices);
        },
        [handleDevices]
      );
    
    const capture = React.useCallback(
        () => {
        const imageSrc = webcamRef.current.getScreenshot();
        setImage(imageSrc)
        });
    


    return (
      <div className="webcam-container">
        <div className="webcam-img">
          {image == "" ? (
            <Webcam
              audio={false}
              height={200}
              ref={webcamRef}
              screenshotFormat="image/jpeg"
              width={220}
              videoConstraints={videoConstraints}
            />
          ) : (
            <img src={image} />
          )}
          {image == "" ? <div></div> : console.log(image)}
        </div>
        <div>
          {image != "" ? (
            <button
              onClick={(e) => {
                e.preventDefault();
                setImage("");
              }}
              className="webcam-btn"
            >
              Retake Image
            </button>
          ) : (
            <button
              onClick={(e) => {
                e.preventDefault();
                capture();
              }}
              className="webcam-btn"
            >
              Capture
            </button>
          )}
        </div>
        <div>
            <select id="device-selection" onChange={(e) => setDeviceId(e.target.value)}>
          {devices.map((device, key) => (
            <option>
              {/* <Webcam audio={false} videoConstraints={{ deviceId: device.deviceId }} /> */}
              {device.label || `Device ${key + 1}`}
            </option>
          ))}</select>

{/* <p id="demo">Hello 'device-selection'</p>
{deviceId===null?console.log('empty device'):(<p>{deviceId}</p>)} */}
        </div>
      </div>
    );
};