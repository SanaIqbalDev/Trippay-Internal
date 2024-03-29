import {
  Layout,
  Image,
  Flex,
  Select,
  Button,
  Form,
  Progress,
  Upload,
  message,
  UploadFile,
} from "antd";
import { Header, Content } from "antd/es/layout/layout";
import HeaderLogo from "../../assets/images/trippay-logo-header.svg";
import TrippayLogo from "../../assets/images/trippay-text-logo.svg";
import Avatar from "../../assets/icons/test-avatar.svg";
import NotificationIcon from "../../assets/icons/ic-notification.svg";
import UploadIcon from "../../assets/icons/ic-file-upload.svg";
import SearchIcon from "../../assets/icons/ic-search.svg";
import PDFIcon from "../../assets/icons/file-icon-pdf.svg";
import { useState } from "react";
import { RcFile } from "antd/es/upload";
import { z } from "zod";
import { Link } from "react-router-dom";

const formSchema = z.object({
  nationality: z
    .string()
    .nonempty({ message: "Please select your nationality!" }),

  file: z
    .instanceof(File)
    .optional()
    .refine(
      (file) => file?.type.includes("image/"),
      "You can only upload image files!"
    ),
});

const { Option } = Select;

const CompleteAccount = () => {
  const [uploading, setUploading] = useState(false);
  const [processCompleted, setProcessCompleted] = useState(false);
  const [progress, setProgress] = useState(0);
  const [form] = Form.useForm();
  const [imageFileName, setImageFileName] = useState("");
  const [imageFileSize, setImageFileSize] = useState("");
  const [fileUploaded, setFileUploaded] = useState(false); // Used to track file upload state

  const handleUpload = (info: any) => {
    if (info.file.status === "uploading") {
      setUploading(true);
      setProgress(100);
      return;
    }
    if (info.file.status === "done") {
      message.success(`${info.file.name} file uploaded successfully`);
      setUploading(false);
      setProgress(100);
    } else if (info.file.status === "error") {
      message.error(`${info.file.name} file upload failed.`);
      setUploading(false);
      setProgress(0);
    }
  };

  const beforeUpload = (file: RcFile, fileList: UploadFile[]) => {
    const isImage = file.type.indexOf("image/") === 0;
    if (!isImage) {
      message.error("You can only upload image files!");
    }
    return isImage;
  };

  const handleFinish = async (values: any) => {
    try {
      formSchema.parse(values);
      if (!fileUploaded) {
        throw new Error("Please upload your ID document!");
      }
      message.success("Form is valid! Submitting data...");
    } catch (error) {
      if (error instanceof z.ZodError) {
        // Handle Zod validation errors
        form.setFields(
          error.errors.map((err) => ({
            name: err.path[0],
            errors: [err.message],
          }))
        );
        console.log("zod error:", error);
      } else if (error instanceof Error) {
        // Handle other errors (e.g., file upload not done)
        message.error(error.message);
        console.log("general error:", error);
      }
    }
    setProcessCompleted(true);
  };
  const handleCustomRequest = (options: any) => {
    const { file, onSuccess, onError, onProgress } = options;

    // Access file metadata
    const fileType = file.type; // Gets the MIME type of the file
    const fileSize = file.size; // Gets the size of the file in bytes
    const fileName = file.name; // Gets the name of the file

    setImageFileName(file.name);
    setImageFileSize(file.size + " bytes");


    console.log(
      `Uploading file: ${fileName}, Type: ${fileType}, Size: ${fileSize} bytes`
    );

  };
  return (
    <Layout className="w-full h-screen flex flex-col">
      <Header
        className="h-[72px] w-full flex justify-between items-center"
        style={{ backgroundColor: "#F9FAFB" }}
      >
        <Image src={HeaderLogo} preview={false} />
        <Flex className="h-12 gap-1">
          <div className="w-10 h-10 flex justify-center items-center rounded-full bg-white">
            <Image className="w-5 h-5" src={SearchIcon} preview={false} />
          </div>
          <div className="w-10 h-10 flex justify-center items-center rounded-full bg-white">
            <Image className="w-5 h-5" src={NotificationIcon} preview={false} />
          </div>
          <Image src={Avatar} preview={false} />
        </Flex>
      </Header>
      <Content className="flex top-20 justify-center">
        <div className="custom-modal">
          <div className="form-container" style={{ width: "100%" }}>
            {processCompleted == false && (
              <div className="form-header" style={{ width: "100%" }}>
                <span className="main-heading">Complete your account</span>
                <span className="sub-heading">
                  If you are a citizen of more than one country, please pick
                  one.
                </span>
              </div>
            )}
            <div className="form-content" style={{ width: "100%" }}>
              {processCompleted ? (
                <div className="flex flex-col justify-between items-center gap-12">
                  <Image src={TrippayLogo} preview={false} />
                  <div className="flex flex-col justify-between items-center gap-3">
                    <div
                      style={{
                        display: "block",
                        width: "fit-content",
                        border: "1px solid #FEDF89",
                        borderRadius: "20px",
                        padding: "2px 8px",
                        backgroundColor: "#FFFAEB",
                        color: "#B54708",
                      }}
                    >
                      <span className="text-xs font-medium align-middle"></span>
                      In progress
                    </div>
                    <span className="main-heading">
                      Your ID verification is in progress.
                    </span>
                    <span className="sub-heading">
                      Once verified, your wallet will be created successfully
                    </span>
                  </div>
                  <Link to={"/home"} className="w-full">
                    <Button type="primary" block className="submitButton">
                      Home
                    </Button>
                  </Link>
                </div>
              ) : (
                <Form layout="vertical" form={form} onFinish={handleFinish}>
                  <Form.Item
                    name="nationality"
                    label="Nationality*"
                    required={false}
                    rules={[
                      {
                        required: true,
                        message: "Please select your nationality!",
                      },
                    ]}
                  >
                    <Select placeholder="Select your nationality">
                      <Option value="KSA">KSA</Option>
                      <Option value="Canada">Canada</Option>
                      <Option value="Bahrain">Bahrain</Option>
                      <Option value="UAE">UAE</Option>
                    </Select>
                  </Form.Item>

                  <Form.Item
                    name="id"
                    label="ID*"
                    required={false}
                    rules={[
                      {
                        required: true,
                        message: "Please upload your ID document!",
                      },
                    ]}
                  >
                    <Flex
                      vertical
                      className=" flex flex-col justify-center items-center gap-3 p-4 border border-gray-300 rounded-xl bg-white"
                    >
                      <Upload
                        name="file"
                        onChange={handleUpload}
                        beforeUpload={beforeUpload}
                        showUploadList={false}
                        customRequest={handleCustomRequest}
                      >
                        <Image width={40} src={UploadIcon} preview={false} />{" "}
                      </Upload>
                      <span>Click to upload or drag and drop </span>
                      <span>SVG, PNG, JPG or GIF (max. 800x400px)</span>
                    </Flex>
                  </Form.Item>
                  {uploading && (
                    <div className="flex flex-col gap-0 p-4 border border-gray-300 rounded-xl bg-white gap-2">
                      <div className="flex flex-row gap-2">
                        <Image src={PDFIcon} preview={false} />
                        <div className="flex flex-col">
                          <span style={{ fontSize: "14px", fontWeight: "500" }}>
                            {imageFileName}
                          </span>
                          <span style={{ fontSize: "14px", fontWeight: "400" }}>
                            {imageFileSize}
                          </span>
                        </div>
                      </div>
                      <Progress className="px-5" percent={progress} />
                    </div>
                  )}
                  <Form.Item>
                    <Button
                      type="primary"
                      block
                      htmlType="submit"
                      //   disabled={uploading}
                      className="submitButton"
                    >
                      Continue
                    </Button>
                  </Form.Item>
                </Form>
              )}
            </div>
          </div>
        </div>
      </Content>
    </Layout>
  );
};

export default CompleteAccount;
