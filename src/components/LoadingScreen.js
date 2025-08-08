import { ClipLoader } from "react-spinners";

function LoadingScreen() {
  return (
    <div style={{
      height: '100vh',
      width: '100vw',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'white'
    }}>
      <ClipLoader color="black" size={50} />
    </div>
  );
}

export default LoadingScreen;