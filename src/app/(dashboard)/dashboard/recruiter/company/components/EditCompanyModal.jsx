import {
  Button,
  Input,
  Label,
  ListBox,
  Modal,
  TextArea,
  TextField,
  Select,
} from "@heroui/react";
import React from "react";
import { FiMapPin, FiPlusCircle, FiUploadCloud } from "react-icons/fi";

const INDUSTRIES = [
  { id: "technology", label: "Technology" },
  { id: "health-care", label: "Health Care" },
  { id: "finance", label: "Finance" },
  { id: "education", label: "Education" },
  { id: "operations", label: "Operations" },
];

const EMPLOYEE_RANGES = [
  { id: "1-10", label: "1-10 employees" },
  { id: "11-50", label: "11-50 employees" },
  { id: "51-200", label: "51-200 employees" },
  { id: "201-500", label: "201-500 employees" },
  { id: "501+", label: "501+ employees" },
];

const EditCompanyModal = ({company}) => {
  const handleFormSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);

    const submittedData = {
      companyName: formData.get("companyName"),
      industry: formData.get("industry"),
      websiteUrl: formData.get("websiteUrl"),
      location: formData.get("location"),
      employeeRange: formData.get("employeeRange"),
      description: formData.get("description"),
      logo: null,
      status: "pending",
    };
  };

  return (
    <Modal scrollBehavior="inside">
      <Button
        variant="ghost"
        radius="md"
        className="mt-2 rounded-md font-medium text-sm"
        startContent={<FiPlusCircle className="w-4 h-4" />}
      >
        Edit Company
      </Button>
      <Modal.Backdrop>
        <Modal.Container>
          <Modal.Dialog className="max-w-2xl w-full bg-[#121212] border border-neutral-800 rounded-2xl shadow-2xl m-2 sm:m-4 flex flex-col max-h-[90vh]">
            <Modal.CloseTrigger className="text-neutral-400 hover:text-white" />

            <form
              onSubmit={handleFormSubmit}
              className="flex flex-col flex-1 min-h-0"
            >
              {/* Header — sticky, never scrolls */}
              <Modal.Header className="flex flex-col gap-1 border-b border-neutral-800 p-4 sm:p-6 bg-[#121212] shrink-0">
                <Modal.Heading className="text-lg sm:text-xl font-bold text-white">
                  Update Company Details
                </Modal.Heading>
                <p className="text-[11px] sm:text-xs text-neutral-400">
                  Enter your business details to start hiring on NexRole!
                </p>
              </Modal.Header>

              <Modal.Body className="p-4 sm:p-6 flex flex-col gap-5 bg-[#121212] overflow-y-auto flex-1 min-h-0">
                {/* Grid Row 1 */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <TextField
                    name="companyName"
                    isRequired
                    variant="bordered"
                    className="flex flex-col gap-1.5"
                  >
                    <Label className="text-xs font-semibold text-neutral-300">
                      Company Name
                    </Label>
                    <Input
                      defaultValue={company?.companyName}
                      placeholder="e.g. Acme Corp"
                      className="bg-[#1a1a1a] border-neutral-800 text-white text-sm"
                    />
                  </TextField>

                  <div className="flex flex-col gap-1.5">
                    <Label
                      id="industry-lbl"
                      className="text-xs font-semibold text-neutral-300"
                    >
                      Industry / Category
                    </Label>
                    <Select
                      name="industry"
                      placeholder="Select industry"
                      aria-labelledby="industry-lbl"
                      defaultValue={company?.industry}
                      className="w-full bg-[#1a1a1a] border-neutral-800 text-white text-sm"
                    >
                      <Select.Trigger>
                        <Select.Value />
                        <Select.Indicator />
                      </Select.Trigger>
                      <Select.Popover>
                        <ListBox>
                          {INDUSTRIES.map(({ id, label }) => (
                            <ListBox.Item key={id} id={id} textValue={label}>
                              {label}
                              <ListBox.ItemIndicator />
                            </ListBox.Item>
                          ))}
                        </ListBox>
                      </Select.Popover>
                    </Select>
                  </div>
                </div>

                {/* Grid Row 2 */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <TextField
                    name="websiteUrl"
                    variant="bordered"
                    className="flex flex-col gap-1.5"
                  >
                    <Label className="text-xs font-semibold text-neutral-300">
                      Website URL
                    </Label>
                    <div className="flex rounded-md overflow-hidden bg-[#1a1a1a] border border-neutral-800 h-10">
                      <span className="inline-flex items-center px-3 bg-neutral-800 text-neutral-400 text-xs select-none">
                        https://
                      </span>
                      <Input
                        defaultValue={company?.websiteUrl}
                        placeholder="www.company.com"
                        className="border-0 bg-transparent text-white w-full text-sm h-full"
                      />
                    </div>
                  </TextField>

                  <TextField
                    name="location"
                    variant="bordered"
                    className="flex flex-col gap-1.5"
                  >
                    <Label className="text-xs font-semibold text-neutral-300">
                      Location
                    </Label>
                    <div className="flex items-center gap-2 px-3 rounded-md bg-[#1a1a1a] border border-neutral-800 h-10">
                      <FiMapPin className="text-neutral-500 w-4 h-4 shrink-0" />
                      <Input
                        defaultValue={company?.location}
                        placeholder="City, Country"
                        className="border-0 bg-transparent text-white w-full text-sm h-full"
                      />
                    </div>
                  </TextField>
                </div>

                {/* Grid Row 3 */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-center">
                  <div className="flex flex-col gap-1.5">
                    <Label
                      id="employee-lbl"
                      className="text-xs font-semibold text-neutral-300"
                    >
                      Employee Count Range
                    </Label>
                    <Select
                      name="employeeRange"
                      placeholder="Select range"
                      aria-labelledby="employee-lbl"
                      defaultValue={company?.employeeRange || "1-10"}
                      className="w-full bg-[#1a1a1a] border-neutral-800 text-white text-sm"
                    >
                      <Select.Trigger>
                        <Select.Value />
                        <Select.Indicator />
                      </Select.Trigger>
                      <Select.Popover>
                        <ListBox>
                          {EMPLOYEE_RANGES.map(({ id, label }) => (
                            <ListBox.Item key={id} id={id} textValue={label}>
                              {label}
                              <ListBox.ItemIndicator />
                            </ListBox.Item>
                          ))}
                        </ListBox>
                      </Select.Popover>
                    </Select>
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <Label className="text-xs font-semibold text-neutral-300">
                      Company Logo
                    </Label>
                    <div className="flex items-center gap-3">
                      <label className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl border border-dashed border-neutral-700 bg-[#1a1a1a] hover:bg-neutral-800 transition-colors flex items-center justify-center cursor-pointer text-neutral-400 shrink-0">
                        <FiUploadCloud className="w-4 h-4 sm:w-5 sm:h-5" />
                        <input
                          type="file"
                          name="logo"
                          accept="image/*"
                          className="hidden"
                        />
                      </label>
                      <div className="flex flex-col">
                        <span className="text-xs font-semibold text-neutral-300">
                          Upload image
                        </span>
                        <span className="text-[10px] text-neutral-500">
                          PNG, JPG up to 5MB
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Textarea Description Segment */}
                <TextField
                  name="description"
                  variant="bordered"
                  className="flex flex-col gap-1.5"
                >
                  <Label className="text-xs font-semibold text-neutral-300">
                    Brief Description
                  </Label>
                  <TextArea
                    defaultValue={company?.description}
                    placeholder="Tell us about your company's mission and culture..."
                    className="min-h-24 bg-[#1a1a1a] border-neutral-800 text-white p-3 rounded-md text-sm"
                  />
                </TextField>
              </Modal.Body>

              {/* Footer — sticky, never scrolls */}
              <Modal.Footer className="border-t border-neutral-800 p-4 bg-[#121212] flex justify-end gap-3 shrink-0">
                <Button
                  slot="close"
                  type="button"
                  variant="flat"
                  className="bg-transparent text-white border border-neutral-800 hover:bg-neutral-950 font-medium px-4 text-xs sm:text-sm"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  color="primary"
                  className="bg-white text-black hover:bg-neutral-200 font-bold px-5 text-xs sm:text-sm"
                >
                  Save Changes
                </Button>
              </Modal.Footer>
            </form>
          </Modal.Dialog>
        </Modal.Container>
      </Modal.Backdrop>
    </Modal>
  );
};

export default EditCompanyModal;
