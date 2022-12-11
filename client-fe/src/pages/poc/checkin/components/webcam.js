import * as React from "react";
import Webcam from "react-webcam";

const WebCam = React.forwardRef(
  ({ image, camId, captureImage = (f) => f }, ref) => {
    // const [image, setImage] = React.useState("");
    const webcamRef = React.useRef(null);
    const [deviceId, setDeviceId] = React.useState();
    const [devices, setDevices] = React.useState([]);
    const videoConstraints =
      deviceId === ""
        ? {
            width: 300,
            height: 300,
            facingMode: "user",
          }
        : {
            width: 300,
            height: 300,
            facingMode: "user",
            deviceId: deviceId,
          };

    React.useImperativeHandle(ref, () => ({
      captureCamera,
    }));

    const handleDevices = React.useCallback(
      (mediaDevices) =>
        setDevices(mediaDevices.filter(({ kind }) => kind === "videoinput")),
      [setDevices]
    );

    React.useEffect(() => {
      navigator.mediaDevices.enumerateDevices().then(handleDevices);
    }, [handleDevices]);

    const captureCamera = () => {
      const imageSrc = webcamRef.current.getScreenshot();
      console.log(webcamRef.current);
      console.log(imageSrc);
      //   setImage(imageSrc);
      captureImage(imageSrc, camId);
    };

    return (
      <div className="poc-cam">
        <div className="webcam-container">
          <div className="webcam-img">
            {image === "" ? (
              <Webcam
                audio={false}
                height={300}
                ref={webcamRef}
                screenshotFormat="image/jpeg"
                width={300}
                videoConstraints={videoConstraints}
              />
            ) : (
              <img src={image} alt="Check-in guest" />
            )}
            {image === "" ? <div></div> : console.log(image)}
          </div>
          <div>
            {image !== "" ? (
              <button
                onClick={(e) => {
                  e.preventDefault();
                  // setImage("");
                  captureImage("", camId);
                }}
                className="webcam-btn"
              >
                Retake Image
              </button>
            ) : (
              <button
                onClick={(e) => {
                  e.preventDefault();
                  captureCamera();
                }}
                className="webcam-btn"
              >
                Capture
              </button>
            )}
          </div>
          <div>
            <select
              id="device-selection"
              onChange={(e) => setDeviceId(e.target.value)}
            >
              {devices.map((device, key) => (
                <option key={key}>
                  {/* <Webcam audio={false} videoConstraints={{ deviceId: device.deviceId }} /> */}
                  {device.label || `Device ${key + 1}`}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
    );
  }
);

export default WebCam;
