import '../styles/globals.css'
import 'react-toastify/dist/ReactToastify.css';
import { toast, ToastContainer } from "react-toastify";

function MyApp({ Component, pageProps }) {
  return <>
    <ToastContainer
      position="bottom-right"
      autoClose={5000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
    />
  <Component {...pageProps} />
  </>
}

export default MyApp
