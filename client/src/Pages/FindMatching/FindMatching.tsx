import Category from "../../Component/Common/Category/Category";
import SelectBoxDefault from "../../Component/Common/SelectBox/SelectBoxDefault";
import TherapistCard from "../../Component/Common/Card/TherapistCard/TherapistCard";
import treatmentAreaText from "../../Assets/TextData/treatmentAreaText";

function FindMatching() {
  const therapistId: number[] = [1, 2, 3, 4];
  return (
    <main>
      <section>
        <div>
          {treatmentAreaText.map((category) => (
            <Category
              key={category.text}
              emoji={category.emoji}
              text={category.text}
              size="lg"
              main={true}
            />
          ))}
        </div>
        <div>
          <SelectBoxDefault category="region" />
          <SelectBoxDefault category="career" />
          <SelectBoxDefault category="gender" />
          <SelectBoxDefault category="filterBy" />
        </div>
      </section>
      <section>
        <div>
          {therapistId.map((therapistId) => (
            <TherapistCard
              key={therapistId}
              therapistId={therapistId}
              variants="default"
            />
          ))}
        </div>
      </section>
    </main>
  );
}

export default FindMatching;
