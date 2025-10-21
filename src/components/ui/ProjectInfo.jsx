import { Github, ExternalLink } from "lucide-react";
import ActionLink from "./ActionLink";

const ProjectInfo = ({
  title,
  description,
  githubLink,
  liveDemoLink,
  bgColor,
  isPreview = false,
}) => {
  return (
    <div className="mb-5">
      <h3
        className={`${
          isPreview ? "text-xs" : "text-base"
        } font-semibold text-gray-900`}>
        {title}
      </h3>
      <p className="text-sm text-gray-700 font-medium mt-1">{description}</p>
      <div className="flex items-center gap-3 mt-2">
        {githubLink && (
          <ActionLink
            icon={<Github size={16} />}
            link={githubLink}
            bgColor={bgColor}
          />
        )}
        {liveDemoLink && (
          <ActionLink
            icon={<ExternalLink size={16} />}
            link={liveDemoLink}
            bgColor={bgColor}
          />
        )}
      </div>
    </div>
  );
};

export default ProjectInfo;
