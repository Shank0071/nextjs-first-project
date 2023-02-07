import MeetupList from "../components/meetups/MeetupList"
import { MongoClient } from "mongodb"


function Homepage(props) {

  return (
       <MeetupList meetups={props.meetups}/>   
  )
}

// export async function getServerSideProps(context) {
//   const req = context.req;
//   const res = context.res;

  
//   // fetch data from an API

//   return {
//     props: {
//       meetups: DUMMY_MEETUPS
//     }
//   };
// }


// any code here will not end up on the client side (executed during the build)
export async function getStaticProps() {

    const client = await MongoClient.connect(
      "mongodb+srv://sankar:sankar100%25@cluster0.ahiszro.mongodb.net/?retryWrites=true&w=majority"
    );

    const db = client.db("test");
    const meetupsCollection = db.collection("meetups");
    const results = await meetupsCollection.find().toArray();
    client.close();

  
  return {
    props: {
      meetups: results.map(meetup => ({
        title: meetup.title,
        address: meetup.address,
        image: meetup.image,
        id: meetup._id.toString()
      }))
    },
    revalidate: 1 
  }

}

export default Homepage; 