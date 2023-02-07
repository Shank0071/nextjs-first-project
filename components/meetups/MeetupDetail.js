import classes from "./MeetupDetail.module.css";

export default function MeetupDetail({ src, title, address, description }) {
  return (
    <section className={classes.detail}>
      <img
        src={src}
        alt="A first meetup"
      />
      <h1>{title}</h1>
      <p>{description}</p>
      <p>{address}</p>
    </section>
  );
}
