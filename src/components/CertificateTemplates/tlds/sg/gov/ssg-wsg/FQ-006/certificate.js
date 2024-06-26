import { get } from "lodash";
import { NEW_IMG_LOGO, IMG_LOGO, IMG_SEAL, DIGIPEN_LOGO } from "../common";
import {
  renderCertCode,
  formatDate,
  getRecipientID,
  renderAwardedTo,
  rendersuccessfuToFQ006
} from "../common/functions";
import fonts from "../common/fonts";
import * as styles from "../common/style";

export const effectiveDateForWSQLOGOQual = certificate => {
  const date = certificate.attainmentDate.split("T");
  const dateSplit = date[0].split("-");
  const intDate = parseInt(dateSplit[0] + dateSplit[1] + dateSplit[2], 10);
  if (intDate < 20201225) {
    return <img style={styles.fullWidthStyleQual} src={IMG_LOGO} />;
  }
  return <img style={styles.fullWidthStyleQual} src={NEW_IMG_LOGO} />;
};

export const renderLogoWSQ = certificate => (
  <div className="row d-flex" style={{ marginTop: "3rem" }}>
    <div className="col-md-5 col-12">
      {effectiveDateForWSQLOGOQual(certificate)}
    </div>
    <div className="col-md-2 col-12" />
    <div className="col-md-5 col-12">
      <img style={styles.fullWidthStyleQual} src={DIGIPEN_LOGO} />
    </div>
  </div>
);

export const renderSignature = certificate => (
  <div
    className="row d-flex justify-content-center"
    style={{ marginTop: "8rem", marginBottom: "1rem" }}
  >

    <div className="col-md-2 col-6" style={{padding:"0px"}}>
      <img style={styles.sealWidthStyle} src={IMG_SEAL} />
    </div>

    <div className="col-md-10" style={{paddingLeft:"8px"}}>
      <div className="row">
        <div className="col-md-6 col-12">
          <div className="col-12" style={{height: "65%"}}>

            <img
              style={styles.signatureWidthStyle}
              src={get(
                certificate,
                "additionalData.certSignatories[0].signature"
              )}
            />
          </div>
          <div style={styles.designationTextStyle} className="RobotoBold">
            {get(certificate, "additionalData.certSignatories[0].name")},{" "}
            {get(certificate, "additionalData.certSignatories[0].position")}
          </div>
          <div style={styles.designationTextStyle} className="RobotoBold">
            {get(certificate, "additionalData.certSignatories[0].organisation")}
          </div>
        </div>
        <div className="col-md-6 col-12">

          <div className="col-12" style={{height: "65%"}}>

            <img
              style={styles.signatureWidthStyle}
              src={get(
                certificate,
                "additionalData.certSignatories[1].signature"
              )}
            />
          </div>
          <div style={styles.designationTextStyle} className="RobotoBold">
            {get(certificate, "additionalData.certSignatories[1].name")},{" "}
            {get(certificate, "additionalData.certSignatories[1].position")}
          </div>
          <div style={styles.designationTextStyle} className="RobotoBold">
            {get(certificate, "additionalData.certSignatories[1].organisation")}
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-md-7 col-12">
          <div style={styles.footerTextStyle} className="RobotoLight">
            The training and assessment of the abovementioned learner are
            accredited
            <br />
            in accordance with the Singapore Workforce Skills Qualifications
            System
          </div>
          <div style={styles.footerTextStyle} className="RobotoLight">
            <a style={{ color: "rgb(51,0,144)" }} href="www.ssg.gov.sg">
              www.ssg.gov.sg
            </a>
            <br />
            For verification of this certificate, please visit{" "}
            <a
              style={{ color: "rgb(51,0,144)" }}
              href="https://myskillsfuture.sg/verify_eCert.html"
            >
              https://myskillsfuture.sg/verify_eCert.html
            </a>
          </div>
        </div>
        <div className="col-md-5 col-12">
          <div
            style={{ marginBottom: "70px", marginTop: "60px", display: "flex" }}
          >
            <div>
              <p style={styles.printTextStyle} className="RobotoRegular">
                Cert No: {get(certificate, "additionalData.serialNum")}
              </p>
            </div>
            {renderCertCode(certificate)}
          </div>
        </div>
      </div>
    </div>
  </div>
);

export const renderAwardText = certificate => (
  <div>
    <div
      className="d-flex justify-content-center"
      style={{ marginTop: "2rem" }}
    >
      <p style={styles.nameTextStyle} className="RobotoRegular text-center">
        {certificate.name}
      </p>
    </div>
    <div className="d-flex justify-content-center">
      <p style={styles.specTextStyle} className="RobotoRegular">
        {certificate.additionalData.specialization}
      </p>
    </div>
    <div
      className="d-flex justify-content-center"
      style={{ marginTop: "3rem" }}
    >
      {renderAwardedTo(certificate)}
    </div>
    <div
      className="d-flex justify-content-center"
      style={{ marginTop: "1rem" }}
    >
      <p style={styles.recipientTextStyle} className="RobotoMedium">
        {certificate.recipient.name}
      </p>
    </div>
    <div className="d-flex justify-content-center">
      <p style={styles.printTextStyle} className="RobotoMedium">
        ID No: {getRecipientID(certificate.recipient)}
      </p>
    </div>
    <div
      className="d-flex justify-content-center"
      style={{ marginTop: "2rem" }}
    >
      {rendersuccessfuToFQ006(certificate)}
    </div>
  </div>
);

export const renderIssuingDate = certificate => (
  <div className="d-flex justify-content-center" style={{ marginTop: "1rem" }}>
    <p style={styles.issuersTextStyle} className="RobotoRegular">
      {formatDate(certificate.attainmentDate)}
    </p>
  </div>
);

/* eslint-disable */
// Disabled eslint as there's no way to add proptypes to an anonymous function like this
export default ({ logo }) => ({ certificate }) => (
  <div>
    <div
      className="container"
      style={{
        border: 5,
        borderColor: "#AAA",
        borderStyle: "solid",
        paddingLeft: "6%",
        paddingRight: "6%",
        paddingTop: "100px",
        paddingBottom: "100px",
        width: "100%",
        fontFamily: "Arial"
      }}
    >
      {fonts()}

      {renderLogoWSQ(certificate)}
      {renderAwardText(certificate)}
      {renderIssuingDate(certificate)}
      {certificate.additionalData.certSignatories
        ? renderSignature(certificate)
        : ""}
    </div>
  </div>
);
