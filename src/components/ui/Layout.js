import classes from "./Layout.module.css";

function Layout(props) {
  return (
    <div className={classes.container}>
      <main>
        {props.children}
      </main>
    </div>
  );
}

export default Layout;
