import {Document, Page, Text, View, StyleSheet, PDFViewer, PDFDownloadLink, BlobProvider} from "@react-pdf/renderer";
import ReactPDF from '@react-pdf/renderer';
import React from "react";
import styled from "styled-components";
import ButtonIcon from "../atoms/ButtonIcon";
import print from "../../asstets/img/print.svg";
import sms from "../../asstets/img/sms.svg";
import plus from "../../asstets/img/plus.svg";
import emailjs from 'emailjs-com';
import {FormattedMessage} from "react-intl";
import PropTypes from "prop-types";
import Menu from "./Menu";

const styles = StyleSheet.create({
    page: {
        flexDirection: "row"
    },
    section: {
        flexGrow: 1
    },
    tableWrapper: {
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        margin: "0 auto",
        width: "40vw"
}
});

const MyDocument = (
    <Document>
        <Page size="A4" style={styles.page}>
            <View style={styles.section}>
                <Text>Hello World!</Text>
            </View>
            <View style={styles.section}>
                <Text>We're inside a PDF!</Text>
            </View>
        </Page>
    </Document>
);

export const Doc = () => (
    <div>
        <button>
            <PDFDownloadLink document={MyDocument} fileName="somename.pdf">
                {({blob, url, loading, error}) => (loading ? 'Loading document...' : 'Download now!')}
            </PDFDownloadLink>
        </button>
    </div>
)