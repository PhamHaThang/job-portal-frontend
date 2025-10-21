import {
  MapPinHouse,
  Mail,
  Phone,
  Rss,
  Github,
  User,
  Linkedin,
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

const TemplateThree = ({ resumeData, colorPalette, containerWidth }) => {
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
      <div className="flex items-start gap-5 px-2 m-5">
        <div
          className="w-[100px] h-[100px] max-w-[105px] max-h-[105px] rounded-2xl flex items-center justify-center"
          style={{ backgroundColor: themeColors[1] }}>
          {resumeData?.profileInfo?.profilePreviewUrl ? (
            <img
              src={resumeData.profileInfo.profilePreviewUrl}
              className="w-[90px] h-[90px] rounded-2xl"
            />
          ) : (
            <div
              className="w-[90px] h-[90px] flex items-center justify-center text-5xl rounded-full "
              style={{ color: themeColors[4] }}>
              <User size={48} />
            </div>
          )}
        </div>
        <div>
          <div className="grid grid-cols-12 items-center">
            <div className="col-span-8">
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
            <div className="col-span-4 flex flex-col gap-5 mt-2">
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
          </div>
        </div>
      </div>
      <div className="grid grid-cols-12 gap-8">
        <div
          className="col-span-4 py-10"
          style={{ backgroundColor: themeColors[0] }}>
          <div className="m-6">
            <div className="flex flex-col gap-4">
              {resumeData?.contactInfo?.linkedin && (
                <ContactInfo
                  icon={Linkedin}
                  iconBG={themeColors[2]}
                  value={resumeData?.contactInfo?.linkedin}
                />
              )}
              {resumeData?.contactInfo?.github && (
                <ContactInfo
                  icon={Github}
                  iconBG={themeColors[2]}
                  value={resumeData?.contactInfo?.github}
                />
              )}
              {resumeData?.contactInfo?.website && (
                <ContactInfo
                  icon={Rss}
                  iconBG={themeColors[2]}
                  value={resumeData?.contactInfo?.website}
                />
              )}
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
            <div className="mt-5">
              <TitleTemplate text="Ngôn ngữ" color={themeColors[1]} />
              <LanguageSection
                languages={resumeData?.languages}
                accentColor={themeColors[3]}
                bgColor={themeColors[2]}
              />
            </div>
            <div className="mt-5">
              <TitleTemplate text="Kỹ năng" color={themeColors[1]} />
              <SkillSection
                skills={resumeData?.skills}
                accentColor={themeColors[3]}
                bgColor={themeColors[2]}
                viewMode="list"
              />
            </div>
          </div>
        </div>
        <div className="col-span-8 pt-10 mr-10 pb-5">
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
                duration={`${formatYearMonth(
                  data.startDate
                )} - ${formatYearMonth(data.endDate)}`}
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
          {resumeData?.interest && (
            <div className="mt-4">
              <TitleTemplate text="Sở thích" color={themeColors[1]} />
              <p className="text-sm font-medium pb-5">{resumeData?.interest}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TemplateThree;
