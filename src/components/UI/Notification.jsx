import { useState } from "react";
import classes from "./Notification.module.css";
import { useEffect } from "react";
import { uiActions } from "../../redux/ui-slice";
import { useDispatch } from "react-redux";

const Notification = (props) => {
  let specialClasses = "";
  let timerClasses = "";

  if (props.status === "error") {
    specialClasses = classes.error;
    timerClasses = classes.timerError;
  }
  if (props.status === "success") {
    specialClasses = classes.success;
    timerClasses = classes.timerSuccess;
  }

  const cssClasses = `${classes.notification} ${specialClasses}`;
  const timeStyle = `${classes.timer} ${timerClasses}`;

  const AnimatedDiv = () => {
    const [width, setWidth] = useState("100%");
    const dispatch = useDispatch();

    useEffect(() => {
      const timer = setTimeout(() => {
        setWidth((prevWidth) => {
          const newWidth = parseInt(prevWidth, 10) - 1 + "%";
          return newWidth;
        });
      }, 80);

      return () => clearTimeout(timer);
    }, [width]);

    if (width === "-10%") {
      dispatch(uiActions.hideNotification());
    }

    return <div className={timeStyle} style={{ width }}></div>;
  };

  return (
    <section className={cssClasses}>
      <div className={classes.text}>
        <h2>{props.title}</h2>
        <p>{props.message}</p>
      </div>

      <AnimatedDiv />
    </section>
  );
};

export default Notification;
