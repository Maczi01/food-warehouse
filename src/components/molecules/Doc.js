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
        flexDirection: "column"
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
    },
    styledTable: {
        paddingTop: "15px",
        margin: "20px",
        border: "none",
        borderCollapse: "collapse",
        borderRadius: "20px",
    }
});

const MyDocument = (
    <Document className={styles.tableWrapper}>
        <Page size="A4" style={styles.page}>
            <View style={styles.section}>
                <table>
                    <thead>
                    <tr>
                        <th>#</th>
                        <th>Name</th>
                        <th>Quantity</th>
                        <th>Unit</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td>1</td>
                        <td>Tomatoes</td>
                        <td>5</td>
                        <td>Kilogram</td>
                    </tr>
                    <tr>
                        <td>2</td>
                        <td>salt</td>
                        <td>3</td>
                        <td>Sztuka</td>
                    </tr>
                    <tr>
                        <td>3</td>
                        <td>Lamb</td>
                        <td>3</td>
                        <td>Kilogram</td>
                    </tr>
                    <tr>
                        <td>4</td>
                        <td>Kola</td>
                        <td>7</td>
                        <td>Sztuka</td>
                    </tr>
                    <tr>
                        <td>5</td>
                        <td>Sugar</td>
                        <td>5</td>
                        <td>Kilogram</td>
                    </tr>
                    <tr>
                        <td>6</td>
                        <td>Cherry</td>
                        <td>4</td>
                        <td>Kilogram</td>
                    </tr>
                    */}
                    </tbody>
                </table>
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