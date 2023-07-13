import classes from "./CartButton.module.css";
import { useDispatch, useSelector } from "react-redux";
import { uiActions } from "../../redux/ui-slice";

const CartButton = (props) => {
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  return (
    <button
      className={classes.button}
      onClick={() => dispatch(uiActions.toggle())}
    >
      <span>My Cart</span>
      <span className={classes.badge}>{cart.totalQuantity}</span>
    </button>
  );
};

export default CartButton;
