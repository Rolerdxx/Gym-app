import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Image,
} from "@react-pdf/renderer";
import dayjs from "dayjs";

import img from "./0era2x9c.png";

const styles = StyleSheet.create({
  page: {
    backgroundColor: "#FFFFFF",
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
  },
  text: {
    margin: 12,
    fontSize: 14,
    textAlign: 'center',
    fontFamily: 'Times-Roman'
  },
  title: {
    margin: 12,
    fontSize: 30,
    textAlign: 'center',
    fontFamily: 'Times-Roman'
  },
  part: {
    margin: 12,
    fontSize: 20,
    textAlign: 'center',
    fontFamily: 'Times-Roman'
  },
  value:{
    color:"red"
  }
});

const MyDocument = (props) => {
  const con = props.c;
  const m = props.c.Member;
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <Image
          style={{ height: "25%", marginVertical: 20, marginHorizontal: 200 }}
          src={img}
        />
        
        <Text style={styles.title}>GYM CONTRACT</Text>
        <Text style={styles.part}>Personnal Information</Text>
        <Text style={styles.text}>Full Name: <Text style={styles.value}>{`${m.firstname} ${m.lastname}`}</Text>       CIN: <Text style={styles.value}>{m.cin}</Text></Text>
        <Text style={styles.text}>Birth Date: <Text style={styles.value}>{dayjs(m.birthdate).format("DD MMMM YYYY")}</Text>       Adresse: <Text style={styles.value}>{m.adresse}</Text></Text>

        <Text style={styles.part}>Contract Information</Text>
        <Text style={styles.text}>Contract Duration: <Text style={styles.value}>{con.duration} Months</Text> </Text>
        <Text style={styles.text}>Start Date: <Text style={styles.value}>{dayjs(con.startdate).format("DD MMMM YYYY")}</Text>           End Date: <Text style={styles.value}>{dayjs(con.enddate).format("DD MMMM YYYY")}</Text></Text>


      </Page>
    </Document>
  );
};

export default MyDocument;
