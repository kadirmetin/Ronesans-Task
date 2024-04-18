import { Document, Page, StyleSheet, Text, View } from "@react-pdf/renderer";

const MyDoc = ({ todos }) => {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.table}>
          <View style={styles.tableRow}>
            <View style={[styles.tableCell, styles.headerCell]}>
              <Text style={styles.headerText}>Mission</Text>
            </View>
            <View style={[styles.tableCell, styles.headerCell]}>
              <Text style={styles.headerText}>Date</Text>
            </View>
            <View style={[styles.tableCell, styles.headerCell]}>
              <Text style={styles.headerText}>Checked</Text>
            </View>
          </View>
          {todos.map((todo, index) => (
            <View style={styles.tableRow} key={index}>
              <View style={styles.tableCell}>
                <Text>{todo.text}</Text>
              </View>
              <View style={styles.tableCell}>
                <Text>{todo.time}</Text>
              </View>
              <View style={styles.tableCell}>
                <Text>{todo.checked ? "true" : "false"}</Text>
              </View>
            </View>
          ))}
        </View>
      </Page>
    </Document>
  );
};

const styles = StyleSheet.create({
  page: {
    flexDirection: "row",
    backgroundColor: "#E4E4E4",
  },
  table: {
    display: "table",
    width: "100%",
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: "#bfbfbf",
    borderRadius: 4,
    marginBottom: 10,
  },
  tableRow: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#bfbfbf",
  },
  tableCell: {
    flex: 1,
    padding: 8,
  },
  headerCell: {
    backgroundColor: "#f2f2f2",
  },
  headerText: {
    fontWeight: "bold",
  },
});

export default MyDoc;
