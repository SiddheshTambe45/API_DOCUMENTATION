import { FormData } from "@/app/(root)/create-new-api/page";
import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";

// Utility function to generate PDF content
export const PdfGenerator = (data: FormData) => (
  <Document>
    <Page style={styles.page}>
      <View style={styles.section}>
        <Text style={styles.title}>API Documentation</Text>
        <Text style={styles.text}>
          <strong>Title:</strong> {data.title}
        </Text>
        <Text style={styles.text}>
          <strong>Description:</strong> {data.description}
        </Text>
        <Text style={styles.text}>
          <strong>Method:</strong> {data.method}
        </Text>
        <Text style={styles.text}>
          <strong>URL:</strong> {data.url}
        </Text>
        <Text style={styles.text}>
          <strong>Response Status:</strong> {data.resBody?.status}
        </Text>

        {/* Request Params */}
        {data.reqParams && (
          <View>
            <Text style={styles.subheading}>Request Parameters:</Text>
            {Object.entries(data.reqParams).map(([key, value]) => (
              <Text style={styles.text} key={key}>
                <strong>{key}:</strong> {value}
              </Text>
            ))}
          </View>
        )}

        {/* Request Body */}
        {data.reqBody && (
          <View>
            <Text style={styles.subheading}>Request Body:</Text>
            <Text style={styles.text}>
              {JSON.stringify(data.reqBody, null, 2)}
            </Text>
          </View>
        )}

        {/* Response Body */}
        {data.resBody && (
          <View>
            <Text style={styles.subheading}>Response Body:</Text>
            <Text style={styles.text}>
              {JSON.stringify(data.resBody, null, 2)}
            </Text>
          </View>
        )}
      </View>
    </Page>
  </Document>
);

// Define some styles for the PDF document
const styles = StyleSheet.create({
  page: {
    backgroundColor: "#ffffff",
    padding: 30,
  },
  section: {
    marginBottom: 15,
  },
  title: {
    fontSize: 18,
    marginBottom: 10,
    fontWeight: "bold",
  },
  subheading: {
    fontSize: 14,
    fontWeight: "bold",
    marginTop: 10,
  },
  text: {
    fontSize: 12,
    marginBottom: 5,
  },
});
