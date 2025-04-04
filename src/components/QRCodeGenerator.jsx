import { QRCodeCanvas } from "qrcode.react";
import "../index.css";

const QRCodeGenerator = ({ data }) => {
  return (
    <div className="qr-container">
      <h3>Your Ticket QR Code</h3>
      <QRCodeCanvas value={data} size={150} />
    </div>
  );
};

export default QRCodeGenerator;
