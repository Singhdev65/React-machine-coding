import React, { useState, useRef } from "react";
import { Stage, Layer, Rect, Transformer } from "react-konva";

const VideoEditor = () => {
  const videoRef = useRef(null);
  const transformerRef = useRef(null); // Ref for Transformer component
  const [videoBlob, setVideoBlob] = useState(null);
  const [selectedId, selectShape] = useState(null);
  const [cropping, setCropping] = useState(false);
  const [cropBox, setCropBox] = useState(null);
  const [trimStart, setTrimStart] = useState(0);
  const [trimEnd, setTrimEnd] = useState(0);
  const [audioSrc, setAudioSrc] = useState("");
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const [videoLoadError, setVideoLoadError] = useState(null);

  const handleVideoUpload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = (event) => {
      setVideoBlob(event.target.result);
    };
    reader.readAsDataURL(file);
  };

  const handleAudioUpload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = (event) => {
      setAudioSrc(event.target.result);
    };
    reader.readAsDataURL(file);
  };

  const handleSelectShape = (e) => {
    selectShape(e.target.attrs.id);
    setCropping(true);
  };

  const handleStageClick = (e) => {
    // if we are currently cropping, add crop box
    if (cropping) {
      const stage = e.target.getStage();
      const pointerPosition = stage.getPointerPosition();
      const x = pointerPosition.x;
      const y = pointerPosition.y;
      const newCropBox = { x, y, width: 0, height: 0 };
      setCropBox(newCropBox);
      setCropping(false);
    }
  };

  const handleCropBoxChange = (e) => {
    const scaleX = e.target.attrs.scaleX;
    const scaleY = e.target.attrs.scaleY;
    const width = e.target.width() * scaleX;
    const height = e.target.height() * scaleY;
    const x = e.target.x();
    const y = e.target.y();
    const newCropBox = { x, y, width, height };
    setCropBox(newCropBox);
  };

  const handleCrop = () => {
    const croppedVideo = document.createElement("canvas");
    croppedVideo.width = cropBox.width;
    croppedVideo.height = cropBox.height;
    const ctx = croppedVideo.getContext("2d");
    ctx.drawImage(
      videoRef.current,
      cropBox.x,
      cropBox.y,
      cropBox.width,
      cropBox.height,
      0,
      0,
      cropBox.width,
      cropBox.height
    );
    const dataURL = croppedVideo.toDataURL();
    setVideoBlob(dataURL);
    setCropBox(null);
  };

  const handleTrimStartChange = (e) => {
    setTrimStart(e.target.valueAsNumber);
  };

  const handleTrimEndChange = (e) => {
    setTrimEnd(e.target.valueAsNumber);
  };

  const handleTrim = () => {
    const video = videoRef.current;
    video.currentTime = trimStart;
    video.play();
    video.addEventListener("timeupdate", () => {
      if (video.currentTime >= trimEnd) {
        video.pause();
        video.removeEventListener("timeupdate", null);
      }
    });
  };

  const toggleAudio = () => {
    const audio = document.getElementById("audio");
    if (isAudioPlaying) {
      audio.pause();
    } else {
      audio.play();
    }
    setIsAudioPlaying(!isAudioPlaying);
  };

  const handleVideoLoaded = () => {
    setIsVideoLoaded(true);
  };

  const handleVideoError = (e) => {
    setVideoLoadError(e.target.error);
  };

  return (
    <div>
      <input type="file" accept="video/*" onChange={handleVideoUpload} />
      <input type="file" accept="audio/*" onChange={handleAudioUpload} />

      {videoBlob && !videoLoadError && (
        <video
          ref={videoRef}
          src={videoBlob}
          controls={false}
          autoPlay
          onLoadedData={handleVideoLoaded}
          onError={handleVideoError}
        />
      )}
      {isVideoLoaded && (
        <div>
          <Stage
            width={window.innerWidth}
            height={window.innerHeight}
            onClick={handleStageClick}
          >
            <Layer>
              <video
                ref={videoRef}
                src={videoBlob}
                controls={false}
                autoPlay
                onLoadedData={handleVideoLoaded}
                onError={handleVideoError}
                onDoubleClick={handleSelectShape}
              />
              {isVideoLoaded && cropBox && (
                <Rect
                  x={cropBox.x}
                  y={cropBox.y}
                  width={cropBox.width}
                  height={cropBox.height}
                  fill="rgba(0,0,0,0.5)"
                  draggable
                  onTransform={handleCropBoxChange}
                  onTransformEnd={handleCropBoxChange}
                />
              )}
              <Transformer
                ref={transformerRef} // Use the ref for Transformer component
                enabledAnchors={["middle-left", "middle-right"]}
                boundBoxFunc={(oldBox, newBox) => {
                  // limit resize
                  if (newBox.width < 10 || newBox.height < 10) {
                    return oldBox;
                  }
                  return newBox;
                }}
              />
            </Layer>
          </Stage>
          {isVideoLoaded && cropBox && (
            <button onClick={handleCrop}>Crop</button>
          )}
          <div>
            <label>Trim Start:</label>
            <input
              type="number"
              value={trimStart}
              onChange={handleTrimStartChange}
            />
            <label>Trim End:</label>
            <input
              type="number"
              value={trimEnd}
              onChange={handleTrimEndChange}
            />
            <button onClick={handleTrim}>Trim</button>
          </div>
          {audioSrc && (
            <div>
              <audio id="audio" src={audioSrc}></audio>
              <button onClick={toggleAudio}>
                {isAudioPlaying ? "Pause Music" : "Play Music"}
              </button>
            </div>
          )}
        </div>
      )}
      {videoLoadError && <p>Video load error: {videoLoadError.message}</p>}
    </div>
  );
};

export default VideoEditor;
