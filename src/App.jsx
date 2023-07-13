import { useSelector, useDispatch } from "react-redux";
import Cart from "./components/Cart/Cart";
import Layout from "./components/Layout/Layout";
import Products from "./components/Shop/Products";
import { useEffect } from "react";
import { sendCartData, getCartData } from "./redux/cart-actions";
import Notification from "./components/UI/Notification";

let isInitial = true;

function App() {
  const cart = useSelector((state) => state.ui.showCart);
  const cartData = useSelector((state) => state.cart);
  const notification = useSelector((state) => state.ui.notification);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCartData());
  }, []);

  useEffect(() => {
    // if (isInitial) {
    //   isInitial = false;
    //   return;
    // }

    if (cartData.changed) {
      dispatch(sendCartData(cartData));
    }
  }, [cartData]);

  return (
    <>
      {notification && (
        <Notification
          status={notification.status}
          title={notification.title}
          message={notification.message}
        />
      )}
      <Layout>
        {cart && <Cart />}
        <Products />
      </Layout>
    </>
  );
}

export default App;
