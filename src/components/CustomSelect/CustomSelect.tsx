import { useState } from "react";
import css from "./CustomSelect.module.css";

type Props<T extends string> = {
  options: { value: T; label: string }[];
  value: T;
  onChange: (value: T) => void;
};

const CustomSelect = <T extends string>({
  options,
  value,
  onChange,
}: Props<T>) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleSelect = (val: T) => {
    onChange(val);
    setIsOpen(false);
  };

  return (
    <div className={css.wrapper}>
      <div className={css.header} onClick={() => setIsOpen((o) => !o)}>
        {options.find((opt) => opt.value === value)?.label}
        <svg className={css.icon} width={20} height={20}>
          <use
            href={
              isOpen
                ? "/sprite.svg#icon-chevron-up"
                : "/sprite.svg#icon-chevron-down"
            }
          />
        </svg>
      </div>

      {isOpen && (
        <ul className={css.list}>
          {options.map((opt) => (
            <li key={opt.value} onClick={() => handleSelect(opt.value)}>
              {opt.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CustomSelect;
