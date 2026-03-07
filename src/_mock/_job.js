import { CONFIG } from "src/global-config";
import { _mock } from "./_mock";

// ----------------------------------------------------------------------

export const JOB_DETAILS_TABS = [{ label: "İlan", value: "content" }];

export const JOB_SKILL_OPTIONS = [
  "UI",
  "UX",
  "Html",
  "JavaScript",
  "TypeScript",
  "Communication",
  "Problem Solving",
  "Leadership",
  "Time Management",
  "Adaptability",
  "Collaboration",
  "Creativity",
  "Critical Thinking",
  "Technical Skills",
  "Customer Service",
  "Project Management",
  "Problem Diagnosis",
];

export const JOB_WORKING_SCHEDULE_OPTIONS = [
  "Monday to Friday",
  "Weekend availability",
  "Day shift",
];

export const JOB_EMPLOYMENT_TYPE_OPTIONS = [
  { label: "Gri", value: "Gri" },
  { label: "Sarı", value: "Sarı" },
  { label: "Siyah", value: "Siyah" },
  { label: "Sarı", value: "Sarı" },
  { label: "Sarı", value: "Sarı" },
  { label: "Gri", value: "Gri" },
  { label: "Beyaz", value: "Beyaz" },
  { label: "Siyah", value: "Siyah" },
  { label: "Beyaz", value: "Beyaz" },
];
export const ADVERTISEMENT_CATEGORY_OPTIONS = [
  { label: "Elektronik", value: "Elektronik" },
  { label: "Bilgisayar", value: "Bilgisayar" },
  { label: "Telefon", value: "Telefon" },
  { label: "Otomotiv", value: "Otomotiv" },
  { label: "Ev", value: "Ev" },
  { label: "Konut", value: "Konut" },
  { label: "İş", value: "İş" },
  { label: "Eğitim", value: "Eğitim" },
  { label: "Hobi", value: "Hobi" },
  { label: "Hizmet", value: "Hizmet" },
  { label: "Diğer", value: "Diğer" },
];
export const JOB_YEAR_OPTIONS = [
  { label: "2025", value: "No experience" },
  { label: "2024", value: "1 year exp" },
  { label: "2023", value: "2 year exp" },
  { label: "2022", value: "> 3 year exp" },
];

export const JOB_BENEFIT_OPTIONS = [
  { label: "Free parking", value: "Free parking" },
  { label: "Bonus commission", value: "Bonus commission" },
  { label: "Travel", value: "Travel" },
  { label: "Device support", value: "Device support" },
  { label: "Health care", value: "Health care" },
  { label: "Training", value: "Training" },
  { label: "Health insurance", value: "Health insurance" },
  { label: "Retirement plans", value: "Retirement plans" },
  { label: "Paid time off", value: "Paid time off" },
  { label: "Flexible work schedule", value: "Flexible work schedule" },
];

export const JOB_PUBLISH_OPTIONS = [
  { label: "Published", value: "published" },
  { label: "Draft", value: "draft" },
];

export const JOB_SORT_OPTIONS = [
  { label: "Varsayılan", value: "Varsayılan" },
  { label: "En yeniden eskiye", value: "En yeniden eskiye" },
  { label: "En eskiden yeniye", value: "En eskiden yeniye" },
  { label: "Fiyata göre artan", value: "Fiyata göre artan" },
  { label: "Fiyata göre azalan", value: "Fiyata göre azalan" },
];

const CANDIDATES = Array.from({ length: 12 }, (_, index) => ({
  id: _mock.id(index),
  role: _mock.role(index),
  name: _mock.fullName(index),
  avatarUrl: _mock.image.avatar(index),
}));

const CONTENT = `
<h6>Job description</h6>

<p>Occaecati est et illo quibusdam accusamus qui. Incidunt aut et molestiae ut facere aut. Est quidem iusto praesentium excepturi harum nihil tenetur facilis. Ut omnis voluptates nihil accusantium doloribus eaque debitis.</p>

<h6>Key responsibilities</h6>

<ul>
  <li>Working with agency for design drawing detail, quotation and local production.</li>
  <li>Produce window displays, signs, interior displays, floor plans and special promotions displays.</li>
  <li>Change displays to promote new product launches and reflect festive or seasonal themes.</li>
  <li>Planning and executing the open/renovation/ closing store procedure.</li>
  <li>Follow‐up store maintenance procedure and keep updating SKU In &amp; Out.</li>
  <li>Monitor costs and work within budget.</li>
  <li>Liaise with suppliers and source elements.</li>
</ul>

<h6>Why You'll love working here</h6>

<ul>
  <li>Working with agency for design drawing detail, quotation and local production.</li>
  <li>Produce window displays, signs, interior displays, floor plans and special promotions displays.</li>
  <li>Change displays to promote new product launches and reflect festive or seasonal themes.</li>
  <li>Planning and executing the open/renovation/ closing store procedure.</li>
  <li>Follow‐up store maintenance procedure and keep updating SKU In &amp; Out.</li>
  <li>Monitor costs and work within budget.</li>
  <li>Liaise with suppliers and source elements.</li>
</ul>
`;

export const _jobs = Array.from({ length: 72 }, (unused, index) => {
  const publish = index % 3 ? "published" : "draft";

  // ESKİ SİSTEM: Her ilan için sıralı görseller (company resimleri)
  const startImageIndex = (index * 3) % 108;

  const images = Array.from({ length: 3 }, (unusedImg, imgIndex) => ({
    id: `img-${index}-${imgIndex}`,
    imageUrl: `${CONFIG.assetsDir}/assets/images/mock/company/company-${startImageIndex + imgIndex + 1}.webp`,
    isPrimary: imgIndex === 0,
  }));

  const price = _mock.number.price(index % 24);

  const salary = {
    price: price || 150000,
    type: (index % 5 && "Custom") || "Hourly",
    negotiable: _mock.boolean(index),
  };

  const features = [
    { id: 1, featureName: "Marka", featureValue: _mock.role(index) },
    { id: 2, featureName: "Model", featureValue: _mock.jobTitle(index) },
    {
      id: 3,
      featureName: "Yıl",
      featureValue: JOB_YEAR_OPTIONS[index % JOB_YEAR_OPTIONS.length].label,
    },
    { id: 4, featureName: "KM", featureValue: `${_mock.number.nativeM(index)} km` },
    {
      id: 5,
      featureName: "Renk",
      featureValue: JOB_EMPLOYMENT_TYPE_OPTIONS[index % JOB_EMPLOYMENT_TYPE_OPTIONS.length].label,
    },
  ];

  const benefits = JOB_BENEFIT_OPTIONS.slice(0, 3).map((option) => option.label);

  const experience =
    JOB_YEAR_OPTIONS.map((option) => option.label)[index] || JOB_YEAR_OPTIONS[1].label;

  const employmentTypes =
    index % 2 === 1
      ? ["Sarı"]
      : index % 3 === 2
        ? ["Siyah"]
        : index % 4 === 3
          ? ["Beyaz"]
          : ["Gri"];

  const company = {
    name: _mock.companyNames(index),
    logo: _mock.image.company(index),
    phoneNumber: _mock.phoneNumber(index),
    fullAddress: _mock.fullAddress(index),
  };

  return {
    id: _mock.id(index),
    salary,
    publish,
    company,
    images,
    features,
    content: CONTENT,
    candidates: CANDIDATES,
    title: _mock.jobTitle(index),
    createdAt: _mock.time(index),
    expiredDate: _mock.time(index),
    skills: JOB_SKILL_OPTIONS.slice(0, 3),
    totalViews: _mock.number.nativeL(index),
    locations: [_mock.countryNames(1), _mock.countryNames(2)],
    workingSchedule: JOB_WORKING_SCHEDULE_OPTIONS.slice(0, 2),
    benefits,
    experience,
    employmentTypes,
  };
});
