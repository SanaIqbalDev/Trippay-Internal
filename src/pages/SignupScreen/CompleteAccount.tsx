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
import Avatar from "../../assets/icons/test-avatar.svg";
import NotificationIcon from "../../assets/icons/ic-notification.svg";
import UploadIcon from "../../assets/icons/ic-file-upload.svg";
import SearchIcon from "../../assets/icons/ic-search.svg";
import PDFIcon from "../../assets/icons/file-icon-pdf.svg";
import { useState } from "react";
import { RcFile } from "antd/es/upload";
import { z } from "zod";

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

type FormInputs = z.infer<typeof formSchema>;
const { Option } = Select;

const CompleteAccount = () => {
  const [uploading, setUploading] = useState(false);
  const [processCompleted, setProcessCompleted] = useState(false);
  const [progress, setProgress] = useState(0);
  const [form] = Form.useForm();
  const [imageFileName, setImageFileName] = useState("");
  const [imageFileSize, setImageFileSize] = useState("");

  const handleUpload = (info: any) => {
    if (info.file.status === "uploading") {
      setUploading(true);
      // Mock the progress
      setProgress(100); // or use info.file.percent if available
      //   setUploading(false);
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

  const handleFinish = async (values: FormInputs) => {
    try {
      // Perform Zod validation
      formSchema.parse(values);
      // If validation passes, handle your form submission
      message.success("Form is valid! Submitting data...");
      // ... submit to server or handle data
    } catch (error) {
      if (error instanceof z.ZodError) {
        // Handle the display of validation errors
        form.setFields(
          error.errors.map((err) => ({
            name: err.path[0],
            errors: [err.message],
          }))
        );
      }
    }
  };
  const handleCustomRequest = (options: any) => {
    const { file, onSuccess, onError, onProgress } = options;

    // Access file metadata
    const fileType = file.type; // Gets the MIME type of the file
    const fileSize = file.size; // Gets the size of the file in bytes
    const fileName = file.name; // Gets the name of the file

    setImageFileName(file.name);
    setImageFileSize(file.size + " bytes");
    // Now you can use fileType, fileSize, and fileName as needed
    console.log(
      `Uploading file: ${fileName}, Type: ${fileType}, Size: ${fileSize} bytes`
    );

    // Rest of your custom upload logic...
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
            <div className="form-header" style={{ width: "100%" }}>
              <span className="main-heading">Complete your account</span>
              <span className="sub-heading">
                If you are a citizen of more than one country, please pick one.
              </span>
            </div>
            <div className="form-content" style={{ width: "100%" }}>
              {processCompleted ? <div>
                {/* <Image src={Logo}/> */}
              </div> : <Form layout="vertical" onFinish={handleFinish}>
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
                      action="/upload" // You should replace this with your actual upload URL
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
                    //   disabled={uploading}
                    onClick={() => setProcessCompleted(true)}
                    className="submitButton"
                  >
                    Continue
                  </Button>
                </Form.Item>
              </Form>}
            </div>
          </div>
        </div>
      </Content>
    </Layout>
  );
};

export default CompleteAccount;
