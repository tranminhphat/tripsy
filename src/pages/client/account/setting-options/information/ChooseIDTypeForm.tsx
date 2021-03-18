import { Button } from "@material-ui/core";
import MyRadioButton from "components/Shared/MyRadioButton";
import { Form, Formik } from "formik";
import * as React from "react";
import { Link } from "react-router-dom";
import * as yup from "yup";

interface Props {
  setIdType: (idType: string) => void;
}

const validationSchema = yup.object({
  idType: yup.string().required("Bạn chưa chọn loại giấy tờ tùy thân."),
});

const ChooseIDTypeForm: React.FC<Props> = ({ setIdType }) => {
  return (
    <div className="my-2 max-w-2xl">
      <h1 className="mb-4 text-4xl font-bold text-main-blue">
        Chọn một loại giấy tờ tùy thân để thêm vào
      </h1>
      <div>
        <Formik
          initialValues={{ idType: "" }}
          onSubmit={(values) => {
            setIdType(values.idType);
          }}
          validationSchema={validationSchema}
        >
          {({ values }) => (
            <Form>
              <div>
                <div className="mt-2 border border-gray-300 p-4 rounded-lg">
                  <MyRadioButton
                    name="idType"
                    type="radio"
                    value="driver-license"
                    label="Giấy phép lái xe"
                    className="text-secondary-blue"
                  />
                </div>
                <div className="mt-2 border border-gray-300 p-4 rounded-lg">
                  <MyRadioButton
                    name="idType"
                    type="radio"
                    value="passport"
                    label="Hộ chiếu"
                  />
                </div>
                <div className="mt-2 border border-gray-300 p-4 rounded-lg">
                  <MyRadioButton
                    name="idType"
                    type="radio"
                    value="id-card"
                    label="Căn cước công dân"
                  />
                </div>
              </div>
              <div className="flex justify-between mt-8">
                <Button variant="contained">
                  <Link to="/account-settings/personal-info">Quay lại</Link>
                </Button>
                <Button
                  disabled={!values.idType}
                  type="submit"
                  variant="contained"
                  className={
                    values.idType
                      ? "bg-secondary-blue text-white"
                      : "bg-gray-300 text-white"
                  }
                >
                  Tiếp tục
                </Button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default ChooseIDTypeForm;
