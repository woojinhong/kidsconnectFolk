export function useCareerDateCalc(startDate: string, endDate: string) {
  const careerDateYear =
    new Date(endDate).getFullYear() - new Date(startDate).getFullYear();
  const careerDateMonth =
    new Date(endDate).getMonth() - new Date(startDate).getMonth();
  if (careerDateYear < 0 && careerDateMonth < 0) {
    return undefined;
  } else if (careerDateMonth > 12) {
    return `${careerDateYear + 1}년 ${careerDateMonth - 12}개월`;
  } else if (careerDateYear < 0 && careerDateMonth > 0) {
    return `${careerDateMonth}개월`;
  } else if (careerDateYear > 0 && careerDateMonth <= 0) {
    return `${careerDateYear}년`;
  } else {
    return `${careerDateYear}년 ${careerDateMonth}개월`;
  }
}
