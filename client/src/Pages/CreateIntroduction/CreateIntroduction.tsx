import ProfileSummary from "../../Component/Mypage/TherapistContent/Profile/ProfileSummary";
import InputText from "../../Component/Common/Input/InputText";
import InputTextArea from "../../Component/Common/Input/InputTextArea";
import Category from "../../Component/Common/Category/Category";
import CheckBoxAgeList from "../../Component/Common/CheckBox/CheckBoxAge/CheckBoxAgeList";

import { Checkbox } from "@mantine/core";

import treatmentAreaText from "../../Assets/TextData/treatmentAreaText";
import FilledButton from "../../Component/Common/Button/FilledButton";
import OutlineButton from "../../Component/Common/Button/OutlineButton";
import SelectBoxDefault from "../../Component/Common/SelectBox/SelectBoxDefault";

function CreateIntroduction() {
  return (
    <main>
      <section>
        <h3>내 프로필</h3>
        <ProfileSummary />
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
          <form>
            <InputTextArea
              label="제목"
              showWithAsterisk={true}
              placeholder="제목을 공백 포함하여 40자 이하로 입력해 주세요."
              height="56px"
              showCharCount={true}
            />
            <InputTextArea
              label="짧은 자기소개"
              showWithAsterisk={true}
              placeholder="짧은 자기 소개를 공백 포함 300자 이하로 입력해주세요."
              height="56px"
              showCharCount={true}
              maxCharCount={300}
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
                />
              ))}
            </div>
            <div>
              <h4>
                도울 수 있는 <span>아이 연령</span>
              </h4>
              <CheckBoxAgeList />
            </div>
            <div>
              <div>
                <h4>경력</h4>
                <p>경력증명서를 첨부하셔야 인증 마크가 달려요.</p>
              </div>
              <div>
                <div>
                  <InputText
                    placeholder="센터/병원/기관 검색"
                    apiIcon="search"
                  />
                  <InputText />
                  <span>년</span>
                  <InputText />
                  <span>개월</span>
                </div>
                <Checkbox label="근무 중" radius="100%" />
              </div>
              <div>
                <FilledButton text="+ 경력 추가하기" />
                <OutlineButton text="경력증명서 첨부하기" />
              </div>
              <div>
                총 <span>n</span>년 <span>n</span>개월
              </div>
            </div>
            <div>
              <div>
                <h4>학력</h4>
                <p>학력 입력 시, 사실을 증명할 수 있는 서류를 첨부해 주세요.</p>
              </div>
              <div>
                <SelectBoxDefault category="degree" />
                <InputText placeholder="학교 검색" apiIcon="search" />
                <InputText placeholder="학과를 입력해 주세요" />
                <SelectBoxDefault category="degreeCompletion" />
              </div>
              <FilledButton text="+ 학력 추가하기" />
            </div>
            <div>
              <div>
                <h4>자격증</h4>
                <p>자격증 사진을 첨부하셔야 인증 마크가 달려요.</p>
              </div>
              <div>
                <InputText placeholder="자격증 검색" apiIcon="search" />
                <OutlineButton text="+ 자격증명서 첨부하기" />
              </div>
              <FilledButton text="+ 자격증 추가하기" />
            </div>
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
                <InputText placeholder="본인 확인 서류" apiIcon="upload" />
                <InputText
                  placeholder="범죄여부 사실 확인서"
                  apiIcon="upload"
                />
              </div>
            </div>
            <InputTextArea
              label="상세 소개"
              placeholder="위 내용에 포함되지 않은 상세한 이야기를 들려주세요."
              showWithAsterisk={true}
              showCharCount={true}
              maxCharCount={3000}
            />
            <FilledButton text="자기소개서 등록하기" />
          </form>
        </div>
      </section>
    </main>
  );
}

export default CreateIntroduction;
