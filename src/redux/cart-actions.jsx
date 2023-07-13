import { cartActions } from "./cart-slice";
import { uiActions } from "./ui-slice";

export const getCartData = () => {
  return async (dispatch) => {
    dispatch(
      uiActions.showNotifications({
        status: "pending",
        title: "Getting information from storage...",
        message: "Recieving cart information!",
      })
    );

    const getResponse = async () => {
      const response = await fetch(
        "https://redux-api-2d205-default-rtdb.firebaseio.com/cart.json"
      );

      if (!response.ok) {
        throw new Error("Transferring flow interrupted");
      }

      const data = await response.json();

      return data;
    };

    try {
      const cartData = await getResponse();
      dispatch(
        cartActions.replaceCart({
          items: cartData.items || [],
          totalQuantity: cartData.totalQuantity,
        })
      );

      dispatch(
        uiActions.showNotifications({
          status: "success",
          title: "Success!",
          message: "Cart data recieved succesfully",
        })
      );
    } catch (error) {
      dispatch(
        uiActions.showNotifications({
          status: "error",
          title: "An error ocurred!",
          message: "Process terminated due to error",
        })
      );
    }
  };
};

export const sendCartData = (cart) => {
  return async (dispatch) => {
    dispatch(
      uiActions.showNotifications({
        status: "pending",
        title: "Transferring information...",
        message: "Transferring cart information!",
      })
    );

    const sendRequest = async () => {
      const response = await fetch(
        "https://redux-api-2d205-default-rtdb.firebaseio.com/cart.json",
        {
          method: "PUT",
          body: JSON.stringify({
            items: cart.items,
            totalQuantity: cart.totalQuantity,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Transferring flow interrupted");
      }
    };

    try {
      await sendRequest();

      dispatch(
        uiActions.showNotifications({
          status: "success",
          title: "Success!",
          message: "Cart data transfer complete",
        })
      );
    } catch (error) {
      dispatch(
        uiActions.showNotifications({
          status: "error",
          title: "An error ocurred!",
          message: "Process terminated due to error",
        })
      );
    }
  };
};
