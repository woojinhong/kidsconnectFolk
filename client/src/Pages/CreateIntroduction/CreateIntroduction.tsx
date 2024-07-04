import { useState, useEffect } from "react";

import ProfileSummary from "../../Component/Mypage/TherapistContent/Profile/ProfileSummary";
import InputTextArea from "../../Component/Common/Input/InputTextArea";
import Category from "../../Component/Common/Category/Category";
import CheckBoxAgeList from "../../Component/Common/CheckBox/CheckBoxAge/CheckBoxAgeList";
import AddCareer from "../../Component/Common/CreateIntroduction/AddCareer";
import AddEducation from "../../Component/Common/CreateIntroduction/AddEducation";
import AddCertification from "../../Component/Common/CreateIntroduction/AddCertification";
import InputFile from "../../Component/Common/Input/InputFile";

import treatmentAreaText from "../../Assets/TextData/treatmentAreaText";
import FilledButton from "../../Component/Common/Button/FilledButton";

import {
  useGetTherapistInfo,
  usePostTherapistPortfolio,
} from "../../Services/ApiHooks";
import { ProfileType } from "../../Component/Mypage/TherapistContent/Profile/ProfileType";
import {
  gatheredIntroductionDataType,
  CategoryType,
  careerType,
  educationType,
} from "./CreateIntroductionType";

function CreateIntroduction() {
  const [gatheredIntroductionData, setGatheredIntroductionData] = useState(
    {} as gatheredIntroductionDataType
  );
  const [selectedTreatmentArea, setSelectedTreatmentArea] = useState<string[]>(
    []
  );
  const [selectedAgeGroup, setSelectedAgeGroup] = useState<string[]>([]);
  const [therapistInfo, setTherapistInfo] = useState({} as ProfileType);
  const [toastMessage, setToastMessage] = useState<string>("");

  const { getTherapistInfo } = useGetTherapistInfo();
  const { postTherapistPortfolio } = usePostTherapistPortfolio();

  const handleTextAreaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setGatheredIntroductionData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const getObjectDataToArr = (
    category: CategoryType,
    data: careerType[] | educationType[]
  ) => {
    if (category === "career") {
      setGatheredIntroductionData((prev) => ({
        ...prev,
        experience: data as careerType[],
      }));
    } else if (category === "education") {
      setGatheredIntroductionData((prev) => ({
        ...prev,
        education: data as educationType[],
      }));
    }
  };

  const getTreatmentData = (
    inputValue: string,
    setData: React.Dispatch<React.SetStateAction<string[]>>
  ) => {
    const updatedSelectedTreatmentArea = getSelectedTreatmentArea(
      inputValue,
      setData
    );

    setGatheredIntroductionData((prev) => ({
      ...prev,
      symptom: updatedSelectedTreatmentArea,
    }));
  };

  const getAgeGroupData = (inputValue: string[]) => {
    setSelectedAgeGroup(inputValue);
    setGatheredIntroductionData((prev) => ({
      ...prev,
      ageRange: inputValue,
    }));
  };

  const getCertificateData = (inputValue: string) => {
    setGatheredIntroductionData((prev) => ({
      ...prev,
      certificate: [...prev.certificate, inputValue],
    }));
  };
  const handleConfirmBooleanData = (
    file: File | File[],
    category?: CategoryType
  ) => {
    const valueToBoolean = file ? true : false;
    category &&
      setGatheredIntroductionData((prev) => ({
        ...prev,
        [category]: valueToBoolean,
      }));
  };

  const handleOnSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (createIntroductionFormValidate(gatheredIntroductionData)) {
      return setToastMessage("필수 항목을 입력해주세요.");
    } else {
      await postTherapistPortfolio(gatheredIntroductionData, setToastMessage);
    }
  };

  const getUploadedProfileImg = (file: File) => {
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      const readerResult = reader.result as string;
      setGatheredIntroductionData((prev) => ({
        ...prev,
        imageFile: readerResult.replace("data:image/png;base64,", ""),
      }));
    };
  };

  useEffect(() => {
    const fetchTherapistData = async () => {
      setTherapistInfo(await getTherapistInfo());
    };
    fetchTherapistData();
  }, []);

  return (
    <main>
      <section>
        <h3>내 프로필</h3>
        <ProfileSummary
          getData={getUploadedProfileImg}
          button={true}
          therapistInfo={therapistInfo}
        />
      </section>
      <section>
        <div>
          <h3>자기 소개</h3>
          <ul>
            <li>삭제</li>
            <li>수정</li>
          </ul>
        </div>
        <div>
          <form onSubmit={handleOnSubmit}>
            <InputTextArea
              label="제목"
              showWithAsterisk={true}
              placeholder="제목을 공백 포함하여 40자 이하로 입력해 주세요."
              height="56px"
              showCharCount={true}
              dispatch={handleTextAreaChange}
            />
            <InputTextArea
              label="짧은 자기소개"
              showWithAsterisk={true}
              placeholder="짧은 자기 소개를 공백 포함 300자 이하로 입력해주세요."
              height="160px"
              showCharCount={true}
              maxCharCount={300}
              dispatch={handleTextAreaChange}
            />
            <div>
              <h4>
                도울 수 있는 <span>치료/교육/재활 영역</span>
              </h4>
              <span>*</span>
              {treatmentAreaText.map((category) => (
                <Category
                  key={category.text}
                  emoji={category.emoji}
                  text={category.text}
                  size="lg"
                  onClick={getTreatmentData}
                  setData={setSelectedTreatmentArea}
                  checkedData={selectedTreatmentArea}
                />
              ))}
            </div>
            <div>
              <h4>
                도울 수 있는 <span>아이 연령</span>
              </h4>
              <CheckBoxAgeList
                checkedData={selectedAgeGroup}
                setData={setSelectedAgeGroup}
                onChange={getAgeGroupData}
              />
            </div>
            <AddCareer getData={getObjectDataToArr} />
            <AddEducation getData={getObjectDataToArr} />
            <AddCertification getData={getCertificateData} />
            <div>
              <div>
                <h4>
                  본인 확인 서류<span>*</span>
                </h4>
                <p>
                  본인 확인 서류(등본/신분증/가족 관계 증명서 중 택 1)과
                  범죄여부 사실 확인서를 첨부해 주세요
                </p>
              </div>
              <div>
                <InputFile
                  inputType="identityCheck"
                  placeholder="본인 확인 서류"
                  icon={true}
                  onChange={handleConfirmBooleanData}
                />
                <InputFile
                  inputType="crimeCheck"
                  placeholder="범죄여부 사실 확인서"
                  icon={true}
                  onChange={handleConfirmBooleanData}
                />
              </div>
            </div>
            <InputTextArea
              label="상세 소개"
              placeholder="위 내용에 포함되지 않은 상세한 이야기를 들려주세요."
              showWithAsterisk={true}
              showCharCount={true}
              maxCharCount={3000}
              dispatch={handleTextAreaChange}
            />
            <FilledButton
              submit={true}
              text="자기소개서 등록하기"
              disabled={createIntroductionFormValidate(
                gatheredIntroductionData
              )}
            />
            <span>{toastMessage}</span>
          </form>
        </div>
      </section>
    </main>
  );
}

export default CreateIntroduction;

const createIntroductionFormValidate = (
  data: gatheredIntroductionDataType
): boolean => {
  return !(
    data.title &&
    data.bio &&
    data.content &&
    data.symptom &&
    data.ageRange &&
    data.identityCheck &&
    data.crimeCheck
  );
};

const getSelectedTreatmentArea = (
  text: string,
  setState: React.Dispatch<React.SetStateAction<string[]>>
) => {
  let updatedState: string[] = [];
  setState((state) => {
    if (state.includes(text)) {
      updatedState = state.filter((area) => area !== text);
    } else if (text === "진단 필요" || text === "전체") {
      updatedState = [text];
    } else if (state.includes("진단 필요") || state.includes("전체")) {
      updatedState = [text];
    } else {
      updatedState = [...state, text];
    }
    return updatedState;
  });
  return updatedState;
};
