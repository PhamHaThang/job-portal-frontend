import {
  MapPinHouse,
  Mail,
  Phone,
  Rss,
  Github,
  User,
  Linkedin,
  Contact,
} from "lucide-react";
import { useRef, useEffect, useState } from "react";
import ContactInfo from "./ContactInfo";
import EducationInfo from "./EducationInfo";
import { formatYearMonth } from "../../utils/format";
import LanguageSection from "./LanguageSection";
import WorkExperience from "./WorkExperience";
import ProjectInfo from "./ProjectInfo";
import SkillSection from "./SkillSection";
import CertificationInfo from "./CertificationInfo";
import { THEME_COLOR_PALETTES } from "../../utils/data";
import TitleTemplate from "./TitleTemplate";
const DEFAULT_THEME = THEME_COLOR_PALETTES.themeOne[0];

const TemplateTwo = ({ resumeData, colorPalette, containerWidth }) => {
  const themeColors = colorPalette?.length > 0 ? colorPalette : DEFAULT_THEME;
  const resumeRef = useRef(null);
  const [baseWidth, setBaseWidth] = useState(800);
  const [scale, setScale] = useState(1);
  useEffect(() => {
    if (!resumeRef.current) return;
    const measuredWidth = resumeRef.current.scrollWidth || baseWidth;
    setBaseWidth(measuredWidth);

    if (!containerWidth) {
      setScale(1);
      return;
    }
    const nextScale = Math.min(containerWidth / measuredWidth, 1);
    setScale(Number.isFinite(nextScale) ? nextScale : 1);
  }, [containerWidth]);
  return (
    <div
      ref={resumeRef}
      className=" mx-auto
       bg-white"
      style={{
        transform: scale < 1 ? `scale(${scale})` : "none",
        transformOrigin: "top left",
        width: `${baseWidth}px`,
        height:
          scale < 1
            ? `${(resumeRef.current?.scrollHeight || 0) * scale}px`
            : "auto",
      }}>
      <div className="px-10 pt-10 p-5">
        <div className="flex items-start gap-5 mb-5">
          <div
            className="w-[140px] h-[140px] max-w-[140px] max-h-[140px] rounded-2xl flex items-center justify-center"
            style={{ backgroundColor: themeColors[1] }}>
            {resumeData?.profileInfo?.profilePreviewUrl ? (
              <img
                src={resumeData.profileInfo.profilePreviewUrl}
                alt="Ảnh đại diện"
                className="w-[140px] h-[140px] rounded-2xl object-cover"
              />
            ) : (
              <div
                className="w-[140px] h-[140px] flex items-center justify-center text-5xl rounded-full "
                style={{ color: themeColors[4] }}>
                <User size={48} />
              </div>
            )}
          </div>
          <div>
            <div className="grid grid-cols-12 gap-2 items-center">
              <div className="col-span-6">
                <h2 className="text-2xl font-bold">
                  {resumeData?.profileInfo?.fullName}
                </h2>
                <p className="text-[15px] font-semibold mb-2">
                  {resumeData?.profileInfo?.designation}
                </p>
                <ContactInfo
                  icon={MapPinHouse}
                  iconBG={themeColors[2]}
                  value={resumeData?.contactInfo?.location}
                />
              </div>
              <div className="col-span-6 flex flex-col gap-5 mt-2">
                <ContactInfo
                  icon={Mail}
                  iconBG={themeColors[2]}
                  value={resumeData?.contactInfo?.email}
                />
                <ContactInfo
                  icon={Phone}
                  iconBG={themeColors[2]}
                  value={resumeData?.contactInfo?.phone}
                />
              </div>
              <div className="col-span-6">
                {resumeData?.contactInfo?.linkedin && (
                  <ContactInfo
                    icon={Linkedin}
                    iconBG={themeColors[2]}
                    value={resumeData?.contactInfo?.linkedin}
                  />
                )}
              </div>
              <div className="col-span-6">
                {resumeData?.contactInfo?.linkedin && (
                  <ContactInfo
                    icon={Rss}
                    iconBG={themeColors[2]}
                    value={resumeData?.contactInfo?.website}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="mx-10 pb-5">
        <div>
          <TitleTemplate text="Giới thiệu bản thân" color={themeColors[1]} />
          <p className="text-sm font-medium">
            {resumeData?.profileInfo?.summary}
          </p>
        </div>
        <div className="mt-4">
          <TitleTemplate text="Kinh nghiệm làm việc" color={themeColors[1]} />
          {resumeData?.workExperience?.map((data, index) => (
            <WorkExperience
              key={`work-${index}`}
              company={data.company}
              role={data.role}
              duration={`${formatYearMonth(data.startDate)} - ${formatYearMonth(
                data.endDate
              )}`}
              durationColor={themeColors[4]}
              description={data.description}
            />
          ))}
        </div>
        <div className="mt-4">
          <TitleTemplate text="Dự án" color={themeColors[1]} />
          {resumeData?.projects?.map((data, index) => (
            <ProjectInfo
              key={`project-${index}`}
              title={data.title}
              description={data.description}
              githubLink={data.github}
              liveDemoLink={data.liveDemo}
              bgColor={themeColors[2]}
            />
          ))}
        </div>
        <div className="mt-5">
          <TitleTemplate text="Học vấn" color={themeColors[1]} />
          {resumeData?.education?.map((edu, index) => (
            <EducationInfo
              key={`education-${index}`}
              degree={edu.degree}
              institution={edu.institution}
              duration={
                edu.startDate &&
                edu.endDate &&
                `${formatYearMonth(edu.startDate)} - ${formatYearMonth(
                  edu.endDate
                )}`
              }
            />
          ))}
        </div>

        <div className="mt-4">
          <TitleTemplate text="Chứng chỉ" color={themeColors[1]} />
          {resumeData?.certifications?.map((data, index) => (
            <CertificationInfo
              key={`certification-${index}`}
              title={data.title}
              issuer={data.issuer}
              year={data.year}
              bgColor={themeColors[2]}
            />
          ))}
        </div>
        <div className="mt-4">
          <TitleTemplate text="Kỹ năng" color={themeColors[1]} />
          <SkillSection
            skills={resumeData?.skills}
            accentColor={themeColors[3]}
            bgColor={themeColors[2]}
          />
        </div>
        <div className="">
          <TitleTemplate text="Ngôn ngữ" color={themeColors[1]} />
          <LanguageSection
            languages={resumeData?.languages}
            accentColor={themeColors[3]}
            bgColor={themeColors[2]}
            viewMode="grid"
          />
        </div>
        {resumeData?.interest && (
          <div className="mt-4">
            <TitleTemplate text="Sở thích" color={themeColors[1]} />
            <p className="text-sm font-medium">{resumeData?.interest}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default TemplateTwo;
