import "./styles.css";
import P from "prop-types";
export const PostCard = (props) => {
  return (
    <div className="post">
      <img src={props.cover} alt={props.title} />
      <div className="post-content">
        <h1>{props.title}</h1>
        <p>{props.body}</p>
      </div>
    </div>
  );
};

PostCard.propTypes = {
  title: P.string.isRequired,
  cover: P.string.isRequired,
  body: P.string.isRequired,
  //id: P.number.isRequired,
};
