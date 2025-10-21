import { useEffect, useRef, useState } from "react";
import {
  DUMMY_RESUME_DATA,
  THEME_COLOR_PALETTES,
  RESUME_TEMPLATES,
} from "../../utils/data";
import { CircleCheckBig } from "lucide-react";
import Tabs from "./Tabs";
import TemplateCard from "./TemplateCard";
import RenderResume from "./RenderResume";
const TAB_DATA = [
  { label: "Mẫu" },
  {
    label: "Bảng màu",
  },
];
const paletteList = THEME_COLOR_PALETTES.themeOne;
const ThemeSelector = ({ selectedTheme, onApply, resumeData }) => {
  const resumeRef = useRef(null);
  const [baseWidth, setBaseWidth] = useState(800);
  const [tabValue, setTabValue] = useState("Mẫu");
  const [selectedColorPalette, setSelectedColorPalette] = useState({
    colors: selectedTheme?.colorPalette || paletteList[0],
    index: paletteList.findIndex(
      (palette) =>
        Array.isArray(selectedTheme?.colorPalette) &&
        palette.length === selectedTheme.colorPalette.length &&
        palette.every((color, idx) => color === selectedTheme.colorPalette[idx])
    ),
  });
  const handleThemeSelection = () => {
    onApply({
      theme: selectedTemplate.theme,
      colorPalette: selectedColorPalette.colors,
    });
  };
  const [selectedTemplate, setSelectedTemplate] = useState({
    theme: selectedTheme?.theme || "",
    index: RESUME_TEMPLATES.findIndex(
      (template) => template.id === selectedTheme?.theme
    ),
  });

  const updateBaseWidth = () => {
    if (resumeRef.current) {
      setBaseWidth(resumeRef.current.offsetWidth);
    }
  };

  useEffect(() => {
    updateBaseWidth();
    window.addEventListener("resize", updateBaseWidth);
    return () => {
      window.removeEventListener("resize", updateBaseWidth);
    };
  }, []);
  useEffect(() => {
    const templateIdx = RESUME_TEMPLATES.findIndex(
      (template) => template.id === selectedTheme?.theme
    );

    const paletteIdx = paletteList.findIndex(
      (palette) =>
        Array.isArray(selectedTheme?.colorPalette) &&
        palette.length === selectedTheme.colorPalette.length &&
        palette.every((color, idx) => color === selectedTheme.colorPalette[idx])
    );

    setSelectedTemplate({
      theme: selectedTheme?.theme || "",
      index: templateIdx,
    });

    setSelectedColorPalette({
      colors: selectedTheme?.colorPalette || paletteList[0],
      index: paletteIdx,
    });
  }, [selectedTheme]);
  return (
    <div className="max-md:container mx-auto px-8 relative">
      <div className="sticky top-0 z-10 bg-white pt-2 pb-3 flex items-center justify-between">
        <Tabs tabs={TAB_DATA} activeTab={tabValue} setActiveTab={setTabValue} />

        <button
          className="px-4 py-2.5 cursor-pointer flex items-center gap-2 bg-primary-50 text-primary-600 rounded-md hover:bg-primary-100 font-semibold text-[16px] disabled:opacity-50 disabled:cursor-not-allowed "
          onClick={handleThemeSelection}>
          <CircleCheckBig className="w-5 h-5" />
          Chọn
        </button>
      </div>
      {console.log("selectedTemplate", selectedTemplate)}
      <div className="grid grid-cols-12 gap-5 p-3">
        <div className="col-span-12 md:col-span-5 bg-white">
          <div
            className="grid grid-cols-2 gap-5 max-h-[80vh] overflow-y-auto
          overflow-x-auto">
            {tabValue === "Mẫu" &&
              RESUME_TEMPLATES.map((template, idx) => (
                <TemplateCard
                  key={`templates_${idx}`}
                  thumbnailImg={template.thumbnailImg}
                  isSelected={selectedTemplate?.index === idx}
                  onSelect={() =>
                    setSelectedTemplate({ theme: template.id, index: idx })
                  }
                />
              ))}
            {tabValue === "Bảng màu" &&
              THEME_COLOR_PALETTES.themeOne.map((palette, idx) => (
                <ColorPaletteCard
                  key={`color_palette_${idx}`}
                  colors={palette}
                  isSelected={selectedColorPalette?.index === idx}
                  onSelect={() =>
                    setSelectedColorPalette({ colors: palette, index: idx })
                  }
                />
              ))}
          </div>
        </div>
        <div
          className="col-span-12 md:col-span-7 bg-white -mt-3"
          ref={resumeRef}>
          <RenderResume
            templateId={selectedTemplate?.theme || ""}
            resumeData={resumeData || DUMMY_RESUME_DATA}
            containerWidth={baseWidth}
            colorPalette={selectedColorPalette?.colors || []}
          />
        </div>
      </div>
    </div>
  );
};

export default ThemeSelector;

const ColorPaletteCard = ({ colors, isSelected, onSelect }) => {
  return (
    <div
      className={`h-28 bg-primary-50 flex rounded-lg overflow-hidden border-2 ${
        isSelected
          ? "border-primary-500"
          : "border-gray-200 hover:border-primary-300"
      }`}>
      {colors.map((color, idx) => (
        <div
          key={`color_${idx}`}
          className="flex-1 cursor-pointer"
          style={{ backgroundColor: color }}
          onClick={onSelect}
        />
      ))}
    </div>
  );
};
