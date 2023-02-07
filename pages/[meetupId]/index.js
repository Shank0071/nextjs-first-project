import MeetupDetail from "../../components/meetups/MeetupDetail";
import { MongoClient, ObjectId } from "mongodb";

export default function MeetupDetails(props) {
  return (
    <MeetupDetail
      src={props.meetupData.image}
      title={props.meetupData.title}
      address={props.meetupData.address}
      description={props.meetupData.description}
    />
  );
}

export async function getStaticPaths() {
    const client = await MongoClient.connect(
      "mongodb+srv://sankar:sankar100%25@cluster0.ahiszro.mongodb.net/?retryWrites=true&w=majority"
    );

    const db = client.db("test");
    const meetupsCollection = db.collection("meetups");
    const results = await meetupsCollection.find({}, {_id: 1}).toArray();
    client.close();

  return {
    fallback: false,
    paths: results.map(meetup => ({
      params: { meetupId: meetup._id.toString() }
    })) 
  };
}

export async function getStaticProps(context) {
  // fetch data for a single meetup
  const meetupId = context.params.meetupId;

  const client = await MongoClient.connect(
    "mongodb+srv://sankar:sankar100%25@cluster0.ahiszro.mongodb.net/?retryWrites=true&w=majority"
  );

  const db = client.db("test");
  const meetupsCollection = db.collection("meetups");
  const selectedMeetup = await meetupsCollection.findOne({_id: new ObjectId(meetupId)});
  client.close();


  return {
    props: {
      meetupData: { 
        id: selectedMeetup._id.toString(),
        title: selectedMeetup.title,
        address: selectedMeetup.address,
        image: selectedMeetup.image,
        description: selectedMeetup.description
       },
    },
  };
}
