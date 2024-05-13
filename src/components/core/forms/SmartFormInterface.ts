export interface SmartSelectProps {
  label?: string;
  value: string;
  isMulti?: boolean;
  isAsync?: boolean;
  isClearable?: boolean;
  options?: any;
  loadOptionsFunction?: (inputValue: any, callBack: any) => void;
  placeHolder?: string;
  valueFunction?: () => any;
  onChange: (value: string) => void;
  errorUpdate?: (value: string) => void;
  loadMoreOptionsFunction?: (setSelectOptions: any) => void;
  type?: string;
  classList?: string[];
  isHorizontal?: boolean;
  inputProps?: {
    isStatic?: boolean;
    isFocussed?: boolean;
    isLoading?: boolean;
    size?: string;
    disabled?: boolean;
    disabledFunction?: (value: string) => boolean;
  };
  disabled?: boolean;
  leftIcon?: string;
  leftIconFunction?: (value: string) => any;
  rightIcon?: string;
  rightIconFunction?: (value: string) => any;
  successMessage?: string;
  validations?: any[];
  errorEnable?: boolean;
  inputType?: "BORDER_LESS" | "BORDER_LABEL" | "NORMAL" | "BORDER_LABEL_FOCUS";
  isRequired?: boolean;
  codeSelected?: string;
  disablePaste?: boolean;
}

export interface SmartInputProps {
  name?: string;
  label?: string;
  value: string;
  placeHolder?: string;
  valueFunction?: () => any;
  onChange: (value: string) => void;
  //handleInputChange?:(name:string,value: string) => void;
  errorUpdate?: (value: string) => void;
  onBlur?: (value: string) => void;
  type?: string;
  inputType?: "BORDER_LESS" | "BORDER_LABEL" | "NORMAL" | "BORDER_LABEL_FOCUS";
  min?: number;
  max?: number;
  pattern?: string;
  patternFunction?: (value: string) => boolean;
  classList?: string[];
  isHorizontal?: boolean;
  inputProps?: {
    isStatic?: boolean;
    isFocussed?: boolean;
    isLoading?: boolean;
    size?: string;
    disabled?: boolean;
    disabledFunction?: (value: string) => boolean;
  };
  disabled?: boolean;
  leftIcon?: string;
  leftIconFunction?: (value: string) => any;
  rightIcon?: string;
  rightIconFunction?: (value: string) => any;
  successMessage?: string;
  validations?: any[];
  errorEnable?: boolean;
  rows?: number;
  isRequired?: boolean;
  passwordValidator?: boolean;
  countries?: any[];
  onCodeChange?: (value: string) => void;
  codeSelected?: string;
  disablePaste?: boolean;
}

export interface SmartDateProps {
  label?: string;
  value: string;
  placeHolder?: string;
  valueFunction?: () => any;
  onChange: (value: string) => void;
  errorUpdate?: (value: string) => void;
  classList?: string[];
  isHorizontal?: boolean;
  inputProps?: {
    isStatic?: boolean;
    isFocussed?: boolean;
    isLoading?: boolean;
    size?: string;
    disabled?: boolean;
    disabledFunction?: (value: string) => boolean;
  };
  disabled?: boolean;
  leftIcon?: string;
  leftIconFunction?: (value: string) => any;
  rightIcon?: string;
  rightIconFunction?: (value: string) => any;
  successMessage?: string;
  validations?: any[];
  errorEnable?: boolean;
  inputType?: "BORDER_LESS" | "BORDER_LABEL" | "NORMAL" | "BORDER_LABEL_FOCUS";
  dateFormat?: string;
  showMonthYearPicker?: boolean;
  excludeDates?: any[];
  includeDates?: any[];
  holidays?: any[];
  weekDaysOnly?: boolean;
  minDate?: any;
  maxDate?: any;
  showYearDropdown?: boolean;
  showMonthDropdown?: boolean;
  dateProps?: any;
  readOnly?: boolean;
  showTimeSelect?: boolean;
  showTimeSelectOnly?: boolean;
  timeIntervals?: number;
  timeCaption?: string;
  dropdownMode?: string;
  isRequired?: boolean;
  timeZone?: string;
}

export interface SmartCheckRadioProps {
  label?: string;
  name: string;
  value: string;
  isMulti?: boolean;
  isAsync?: boolean;
  isRight?: boolean;
  options?: any;
  optionsVertical?: boolean;
  switchMode?: boolean;
  valueFunction?: () => any;
  onChange: (value: string) => void;
  errorUpdate?: (value: string) => void;
  type?: string;
  classList?: string[];
  isHorizontal?: boolean;
  inputProps?: {
    className?: string;
    size?: string;
    disabled?: boolean;
    borderLess?: boolean;
    background?: boolean;
    isRounded?: boolean;
    isThin?: boolean;
    isOutlined?: boolean;
    disabledFunction?: (value: string) => boolean;
  };
  disabled?: boolean;
  successMessage?: string;
  validations?: any[];
  errorEnable?: boolean;
  isRequired?: boolean;
}

export interface SmartButtonProps {
  label?: string;
  type?: string;
  classList?: string[];
  disabled?: boolean;
  leftIcon?: string;
  leftIconFunction?: () => any;
  rightIcon?: string;
  rightIconFunction?: () => any;
  disabledFunction?: (value: any) => boolean;
  hideFunction?: (value: any) => boolean;
  onClick: (data?: any) => void;
}

export interface SmartFormElementProps {
  width: string;
  type:
    | "TEXT_BOX"
    | "SELECT_BOX"
    | "CHECK_RADIO"
    | "DATE"
    | "TEXTAREA"
    | "IMAGE"
    | "FILE"
    | "BUTTON"
    | "PASSWORD"
    | "OTP"
    | "MOBILE"
    | "LABEL";
  name: string;
  class_name?: string;
  codeName?:string,
  element?: any;
  hideFunction?: (value: any) => boolean;
  labelFunction?:()=>any
}

export interface SmartFormProps {
  formData: any;
  setFormData: (name: string, value: any) => void;
  formSubmit?: boolean;
  elements: SmartFormElementProps[];
  handleErrorChange?: (name: String, value: any) => void;
}

export interface SmartFileProps {
  label?: string;
  value: string;
  isMulti?: boolean;
  isAsync?: boolean;
  placeHolder?: string;
  valueFunction?: () => any;
  onChange: (value: string) => void;
  errorUpdate?: (value: string) => void;
  type?: string;
  classList?: string[];
  isHorizontal?: boolean;
  inputProps?: {
    isStatic?: boolean;
    isFocussed?: boolean;
    isLoading?: boolean;
    size?: string;
    disabled?: boolean;
    disabledFunction?: (value: string) => boolean;
  };
  disabled?: boolean;
  leftIcon?: string;
  leftIconFunction?: (value: string) => any;
  rightIcon?: string;
  rightIconFunction?: (value: string) => any;
  successMessage?: string;
  validations?: any[];
  errorEnable?: boolean;
  fileNameEnable?: boolean;
  isRequired?: boolean;
}

export interface SmartOtpPin {
  digits: number;
  onChange: (value: string) => void;
  label?: string;
  isRequired?: boolean;
  className?: string;
  resendOtpFunction: (callBack: () => any) => any;
  otpTimerValue: number;
  errorEnable?: boolean;
  errorUpdate?: (value: string) => void;
  validations?: any[];
}
