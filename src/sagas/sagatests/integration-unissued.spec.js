import { Selector, ClientFunction } from "testcafe";

fixture("Unissued Cert").page`http://localhost:3000`;

const Certificate = "./unissued.opencert";

const RenderedCertificate = Selector("#certificate-dropzone");

const validateTextContent = async (t, component, texts) =>
  texts.reduce(
    async (prev, curr) => t.expect(component.textContent).contains(curr),
    Promise.resolve()
  );

test("Unissued certificate's error message is correct'", async t => {
  await t.setFilesToUpload("input[type=file]", [Certificate]);

  await validateTextContent(t, RenderedCertificate, [
    "This certificate is not valid",
    "Certificate has been issued"
  ]);

  await ClientFunction(() => window.history.back())();
  await t.setFilesToUpload("input[type=file]", [Certificate]);
  await validateTextContent(t, RenderedCertificate, [
    "This certificate is not valid",
    "Certificate has been issued"
  ]);
});
