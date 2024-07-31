# 👧 키즈커넥트 🧑‍⚕️
키즈커넥트는 **아동 발달 치료사 매칭 플랫폼**으로, 아이들이 적합한 치료를 받을 수 있도록 **부모와 전문가를 매칭**해주는 온라인 플랫폼입니다.

[**사이트 바로가기(수리 중)**]()

![screenshot_out_out](https://github.com/user-attachments/assets/4efcec2a-9a31-453f-8b03-2e515648514e)

## 🔎 프로젝트 개요
발달에 어려움을 겪는 자녀들의 적절한 치료 전문가를 찾기 어려운 부모님들이 많습니다. 특히 코로나19 이후 마스크와 비대면 생활로 인하여 **발달에 어려움을 겪는 아이들이 증가**하였습니다. **이 플랫폼은 아이들의 발달을 지원하고, 부모들이 쉽게 치료 전문가를 찾을 수 있도록 돕습니다.** 부모가 아이의 특성과 발달 상태에 대한 정보를 제공(설문조사를 통한 제공)하고, 이를 기반으로 적합한 치료 전문가를 추천하여 연결해줍니다.

![background](https://github.com/user-attachments/assets/3d7dac79-fdcc-43a7-9c48-ebcacf982bc0)

## 🧑‍💻 키즈커넥트팀
| Back-end Developer  | Front-end Developer |
| ------------- | ------------- |
| <img src="https://github.com/user-attachments/assets/f881f19f-add6-4b84-a778-8139b05ab3b0" style="width:250px"/> | <img src="https://github.com/user-attachments/assets/17619bb5-ef9c-4e2a-8183-f3b10a276e85" style="width:200px;"/>|
| 홍우진(팀장)  | 오하은  |
| 서버, ERD,  AWS, REST API, 기획 | 클라이언트, 마크업, UI/UX 디자인  |


## ⭐ 기능 소개
1. **메인 기능**
    + 전문 치료 영역, 성별, 경력 등 간단한 서베이를 통해 필터링한 전문 치료사 리스트 제공
    + 전문가에게 매칭 신청 시 아이 정보, 선호 치료 장소 등을 공유
    + 치료 전문가는 자기소개(포트폴리오) 등록

2. **회원 가입 ・ 로그인**
    + 이메일, 비밀번호, 이름, 성별(전문가), 생년월일(전문가), 주소 입력(Daum 우편번호 API)를 통해 가입 가능
    + 로그인 시 JWT 토큰 발행 및 cookie에 저장

3. **마이페이지(부모)**
    + 아이 등록 시 필요한 전문 영역, 성격 또는 성향 등을 입력
    + 매칭 중인 카드 확인 및 매칭된 전문가 리뷰 가능
    + 로그아웃 기능

4. **마이페이지(전문가)**
    + 자기소개(포트폴리오) 수정 기능
    + 매칭 신청 받은 아이 목록(이름 블라인드) 확인 가능

## 🛠️ 기술 스텍
<div align="left"> 
<p>Common</p>
<img src="https://img.shields.io/badge/Github-181717?style=flat-square&logo=Github&logoColor=white"/>
<img src="https://img.shields.io/badge/Notion-000000?style=flat-square&logo=Notion&logoColor=white"/>
<img src="https://img.shields.io/badge/Figma-F24E1E?style=flat-square&logo=Figma&logoColor=white"/>

<p>Server</p>
<img src="https://img.shields.io/badge/Spring-Boot-6DB33F?style=flat-square&logo=SpringBoot&logoColor=white"/>
<img src="https://img.shields.io/badge/JPA-6DB33F?style=flat-square"/>
<img src="https://img.shields.io/badge/MySQL-4479A1?style=flat-square&logo=MySQL&logoColor=white"/>
<img src="https://img.shields.io/badge/AWS-232F3E?style=flat-square&logo=AmazonWebServices&logoColor=white"/>
<img src="https://img.shields.io/badge/RDS-527FFF?style=flat-square&logo=AmazonRDS&logoColor=white"/>
<img src="https://img.shields.io/badge/Github-Actions-2088FF?style=flat-square&logo=GithubActions&logoColor=white"/>

<p>Client</p>
<img src="https://img.shields.io/badge/Typescript-3178C6?style=flat-square&logo=Typescript&logoColor=white"/>
<img src="https://img.shields.io/badge/React-61DAFB?style=flat-square&logo=React&logoColor=white"/>
<img src="https://img.shields.io/badge/React-Router-CA4245?style=flat-square&logo=ReactRouter&logoColor=white"/>
<img src="https://img.shields.io/badge/Redux-Toolkit-764ABC?style=flat-square&logo=Redux&logoColor=white"/>
<img src="https://img.shields.io/badge/Styled-Component-DB7093?style=flat-square&logo=StyledComponent&logoColor=white"/>
<img src="https://img.shields.io/badge/Vite-646CFF?style=flat-square&logo=Vite&logoColor=white"/>
<img src="https://img.shields.io/badge/Mantine-339AF0?style=flat-square&logo=Mantine&logoColor=white"/>
</div>

## 서비스 기대 효과
1. **아이의 발달 지원 강화**:  많은 아이들이 발달적인 어려움을 겪고 있으나, 적절한 치료 전문가를 찾기 어려운 경우가 많습니다. 이 플랫폼은 아이들의 발달을 지원하고, 부모들이 쉽게 치료 전문가를 찾을 수 있도록 돕습니다.

2. **부모의 편의성 제공**: 부모들은 바쁜 일상 속에서도 아이의 발달에 필요한 치료를 받을 수 있도록 돕기 위해 이 플랫폼을 개발하였습니다. 부모들은 플랫폼을 통해 효과적인 치료 전문가를 찾고 예약할 수 있습니다.
 
3. **전문가와 부모 간의 소통 강화**: 플랫폼을 통해 부모와 치료 전문가 간의 소통을 원활하게 하여 치료의 효과를 높이고, 아이들의 발달을 지속적으로 관리할 수 있도록 합니다.

4. **정보의 투명성과 신뢰성 확보**: 이 플랫폼은 치료 전문가의 프로필과 리뷰를 제공하여 부모들이 신뢰할 수 있는 정보를 확인할 수 있도록 합니다. 이를 통해 부모들은 치료 전문가를 선택할 때 더욱 확신을 갖을 수 있습니다.

5. **사회적 기여**: 발달 지연이나 장애를 가진 아이들과 그들의 가족들에게 효과적인 지원을 제공하여 사회적으로 기여하고자 합니다. 이 플랫폼은 아이들의 발달을 위해 노력하는 가정들을 지원하고 지속적인 발전을 돕는 역할을 수행합니다.


## 🛠️ ERD 다이어그램
**ERD CLOUD**
https://www.erdcloud.com/d/YQp6XS3PKv2N6etMJ
![kidsconnect](https://github.com/user-attachments/assets/97804ae0-e8c8-469b-97d3-54cbc623b6dc)

