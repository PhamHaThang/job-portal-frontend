import FilterSection from "./FilterSection";
import { JOB_TYPES, CATEGORIES } from "../../utils/data";
import SalaryRangeSlider from "./SalaryRangeSlider";
import CustomCheckbox from "./CustomCheckbox";
const FilterContent = ({
  toggleSection,
  expandedSections,
  filters,
  handleFilterChange,
}) => {
  return (
    <>
      <FilterSection
        title="Hình thức"
        isExpanded={expandedSections?.jobType}
        onToggle={() => toggleSection("jobType")}>
        <div className="space-y-3">
          {JOB_TYPES.map((type) => (
            <label
              key={type.value}
              className="flex items-center cursor-pointer">
              <CustomCheckbox
                checked={filters?.type === type.value}
                onChange={(e) =>
                  handleFilterChange("type", e.target.checked ? type.value : "")
                }
              />
              <span className="ml-3 text-gray-700 font-medium">
                {type.label}
              </span>
            </label>
          ))}
        </div>
      </FilterSection>
      <FilterSection
        title="Phạm vi lương"
        isExpanded={expandedSections?.salary}
        onToggle={() => toggleSection("salary")}>
        <SalaryRangeSlider
          filters={filters}
          handleFilterChange={handleFilterChange}
        />
      </FilterSection>
      <FilterSection
        title="Danh mục"
        isExpanded={expandedSections?.categories}
        onToggle={() => toggleSection("categories")}>
        <div className="space-y-3">
          {CATEGORIES.map((type) => (
            <label
              key={type.value}
              className="flex items-center cursor-pointer">
              <CustomCheckbox
                checked={filters?.category === type.value}
                onChange={(e) =>
                  handleFilterChange(
                    "category",
                    e.target.checked ? type.value : ""
                  )
                }
              />

              <span className="ml-3 text-gray-700 font-medium">
                {type.label}
              </span>
            </label>
          ))}
        </div>
      </FilterSection>
    </>
  );
};

export default FilterContent;
