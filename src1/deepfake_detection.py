import cv2
import mediapipe as mp

def detect_deepfake(image_paths, video_path=None):
    # Initialize Mediapipe Face Detection
    mp_face_detection = mp.solutions.face_detection
    face_detection = mp_face_detection.FaceDetection(min_detection_confidence=0.2)
    mp_drawing = mp.solutions.drawing_utils

    # Handle image files
    for image_path in image_paths:
        # Load image
        image = cv2.imread(image_path)

        if image is None:
            print(f"Failed to load image: {image_path}")
            continue

        # Convert the image to RGB
        rgb_image = cv2.cvtColor(image, cv2.COLOR_BGR2RGB)

        # Detect faces in the image
        results = face_detection.process(rgb_image)

        if results.detections:
            for detection in results.detections:
                # Draw face landmarks
                mp_drawing.draw_detection(image, detection)

            # Show the image with detected faces
            cv2.imshow(f'Deepfake Detection - {image_path}', image)
            cv2.waitKey(0)  # Wait until any key is pressed to move to the next image
            cv2.destroyAllWindows()
        else:
            print(f"No faces detected in {image_path}.")

    # Handle video file if provided
    if video_path:
        video_capture = cv2.VideoCapture(video_path)

        if not video_capture.isOpened():
            print(f"Failed to load video: {video_path}")
            return

        while video_capture.isOpened():
            ret, frame = video_capture.read()
            if not ret:
                break

            # Convert the frame to RGB
            rgb_frame = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)

            # Detect faces in the frame
            results = face_detection.process(rgb_frame)

            if results.detections:
                for detection in results.detections:
                    # Draw face landmarks
                    mp_drawing.draw_detection(frame, detection)

            # Show the video frame
            cv2.imshow('Deepfake Detection - Video', frame)

            # Exit on 'q' key
            if cv2.waitKey(1) & 0xFF == ord('q'):
                break

        video_capture.release()
        cv2.destroyAllWindows()

# Example usage with multiple images and a video
image_paths = [
    'src/demo-img.jpg', 
    'src/demo-img2.jpg', 
    'src/demo-img3.jpg',
    'src/demo-img4.jpg',
    'src/demo-img5.jpg'
]

# Specify the path to the video file, or leave it as None if no video
video_path = 'src/demo-vid1.mp4'  # Replace with your video file path if needed

detect_deepfake(image_paths, video_path)
